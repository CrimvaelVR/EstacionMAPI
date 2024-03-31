const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
const port = 3000;
const host = "192.168.0.109";

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://192.168.0.109:4000', // Reemplaza con la URL de tu aplicación frontend
  credentials: true
}));

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1/EstacionM', {
});

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
app.listen(port,host, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Host corriendo en ${host}`);
});
