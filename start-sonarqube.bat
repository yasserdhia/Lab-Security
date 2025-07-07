@echo off
cls
echo ===============================================
echo   Setting up SonarQube for Security Analysis
echo ===============================================
echo.

echo Starting SonarQube Server...
docker-compose -f docker-compose.sonarqube.yml up -d

echo.
echo Waiting for SonarQube to start up...
echo This may take 2-3 minutes for the first time...
echo.

timeout /t 120 /nobreak > nul

echo.
echo ===============================================
echo   SonarQube is Ready!
echo ===============================================
echo.
echo 🌐 SonarQube Web Interface: http://localhost:9000
echo 👤 Default Login: admin / admin
echo.
echo Next Steps:
echo 1. Visit http://localhost:9000
echo 2. Login with admin/admin
echo 3. Change the default password when prompted
echo 4. Run: setup-sonar-scanner.bat to install scanner
echo 5. Run: run-sonar-analysis.bat to analyze the project
echo.
echo ===============================================
pause
