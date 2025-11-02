import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Statistics.css';

const API_URL = process.env.REACT_APP_API_URL;

function Statistics({ city }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/stats/${city}?days=${days}`);
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, [city, days]);

  if (loading && !stats) {
    return (
      <div className="card loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!stats || !stats.statistics || stats.statistics.total_records === '0') {
    return (
      <div className="card">
        <h2>Statistics</h2>
        <p>No statistical data available yet for {city}. Start collecting weather data first.</p>
      </div>
    );
  }

  const { statistics, conditions } = stats;

  return (
    <div className="statistics">
      <div className="card">
        <h2>Statistics for {city}</h2>
        
        <div className="period-selector">
          <label>Time Period:</label>
          <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
            <option value={1}>Last 24 hours</option>
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-label">Total Records</div>
            <div className="stat-value">{statistics.total_records}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🌡️</div>
            <div className="stat-label">Average Temperature</div>
            <div className="stat-value">{parseFloat(statistics.avg_temp).toFixed(1)}°C</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❄️</div>
            <div className="stat-label">Min Temperature</div>
            <div className="stat-value">{parseFloat(statistics.min_temp).toFixed(1)}°C</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔥</div>
            <div className="stat-label">Max Temperature</div>
            <div className="stat-value">{parseFloat(statistics.max_temp).toFixed(1)}°C</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💧</div>
            <div className="stat-label">Average Humidity</div>
            <div className="stat-value">{parseFloat(statistics.avg_humidity).toFixed(0)}%</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">💨</div>
            <div className="stat-label">Average Wind Speed</div>
            <div className="stat-value">{parseFloat(statistics.avg_wind_speed).toFixed(1)} m/s</div>
          </div>
        </div>
      </div>

      {conditions && conditions.length > 0 && (
        <div className="card">
          <h3>Weather Conditions Distribution</h3>
          <div className="conditions-list">
            {conditions.map((condition, index) => (
              <div key={index} className="condition-item">
                <span className="condition-name">{condition.weather_main}</span>
                <div className="condition-bar-container">
                  <div 
                    className="condition-bar" 
                    style={{ width: `${condition.percentage}%` }}
                  ></div>
                </div>
                <span className="condition-percentage">{condition.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
