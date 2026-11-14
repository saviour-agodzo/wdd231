import { openWeatherMapKey } from "./config.js";

const weatherCity = "Accra";
const weatherCountry = "GH";

const weatherStatus = document.querySelector("#weather-status");
const currentTemperature = document.querySelector("#current-temperature");
const currentDescription = document.querySelector("#current-description");
const feelsLike = document.querySelector("#feels-like");
const forecastList = document.querySelector("#weather-forecast");

function localDateKey(unixSeconds, timezoneOffset) {
    return new Date((unixSeconds + timezoneOffset) * 1000)
        .toISOString()
        .slice(0, 10);
}

function displayDate(dateKey) {
    return new Intl.DateTimeFormat("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone: "UTC"
    }).format(new Date(`${dateKey}T12:00:00Z`));
}

function renderForecast(forecast) {
    const today = localDateKey(
        Date.now() / 1000,
        forecast.city.timezone
    );

    const byDay = new Map();

    forecast.list.forEach((entry) => {
        const dateKey = localDateKey(
            entry.dt,
            forecast.city.timezone
        );

        if (dateKey <= today) return;

        if (!byDay.has(dateKey)) {
            byDay.set(dateKey, []);
        }

        byDay.get(dateKey).push(entry);
    });

    const upcomingDays = [...byDay.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(0, 3);

    forecastList.replaceChildren(
        ...upcomingDays.map(([dateKey, entries]) => {
            const day = document.createElement("li");
            day.className = "forecast-day";

            const date = document.createElement("h4");
            date.textContent = displayDate(dateKey);

            const high = Math.round(
                Math.max(...entries.map((entry) => entry.main.temp_max))
            );

            const temperature = document.createElement("p");
            temperature.className = "forecast-temperature";
            temperature.textContent = `High ${high}°C`;

            const description = document.createElement("p");
            description.textContent =
                entries[Math.floor(entries.length / 2)].weather[0].description;

            day.append(date, temperature, description);

            return day;
        })
    );

    if (upcomingDays.length < 3) {
        throw new Error(
            "The forecast response did not include three upcoming days."
        );
    }
}

async function loadWeather() {
    if (!openWeatherMapKey) {
        weatherStatus.textContent =
            "Add your OpenWeatherMap API key in scripts/config.js to load live weather.";
        return;
    }

    const location = encodeURIComponent(
        `${weatherCity},${weatherCountry}`
    );

    const currentUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${openWeatherMapKey}`;

    const forecastUrl =
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${openWeatherMapKey}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error(
                "OpenWeatherMap could not return data for this location and API key."
            );
        }

        const [current, forecast] = await Promise.all([
            currentResponse.json(),
            forecastResponse.json()
        ]);

        currentTemperature.textContent = Math.round(current.main.temp);
        currentDescription.textContent = current.weather[0].description;
        feelsLike.textContent = Math.round(current.main.feels_like);

        renderForecast(forecast);

        weatherStatus.textContent =
            `Current conditions for ${current.name}`;

    } catch (error) {
        weatherStatus.textContent =
            "Weather data is unavailable. Check the API key and chamber location in scripts/weather.js.";

        console.error(error);
    }
}

loadWeather();