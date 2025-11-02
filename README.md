# Cloud Data Analysis Pipeline

A weather data analysis application for cloud computing assignment. This project demonstrates a full-stack application with frontend, backend and database deployed to cloud.

## What it does

- Fetches weather data from OpenWeather API
- Stores data in PostgreSQL database  
- Shows weather information and statistics on a web page
- Displays temperature charts over time

## Technologies Used

- Frontend: React
- Backend: Node.js with Express
- Database: PostgreSQL
- Charts: Chart.js

## How to Run Locally

### Prerequisites

- Node.js installed
- PostgreSQL database
- OpenWeather API key (get free from https://openweathermap.org/api)

### Setup Steps

1. Clone the repository
```bash
git clone <your-repo-url>
cd cloudse
```

2. Setup Backend
```bash
cd backend
npm install
# Create .env file with your database and API key
npm start
```

3. Setup Frontend (open new terminal)
```bash
cd frontend  
npm install
# Create .env file with backend URL
npm start
```

The app should open at http://localhost:3000

## Using Docker

Easier way to run everything:

```bash
export WEATHER_API_KEY=your_api_key_here
docker-compose up
```

## Deployment to Cloud

I deployed this to [CSC/AWS/Azure - specify which one you used].

See DEPLOYMENT.md for instructions.

## Assignment Info

- Course: Cloud Computing
- Due: November 7, 2025  
- Send to: ville.majava@oamk.fi

## Author

Eemeli Karjalainen
