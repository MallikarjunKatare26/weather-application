const key = "c1f36c95697c0562f029d71ce8cb4e56";

// Function to get weather forecast
const getForecast = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/forecast";
  const query = `?q=${city}&units=metric&appid=${key}`;

  const response = await fetch(base + query);
  if (!response.ok) {
    throw new Error("Status Code : " + response.status);
  }

  const data = await response.json();
  return data;
};

// Function to display weather data
const displayWeather = (data) => {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = ""; // Clear previous data

  const days = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  days.slice(0, 5).forEach(day => {  // Display today and next 4 days
    const card = document.createElement("div");
    card.classList.add("weather-card");

    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

    // Icon based on weather status
    let weatherIcon = "";
    const weatherStatus = day.weather[0].main.toLowerCase();

    if (weatherStatus === "clear") {
      weatherIcon = "<i class='fas fa-sun'></i>";
    } else if (weatherStatus === "rain") {
      weatherIcon = "<i class='fas fa-cloud-showers-heavy'></i>";
    } else if (weatherStatus === "clouds") {
      weatherIcon = "<i class='fas fa-cloud'></i>";
    } else {
      weatherIcon = "<i class='fas fa-smog'></i>";
    }

    card.innerHTML = `
                <h3>${dayName}</h3>
                <p>${weatherIcon} ${day.weather[0].description}</p>
                <p><i class="fas fa-thermometer-half icon"></i> Temp: ${day.main.temp}°C</p>
                <p><i class="fas fa-tint icon"></i> Humidity: ${day.main.humidity}%</p>
                <p><i class="fas fa-wind icon"></i> Wind: ${day.wind.speed} m/s</p>
                <p><i class="fas fa-arrow-alt-circle-right icon"></i> Direction: ${day.wind.deg}°</p>
            `;
    weatherInfo.appendChild(card);
  });
};

// Event listener for the button
document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name!");

  try {
    const data = await getForecast(city);
    displayWeather(data);
  } catch (error) {
    alert("Error fetching data: " + error.message);
  }
});

// Dynamically update the year in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();