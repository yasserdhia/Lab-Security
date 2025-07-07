@echo off
cls
echo ===============================================
echo   Upload SQL Injection Lab to SonarQube
echo ===============================================
echo.

echo [1/3] Checking SonarQube Connection...
echo ====================================
echo.

REM Test connection to SonarQube
curl -s -u admin:SS12345678ss "http://localhost:9000/api/system/status" > status_check.txt
findstr /i "status" status_check.txt > nul
if %ERRORLEVEL% EQU 0 (
    echo √ SonarQube is running and accessible
) else (
    echo X SonarQube is not accessible. Please ensure it's running.
    echo Starting SonarQube...
    docker-compose -f docker-compose.sonarqube.yml up -d
    echo Waiting 60 seconds for startup...
    timeout /t 60 /nobreak
)
del status_check.txt 2>nul

echo.
echo [2/3] Creating Project in SonarQube...
echo ====================================
echo.

REM Create project if it doesn't exist
curl -s -X POST "http://localhost:9000/api/projects/create" ^
  -u admin:SS12345678ss ^
  -d "name=SQL Injection Lab - Security Analysis" ^
  -d "project=lab-security" ^
  -d "mainBranch=main" > project_result.txt

findstr /i "errors" project_result.txt > nul
if %ERRORLEVEL% EQU 0 (
    echo ! Project already exists or creation failed
    echo Continuing with existing project...
) else (
    echo √ Project created successfully!
)
del project_result.txt 2>nul

echo.
echo [3/3] Uploading Code for Analysis...
echo =================================
echo.

echo Analyzing the following vulnerabilities:
echo ├── Level 1: Basic SQL Injection
echo ├── Level 2: Numeric SQL Injection  
echo ├── Level 3: UNION-based SQL Injection
echo ├── Level 4: Blind SQL Injection
echo ├── Level 5: Time-based Blind SQL Injection
echo └── Level 6: Second-order SQL Injection
echo.

echo Running SonarQube Scanner with authentication...
echo.

sonar-scanner ^
  -Dsonar.projectKey=lab-security ^
  -Dsonar.projectName="SQL Injection Lab - Security Analysis" ^
  -Dsonar.projectVersion=1.0 ^
  -Dsonar.sources=src ^
  -Dsonar.host.url=http://localhost:9000 ^
  -Dsonar.login=admin ^
  -Dsonar.password=SS12345678ss ^
  -Dsonar.inclusions="**/*.ts,**/*.tsx,**/*.js,**/*.jsx,**/*.sql,**/*.json" ^
  -Dsonar.exclusions="**/node_modules/**,**/build/**,**/dist/**,**/.next/**,**/coverage/**,**/public/**" ^
  -Dsonar.sourceEncoding=UTF-8 ^
  -Dsonar.scm.disabled=true

echo.
if %ERRORLEVEL% EQU 0 (
    echo ===============================================
    echo   🎉 SUCCESS! Project uploaded to SonarQube
    echo ===============================================
    echo.
    echo ✅ Analysis completed successfully!
    echo.
    echo 📊 View Results:
    echo Dashboard: http://localhost:9000/dashboard?id=lab-security
    echo.
    echo 🔍 Expected Findings:
    echo ├── 6+ SQL Injection vulnerabilities
    echo ├── 10+ Security issues
    echo ├── Security Rating: F (intentional)
    echo └── Multiple security hotspots
    echo.
    echo 🌐 Opening SonarQube Dashboard...
    start http://localhost:9000/dashboard?id=lab-security
    echo.
    echo 📋 Login Credentials:
    echo Username: admin
    echo Password: SS12345678ss
    echo.
) else (
    echo ===============================================
    echo   ❌ Upload Failed
    echo ===============================================
    echo.
    echo Possible issues:
    echo 1. SonarQube not running
    echo 2. Wrong credentials
    echo 3. Network connectivity
    echo.
    echo Troubleshooting:
    echo 1. Check http://localhost:9000
    echo 2. Verify credentials: admin / SS12345678ss
    echo 3. Restart SonarQube if needed
)

echo.
pause
