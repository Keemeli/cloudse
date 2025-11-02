# API Documentation

## Base URL
```
http://your-domain.com/api
```

## Health Check

### GET /api/health
Check if the API is running.

**Response:**
```json
{
  "status": "ok"
}
```

## Weather Endpoints

### GET /api/weather/current/:city
Fetch current weather data for a city and store it in the database.

**Parameters:**
- `city` (path): City name (e.g., "Helsinki", "London")

**Example:**
```bash
curl http://localhost:5000/api/weather/current/Helsinki
```

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "Helsinki",
    "temperature": 15.5,
    "feelsLike": 14.2,
    "humidity": 75,
    "pressure": 1013,
    "weather": "Clouds",
    "description": "scattered clouds",
    "windSpeed": 5.2,
    "timestamp": "2025-10-18T10:30:00.000Z"
  }
}
```

### GET /api/weather/history/:city
Get historical weather data for a city.

**Parameters:**
- `city` (path): City name
- `limit` (query, optional): Number of records to return (default: 50)

**Example:**
```bash
curl "http://localhost:5000/api/weather/history/Helsinki?limit=100"
```

**Response:**
```json
{
  "success": true,
  "count": 100,
  "data": [
    {
      "id": 1,
      "city": "Helsinki",
      "temperature": "15.50",
      "feels_like": "14.20",
      "humidity": 75,
      "pressure": 1013,
      "weather_main": "Clouds",
      "weather_description": "scattered clouds",
      "wind_speed": "5.20",
      "timestamp": "2025-10-18T10:30:00.000Z",
      "created_at": "2025-10-18T10:30:00.000Z"
    }
  ]
}
```

### POST /api/weather/analyze
Analyze weather patterns for a city.

**Body:**
```json
{
  "city": "Helsinki",
  "days": 7
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "city": "Helsinki",
    "period_days": 7,
    "total_records": "168",
    "avg_temp": "15.23",
    "min_temp": "10.50",
    "max_temp": "20.30",
    "avg_humidity": "72.50",
    "avg_wind_speed": "4.80"
  }
}
```

### GET /api/weather/cities
Get all cities with available data.

**Response:**
```json
{
  "success": true,
  "cities": [
    {
      "city": "Helsinki",
      "last_updated": "2025-10-18T10:30:00.000Z"
    },
    {
      "city": "London",
      "last_updated": "2025-10-18T09:15:00.000Z"
    }
  ]
}
```

## Statistics Endpoints

### GET /api/stats/:city
Get comprehensive statistics for a city.

**Parameters:**
- `city` (path): City name
- `days` (query, optional): Time period in days (default: 30)

**Example:**
```bash
curl "http://localhost:5000/api/stats/Helsinki?days=7"
```

**Response:**
```json
{
  "success": true,
  "city": "Helsinki",
  "period_days": 7,
  "statistics": {
    "total_records": "168",
    "avg_temp": "15.23",
    "min_temp": "10.50",
    "max_temp": "20.30",
    "avg_humidity": "72.50",
    "avg_pressure": "1013.20",
    "avg_wind_speed": "4.80",
    "first_record": "2025-10-11T10:30:00.000Z",
    "last_record": "2025-10-18T10:30:00.000Z"
  },
  "conditions": [
    {
      "weather_main": "Clouds",
      "count": "95",
      "percentage": "56.55"
    },
    {
      "weather_main": "Clear",
      "count": "50",
      "percentage": "29.76"
    },
    {
      "weather_main": "Rain",
      "count": "23",
      "percentage": "13.69"
    }
  ]
}
```

### GET /api/stats
Get overall database statistics.

**Response:**
```json
{
  "success": true,
  "statistics": {
    "total_records": "1542",
    "total_cities": "5",
    "oldest_record": "2025-10-01T00:00:00.000Z",
    "newest_record": "2025-10-18T10:30:00.000Z",
    "global_avg_temp": "16.78"
  }
}
```

## Error Responses

All endpoints may return error responses in the following format:

**400 Bad Request:**
```json
{
  "error": "Invalid request",
  "message": "City name is required"
}
```

**404 Not Found:**
```json
{
  "error": "Route not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Something went wrong!",
  "message": "Database connection failed"
}
```

## Rate Limiting

The application uses OpenWeather API which has the following limits:
- Free tier: 60 calls/minute, 1,000,000 calls/month

## Data Collection

Weather data is collected on-demand when you fetch current weather for a city. To build a good dataset:

1. Fetch current weather periodically (e.g., every hour)
2. Use multiple cities for comparison
3. Let it run for several days to see trends

## Example Usage Flow

1. Fetch current weather to add data:
```bash
curl http://localhost:5000/api/weather/current/Helsinki
```

2. View historical data:
```bash
curl http://localhost:5000/api/weather/history/Helsinki
```

3. Get statistics:
```bash
curl http://localhost:5000/api/stats/Helsinki?days=7
```

4. Analyze patterns:
```bash
curl -X POST http://localhost:5000/api/weather/analyze \
  -H "Content-Type: application/json" \
  -d '{"city": "Helsinki", "days": 7}'
```
