const express = require('express');
const router = express.Router();
const controller = require('../controllers/mediciones-c')

// Ruta para mostar los datos

router.get('/', controller.consultarMedidiones);

router.get('/export', controller.exportarMediciones);

module.exports = router;