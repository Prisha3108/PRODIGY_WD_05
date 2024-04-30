function getWeather() {
    var locationInput = document.getElementById('locationInput').value;
    var apiKey = '56c9de57e28660004230b4f2756a84c9'; // Replace 'YOUR_API_KEY' with your actual API key
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                document.getElementById('weather-data').innerHTML = 'Location not found';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    weatherDataDiv.innerHTML = ''; // Clear previous content

    // Create card container
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    // City and country card
    const cityCard = createCard(`${data.name}, ${data.sys.country}`);
    cardContainer.appendChild(cityCard);

    // Weather description card
    const weatherDescCard = createCard(`Weather: ${data.weather[0].description}`);
    cardContainer.appendChild(weatherDescCard);

    // Temperature card
    const tempCard = createCard(`Temperature: ${data.main.temp}°C`);
    cardContainer.appendChild(tempCard);

    // Humidity card
    const humidityCard = createCard(`Humidity: ${data.main.humidity}%`);
    cardContainer.appendChild(humidityCard);

    // Wind speed card
    const windSpeedCard = createCard(`Wind Speed: ${data.wind.speed} m/s`);
    cardContainer.appendChild(windSpeedCard);

    // Append card container to weather data div
    weatherDataDiv.appendChild(cardContainer);
}

function createCard(textContent) {
    // Create card element
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'text-body');

    // Create card body element
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Add text content to card body
    const cardText = document.createElement('p');
    cardText.textContent = textContent;
    cardBody.appendChild(cardText);

    // Append card body to card
    cardDiv.appendChild(cardBody);

    return cardDiv;
}
