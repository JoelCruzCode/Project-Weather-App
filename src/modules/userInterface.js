import checkWeather from "./weatherAPI";
import { toggleDisplay, validateForm } from "./functions";
function loadUserInterface() {
  let content = document.querySelector("#content");
  let heading = document.querySelector("#greeting");
  // heading.textContent = "Hello Webpack";
  // let p = document.createElement("p");
  // p.textContent = "is this on?";
  // content.appendChild(p);
  let type;
  const weatherForm = document.querySelector(".weather-form");
  const currentRadioBtn = document.querySelector("#current-api");
  const forecastRadioBtn = document.querySelector("#forecast-api");
  const weatherFormBtn = document.querySelector(".weather-form-btn");
  const daysElements = document.querySelectorAll(".days");
  const hoursElements = document.querySelectorAll(".hours");
  //

  const condition = document.querySelector(".condition");
  const location = document.querySelector(".location");
  const timeDiv = document.querySelector(".time");
  const temperature = document.querySelector(".temperature");
  //
  const feelsLike = document.querySelector(".feelsLike");
  const humidity = document.querySelector(".humidity");
  const chanceOfRain = document.querySelector(".chance-of-rain");
  const windSpeed = document.querySelector(".wind-speed");

  function checkRadioButton() {
    const radioElements = [...daysElements, ...hoursElements];
    if (currentRadioBtn.checked) {
      radioElements.forEach((element) => element.classList.add("hidden"));
      type = currentRadioBtn.value;
    } else if (forecastRadioBtn.checked) {
      radioElements.forEach((element) => element.classList.remove("hidden"));
      type = forecastRadioBtn.value;
    }
  }

  async function submitForm() {
    if (validateForm(weatherForm)) {
      const location = document.querySelector("#location").value;
      const days = document.querySelector("#days").value;
      const time = document.querySelector("#hours").value;
      console.log(location, days, time, type);

      const weatherData = await checkWeather(location, {
        type: type,
        days: days,
        time: time,
      });

      console.log("weatherData: ", weatherData);
      return weatherData;
    }
  }

  function displayWeather(data) {
    console.log("data: ", data);
    console.log(data.temperature);
    condition.textContent = data.condition.text;
    feelsLike.textContent = data.feelsLike;
    humidity.textContent = data.humidity;
    temperature.textContent = data.temperature;
    windSpeed.textContent = data.wind_mph;
    chanceOfRain.textContent = data.chanceOfRainToday;
    location.textContent = data.localtime;
  }

  weatherForm.addEventListener("click", function () {
    checkRadioButton();
  });

  weatherFormBtn.addEventListener("click", async function (e) {
    e.preventDefault();
    let data = await submitForm();
    displayWeather(data);
  });

  weatherForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // displayWeather(weatherData);
  });
}

export default loadUserInterface;
