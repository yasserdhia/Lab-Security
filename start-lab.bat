@echo off
echo 🛡️ SQL Injection Lab - Quick Start
echo ================================
echo.

echo [1/4] Stopping any existing containers...
docker stop sqli-lab-db 2>nul
docker rm sqli-lab-db 2>nul

echo [2/4] Starting PostgreSQL database...
docker run -d ^
  --name sqli-lab-db ^
  -e POSTGRES_DB=sqli_lab ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=password ^
  -p 5432:5432 ^
  postgres:15

echo [3/4] Waiting for database to be ready...
timeout /t 15 /nobreak >nul

echo [4/4] Initializing database schema...
docker exec -i sqli-lab-db psql -U postgres -d sqli_lab < database\init.sql

echo.
echo ✅ Database is ready!
echo.
echo 🚀 Now run: npm run dev
echo 🌐 Then visit: http://localhost:3000
echo.
echo 📊 Database Info:
echo   Host: localhost:5432
echo   Database: sqli_lab
echo   Username: postgres
echo   Password: password
echo.
pause
