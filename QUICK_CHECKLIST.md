# Quick Pre-Submission Checklist

## Before You Deploy ⚙️

- [ ] Have OpenWeather API key ready
- [ ] Decided which cloud: CSC cPouta / AWS / Azure
- [ ] Read DEPLOYMENT.md for your chosen cloud

## After Deployment 🚀

- [ ] App URL works in browser: http://your-ip:3000
- [ ] Can select cities and fetch weather data
- [ ] Statistics show up after collecting data
- [ ] Charts display properly
- [ ] Backend API responds: http://your-ip:5000/api/health

## GitHub Repository 📦

- [ ] Code pushed to GitHub
- [ ] Repository is PUBLIC
- [ ] No .env files committed (secrets safe)
- [ ] README.md has your name
- [ ] Repository has a clear name (e.g., "weather-cloud-pipeline")

## Email to Teacher 📧

Send to: **ville.majava@oamk.fi**  
Before: **November 7, 2025**

Include:
- [ ] Deployed application URL
- [ ] GitHub repository URL
- [ ] Brief description (2-3 sentences)

Example:
```
Subject: Cloud Services Assignment - Eemeli Karjalainen

Hi Ville,

Here's my cloud services assignment:

App: http://your-deployed-url:3000
GitHub: https://github.com/yourusername/cloudse

It's a weather data analysis pipeline with React frontend, 
Node.js backend, and PostgreSQL database, deployed on CSC cPouta.

Best regards,
Eemeli Karjalainen
```

## Testing Your Deployed App ✅

1. Open your app URL
2. Select "Helsinki" city
3. Click "Refresh Data"
4. Wait for weather info to appear
5. Check Statistics section updates
6. Try different cities
7. Verify chart shows temperature data

## If Something Doesn't Work 🔧

**No weather data showing?**
- Check WEATHER_API_KEY is set correctly
- Look at backend logs: `docker-compose logs backend`

**Database connection error?**
- Check DATABASE_URL is correct
- Ensure database container is running: `docker-compose ps`

**Frontend can't reach backend?**
- Check REACT_APP_API_URL points to your server IP
- Ensure ports 3000 and 5000 are open in firewall

**Still stuck?**
- Check DEPLOYMENT.md "Common Issues" section
- Review container logs: `docker-compose logs -f`

---

## You're Ready! 🎉

Your project:
✅ Meets all assignment requirements  
✅ Has proper frontend, backend, and database  
✅ Uses public API (OpenWeather)  
✅ Is deployable to cloud  
✅ Looks appropriate for 2nd year student  
✅ Has good documentation  

**Just deploy, test, and submit!**
