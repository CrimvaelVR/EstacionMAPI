const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
var cors = require('cors')
const app = express();
const port = 5000;

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

app.use(cors({
  origin:  `${process.env.HOST_FRONT}:4000`, // Reemplaza con la URL de tu aplicación frontend
  credentials: true
}));

// Conexión a MongoDB
mongoose.connect(process.env.DATABASE, {});

// Verificar conexión a la base de datos
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
  console.log('Conectado a la base de datos');
});

// Importar las rutas
const Mediciones = require('./routes/Mediciones');
const index = require('./routes/index');

// Usar las rutas importadas
app.use('/mediciones', Mediciones);
app.use('/', index);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Host corriendo en localhost`);
});
