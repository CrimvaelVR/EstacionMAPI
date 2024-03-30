const express = require('express');
const router = express.Router();
const Mediciones = require('../models/mediciones'); // Asegúrate de que la ruta al archivo sea correcta

// Ruta para crear una nueva medición
router.post('/', async (req, res) => {
  try {
    const medicion = new Mediciones({
      temperatura: req.body.temperatura,
      humedad: req.body.humedad,
      intensidad: req.body.intensidad,
      velocidad: req.body.velocidad
    });
    await medicion.save(); // Corrige aquí: usa medicion.save() en lugar de Mediciones.save()
    res.status(201).json(medicion);
    console.log(medicion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
