const weatherDiv = document.querySelector("#weather");
const API_KEY = "284ec2b148a72a61795ba16c7a6f7fbb";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      weather.innerHTML = `<img width="50px" height="50px" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /> ${data.weather[0].main} / ${data.main.temp}℃ / ${data.name}`;
    });
}
function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
