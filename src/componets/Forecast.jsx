import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forecast = ({ coordinates }) => {
  const [forecast, setForecast] = useState(null);
  const [actualCard, setActualCard] = useState(0);
  const changeActualCard = (direction) => {
    if (direction === 'back') {
      if (actualCard === 0) return;
      setActualCard(actualCard - 1);
    } else if (direction === 'forward') {
      const lastCardIndex = forecast.length - 1;
      if (actualCard === lastCardIndex) return;
      setActualCard(actualCard + 1);
    }
  };
  useEffect(() => {
    const getWeatherForecast = async (lat, lng) => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&lang=es&appid=e9606858d9677efc127ee736ed7c8e69&units=metric&cnt=7`;
        const response = await axios.get(url);
        setForecast(response.data.list);
      } catch (error) {
        console.log(error);
      }
    };

    if (coordinates && coordinates.lat && coordinates.lng) {
      const { lat, lng } = coordinates;
      getWeatherForecast(lat, lng);
    }
  }, [coordinates]);
  const renderForecastCards = (forecast) => {
    return (
      <div className="forecast__Container">
        <div className="forecast">
          <div className="left__Forecast">
            <h2>
              Fecha:{' '}
              {forecast[actualCard].dt_txt.split(' ')[0].split('-').reverse().join('/')}
            </h2>
            <h2>
              Hora:{' '}
              {forecast[actualCard].dt_txt.split(' ')[1].split(':').slice(0, 2).join(':')}{' '}
              hrs
            </h2>
            <p>
              Condición del cielo:{' '}
              {forecast[actualCard].weather[0].description.charAt(0).toUpperCase() +
                forecast[actualCard].weather[0].description.slice(1)}
            </p>
            <p>Humedad: {forecast[actualCard].main.humidity}%</p>
            <p className="temp__Container">
              <div className="">
                <span>Temp. Max </span>
                <span>{forecast[actualCard].main.temp_max} °C</span>
              </div>
              <div className="">
                <span>Temp. Min </span>
                <span>{forecast[actualCard].main.temp_min} °C</span>
              </div>
            </p>
          </div>
          <div className="right__Forecast">
            <img
              alt="weather"
              className="weather-icon"
              src={`http://openweathermap.org/img/wn/${forecast[actualCard].weather[0].icon}@2x.png`}
            />
            <p>
              <i class="fa-solid fa-temperature-full"></i>{' '}
              {forecast[actualCard].main.temp} °C
            </p>
          </div>
          <br />
        </div>
        <div className="button__Forecast">
          <button onClick={() => changeActualCard('back')}>
            <i class="fa-solid fa-backward"></i>
          </button>
          <button onClick={() => changeActualCard('forward')}>
            <i class="fa-solid fa-forward"></i>
          </button>
        </div>
      </div>
    );
  };
  return <div>{forecast && renderForecastCards(forecast)}</div>;
};
export default Forecast;
