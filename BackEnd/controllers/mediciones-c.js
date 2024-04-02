const Mediciones = require('../models/mediciones'); // Asegúrate de que la ruta al archivo sea correcta

const ExcelJS = require('exceljs');

var moment = require('moment-timezone');


class medicionesController {

    consultarMedidiones = async (req, res) => { 

        try{

            const datos = await Mediciones.find()
            res.json(datos[datos.length-1])

        } catch (error){
            res.status(400).json({ message: error.message });
        }

    }

    exportarMediciones = async (req, res) => { 
        try {
          const workbook = new ExcelJS.Workbook();
      
          const sheet = workbook.addWorksheet('books');
          sheet.columns = [
            { header: 'Num', key: 'num', width: 10 },
            { header: 'Temperatura', key: 'temperatura', width: 30 },
            { header: 'Humedad', key: 'humedad', width: 30 },
            { header: 'Intensidad', key: 'intensidad', width: 30 },
            { header: 'Velocidad del Viento', key: 'velocidad', width: 30 },
            { header: 'Direccion del Viento', key: 'direccion', width: 30 },
            { header: 'Fecha', key: 'fecha', width: 30 },
            { header: 'Hora', key: 'hora', width: 30 }
          ];
      
          const datos = await Mediciones.find();
          let data = JSON.parse(JSON.stringify(datos));
      
          data.forEach(value => {
            sheet.addRow({
              num: value.num,
              temperatura: value.temperatura,
              humedad: value.humedad,
              intensidad: value.intensidad,
              velocidad: value.velocidad,
              direccion: value.direccion,
              fecha: value.fecha,
              hora: value.hora
            });
          });
      
          res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          );
          res.setHeader(
            'Content-Disposition',
            'attachment;filename=' + 'DatosMeteorologicos.xlsx'
          );
      
          await workbook.xlsx.write(res);
      
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      };


    agregarMediciones = async (req, res) => {
        try {
            const datos = await Mediciones.find()

            // Formatear la hora en una cadena (HH:mm:ss)
            var horaFormateada = moment().tz("America/Caracas").format("hh:mm:ss a");

            // Formatear la fecha en una cadena personalizada (dd/mm/aaaa)
            let fechaFormateada = moment().tz("America/Caracas").format("DD/MM/YYYY");

            const medicion = new Mediciones({
              num: datos.length + 1,
              temperatura: parseFloat(req.body.temperatura).toFixed(2),
              humedad: parseFloat(req.body.humedad).toFixed(2),
              intensidad: req.body.intensidad,
              velocidad: parseFloat(req.body.velocidad).toFixed(2),
              direccion: req.body.direccion,
              fecha: fechaFormateada,
              hora: horaFormateada
          });

            await medicion.save(); // Corrige aquí: usa medicion.save() en lugar de Mediciones.save()
            res.status(201).json(medicion);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

const medicionesC = new medicionesController();

module.exports = medicionesC;