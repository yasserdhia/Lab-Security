@echo off
REM ===================================================================
REM Manual Security Test for Impossible Level
REM ===================================================================
REM Tests various SQL injection payloads manually to verify security
REM All attempts should fail with generic "Authentication failed" message
REM ===================================================================

echo.
echo ========================================
echo  Manual Security Test - Impossible Level
echo ========================================
echo.
echo This script tests common SQL injection payloads
echo All should fail with "Authentication failed" message
echo.

set /p continue=Press Enter to start manual testing...

echo.
echo [TEST 1] Basic OR injection in username field...
echo -----------------------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"' OR '1'='1' --\",\"password\":\"anything\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 2] UNION SELECT injection...
echo ----------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"' UNION SELECT username, password FROM users --\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 3] DROP TABLE injection...
echo --------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"admin'; DROP TABLE users; --\",\"password\":\"password\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 4] Boolean blind injection...
echo -----------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"admin' AND (SELECT COUNT(*) FROM users) > 0 --\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 5] Time-based blind injection...
echo --------------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"admin'; SELECT CASE WHEN (1=1) THEN pg_sleep(5) ELSE pg_sleep(0) END --\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 6] Information schema extraction...
echo -----------------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"' UNION SELECT table_name, column_name FROM information_schema.columns --\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 7] Version extraction...
echo ------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"' UNION SELECT version(), user() --\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 8] Numeric injection...
echo -----------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"1 OR 1=1\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 9] Error-based injection...
echo ---------------------------------
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"' AND extractvalue(1, concat(0x7e, version(), 0x7e)) --\",\"password\":\"test\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo [TEST 10] Valid credentials test...
echo -----------------------------------
echo Testing with valid credentials (should succeed):
curl -X POST "http://localhost:3000/api/impossible" ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"admin\",\"password\":\"admin123\"}" ^
     -w "\nResponse Code: %%{http_code}\n\n"

echo.
echo ========================================
echo  EXPECTED RESULTS
echo ========================================
echo.
echo If security is properly implemented:
echo.
echo Tests 1-9 (SQL Injection Attempts):
echo [✓] Response Code: 401 (Unauthorized)
echo [✓] Message: "Authentication failed. Please check your credentials and try again."
echo [✓] No database errors exposed
echo [✓] No sensitive information leaked
echo [✓] Consistent response times
echo.
echo Test 10 (Valid Credentials):
echo [✓] Response Code: 200 (Success)
echo [✓] Message: "Login successful"
echo [✓] User object with username returned
echo.
echo ========================================
echo  SECURITY VERIFICATION COMPLETE
echo ========================================
echo.

pause
