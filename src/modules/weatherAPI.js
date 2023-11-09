async function checkWeather(
  city,
  apiRequest = { type: "forecast", days: 3, time: null }
) {
  const key = "df46036af5b941feb4e31428231910";
  const baseURL = "https://api.weatherapi.com/v1/";
  let { type, days, time } = apiRequest;
  const api = "forecast.json";

  try {
    const weatherData = await getResponse(api, days);

    return getForecastWeather(weatherData, time);
  } catch (error) {
    console.error("Error fetching weather data");
    return null;
  }

  function getForecastWeather(data, time = "") {
    console.log(data);
    const {
      avgtemp_f,
      mintemp_f,
      maxtemp_f,
      avghumidity,
      daily_will_it_rain: chanceOfRain,
      date,
    } = data.forecast.forecastday[days - 1].day;

    const { daily_will_it_rain: chanceOfRainToday } =
      data.forecast.forecastday[0].day;

    const {
      temp_f: temperature,
      feelslike_f: feelsLike,
      humidity,
      condition,
      // time: timeStamp,
      wind_mph,
    } = data.current;

    const { localtime, country, name, region } = data.location;

    return {
      temperature,
      feelsLike,
      humidity,
      condition,
      wind_mph,
      localtime,
      chanceOfRain,
      chanceOfRainToday,
      date,
    };
  }

  async function getResponse(api, days) {
    const weatherURL = `${baseURL}${api}?key=${key}&q=${city}&days=${days}&aqi=no`;

    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for ${city}`);
    }
    const data = await response.json();

    return data;
  }
}

export default checkWeather;
