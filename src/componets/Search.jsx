import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Search = ({ getWeatherInfo }) => {
  const [cityName, setCityName] = useState('');
  const getWeatherInfoCity = async (city) => {
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=e9606858d9677efc127ee736ed7c8e69`;
      const response = await axios.get(url);
      getWeatherInfo(response.data[0].lat, response.data[0].lon);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (event) => {
    setCityName(event.target.value);
  };
  const getWeatherInfoKey = async (event) => {
    if (event.key === 'Enter') {
      const city = cityName;
      getWeatherInfoCity(city);
    }
  };
  useEffect(() => {
    getWeatherInfoCity();
  }, []);
  return (
    <>
      <h2 className="search__Container">
        <input
          type="text"
          placeholder="write your region"
          value={cityName}
          onChange={handleSearch}
          onKeyDown={getWeatherInfoKey}
        />{' '}
      </h2>
    </>
  );
};

export default Search;
