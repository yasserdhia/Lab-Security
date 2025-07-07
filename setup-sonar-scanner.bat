@echo off
cls
echo ===============================================
echo   Installing SonarQube Scanner
echo ===============================================
echo.

echo Checking if SonarQube Scanner is already installed...

where sonar-scanner >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo SonarQube Scanner is already installed!
    sonar-scanner --version
    goto :end
)

echo SonarQube Scanner not found. Installing via npm...
echo.

echo Installing SonarQube Scanner globally via npm...
npm install -g sonarqube-scanner

echo.
echo Verifying installation...
where sonar-scanner >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ SonarQube Scanner installed successfully!
    sonar-scanner --version
) else (
    echo ❌ Installation failed. Please install manually:
    echo.
    echo Option 1: Download from https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
    echo Option 2: Use npm: npm install -g sonarqube-scanner
    echo Option 3: Use chocolatey: choco install sonarscanner-msbuild-net
)

:end
echo.
echo ===============================================
echo   Installation Complete
echo ===============================================
echo.
echo Next step: Run run-sonar-analysis.bat to analyze your project
echo.
pause
