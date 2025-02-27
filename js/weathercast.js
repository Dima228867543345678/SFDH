const API_KEY = "394c3b7678d143fcb381b5d01a69f97c";
const CITY = "Винница"; 

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=ru&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("city").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById("weather-humidity").textContent = `Влажность: ${data.main.humidity}%`;
    document.getElementById("weather-pressure").textContent = `Давление: ${data.main.pressure} hPa`;
    document.getElementById("weather-wind-speed").textContent = `Ветер: ${data.wind.speed} м/с`;
}

async function getWeatherForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&lang=ru&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    // Получаем прогноз на 3 дня (примерно каждые 24 часа)
    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(1, 4);

    dailyForecasts.forEach((forecast, i) => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString("ru-RU", { weekday: "long" });

        document.getElementById(`day${i + 1}-name`).textContent = dayName;
        document.getElementById(`day${i + 1}-icon`).src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
        document.getElementById(`day${i + 1}-temp`).textContent = `${Math.round(forecast.main.temp)}°C`;
        document.getElementById(`day${i + 1}-description`).textContent = forecast.weather[0].description;
    });
}

getWeather();
getWeatherForecast();

setInterval(getWeather, 360000);
setInterval(getWeatherForecast, 360000);
