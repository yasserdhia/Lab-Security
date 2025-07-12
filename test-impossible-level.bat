@echo off
echo ====================================
echo TESTING IMPOSSIBLE LEVEL LOGIN
echo ====================================
echo.

echo Rebuilding database with correct password hashes...
docker-compose down
docker-compose up -d db

echo.
echo Waiting for database to initialize (15 seconds)...
timeout /t 15 /nobreak > nul

echo.
echo Starting application...
docker-compose up -d app

echo.
echo Waiting for application to start (10 seconds)...
timeout /t 10 /nobreak > nul

echo.
echo ====================================
echo TESTING VALID CREDENTIALS:
echo ====================================
echo.

echo Testing admin/admin123...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"admin123\"}" http://localhost:3000/api/impossible

echo.
echo.
echo Testing john_doe/password123...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"john_doe\",\"password\":\"password123\"}" http://localhost:3000/api/impossible

echo.
echo.
echo Testing jane_smith/jane2024...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"jane_smith\",\"password\":\"jane2024\"}" http://localhost:3000/api/impossible

echo.
echo.
echo ====================================
echo TESTING INVALID CREDENTIALS:
echo ====================================
echo.

echo Testing admin/wrongpassword...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"wrongpassword\"}" http://localhost:3000/api/impossible

echo.
echo.
echo Testing SQL injection payload...
curl -X POST -H "Content-Type: application/json" -d "{\"username\":\"admin' OR '1'='1' --\",\"password\":\"anything\"}" http://localhost:3000/api/impossible

echo.
echo.
echo ====================================
echo TESTING WEB INTERFACE:
echo ====================================
echo.

echo Opening impossible level in browser...
start http://localhost:3000/impossible

echo.
echo ====================================
echo MANUAL TESTING INSTRUCTIONS:
echo ====================================
echo.
echo 1. Valid credentials that should work:
echo    - admin / admin123
echo    - john_doe / password123
echo    - jane_smith / jane2024
echo    - bob_wilson / bob123
echo    - alice_brown / alice456
echo.
echo 2. Invalid credentials that should fail:
echo    - admin / wrongpassword
echo    - admin' OR '1'='1' -- / anything
echo    - Any SQL injection payload
echo.
echo 3. Expected behavior:
echo    - Valid credentials: Success message
echo    - Invalid credentials: "Authentication failed" message
echo    - SQL injection attempts: Should be blocked
echo.

echo Press any key to finish...
pause
