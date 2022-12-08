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

// future date


// search
function searchCity(city) {
  let apiKey = "ae16b4b3b8afca925a6accea9663928a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
  let apiKey = "ae16b4b3b8afca925a6accea9663928a";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayCurrentWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationBtn = document.querySelector("#current-location");
currentLocationBtn.addEventListener("click", getCurrentLocation);

searchCity("Katowice");

// weather
function displayCurrentWeather(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  console.log(response);
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  // let icon = document.querySelector("#icon");
  // icon.setAttribute(
  //   "img",
  //   `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  // );
  // icon.setAttribute("alt", response.data.weather[0].description);
}

// temperature;
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let changeToFahrenheit = document.querySelector("#fahrenheit-link");
changeToFahrenheit.addEventListener("click", convertToFahrenheit);

let changeToCelsius = document.querySelector("#celsius-link");
changeToCelsius.addEventListener("click", convertToCelsius);
