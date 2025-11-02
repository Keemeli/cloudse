#!/bin/bash

# Setup script for Weather Analysis Pipeline
# This script helps with initial setup and environment configuration

set -e

echo "🌤️  Weather Analysis Pipeline - Setup Script"
echo "=============================================="
echo ""

# Check if running on correct OS
if [[ "$OSTYPE" != "linux-gnu"* ]] && [[ "$OSTYPE" != "darwin"* ]]; then
    echo "⚠️  Warning: This script is designed for Linux/macOS"
fi

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if command_exists node; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

if command_exists npm; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: $NPM_VERSION"
else
    echo "❌ npm not found"
    exit 1
fi

if command_exists docker; then
    DOCKER_VERSION=$(docker --version)
    echo "✅ Docker: $DOCKER_VERSION"
else
    echo "⚠️  Docker not found (optional for local dev, required for deployment)"
fi

if command_exists docker-compose; then
    COMPOSE_VERSION=$(docker-compose --version)
    echo "✅ Docker Compose: $COMPOSE_VERSION"
else
    echo "⚠️  Docker Compose not found (optional for local dev, required for deployment)"
fi

echo ""
echo "📦 Installing dependencies..."

# Backend setup
echo ""
echo "Setting up backend..."
cd backend
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created backend/.env from template"
    echo "⚠️  Please edit backend/.env and add your WEATHER_API_KEY"
else
    echo "ℹ️  backend/.env already exists"
fi
npm install
echo "✅ Backend dependencies installed"
cd ..

# Frontend setup
echo ""
echo "Setting up frontend..."
cd frontend
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ Created frontend/.env from template"
else
    echo "ℹ️  frontend/.env already exists"
fi
npm install
echo "✅ Frontend dependencies installed"
cd ..

echo ""
echo "=============================================="
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo ""
echo "1. Get a free OpenWeather API key from:"
echo "   https://openweathermap.org/api"
echo ""
echo "2. Add your API key to backend/.env:"
echo "   WEATHER_API_KEY=your_api_key_here"
echo ""
echo "3. Choose how to run the application:"
echo ""
echo "   Option A - Docker (Recommended):"
echo "   $ export WEATHER_API_KEY=your_api_key"
echo "   $ docker-compose up -d"
echo "   Then open: http://localhost:3000"
echo ""
echo "   Option B - Local Development:"
echo "   Terminal 1:"
echo "   $ cd backend && npm run dev"
echo ""
echo "   Terminal 2:"
echo "   $ cd frontend && npm start"
echo "   Then open: http://localhost:3000"
echo ""
echo "4. For deployment to cloud, see DEPLOYMENT.md"
echo ""
echo "=============================================="
