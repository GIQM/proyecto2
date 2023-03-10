export const kelvinToCelsius = (temp) => {
  return (temp - 273.15).toFixed(2);
};
export const celsiusToFahrenheit = (temp) => {
  return ((temp * 9) / 5 + 32).toFixed(2);
};
