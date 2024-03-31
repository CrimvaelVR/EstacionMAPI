import React from 'react';

const WeatherCard = ({ data }) => {
  console.log('aaaaaaaaaaaa')
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-bold mb-4">Lectura meteorológica</h2>
      <p>
        Temperatura: {data.temperatura}°C<br />
        Humedad: {data.humedad}%<br />
        Intensidad: {data.intensidad}<br />
        Velocidad del viento: {data.velocidad} m/s<br />
        Fecha: {data.fecha}<br />
        Hora: {data.hora}
      </p>
    </div>
  );
};

export default WeatherCard;