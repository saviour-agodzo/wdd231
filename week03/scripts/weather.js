import { openWeatherMapKey } from "./config.js";

// Trier, Germany: latitude 49.75, longitude 6.64.

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const weatherError = document.querySelector("#weather-error");

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;

    const iconSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute("src", iconSrc);
    weatherIcon.setAttribute("alt", desc);
    weatherIcon.hidden = false;

    captionDesc.textContent = desc;
}

async function apiFetch() {
    if (!openWeatherMapKey) {
        currentTemp.textContent = "unavailable";
        weatherError.textContent =
            "Add your OpenWeatherMap API key in scripts/config.js.";
        return;
    }

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=${openWeatherMapKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        console.log(data);
        displayResults(data);

    } catch (error) {
        console.error("Unable to load weather data:", error);

        currentTemp.textContent = "unavailable";

        weatherError.textContent =
            "Weather data could not be loaded. Check the browser console and API key.";
    }
}

apiFetch();