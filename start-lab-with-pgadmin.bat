@echo off
cls
echo ===============================================
echo   SQL Injection Lab - Complete Setup
echo ===============================================
echo.
echo Starting all services...
echo.

docker-compose up -d

echo.
echo Waiting for services to be ready...
echo This may take up to 30 seconds...
echo.

timeout /t 25 /nobreak > nul

cls
echo ===============================================
echo   SQL INJECTION LAB IS READY! 
echo ===============================================
echo.
echo 🌐 WEB APPLICATION
echo    URL: http://localhost:3000
echo    Access the SQL injection challenges
echo.
echo 🔧 DATABASE ADMINISTRATION (pgAdmin)
echo    URL: http://localhost:8080
echo    Email: admin@sqlilab.com
echo    Password: admin123
echo.
echo 🗄️ DIRECT DATABASE ACCESS
echo    Host: localhost
echo    Port: 5432
echo    Database: sqli_lab
echo    Username: postgres
echo    Password: password
echo.
echo 📚 DOCUMENTATION
echo    - README.md - Main documentation
echo    - PGADMIN_GUIDE.md - pgAdmin usage guide
echo    - QUICKSTART.md - Quick setup instructions
echo.
echo ===============================================
echo   Ready for SQL Injection Learning!
echo ===============================================
echo.
echo Press any key to exit...
pause > nul
