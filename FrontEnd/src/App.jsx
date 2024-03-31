import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherCard = ({ data }) => {
  return (
    <div className="weather-card">
      <div className="grid auto-rows-[192px] grid-cols-3 gap-4 font-[Barlow]">
        <div className="flex items-center justify-between row-span-1 rounded-xl  bg-white bg-opacity-50 shadow-sm p-4 dark:bg-neutral-900">
          <p className='text-4xl'> <strong>Temperatura:</strong> <span className='text-5xl font-[system-ui] font-extrabold'>{data.temperatura}°C</span></p>
          <img className=""src="./public/Calor.png" alt="Calor" />
        </div>
        <div className="flex items-center justify-between row-span-1 rounded-xl  bg-white bg-opacity-50 shadow-sm p-4 dark:bg-neutral-900">
          <p className='text-4xl'> <strong>Humedad:</strong> <span className='text-5xl font-[system-ui] font-extrabold'>{data.humedad}%</span></p>
          <img className=""src="./public/Agua2.png" alt="Humedad" />
        </div>
        <div className="flex items-center justify-between row-span-1 rounded-xl bg-white bg-opacity-50 shadow-sm p-4 dark:bg-neutral-900">
          <p className='text-4xl'> <strong>Intensidad:</strong> <span className='text-5xl font-[system-ui] font-extrabold'>{data.intensidad}</span></p>
          <img className=""src="./public/Sol.png" alt="Intensidad Solar" />
        </div>
        <div className="flex items-center justify-between row-span-1 rounded-xl bg-white bg-opacity-50 shadow-sm p-4 dark:bg-neutral-900">
          <p className='text-4xl'> <strong>Velocidad del viento:</strong> <span className='text-5xl font-[system-ui] font-extrabold'>{data.velocidad}m/s</span></p>
          <img className=""src="./public/viento.png" alt="Velocidad del Viento" />
        </div>
        <div className="flex items-center justify-between row-span-1 col-span-2 rounded-xl bg-white bg-opacity-50 shadow-sm p-4 dark:bg-neutral-900">
          <p className='text-4xl'> <strong>Fecha:</strong> <span className='text-5xl font-[system-ui] font-extrabold'>{data.fecha}</span></p>
        </div>
        <div className="flex items-center justify-between row-span-1 col-span-2 rounded-xl 0 bg-white bg-opacity-50 shadow-bg p-4 dark:bg-neutral-900 ">
          <p className='text-4xl'> <strong>Hora:</strong> <span className='text-5xl font-[system-ui] font-extrabold'>{data.hora}</span></p>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState(null); // Cambia el estado inicial a null

  const fetchData = () => {
    axios.get('http://192.168.0.109:3000/')
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

  // Si el estado data es null, muestra un mensaje de carga
  if (data === null) {
    return <div>Cargando...</div>;
  }

  // Si el estado data no es null, muestra los datos
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Estación meteorológica</h1>
      <WeatherCard data={data} /> {/* Utiliza el componente WeatherCard directamente */}
    </div>
  );
};

export default App;