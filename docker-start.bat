@echo off
echo 🛡️ SQL Injection Lab - Docker Setup
echo ==================================
echo.

echo [1/5] Checking for port conflicts...
netstat -ano | findstr :3000 >nul
if %errorlevel%==0 (
    echo ⚠️  Port 3000 is in use. Stopping processes...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        echo Stopping process %%a...
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
) else (
    echo ✅ Port 3000 is available
)

echo [2/5] Stopping any existing containers...
docker-compose down >nul 2>&1

echo [3/5] Cleaning up Docker resources...
docker container prune -f >nul 2>&1

echo [4/5] Building and starting containers...
docker-compose up -d --build

echo [5/5] Waiting for services to be ready...
timeout /t 10 /nobreak >nul

echo.
echo ✅ Checking service status...
docker-compose ps

echo.
echo 🌐 Application should be available at: http://localhost:3000
echo 🗄️  Database available at: localhost:5432
echo.
echo 📝 To view logs: docker-compose logs -f
echo 🛑 To stop: docker-compose down
echo.
pause
