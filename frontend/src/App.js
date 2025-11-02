import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDashboard from './components/WeatherDashboard';
import CitySelector from './components/CitySelector';
import Statistics from './components/Statistics';

function App() {
  const [selectedCity, setSelectedCity] = useState('Helsinki');
  const [apiStatus, setApiStatus] = useState('checking...');

  useEffect(() => {
    // Check if backend API is working
    const checkApi = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/health`);
        if (response.ok) {
          setApiStatus('connected');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        setApiStatus('disconnected');
      }
    };

    checkApi();
    // Check API status every 30 seconds
    const interval = setInterval(checkApi, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Weather Data Analysis Pipeline</h1>
        <p className="subtitle">Cloud Computing Assignment</p>
        <div className={`api-status ${apiStatus}`}>
          API Status: {apiStatus}
        </div>
      </header>

      <main className="App-main">
        <CitySelector 
          selectedCity={selectedCity} 
          onCityChange={setSelectedCity} 
        />
        
        <WeatherDashboard city={selectedCity} />
        
        <Statistics city={selectedCity} />
      </main>

      <footer className="App-footer">
        <p>Created by Eemeli Karjalainen | Cloud Services Assignment 2025</p>
        <p>Data source: OpenWeather API</p>
      </footer>
    </div>
  );
}

export default App;
