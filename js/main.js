// current date
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let min = date.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  let formattedDate = `${currentDay} ${hours}:${min}`;
  return formattedDate;
}
let date = document.querySelector("#date");
let currentDate = new Date();
date.innerHTML = `${formatDate(currentDate)}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

// future date

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.daily;

  // let forecastHTML = `<div class="row">`;
  // forecast.forEach(function (forecastDay) {
  //   forecastHTML =
  //     forecastHTML +
  //     `<div class="row weather-forecast">
  //           <div class="col-2 weather-forecast-date">${forecastDay.time}</div>
  //           <div class="col-2 weather-forecast-icon">
  //             <img src="${forecastDay.condition.icon_url}" alt="${
  //       forecastDay.condition.icon
  //     }" />
  //           </div>
  //           <div class="col-2 weather-forecast-temperatures">
  //              <span class="weather-forecast-temperature-min">${Math.round(
  //                forecastDay.temperature.minimum
  //              )}° </span>
  //             Low
  //           </div>
  //           <div class="col-2 weather-forecast-temperatures">
  //             <span class="weather-forecast-temperature-max">${Math.round(
  //               forecastDay.temperature.maximum
  //             )}° </span>
  //             High
  //           </div>
  //           <div class="col-2 weather-forecast-wind">
  //             <span class="weather-forecast-wind-speed">${Math.round(
  //               forecastDay.wind.speed
  //             )} mph</span>
  //             Wind
  //           </div>
  //           <div class="col-2 weather-forecast-humidity">
  //             <span class="weather-forecast-wind-speed">${Math.round(
  //               forecastDay.temperature.humidity
  //             )} %</span>
  //             Humidity
  //           </div>
  //         </div>`;
  // });

  let forecastHTML = `<div class="row">
  <div class="card-group">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2 card">
      <div class="card-body">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="${forecastDay.condition.icon_url}" alt="${
          forecastDay.condition.icon
        }" />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div> </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d9t043ad52b8b244o406f3dd62ad1c0c";
  let units = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

// search
function searchCity(city) {
  let apiKey = "d9t043ad52b8b244o406f3dd62ad1c0c";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// current location

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "d9t043ad52b8b244o406f3dd62ad1c0c";
  let units = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", getCurrentLocation);

// weather
function displayCurrentWeather(response) {
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let temperatureElement = document.querySelector("#temperature");
  let tempFeelsLikeElement = document.querySelector("#feels-like-temp");
  let pressureElement = document.querySelector("#pressure");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  // displayForecast();

  celsiusTemperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  tempFeelsLikeElement.innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  pressureElement.innerHTML = response.data.temperature.pressure;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

// temperature;

function convertToFahrenheit(event) {
  event.preventDefault();
  changeToCelsius.classList.remove("active");
  changeToFahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let temperature = celsiusTemperature;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  changeToFahrenheit.classList.remove("active");
  changeToCelsius.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let changeToFahrenheit = document.querySelector("#fahrenheit-link");
changeToFahrenheit.addEventListener("click", convertToFahrenheit);

let changeToCelsius = document.querySelector("#celsius-link");
changeToCelsius.addEventListener("click", convertToCelsius);

searchCity("Katowice");
