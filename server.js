const express = require('express');
const Groq = require('groq-sdk');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());

let groq;

app.post('/setup', (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey) {
    return res.status(400).json({ status: false, message: "Debes proporcionar una clave API." });
  }

  groq = new Groq({ apiKey });
  res.json({ status: true, message: "Clave API guardada correctamente." });
});

app.get('/chat', async (req, res) => {
  const inputText = req.query.text;

  if (!groq) {
    return res.status(500).json({ status: false, message: "La clave API no ha sido configurada." });
  }

  if (!inputText) {
    return res.status(400).json({ status: false, message: "Debes especificar un texto para usar la IA." });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: inputText }],
      model: "llama3-8b-8192",
    });

    res.json(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
