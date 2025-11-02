# Deployment Guide

This is how I deployed my weather app to the cloud.

## What You Need

- A cloud account (CSC cPouta, AWS, or Azure)
- OpenWeather API key
- Basic knowledge of Linux and Docker

## Option 1: Deploy with Docker (Easiest)

### Step 1: Create a VM

Create a virtual machine with:
- Ubuntu 22.04
- At least 2GB RAM
- Open ports: 22, 80, 3000, 5000

### Step 2: Install Docker

SSH into your VM and run:
```bash
sudo apt update
sudo apt install -y docker.io docker-compose git
sudo systemctl start docker
```

### Step 3: Deploy the App

```bash
# Clone your repo
git clone https://github.com/yourusername/cloudse.git
cd cloudse

# Set your API key
export WEATHER_API_KEY=your_api_key_here

# Start everything
docker-compose up -d

# Check if running
docker-compose ps
```

Your app should be running at `http://your-vm-ip:3000`

## Option 2: Manual Setup (Without Docker)

### Step 1: Install Required Software

```bash
sudo apt update
sudo apt install -y nodejs npm postgresql
```

### Step 2: Setup Database

```bash
sudo -u postgres psql
CREATE DATABASE weather_analysis;
CREATE USER weatheruser WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE weather_analysis TO weatheruser;
\q
```

### Step 3: Setup Backend

```bash
cd backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "DATABASE_URL=postgresql://weatheruser:yourpassword@localhost:5432/weather_analysis" >> .env  
echo "WEATHER_API_KEY=your_api_key" >> .env

# Start backend
npm start &
```

### Step 4: Setup Frontend

```bash
cd frontend
npm install

# Create .env file  
echo "REACT_APP_API_URL=http://your-vm-ip:5000" > .env

# Build and serve
npm run build
sudo npm install -g serve
serve -s build -l 3000 &
```

## CSC cPouta Specific Instructions

CSC's cPouta is the cloud service for Finnish universities.

1. Go to https://pouta.csc.fi and login
2. Create a new instance (Ubuntu 22.04, standard.small)
3. Add security rules for ports 22, 3000, 5000
4. Get a floating IP and attach to instance
5. Follow Docker steps above

## Common Issues

**Database connection fails:**
- Make sure PostgreSQL is running
- Check your DATABASE_URL has correct password

**Frontend can't connect to backend:**
- Check REACT_APP_API_URL points to your server IP
- Make sure ports are open in firewall

**Weather API not working:**
- Verify your WEATHER_API_KEY is correct
- Check you haven't exceeded free tier limits (60 calls/min)

## Testing Your Deployment

After deployment, test these:
1. Open http://your-ip:3000 - should see the website
2. Select a city and click refresh - should fetch weather
3. Check that data appears in statistics section

## Notes

- Free OpenWeather API tier: 60 calls/minute, 1,000,000 calls/month
- The app automatically fetches weather every 5 minutes
- Database will grow over time, might want to clean old data eventually

## Assignment Submission

Remember to include in email to ville.majava@oamk.fi:
- Your deployed app URL
- Link to GitHub repository
- Due: November 7, 2025
