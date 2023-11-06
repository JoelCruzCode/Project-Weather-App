async function checkWeather(
  city,
  apiRequest = { type: "current", days: 1, time: null }
) {
  const key = "df46036af5b941feb4e31428231910";
  const baseURL = "https://api.weatherapi.com/v1/";
  let { type, days, time } = apiRequest;
  let api;

  if (type === "current") {
    api = "current.json";
  } else if (type === "forecast") {
    api = "forecast.json";
  } else {
    throw new Error("Invalid ApiRequest Value");
  }

  try {
    const weatherData = await getResponse(api, days);
    if (type === "current") {
      getCurrentWeather(weatherData);
    } else {
      getForecastWeather(weatherData, time);
    }
  } catch (error) {
    console.error("Error fetching weather data");
    return null;
  }

  function getCurrentWeather(data) {
    const {
      temp_f: temperature,
      feelsLike_f: feelsLike,
      humidity,
      condition,
    } = data.current;

    console.log(data);
    console.log(
      `The current temperature is ${temperature}°F with a humidity of ${humidity}%`
    );

    return { temperature, feelsLike, humidity, condition };
  }

  function getForecastWeather(data, time = "") {
    const { avgtemp_f, mintemp_f, maxtemp_f, avghumidity } =
      data.forecast.forecastday[days - 1].day;
    if (time !== "") {
      console.log(data.forecast.forecastday[days - 1].hour[time], "time?");
      const {
        temp_f,
        feelslike_f,
        humidity,
        condition,
        time: timeStamp,
      } = data.forecast.forecastday[days - 1].hour[time];
      console.log(temp_f);
      console.log(
        `The temperature for ${timeStamp} is ${temp_f} but feels like ${feelslike_f}°F  with a humidity of ${humidity}%. Conditions are ${condition.text}`
      );
    }
    console.log(data);
    console.log(
      `Average temperature: ${avgtemp_f}°F, Min temperature: ${mintemp_f}°F, Max temperature: ${maxtemp_f}°F, Average humidity: ${avghumidity}%`
    );
  }

  async function getResponse(api, days) {
    let weatherURL;
    if (type === "current") {
      weatherURL = `${baseURL}${api}?key=${key}&q=${city}&aqi=no`;
    } else if (type === "forecast") {
      weatherURL = `${baseURL}${api}?key=${key}&q=${city}&days=${days}&aqi=no`;
    }

    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for ${city}`);
    }
    const weatherData = await response.json();

    return weatherData;
  }
}

export default checkWeather;

// create condidtion inside of a universal get weather to check if days object is inside?
// trying to dry out code
