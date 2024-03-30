const mongoose = require('mongoose');

// Esquema de la colección de mediciones
const medicionesEsquema = new mongoose.Schema({
  temperatura: Number,
  humedad: Number,
  intensidad: Number,
  velocidad: Number
});

// Crear el modelo basado en el esquema
const Mediciones = mongoose.model('Mediciones', medicionesEsquema);

module.exports = Mediciones;
