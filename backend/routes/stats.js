const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Get statistics for a specific city
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const days = parseInt(req.query.days) || 30;

    // Get basic statistics
    const statsQuery = await db.query(
      `SELECT 
        COUNT(*) as total_records,
        AVG(temperature) as avg_temp,
        MIN(temperature) as min_temp,
        MAX(temperature) as max_temp,
        AVG(humidity) as avg_humidity,
        AVG(pressure) as avg_pressure,
        AVG(wind_speed) as avg_wind_speed,
        MIN(timestamp) as first_record,
        MAX(timestamp) as last_record
       FROM weather_data 
       WHERE LOWER(city) = LOWER($1) 
       AND timestamp > NOW() - INTERVAL '${days} days'`,
      [city]
    );

    // Get weather condition counts
    const conditionsQuery = await db.query(
      `SELECT 
        weather_main, 
        COUNT(*) as count
       FROM weather_data 
       WHERE LOWER(city) = LOWER($1) 
       AND timestamp > NOW() - INTERVAL '${days} days'
       GROUP BY weather_main 
       ORDER BY count DESC`,
      [city]
    );

    // Calculate percentages manually
    const totalCount = conditionsQuery.rows.reduce((sum, row) => sum + parseInt(row.count), 0);
    const conditions = conditionsQuery.rows.map(row => ({
      weather_main: row.weather_main,
      count: row.count,
      percentage: totalCount > 0 ? ((row.count / totalCount) * 100).toFixed(2) : 0
    }));

    res.json({
      success: true,
      city,
      period_days: days,
      statistics: statsQuery.rows[0],
      conditions: conditions
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get overall database statistics
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        COUNT(*) as total_records,
        COUNT(DISTINCT city) as total_cities,
        MIN(timestamp) as oldest_record,
        MAX(timestamp) as newest_record,
        AVG(temperature) as global_avg_temp
       FROM weather_data`
    );

    res.json({
      success: true,
      statistics: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching overall statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
