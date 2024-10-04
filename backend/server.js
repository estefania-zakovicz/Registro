const express = require('express');
const cors = require('cors');
const router = express.Router();
const db = require('../db');

const app = express();
app.use(cors()); // Habilita CORS
app.use(express.json()); // Para que Express pueda manejar JSON

// Endpoint para agregar datos
router.post('/api/datos', async (req, res) => {
  const { empresa, cuit, celular, servicio_contratado, adelanto, cuotas_de_adelanto, fecha_instalacion_servicio, precio_mensual_licencia } = req.body;

  try {
    if (!empresa || !cuit || !celular) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const result = await db.query(
      'INSERT INTO datos (empresa, cuit, celular, servicio_contratado, adelanto, cuotas_de_adelanto, fecha_instalacion_servicio, precio_mensual_licencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [empresa, cuit, celular, servicio_contratado, adelanto, cuotas_de_adelanto, fecha_instalacion_servicio, precio_mensual_licencia]
    );

    res.status(201).json({ message: 'Datos insertados correctamente' });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: 'Error al insertar datos: ' + error.message });
  }
});

app.use(router);
app.listen(5001, () => {
  console.log('Servidor corriendo en el puerto 5001');
});
