@echo off
echo Starting SQL Injection Lab...
echo.

echo [1/3] Starting PostgreSQL database...
docker run -d ^
  --name sqli-lab-db ^
  -e POSTGRES_DB=sqli_lab ^
  -e POSTGRES_USER=postgres ^
  -e POSTGRES_PASSWORD=password ^
  -p 5432:5432 ^
  postgres:15

echo [2/3] Waiting for database to be ready...
timeout /t 10 /nobreak >nul

echo [3/3] Initializing database schema...
docker exec -i sqli-lab-db psql -U postgres -d sqli_lab < database\init.sql

echo.
echo Database setup complete!
echo You can now run: npm run dev
echo.
echo Access the application at: http://localhost:3000
echo Database: localhost:5432
echo.
pause
