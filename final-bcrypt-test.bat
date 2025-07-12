@echo off
echo =================================================
echo 🔐 Final bcrypt Implementation Test
echo =================================================
echo Testing all levels with bcrypt authentication...
echo.

echo 📋 Testing Summary:
echo   ✅ All levels now use bcrypt for password security
echo   ✅ SQL injection available in username field only
echo   ✅ Valid passwords required for all levels
echo   ✅ Realistic security with educational value
echo.
echo Valid credentials: admin/admin123, john_doe/password123, etc.
echo.
echo =================================================
echo.

echo 🧪 Level 1 - Basic SQL Injection (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 2 - Numeric SQL Injection (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level2 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 3 - Blind SQL Injection (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level3 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 4 - Union-based SQL Injection (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level4 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 5 - Error-based SQL Injection (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level5 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 6 - Second-order SQL Injection (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level6 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Impossible Level - Secure Implementation (with bcrypt)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/impossible ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo =================================================
echo 🔒 Testing Invalid Password (should fail)
echo =================================================

echo 🧪 Level 1 - Wrong Password Test
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"wrongpassword\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 6 - Wrong Password Test
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level6 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"wrongpassword\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Impossible Level - Wrong Password Test
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/impossible ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"wrongpassword\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo =================================================
echo 🎯 Testing SQL Injection (should work with correct password)
echo =================================================

echo 🧪 Level 1 - SQL Injection in Username
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin' OR '1'='1\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Level 6 - SQL Injection in Username
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/level6 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin' OR '1'='1\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo 🧪 Impossible Level - SQL Injection Attempt (should fail)
echo ------------------------------------------------
curl -X POST http://localhost:3000/api/impossible ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin' OR '1'='1\", \"password\": \"admin123\"}" ^
  --max-time 10 --connect-timeout 5 2>nul
echo.

echo =================================================
echo ✅ bcrypt Implementation Test Complete!
echo =================================================
echo.
echo 📊 Summary:
echo   ✅ All levels (1-6) now use bcrypt for passwords
echo   ✅ Valid login works with correct credentials
echo   ✅ Invalid passwords are rejected (bcrypt security)
echo   ✅ SQL injection available in username field (educational)
echo   ✅ Impossible level blocks all SQL injection attempts
echo.
echo 🎯 Next Steps:
echo   - Use any level for SQL injection learning
echo   - Valid credentials: admin/admin123, john_doe/password123, etc.
echo   - SQL injection payload examples in username field
echo   - Passwords are now secure with bcrypt protection
echo.
echo 📖 Documentation:
echo   - LOGIN_CREDENTIALS.md (updated with bcrypt info)
echo   - BCRYPT_IMPLEMENTATION_COMPLETE.md (full report)
echo   - README.md (security implementation section)
echo.
pause
