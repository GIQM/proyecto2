import React, { useState } from 'react';
import { celsiusToFahrenheit } from '../utility/temperature';
import Forecast from './Forecast';

const Card = ({ weatherInfo, coordinates }) => {
  const [isCelsius, setIsCelsius] = useState(false);
  const temp = isCelsius
    ? weatherInfo.main.temp
    : celsiusToFahrenheit(weatherInfo.main.temp);
  return (
    <div className="weather__Card">
      <div className="weather__Card-Container">
        <div className="left">
          <h1>
            <i class="fa-solid fa-location-dot"></i>
            Ubicación actual: {weatherInfo.name.toUpperCase()},
            {weatherInfo.sys.country.toUpperCase()}
          </h1>
          <p>{weatherInfo.weather[0].description.toLowerCase}</p>
          <h2>
            <span>Humedad: </span> {weatherInfo.main.humidity}%
          </h2>
          <h2>
            <span>Presión: </span> {weatherInfo.main.pressure} hPa
          </h2>
          <h2>
            <span>Condición del Cielo: </span>{' '}
            {weatherInfo.weather[0].description.charAt(0).toUpperCase() +
              weatherInfo.weather[0].description.slice(1)}
          </h2>
          <p>
            <span>Viento: </span> {weatherInfo.wind.speed} m/s
          </p>
        </div>
        <div className="right">
          <img
            alt="weather"
            className="weather-icon"
            src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          />
          <span>
            <i class="fa-solid fa-temperature-full"></i> {temp}
            {isCelsius ? '°C' : '°F'}
          </span>
          <br />
          <div className="temp__Weather">
            <button onClick={() => setIsCelsius(!isCelsius)}>
              {isCelsius ? (
                <i class="fa-solid fa-toggle-off"></i>
              ) : (
                <i class="fa-solid fa-toggle-on"></i>
              )}
            </button>
            <span>{isCelsius ? '°F' : '°C'}</span>
          </div>
        </div>
      </div>

      <div className="forecast__Container">
        <h2>PRONOSTICO EN LAS PRÓXIMAS HORAS </h2>
        <Forecast coordinates={coordinates} />
      </div>
    </div>
  );
};

export default Card;
