const inputCity = document.getElementById("city");

const API = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
  defaultParams: "q=#CITY#&units=#METRIC#&appid=#API_KEY#", //Placeholders (#Placeholder#) will be replaced with actual values
  unit: "metric", // this returns temperature in celsius
  token: "",
  tempUnit: "&deg;C",
};

inputCity.addEventListener("keypress", getWeatherInfo);

function getWeatherInfo(evnt) {
  if (evnt.keyCode == 13) {
    getWeatherInfomation(inputCity.value);
    inputCity.value = "";
  }
}

function getWeatherInfomation(cityName) {
  let api = `${API.baseUrl}${API.defaultParams
    .replace("#CITY#", cityName.trim())
    .replace("#METRIC#", API.unit)
    .replace("#API_KEY#", API.token)}`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherInfo(data);
    })
    .catch((error) => {
      alert("Something went wrong!!!");
      //getWeatherInfomation("Pune");  //Load default page...
    });
}

function displayWeatherInfo(weatherInfo) {
  const location = document.getElementById("location");
  const currTimestamp = document.getElementById("curr_timestamp");
  const temperature = document.getElementById("temperature");
  const weather = document.getElementById("weather");
  const highLowTemp = document.getElementById("high-low-temp");
  const unitString = ` <span>${API.tempUnit}</span>`;

  location.innerText = weatherInfo.name + ", " + weatherInfo.sys.country;

  currTimestamp.innerText = new Date(
    parseInt(weatherInfo.dt) * 1000
  ).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    weekday: "long",
  });

  temperature.innerHTML = `${weatherInfo.main.temp} ${unitString}`;
  weather.innerText = weatherInfo.weather[0].main;
  highLowTemp.innerHTML = `${weatherInfo.main.temp_max}
     ${unitString} / 
    ${weatherInfo.main.temp_min}
     ${unitString}`;
}

window.onload = getWeatherInfomation("Pune");
