// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'token'; // Clave para firmar el token

// Endpoint para obtener el token (login simulado)
app.post('/api/login', (req, res) => {
    const user = {
        id: 1,
        username: 'renzo chipana',
        email: 'renzo.chipana@ucsm.edu.pe'
    };

    // Crear el token con expiración de 1 minuto
    jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
            res.status(500).json({ mensaje: 'token sin respuesta' });
        } else {
            res.json({ token });
        }
    });
});

// Middleware para verificar el token
function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); // Acceso prohibido
    }
}

// Endpoint protegido 1: Obtener datos de usuario
app.get('/api/alumno', verificarToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403); // Token inválido o expirado
        } else {
            res.json({
                mensaje: 'Datos del alumno',
                authData
            });
        }
    });
});

// Endpoint protegido 2: Actualizar datos de usuario
app.put('/api/alumno', verificarToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, (err, authData) => {
        if (err) {
            res.sendStatus(403); // Token inválido o expirado
        } else {
            res.json({
                mensaje: 'alumno actualizado ..',
                authData
            });
        }
    });
});

// Iniciar el servidor
app.listen(5000, () => {
    console.log('Servidor ejecutandose en el puerto 5000');
});
