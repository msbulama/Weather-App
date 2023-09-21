// OpenWeather api  

const apiKey  = "6bfac698abf4e53ea343d32ddbdf632a"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=" 
 
const searchBox = document.querySelector('.search input'); 
const searchBtn = document.querySelector('.search button'); 
const weatherIcon = document.querySelector('.weather-icon'); 
const loadingIndicator = document.getElementById('loadingIndicator');
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

// fetch data from the API  
async function checkWeather(city) { 
  try{
  loadingIndicator.style.display = 'block';
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`) 
  var data = await response.json() 
  loadingIndicator.style.display = 'none';
  document.querySelector('.weather').style.display = "flex" 
 
  // display data  
  document.querySelector('.city').innerHTML = data.name; 
  document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°c"; 
  document.querySelector('.humidity').innerHTML = data.main.humidity + "%"; 
  document.querySelector('.wind').innerHTML = data.wind.speed + "km/h"; 
 
  // change weather icon  
  if(data.weather[0].main == "Clouds"){ 
    weatherIcon.src = "./icons/clouds.png"
    body.style.backgroundImage = 'url("Sunny.webp")';
     
  }else if(data.weather[0].main == "Rain"){ 
    weatherIcon.src = "./icons/rain.png" 
    body.style.backgroundImage = 'url("Rain.jpg")';
  }else if(data.weather[0].main == "Drizzle"){ 
    weatherIcon.src = "./icons/drizzle.png"
    body.style.backgroundImage = 'url("Rain.jpg")' 
  }else if(data.weather[0].main == "Mist"){ 
    weatherIcon.src = "./icons/mist.png"
    body.style.backgroundImage = 'url("Rainy.webp")';
  }


 
} catch(error){

}

}
 
searchBtn.addEventListener("click", () => { 
  const city = searchBox.value;
  checkWeather(city); 
  fetchWeatherForecast(city);
  
})
