import React, { useState, useEffect } from 'react';
import axios from 'axios';

const host = import.meta.env.VITE_HOST



const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
  <div className="grid auto-rows-[192px] grid-cols-2 lg:grid-cols-3 gap-4 font-[Barlow]">
    <div className="flex flex-col lg:flex-row items-center text-center lg:text-left justify-center gap-5 lg:gap-0 lg:justify-between row-span-1 col-span-1 rounded-xl bg-white bg-opacity-50 shadow-2xl p-4 dark:bg-neutral-900 hover:scale-101 hover:bg-opacity-60 hover:transition hover:ease-in-out">
      <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Temperatura:</strong> <span className='text-xl sm:text-3xl lg:text-4xl font-[system-ui] font-extrabold'>{data.temperatura}°C</span></p>
      {data.temperatura >= 20 ? (
        <img className="w-12 h-12 lg:w-auto lg:h-auto" src="./public/Calor.png" alt="Calor" />
      ) : (
        <img className="w-12 h-12 lg:w-auto lg:h-auto" src="./public/Frio.png" alt="Frío" />
      )}
    </div>
    <div className="flex flex-col lg:flex-row items-center text-center lg:text-left justify-center gap-5 lg:gap-0 lg:justify-between row-span-1 col-span-1 rounded-xl bg-white bg-opacity-50 shadow-2xl p-4 dark:bg-neutral-900 hover:scale-101 hover:bg-opacity-60 hover:transition hover:ease-in-out">
      <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Humedad:</strong> <span className='text-xl sm:text-3xl lg:text-4xl font-[system-ui] font-extrabold'>{data.humedad}%</span></p>
      <img className="w-12 h-12 lg:w-auto lg:h-auto"src="./public/Agua2.png" alt="Humedad" />
    </div>
    <div className="flex items-center justify-between row-span-1 col-span-2 lg:col-span-1 rounded-xl bg-white bg-opacity-50 shadow-2xl p-4 dark:bg-neutral-900 hover:scale-101 hover:bg-opacity-60 hover:transition hover:ease-in-out">
      <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Intensidad:</strong> <span className='text-xl sm:text-3xl lg:text-4xl font-[system-ui] font-extrabold'>{data.intensidad}%</span></p>
      <img className="w-12 h-12 lg:w-auto lg:h-auto"src="./public/Sol.png" alt="Intensidad Solar" />
    </div>
    <div className="flex items-center justify-between row-span-1 col-span-2 lg:col-span-2 rounded-xl bg-white bg-opacity-50 shadow-2xl p-4 dark:bg-neutral-900 hover:scale-101 hover:bg-opacity-60 hover:transition hover:ease-in-out">
      <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Velocidad del viento:</strong> <span className='text-xl sm:text-3xl lg:text-4xl font-[system-ui] font-extrabold'>{data.velocidad}m/s</span></p>
      <img className="w-12 h-12 lg:w-auto lg:h-auto"src="./public/viento.png" alt="Velocidad del Viento" />
    </div>

    <div className="flex flex-col row-span-2 col-span-2 lg:col-span-1 gap-10 rounded-xl bg-white bg-opacity-50 shadow-2xl p-4 dark:bg-neutral-900 hover:scale-101 hover:bg-opacity-60 hover:transition hover:ease-in-out">

      <p className='pt-5 text-base sm:text-2xl lg:text-4xl text-center text-primary-900'><strong>Última actualización</strong></p>

      <div className='flex justify-between items-center'>
        <div className='flex flex-col justify-center gap-20'>
          <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Fecha:</strong> <span className='text-xl sm:text-2xl lg:text-3xl font-[system-ui] font-extrabold'>{data.fecha}</span></p>
          <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Hora:</strong> <span className='text-xl sm:text-2xl lg:text-3xl font-[system-ui] font-extrabold'>{data.hora}</span></p>
        </div>
        <img className="w-12 h-12 lg:w-20 lg:h-20" src="./public/calendario.png" alt="Fecha y Hora" />
      </div>

    </div>

    <div className="flex items-center justify-between row-span-1 col-span-2 lg:col-span-2 rounded-xl bg-white bg-opacity-50 shadow-2xl p-4 dark:bg-neutral-900 hover:scale-101 hover:bg-opacity-60 hover:transition hover:ease-in-out">
      <p className='text-base sm:text-2xl lg:text-4xl'> <strong>Dirección del viento:</strong> <span className='text-xl sm:text-3xl lg:text-4xl font-[system-ui] font-extrabold'>{data.direccion}</span></p>
      <img className="w-12 h-12 lg:w-auto lg:h-auto" src="./public/brujula.png" alt="Dirección del Viento" />
    </div>

  </div>
</div>
  );
};

const App = () => {
  const [data, setData] = useState(null); // Cambia el estado inicial a null

  const fetchData = () => {
    axios.get(`http://${host}:5000/`)
    
      .then(response => {
        setData(response.data); // Asigna directamente la respuesta al estado
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData(); // Realiza la primera petición al cargar el componente

    const interval = setInterval(() => {
      fetchData(); // Realiza una nueva petición cada 5 segundos
    }, 5000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleDownloadExcel = () => {
    axios
    .get(`http://${host}:5000/export`, {
      responseType: 'blob', // Indicar que la respuesta es un archivo
    })
    .then(response => {
      // Crear una URL para el archivo descargado
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Crear un enlace temporal y hacer clic en él para iniciar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'DatosMeteorologicos.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revocar la URL creada para liberar recursos
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error al descargar el archivo Excel:', error);
    });
  };




  // Si el estado data es null, muestra un mensaje de carga
  if (data === null) {
    return (
      <div className="flex justify-center items-center h-screen">
      <div className="flex gap-2">
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      </div>
    </div>
    )
  }

  // Si el estado data no es null, muestra los datos
  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-xl sm:text-3xl lg:text-6xl font-bold mb-10 text-center">Estación meteorológica</h1>
      <WeatherCard data={data} />
    </div>

    <div className="container mx-auto p-4 font-[system-ui]">
        <button
          type="button"
          className="shadow-2xl text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
          onClick={handleDownloadExcel}
        >
          <img
            src="./public/Excel.png"
            alt="Logo de Excel"
            className="w-6 h-6 inline-block align-middle mr-1"
          />
          Descargar Excel de datos
        </button>
      </div>
    </>
  );
};

export default App;