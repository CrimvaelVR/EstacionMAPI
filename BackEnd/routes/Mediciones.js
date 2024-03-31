const express = require('express');
const router = express.Router();

const controller = require('../controllers/mediciones-c')
// Ruta para crear una nueva medición

router.post('/', controller.agregarMediciones);



module.exports = router;
