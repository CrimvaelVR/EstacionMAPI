const Mediciones = require('../models/mediciones'); // Asegúrate de que la ruta al archivo sea correcta

class medicionesController {

    consultarMedidiones = async (req, res) => { 

        try{

            const datos = await Mediciones.find()
            
            
            console.log(datos[datos.length-1])
            res.json(datos[datos.length-1])

        } catch (error){
            res.status(400).json({ message: error.message });
        }

    }

    agregarMediciones = async (req, res) => {
        try {

            const datos = await Mediciones.find()

            // Obtener la fecha actual
            let fechaActual = new Date();

            // Obtener los componentes individuales de la fecha
            let dia = fechaActual.getDate();
            let mes = fechaActual.getMonth() + 1; // Los meses se indexan desde 0, por lo que sumamos 1
            let anio = fechaActual.getFullYear();

            let hora = fechaActual.getHours();
            let minutos = fechaActual.getMinutes();
            let segundos = fechaActual.getSeconds();

            hora = hora.toString().padStart(2, '0');
            minutos = minutos.toString().padStart(2, '0');
            segundos = segundos.toString().padStart(2, '0');
            
            // Formatear la hora en una cadena (HH:mm:ss)
            var horaFormateada = hora + ':' + minutos + ':' + segundos;

            // Formatear la fecha en una cadena personalizada (dd/mm/aaaa)
            let fechaFormateada = dia + '/' + mes + '/' + anio;

            const medicion = new Mediciones({
                num: datos.length + 1,
                temperatura: req.body.temperatura,
                humedad: req.body.humedad,
                intensidad: req.body.intensidad,
                velocidad: req.body.velocidad,
                fecha: fechaFormateada,
                hora: horaFormateada
            });

            await medicion.save(); // Corrige aquí: usa medicion.save() en lugar de Mediciones.save()
            res.status(201).json(medicion);
            console.log(medicion);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}

const medicionesC = new medicionesController();

module.exports = medicionesC;