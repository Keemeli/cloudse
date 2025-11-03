# Deploy Your App NOW - Quick Guide

## The teacher needs your DEPLOYED app URL!

You've pushed code to GitHub ✅
**But you still need to deploy it to a cloud server** 🚀

---

## Fastest Way: CSC cPouta (20-30 minutes)

### Step 1: Get Access to CSC cPouta
1. Go to https://pouta.csc.fi
2. Login with your university credentials (Haka)
3. If you don't have access, request it from CSC

### Step 2: Create Virtual Machine

1. In cPouta dashboard, click **"Launch Instance"**
2. **Details:**
   - Instance Name: `weather-app`
   - Source: `Ubuntu-22.04`
   - Flavor: `standard.small` (2 vCPU, 4GB RAM)
3. **Security Groups:** 
   - Select `default`
   - Add `http` and `https` if available
4. **Key Pair:** 
   - Create new key pair
   - Download the `.pem` file (SAVE THIS!)
5. Click **Launch Instance**

### Step 3: Get Floating IP

1. Go to **Network → Floating IPs**
2. Click **Allocate IP to Project**
3. Click **Associate** next to your new IP
4. Select your `weather-app` instance
5. **Write down this IP** - this will be your app URL!

### Step 4: Configure Firewall

1. Go to **Network → Security Groups**
2. Click **Manage Rules** on `default`
3. Add these rules if not present:
   - **Custom TCP Rule**: Port 3000, CIDR: 0.0.0.0/0
   - **Custom TCP Rule**: Port 5000, CIDR: 0.0.0.0/0
   - **SSH**: Port 22, CIDR: 0.0.0.0/0

### Step 5: Connect to Your VM

```bash
# Make your key file secure
chmod 400 ~/Downloads/your-keypair.pem

# SSH to your server (replace with YOUR floating IP)
ssh -i ~/Downloads/your-keypair.pem ubuntu@YOUR_FLOATING_IP
```

### Step 6: Install Docker on VM

Once connected to your VM, run:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose git

# Start Docker
sudo systemctl start docker
sudo systemctl enable docker

# Add your user to docker group
sudo usermod -aG docker ubuntu

# Logout and login again for group to take effect
exit
```

### Step 7: SSH Back In and Deploy

```bash
# SSH back in
ssh -i ~/Downloads/your-keypair.pem ubuntu@YOUR_FLOATING_IP

# Clone your repository
git clone https://github.com/Keemeli/cloudse.git
cd cloudse

# Set your OpenWeather API key
export WEATHER_API_KEY=your_openweather_api_key_here

# Start the application
docker-compose up -d

# Check if running
docker-compose ps
```

### Step 8: Configure Frontend for Your IP

Edit the docker-compose.yml to use your floating IP:

```bash
# On your VM
cd /home/ubuntu/cloudse
nano docker-compose.yml
```

Change the frontend environment variable:
```yaml
frontend:
  environment:
    REACT_APP_API_URL: http://YOUR_FLOATING_IP:5000
```

Then rebuild:
```bash
docker-compose down
docker-compose up -d --build
```

### Step 9: Test Your App!

Open in browser: **http://YOUR_FLOATING_IP:3000**

Your app URL is: `http://YOUR_FLOATING_IP:3000`

---

## Alternative: Quick Deploy to Railway/Render (Even Faster)

### Railway.app (5 minutes)
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `Keemeli/cloudse`
5. Add environment variable: `WEATHER_API_KEY`
6. Railway will give you a URL automatically

### Render.com (10 minutes)
1. Go to https://render.com
2. Sign up with GitHub
3. New → Web Service
4. Connect `Keemeli/cloudse` repository
5. Choose Docker deployment
6. Add environment variables
7. Deploy!

---

## Need OpenWeather API Key?

1. Go to https://openweathermap.org/api
2. Sign up (free)
3. Go to API Keys section
4. Copy your API key
5. Use it in the deployment steps above

---

## Email to Teacher (After Deployment)

```
Subject: Cloud Services Assignment - App URL

Hi Ville,

My cloud services assignment is deployed:

GitHub Repository: https://github.com/Keemeli/cloudse
Deployed App URL: http://YOUR_FLOATING_IP:3000

The application is running on CSC cPouta with Docker.

Best regards,
Eemeli Karjalainen
```

---

## Troubleshooting

**Can't access the app?**
- Check security group has port 3000 open
- Run: `docker-compose logs -f` to see errors
- Make sure floating IP is associated

**Docker permission denied?**
- Run: `sudo usermod -aG docker ubuntu`
- Logout and login again

**API key error?**
- Check: `echo $WEATHER_API_KEY`
- If empty, export it again before `docker-compose up`

---

## Time Estimate

- CSC cPouta: 20-30 minutes
- Railway/Render: 5-10 minutes

**Do this NOW before the teacher checks again!** ⏰
