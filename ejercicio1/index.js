// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/connection');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// GET: Obtener todos los productos
app.get('/api/productos', (req, res) => {
    const sql = 'SELECT * FROM productos';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// POST: Crear un nuevo producto
app.post('/api/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;
    const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
    connection.query(sql, [nombre, precio, stock], (err, result) => {
        if (err) throw err;
        res.status(201).json({ id: result.insertId, nombre, precio, stock });
    });
});

// PUT: Actualizar un producto existente
app.put('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    const sql = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';
    connection.query(sql, [nombre, precio, stock, id], (err, result) => {
        if (err) throw err;
        res.json({ mensaje: 'Producto actualizado', id, nombre, precio, stock });
    });
});

// DELETE: Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM productos WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.status(204).send();
    });
});

// Iniciar el servidor en el puerto 5000
app.listen(5000, () => {
    console.log('Servidor se conectara en el puerto 5000');
});
