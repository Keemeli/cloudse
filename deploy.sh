#!/bin/bash

# Cloud Deployment Helper Script
# This script assists with deploying to different cloud providers

set -e

echo "☁️  Cloud Deployment Helper"
echo "=========================="
echo ""
echo "Select your cloud provider:"
echo "1) AWS EC2"
echo "2) Azure VM"
echo "3) CSC cPouta"
echo "4) Docker (Local/Any VM)"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo ""
        echo "📘 AWS EC2 Deployment Instructions:"
        echo ""
        echo "1. Launch EC2 instance (Ubuntu 22.04, t2.small+)"
        echo "2. Configure Security Group (ports 22, 80, 443, 3000, 5000)"
        echo "3. SSH to instance:"
        echo "   ssh -i your-key.pem ubuntu@your-ec2-ip"
        echo ""
        echo "4. Run on EC2 instance:"
        echo "   sudo apt update && sudo apt install -y docker.io docker-compose git"
        echo "   git clone <your-repo-url>"
        echo "   cd cloudse"
        echo "   export WEATHER_API_KEY=your_api_key"
        echo "   docker-compose up -d"
        echo ""
        echo "5. Access: http://your-ec2-ip:3000"
        ;;
    2)
        echo ""
        echo "📘 Azure VM Deployment Instructions:"
        echo ""
        echo "1. Create Ubuntu VM (Standard_B2s+)"
        echo "2. Open ports: 22, 80, 443, 3000, 5000"
        echo "3. SSH to instance:"
        echo "   ssh azureuser@your-vm-ip"
        echo ""
        echo "4. Run on Azure VM:"
        echo "   sudo apt update && sudo apt install -y docker.io docker-compose git"
        echo "   git clone <your-repo-url>"
        echo "   cd cloudse"
        echo "   export WEATHER_API_KEY=your_api_key"
        echo "   docker-compose up -d"
        echo ""
        echo "5. Access: http://your-vm-ip:3000"
        ;;
    3)
        echo ""
        echo "📘 CSC cPouta Deployment Instructions:"
        echo ""
        echo "1. Login to cPouta: https://pouta.csc.fi"
        echo "2. Launch instance (Ubuntu 22.04, standard.small+)"
        echo "3. Allocate and associate floating IP"
        echo "4. SSH to instance:"
        echo "   ssh ubuntu@your-floating-ip"
        echo ""
        echo "5. Run on cPouta instance:"
        echo "   sudo apt update && sudo apt install -y docker.io docker-compose git"
        echo "   git clone <your-repo-url>"
        echo "   cd cloudse"
        echo "   export WEATHER_API_KEY=your_api_key"
        echo "   docker-compose up -d"
        echo ""
        echo "6. Configure firewall:"
        echo "   sudo ufw allow 22 && sudo ufw allow 80 && sudo ufw allow 3000 && sudo ufw enable"
        echo ""
        echo "7. Access: http://your-floating-ip:3000"
        ;;
    4)
        echo ""
        echo "📘 Docker Deployment (Any VM):"
        echo ""
        read -p "Enter your OpenWeather API key: " api_key
        export WEATHER_API_KEY=$api_key
        echo ""
        echo "Building and starting containers..."
        docker-compose up -d
        echo ""
        echo "✅ Deployment complete!"
        echo ""
        echo "Container status:"
        docker-compose ps
        echo ""
        echo "Access application at: http://localhost:3000"
        echo "Backend API at: http://localhost:5000"
        echo ""
        echo "Useful commands:"
        echo "  View logs: docker-compose logs -f"
        echo "  Stop: docker-compose down"
        echo "  Restart: docker-compose restart"
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
