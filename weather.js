const weather = document.querySelector(".js-weather"),
    adress = document.querySelector(".js-adress");

const ADRESS_API_KEY = '4ef1257f7d0ad8948de3bb5fec5617a5',
    WEATHER_API_KEY = '284ec2b148a72a61795ba16c7a6f7fbb',
    COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    )
    .then(function(response) {return response.json();})
    .then(function(json){
        const temp = json.main.temp.toFixed(1);
        const icon = json.weather[0].icon;
        weather.innerHTML = `<img width="25px" height="25px" src="https://openweathermap.org/img/wn/${icon}.png" /> ${temp}℃`;
    });
}

function getAdress(lat, lng){
    console.log(lat, lng);
    fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`, {
        method: 'GET',
        headers: {Authorization: `KakaoAK ${ADRESS_API_KEY}`}
    })
    .then(function(response){return response.json();})
    .then(function(json){
        const adress1 = json.documents[0].address.region_2depth_name;
        const adress2 = json.documents[0].address.region_3depth_name;
        console.log(adress1, adress2);
        adress.innerHTML = `@ ${adress1} ${adress2}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    }
    saveCoords(coordsObj);
    getAdress(coordsObj.latitude, coordsObj.longitude);
    getWeather(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError(){
    console.log('위치 정보 없음');
};

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);

}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getAdress(parseCoords.latitude, parseCoords.longitude);
        getWeather(parseCoords.latitude, parseCoords.longitude);    
    }
}

function init(){
    loadCoords();
}

init();