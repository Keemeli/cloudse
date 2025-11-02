const db = require('./db');

const initDatabase = async () => {
  try {
    // Create weather_data table
    await db.query(`
      CREATE TABLE IF NOT EXISTS weather_data (
        id SERIAL PRIMARY KEY,
        city VARCHAR(100) NOT NULL,
        temperature DECIMAL(5,2),
        feels_like DECIMAL(5,2),
        humidity INTEGER,
        pressure INTEGER,
        weather_main VARCHAR(50),
        weather_description VARCHAR(255),
        wind_speed DECIMAL(5,2),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index on city and timestamp for faster queries
    await db.query(`
      CREATE INDEX IF NOT EXISTS idx_weather_city_timestamp 
      ON weather_data(city, timestamp DESC)
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

module.exports = { initDatabase };
