const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../database/db');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Get current weather and save to database
router.get('/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    
    // Call OpenWeather API
    const response = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric' // Use Celsius
      }
    });

    const weatherData = response.data;
    
    // Insert data to database
    const result = await db.query(
      `INSERT INTO weather_data 
       (city, temperature, feels_like, humidity, pressure, weather_main, 
        weather_description, wind_speed, timestamp) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) 
       RETURNING *`,
      [
        weatherData.name,
        weatherData.main.temp,
        weatherData.main.feels_like,
        weatherData.main.humidity,
        weatherData.main.pressure,
        weatherData.weather[0].main,
        weatherData.weather[0].description,
        weatherData.wind.speed
      ]
    );

    // Send response to frontend
    res.json({
      success: true,
      data: {
        city: weatherData.name,
        temperature: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        weather: weatherData.weather[0].main,
        description: weatherData.weather[0].description,
        windSpeed: weatherData.wind.speed,
        timestamp: result.rows[0].timestamp
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.response?.data?.message || error.message
    });
  }
});

// Get historical weather data for a city
router.get('/history/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const limit = parseInt(req.query.limit) || 50;
    
    const result = await db.query(
      `SELECT * FROM weather_data 
       WHERE LOWER(city) = LOWER($1) 
       ORDER BY timestamp DESC 
       LIMIT $2`,
      [city, limit]
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

// Analyze weather patterns
router.post('/analyze', async (req, res) => {
  try {
    const { city, days = 7 } = req.body;
    
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_records,
        AVG(temperature) as avg_temp,
        MIN(temperature) as min_temp,
        MAX(temperature) as max_temp,
        AVG(humidity) as avg_humidity,
        AVG(wind_speed) as avg_wind_speed
       FROM weather_data 
       WHERE LOWER(city) = LOWER($1) 
       AND timestamp > NOW() - INTERVAL '${days} days'`,
      [city]
    );

    res.json({
      success: true,
      analysis: {
        city,
        period_days: days,
        ...result.rows[0]
      }
    });
  } catch (error) {
    console.error('Error analyzing data:', error);
    res.status(500).json({ error: 'Failed to analyze weather data' });
  }
});

// Get all cities with data
router.get('/cities', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT DISTINCT city, MAX(timestamp) as last_updated 
       FROM weather_data 
       GROUP BY city 
       ORDER BY last_updated DESC`
    );

    res.json({
      success: true,
      cities: result.rows
    });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

module.exports = router;
