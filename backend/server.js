import express from 'express';
import bodyParser from 'body-parser';

const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());
// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.json());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'clientes',
});

// Conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Definición de la ruta para la tabla 'datos'
app.get('/api/datos', (req, res) => {
  db.query('SELECT * FROM datos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// Definición de la ruta para la tabla 'pago_de_licencias'
app.get('/api/pago_de_licencias', (req, res) => {
  db.query('SELECT * FROM pago_de_licencias', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


// Ruta para insertar datos en la tabla 'datos'
app.post('/api/datos', (req, res) => {
    const { empresa, cuit, celular, servicioContratado, adelanto, cuotasDeAdelanto, fechaInstalacion, precioMensual } = req.body;
  
    const query = 'INSERT INTO datos (empresa, cuit, celular, servicio_contratado, adelanto, cuotas_de_adelanto, fecha_instalacion_servicio, precio_mensual) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    
    db.query(query, [empresa, cuit, celular, servicioContratado, adelanto, cuotasDeAdelanto, fechaInstalacion, precioMensual], (error, results) => {
      if (error) {
        console.error('Error al insertar en la tabla datos:', error);
        return res.status(500).json({ error: 'Error al insertar en la tabla datos' });
      }
      res.status(201).json({ message: 'Datos insertados correctamente' });
    });
  });
  

// Ruta para insertar datos en la tabla 'pago_de_licencias'
app.post('/api/pago_de_licencias', (req, res) => {
  const { empresa, precio_mensual, estado } = req.body;

  const query = 'INSERT INTO pago_de_licencias (empresa, precio_mensual, estado) VALUES (?, ?, ?)';
  
  db.query(query, [empresa, precio_mensual, estado], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error al insertar en la tabla pago_de_licencias' });
    }
    res.status(201).json({ message: 'Pago de licencia insertado correctamente' });
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
