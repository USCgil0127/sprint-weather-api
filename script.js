let data = {
  coord: {
    lon: -122.08,
    lat: 37.39,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 282.55,
    feels_like: 281.86,
    temp_min: 280.37,
    temp_max: 284.26,
    pressure: 1023,
    humidity: 100,
  },
  visibility: 16093,
  wind: {
    speed: 1.5,
    deg: 350,
  },
  clouds: {
    all: 1,
  },
  dt: 1560350645,
  sys: {
    type: 1,
    id: 5122,
    message: 0.0139,
    country: "US",
    sunrise: 1560343627,
    sunset: 1560396563,
  },
  timezone: -25200,
  id: 420006353,
  name: "Mountain View",
  cod: 200,
};

const APIkey = "c5913d4a1ab85a98c32ec66e074e9d9b";
// 대소문자에 민감하지 않다.
// let CITYname = "los angeles";

const container = document.querySelector(".container");
const city = document.querySelector(".city");
const weather = document.querySelector(".weather");
const description = document.querySelector(".description");
const celsius = document.querySelector(".celsius");
const fahrenheit = document.querySelector(".fahrenheit");

function renderWeatherData(json) {
  // TODO: 여기에 DOM을 이용하여 날씨 데이터를 표시하세요

  city.style.color = "white";
  weather.style.color = "white";
  description.style.color = "white";
  celsius.style.color = "white";
  fahrenheit.style.color = "white";
  city.textContent = `${json.name}, ${json.sys.country}`;
  weather.textContent = `${json.weather[0]["main"]}`;
  description.textContent = `${json.weather[0]["description"]}`;

  let c = (json.main.temp - 273.15).toFixed(2);
  let f = (json.main.temp * (9 / 5) - 459.67).toFixed(2);

  celsius.textContent = `${c} °C`;
  fahrenheit.textContent = `${f} °F`;

  let forecast = json.weather[0]["main"].toString().toLocaleLowerCase();

  if (forecast.indexOf("cloud") !== -1) {
    container.style.backgroundImage = "url('img/clouds.jpeg')";
  } else if (
    forecast.indexOf("clear") !== -1 ||
    forecast.indexOf("sunny") !== -1
  ) {
    container.style.backgroundImage = "url('img/clear.jpg')";
    city.style.color = "black";
    weather.style.color = "black";
    description.style.color = "black";
    celsius.style.color = "black";
    fahrenheit.style.color = "black";
  } else if (forecast.indexOf("rain") !== -1) {
    container.style.backgroundImage = "url('img/rain.jpg')";
    city.style.color = "black";
    weather.style.color = "black";
    description.style.color = "black";
    celsius.style.color = "black";
    fahrenheit.style.color = "black";
  } else if (
    forecast.indexOf("mist") !== -1 ||
    forecast.indexOf("fog") !== -1
  ) {
    container.style.backgroundImage = "url('img/smoke.jpg')";
    city.style.color = "black";
    weather.style.color = "black";
    description.style.color = "black";
    celsius.style.color = "black";
    fahrenheit.style.color = "black";
  } else if (forecast.indexOf("snow") !== -1) {
    container.style.backgroundImage = "url('img/snow.jpg')";
    city.style.color = "black";
    weather.style.color = "black";
    description.style.color = "black";
    celsius.style.color = "black";
    fahrenheit.style.color = "black";
  } else if (forecast.indexOf("windy") !== -1) {
    container.style.backgroundImage = "url('img/windy.jpeg')";
    city.style.color = "black";
    weather.style.color = "black";
    description.style.color = "black";
    celsius.style.color = "black";
    fahrenheit.style.color = "black";
  }
}

function getData(CITYname) {
  let API_URL_OpenWeatherMap = `http://api.openweathermap.org/data/2.5/weather?q=${CITYname}&appid=${APIkey}`;

  fetch(API_URL_OpenWeatherMap)
    .then(function (resp) {
      if (resp.status != 200) {
        city.textContent = "⚠해당 도시 이름을 찾지 못했습니다.";
        weather.textContent = "";
        description.textContent = "";
        celsius.textContent = "";
        fahrenheit.textContent = "";
        container.style.backgroundImage = "";
      } else {
        return resp.json();
      }
    })
    .then(function (json) {
      // TODO:
      // 요청이 완료되고 나면 여기서부터 날씨 데이터(json)를 사용할 수 있습니다.
      // 하드코딩된 data를 대체하세요.

      renderWeatherData(json);
    });
}

let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let text = document.querySelector("form input[type='text']");

  if (!text.value.trim().length) {
    city.style.color = "red";
    city.textContent = "⚠빈 칸을 채워주세요.";
    container.style.backgroundImage = "";
    weather.textContent = "";
    description.textContent = "";
    celsius.textContent = "";
    fahrenheit.textContent = "";

    text.value = "";
    return;
  }

  CITYname = text.value;

  getData(CITYname);
});

// console.log("도시 이름은", CITYname);
