const express = require('express');
const app = express();
app.use(express.json());

// Clave secreta (cámbiala por una clave única)
const SECRET_KEY = "mi_clave_secreta";

// Almacenamiento temporal de registros
let registros = [];

// Endpoint para recibir datos de Bot1
app.post('/registro', (req, res) => {
    const { nombre } = req.body;

    // Validar el nombre
    if (!nombre || typeof nombre !== 'string' || nombre.length > 50) {
        return res.status(400).send('Nombre no válido');
    }

    // Guardar el registro
    registros.push({ nombre, fecha: new Date().toLocaleString() });
    res.status(200).send('Registro recibido');
});

// Endpoint para que Bot2 obtenga nuevos registros
app.get('/nuevos-registros', (req, res) => {
    // Enviar los registros y limpiar la lista
    res.status(200).json(registros);
    registros = []; // Limpiar la lista después de enviarla
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});