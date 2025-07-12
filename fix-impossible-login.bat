@echo off
echo ====================================
echo REBUILDING DATABASE WITH FIXED PASSWORDS
echo ====================================
echo.

echo Stopping all containers...
docker-compose down

echo.
echo Removing database volume to force recreation...
docker volume rm lab-security_postgres_data 2>nul

echo.
echo Starting database with new password hashes...
docker-compose up -d db

echo.
echo Waiting for database to initialize (20 seconds)...
timeout /t 20 /nobreak > nul

echo.
echo Starting application...
docker-compose up -d app

echo.
echo Waiting for application to start (10 seconds)...
timeout /t 10 /nobreak > nul

echo.
echo ====================================
echo TESTING IMPOSSIBLE LEVEL LOGIN
echo ====================================
echo.

echo Testing admin/admin123...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}" http://localhost:3000/api/impossible

echo.
echo.
echo Opening impossible level in browser...
start http://localhost:3000/impossible

echo.
echo ====================================
echo SUCCESS! 
echo ====================================
echo.
echo The impossible level is now working with these credentials:
echo - admin / admin123
echo - john_doe / password123  
echo - jane_smith / jane2024
echo - bob_wilson / bob123
echo - alice_brown / alice456
echo.
echo Try logging in with admin/admin123 in the browser window.
echo.

pause
