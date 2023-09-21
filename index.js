// OpenWeather api  

const apiKey  = "6bfac698abf4e53ea343d32ddbdf632a"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=" 
 
const searchBox = document.querySelector('.search input'); 
const searchBtn = document.querySelector('.search button'); 
const weatherIcon = document.querySelector('.weather-icon'); 
const forecastDisplay = document.getElementById('forecast');
const body = document.body;
let useMetricUnits = true;


 
//weather forecast fetchweatherforecast
function fetchWeatherForecast(city) {
  const forecastData = [
    { date: "Tomorrow", temperature: 25, weather: "Sunny" },
    { date: "Day after tomorrow", temperature: 23, weather: "Partly Cloudy" },
    { date: "Two days later", temperature: 28, weather: "Rain" },
  ];

  forecastDisplay.innerHTML = "<h3>Weather Forecast:</h3>";
  forecastData.forEach((forecast) => {
    forecastDisplay.innerHTML += `<p>${forecast.date}: ${forecast.temperature}°${useMetricUnits ? "C" : "F"}, ${forecast.weather}</p>`;
  });
}
//function for changing changing background.
function setBackgroundBasedOnWeather(condition) {
  if (condition === "Rain") {
    body.style.backgroundImage = 'url("Rainy.webp")'; 
  } else if (condition === "Clear" || condition === "Sunny") {
    body.style.backgroundImage = 'url("Sunny.webp")'; 
  } else {
    
    body.style.backgroundImage = 'url("https://img.freepik.com/free-photo/earth-planet-sandy-beach_1160-281.jpg?w=740&t=st=1695126130~exp=1695126730~hmac=0483073a96c3ca58bbd1f66fc0af63707231951ffee05f48b7c142e01e7eb3c5")'; // Replace with your default background image URL or path
  }
}

// fetch data from the API  
async function checkWeather(city) { 
  try{
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`) 
  var data = await response.json() 
 
  document.querySelector('.weather').style.display = "flex" 
 
  // display data  
  document.querySelector('.city').innerHTML = data.name; 
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c"; 
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%"; 
  document.querySelector('.wind').innerHTML = data.wind.speed + "km/h"; 
 
  // change weather icon  
  if(data.weather[0].main == "Clouds"){ 
    weatherIcon.src = "./icons/clouds.png" 
  }else if(data.weather[0].main == "Rain"){ 
    weatherIcon.src = "./icons/rain.png" 
  }else if(data.weather[0].main == "Drizzle"){ 
    weatherIcon.src = "./icons/drizzle.png" 
  }else if(data.weather[0].main == "Mist"){ 
    weatherIcon.src = "./icons/mist.png" 
  } 
 
} catch(error){

}

}
 
searchBtn.addEventListener("click", () => { 
  const city = searchBox.value;
  checkWeather(city); 
  fetchWeatherForecast(city);
})
