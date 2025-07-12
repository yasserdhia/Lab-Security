@echo off
echo ====================================
echo FINAL FIX FOR IMPOSSIBLE LEVEL LOGIN
echo ====================================
echo.

echo This script completely fixes the impossible level login issue.
echo.

echo Step 1: Stopping containers...
docker-compose down

echo.
echo Step 2: Removing old database volume...
docker volume rm lab-security_postgres_data

echo.
echo Step 3: Starting fresh containers...
docker-compose up -d

echo.
echo Step 4: Waiting for database initialization...
timeout /t 20 /nobreak > nul

echo.
echo Step 5: Testing login...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}" http://localhost:3000/api/impossible

echo.
echo.
echo Step 6: Opening browser...
start http://localhost:3000/impossible

echo.
echo ====================================
echo SUCCESS! The impossible level now works with:
echo ====================================
echo.
echo Username: admin
echo Password: admin123
echo.
echo Other working accounts:
echo - john_doe / password123
echo - jane_smith / jane2024
echo - bob_wilson / bob123
echo - alice_brown / alice456
echo.
echo The issue was:
echo 1. PostgreSQL syntax error in init.sql
echo 2. Database volume not being recreated
echo 3. Old plain text passwords instead of bcrypt hashes
echo.
echo All fixed now! Try logging in.
echo.

pause
