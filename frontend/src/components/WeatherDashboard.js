import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TemperatureChart from './TemperatureChart';
import './WeatherDashboard.css';

const API_URL = process.env.REACT_APP_API_URL;

function WeatherDashboard({ city }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/api/weather/current/${city}`);
      setCurrentWeather(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      console.error('Error fetching current weather:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/weather/history/${city}`);
      setHistory(response.data.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
    fetchHistory();
    
    // Refresh every 5 minutes
    const interval = setInterval(() => {
      fetchCurrentWeather();
      fetchHistory();
    }, 300000);

    return () => clearInterval(interval);
  }, [city]);

  if (loading && !currentWeather) {
    return (
      <div className="card loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="weather-dashboard">
      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {currentWeather && (
        <div className="current-weather card">
          <h2>Current Weather in {currentWeather.city}</h2>
          <div className="weather-grid">
            <div className="weather-item main">
              <div className="temperature">{currentWeather.temperature.toFixed(1)}°C</div>
              <div className="weather-desc">{currentWeather.description}</div>
              <div className="feels-like">Feels like: {currentWeather.feelsLike.toFixed(1)}°C</div>
            </div>
            
            <div className="weather-details">
              <div className="detail-item">
                <span className="label">💧 Humidity</span>
                <span className="value">{currentWeather.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="label">🌡️ Pressure</span>
                <span className="value">{currentWeather.pressure} hPa</span>
              </div>
              <div className="detail-item">
                <span className="label">💨 Wind Speed</span>
                <span className="value">{currentWeather.windSpeed} m/s</span>
              </div>
              <div className="detail-item">
                <span className="label">🕐 Updated</span>
                <span className="value">{new Date(currentWeather.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <button onClick={fetchCurrentWeather} disabled={loading} className="refresh-btn">
            {loading ? 'Refreshing...' : '🔄 Refresh Data'}
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-chart card">
          <h3>Temperature History ({history.length} records)</h3>
          <TemperatureChart data={history} />
        </div>
      )}

      {history.length === 0 && !loading && (
        <div className="card">
          <p>No historical data available for {city}. Fetch current weather to start collecting data.</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
