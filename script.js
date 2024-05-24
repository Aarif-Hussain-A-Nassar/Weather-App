document.getElementById("location-input").addEventListener('change', async () => {
    const location = document.getElementById("location-input").value;
    console.log("Location entered:", location);

    if (location.trim() === "") {
        console.error("No location entered.");
        displayWeatherData({});
        return;
    }

    // Fetch the weather data
    const weatherData = await getWeatherData(location);
    
    // Display the weather data on page
    displayWeatherData(weatherData);
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }

    const apiKey = '91355c563462d369dfd604f5ae945ef4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`; // Encode the location to handle spaces and special characters

    try {
        console.log("Fetching data from URL:", url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Data received from API:", data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return {};
    }
}

function getBackgroundColor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter a location to see the weather";
    } else {
        const backgroundColor = getBackgroundColor(data.main.temp);
        weatherDataElement.style.backgroundColor = backgroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humididty: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
}

window.onload = () => {
    const weatherDataElement = document.getElementById("weather-data");
    weatherDataElement.innerHTML = "Please enter a location to see the weather";
}
