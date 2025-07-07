@echo off
cls
echo ===============================================
echo   SQL Injection Lab - Complete Setup
echo ===============================================
echo.

echo Starting all services...
echo.

echo 1. Starting SQL Injection Lab...
docker-compose up -d

echo.
echo 2. Starting SonarQube for Security Analysis...
docker-compose -f docker-compose.sonarqube.yml up -d

echo.
echo Services are starting up...
echo Please wait 2-3 minutes for SonarQube to be ready...
echo.

timeout /t 120 /nobreak > nul

cls
echo ===============================================
echo   🎉 ALL SERVICES ARE READY!
echo ===============================================
echo.
echo 🌐 SQL INJECTION LAB
echo    URL: http://localhost:3000
echo    Test different SQL injection techniques
echo.
echo 🔧 DATABASE ADMIN (pgAdmin)
echo    URL: http://localhost:8080
echo    Email: admin@sqlilab.com
echo    Password: admin123
echo.
echo 🔍 SECURITY ANALYSIS (SonarQube)
echo    URL: http://localhost:9000
echo    Login: admin / admin
echo    ⚠️ Will ask to change password on first login
echo.
echo 📊 NEXT STEPS FOR SONARQUBE:
echo    1. Visit http://localhost:9000
echo    2. Login and change default password
echo    3. Create new project: sql-injection-lab
echo    4. Run: run-sonar-scan.bat
echo.
echo 📚 DOCUMENTATION:
echo    - SONARQUBE_QUICKSTART.md
echo    - SONARQUBE_GUIDE.md
echo    - LOGIN_CREDENTIALS.md
echo.
echo ===============================================
echo   Ready for Security Testing & Learning!
echo ===============================================
echo.
pause
