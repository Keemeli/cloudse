import React, { useState } from 'react';
import './CitySelector.css';

const POPULAR_CITIES = [
  'Helsinki', 'Oulu', 'Tampere', 'Turku', 'Rovaniemi',
  'London', 'New York', 'Tokyo', 'Paris', 'Sydney'
];

function CitySelector({ selectedCity, onCityChange }) {
  const [customCity, setCustomCity] = useState('');

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customCity.trim()) {
      onCityChange(customCity.trim());
      setCustomCity('');
    }
  };

  return (
    <div className="city-selector card">
      <h2>Select City</h2>
      
      <div className="popular-cities">
        {POPULAR_CITIES.map(city => (
          <button
            key={city}
            className={`city-btn ${selectedCity === city ? 'active' : ''}`}
            onClick={() => onCityChange(city)}
          >
            {city}
          </button>
        ))}
      </div>

      <form onSubmit={handleCustomSubmit} className="custom-city-form">
        <input
          type="text"
          placeholder="Or enter custom city name..."
          value={customCity}
          onChange={(e) => setCustomCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default CitySelector;
