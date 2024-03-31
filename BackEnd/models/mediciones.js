const mongoose = require('mongoose');

// Esquema de la colección de mediciones
const medicionesEsquema = new mongoose.Schema({
  num: {
    type: Number,
    required: true,
},
  temperatura: Number,
  humedad: Number,
  intensidad: Number,
  velocidad: Number,
  fecha: String,
  hora: String
});

// Crear el modelo basado en el esquema
const Mediciones = mongoose.model('Mediciones', medicionesEsquema);

module.exports = Mediciones;
