// const {
//   celsiusToFahrenheit,
//   fahrenheitTocelsius,
// } = require("../build/Release/converter.node");

// export const convertCelsiusToFahrenheit = (celsius) => {
//   return celsiusToFahrenheit(celsius);
// };

// export const convertFahrenheitTocelsius = (fahrenheit) => {
//   return fahrenheitTocelsius(fahrenheit);
// };
function convertCelsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function convertFahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function convertCelsiusToKelvin(celsius) {
  return celsius + 273.15;
}

function convertKelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

function convertTemperature(temperature, fromUnit, toUnit) {
  switch (fromUnit) {
    case "celsius":
      switch (toUnit) {
        case "celsius":
          return temperature;
        case "fahrenheit":
          return convertCelsiusToFahrenheit(temperature);
        case "kelvin":
          return convertCelsiusToKelvin(temperature);
        default:
          throw new Error(`Invalid unit: ${toUnit}`);
      }
    case "fahrenheit":
      switch (toUnit) {
        case "fahrenheit":
          return temperature;
        case "celsius":
          return convertFahrenheitToCelsius(temperature);
        case "kelvin":
          const celsius = convertFahrenheitToCelsius(temperature);
          return convertCelsiusToKelvin(celsius);
        default:
          throw new Error(`Invalid unit: ${toUnit}`);
      }
    case "kelvin":
      switch (toUnit) {
        case "kelvin":
          return temperature;
        case "celsius":
          return convertKelvinToCelsius(temperature);
        case "fahrenheit":
          const celsius = convertKelvinToCelsius(temperature);
          return convertCelsiusToFahrenheit(celsius);
        default:
          throw new Error(`Invalid unit: ${toUnit}`);
      }
    default:
      throw new Error(`Invalid unit: ${fromUnit}`);
  }
}

export { convertTemperature };
