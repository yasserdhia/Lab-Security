@echo off
echo ===================================
echo Testing All Levels with Valid Login
echo ===================================

echo.
echo Testing Level 1 (Basic SQLi)...
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo Testing Level 2 (Numeric SQLi)...
curl -X POST http://localhost:3000/api/level2 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo Testing Level 3 (Blind SQLi)...
curl -X POST http://localhost:3000/api/level3 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo Testing Level 4 (Union-based SQLi)...
curl -X POST http://localhost:3000/api/level4 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo Testing Level 5 (Error-based SQLi)...
curl -X POST http://localhost:3000/api/level5 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo Testing Level 6 (Second-order SQLi)...
curl -X POST http://localhost:3000/api/level6 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo Testing Impossible Level (Secure)...
curl -X POST http://localhost:3000/api/impossible ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"admin123\"}"

echo.
echo.
echo ===================================
echo Testing with Invalid Password
echo ===================================

echo.
echo Testing Level 1 with wrong password...
curl -X POST http://localhost:3000/api/level1 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"wrongpassword\"}"

echo.
echo.
echo Testing Level 6 with wrong password...
curl -X POST http://localhost:3000/api/level6 ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"admin\", \"password\": \"wrongpassword\"}"

echo.
echo.
echo ===================================
echo All tests completed!
echo ===================================
pause
