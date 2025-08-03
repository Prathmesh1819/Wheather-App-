  const apiKey = "c57ede440a71c588c875166741b535b7"; // <-- Replace this with your OpenWeatherMap API key
  const cities = ["London", "New York", "Tokyo", "Paris", "Chicago", "Sydney"];

  // Fetch weather and update the main card
  async function getWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();

      // Update main card
      document.getElementById("temp").innerText = `${data.main.temp}°C`;
      document.getElementById("temp_min").innerText = `${data.main.temp_min}°C`;
      document.getElementById("temp_max").innerText = `${data.main.temp_max}°C`;
      document.getElementById("wind").innerText = `${data.wind.speed} m/s`;
      document.getElementById("sunrise").innerText = `${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
      document.getElementById("sunset").innerText = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}
      `;
      document.getElementById("cityname").innerText = city;

    } catch (error) {
      alert("Error: " + error.message);
    }
  }

  // Create and update weather table
  async function populateWeatherTable() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = ""; // Clear previous rows

    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        const row = document.createElement("tr");
        row.innerHTML = `
          
          <td>${city}</td>
          <td>${data.main.temp}°C</td>
          <td>${data.wind.speed} m/s</td>
          <td>${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</td>
          <td>${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</td>

        `;
        tableBody.appendChild(row);
      } catch (error) {
        console.error("Failed to fetch for city:", city, error);
      }
    }
  }

  // Handle form search
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const cityInput = document.querySelector(".city_name").value.trim();
    if (cityInput) {
      getWeather(cityInput);
    }
  });

  // Load default weather and table
  window.onload = () => {
    getWeather("New Delhi");
    populateWeatherTable();
  };
