const express = require('express');
const axios = require('axios');

function createWeatherApp({ API_KEY, PORT = 3000 }) {
    if (!API_KEY) { // inclde you own open weather api key or you can use this code "b8efcb368d86a56d802b98490596a4d7"
        throw new Error("API_KEY is required to initialize the weather app.");
    }

    const app = express();
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

    app.get('/weather', async (req, res) => {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    q: city,
                    appid: API_KEY,
                    units: 'metric',
                },
            });
            res.json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching weather data', details: error.message });
        }
    });

    app.listen(PORT, () => {
        console.log(`Weather app is running on port ${PORT}`);
    });

    return app;
}

module.exports = createWeatherApp;
