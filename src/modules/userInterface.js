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

  function validateInputs() {}

  function submitForm() {
    if (validateForm(weatherForm)) {
      const location = document.querySelector("#location").value;
      const days = document.querySelector("#days").value;
      const time = document.querySelector("#hours").value;
      console.log(location, days, time, type);

      checkWeather(location, { type: type, days: days, time: time });
    }
  }

  weatherForm.addEventListener("click", function (e) {
    // e.preventDefault();
    checkRadioButton();
  });

  weatherFormBtn.addEventListener("click", function (e) {
    e.preventDefault();
    submitForm();
  });

  // checkWeather("Los angeles", { type: "forecast", days: 3, time: 0 });
}

export default loadUserInterface;
