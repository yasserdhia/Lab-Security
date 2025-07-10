@echo off
echo ====================================
echo TESTING PAYLOAD PERSISTENCE FEATURE
echo ====================================
echo.

echo Stopping existing Docker containers...
docker-compose down

echo.
echo Building and starting new containers...
docker-compose up --build -d

echo.
echo Waiting for services to start (30 seconds)...
timeout /t 30 /nobreak > nul

echo.
echo Opening the lab in browser...
start http://localhost:3000/level1

echo.
echo ====================================
echo PAYLOAD PERSISTENCE TEST STEPS:
echo ====================================
echo.
echo 1. Wait for page to load completely
echo 2. Click "Show Payloads" to see the payload list
echo 3. Click "Manage" to enable payload management
echo 4. Add a custom payload (e.g., "test' OR 1=1 --")
echo 5. Edit an existing payload
echo 6. Delete a payload
echo 7. REFRESH THE PAGE (F5 or Ctrl+F5)
echo 8. Click "Show Payloads" again
echo 9. Verify that your changes are still there!
echo.
echo ====================================
echo EXPECTED BEHAVIOR:
echo ====================================
echo.
echo ✅ Custom payloads should persist after refresh
echo ✅ Edited payloads should keep their changes
echo ✅ Deleted payloads should remain deleted
echo ✅ Total payload count should be accurate
echo ✅ Reset button should restore defaults
echo.

echo ====================================
echo ADDITIONAL TESTS:
echo ====================================
echo.
echo Test 1: Add several custom payloads
echo Test 2: Refresh and verify they're saved
echo Test 3: Click Reset button
echo Test 4: Verify payloads return to defaults
echo Test 5: Navigate to different level and back
echo Test 6: Verify payloads persist across pages
echo.

echo ====================================
echo LOCALSTORAGE INFORMATION:
echo ====================================
echo.
echo Your payloads are saved in browser localStorage
echo Key: sql-injection-payloads
echo You can inspect this in browser DevTools (F12)
echo Go to Application tab -^> Local Storage
echo.

echo Press any key when you're done testing...
pause

echo.
echo Stopping containers...
docker-compose down

echo.
echo ====================================
echo TEST SUMMARY:
echo ====================================
echo.
echo If payloads persist after refresh: ✅ SUCCESS
echo If payloads are lost after refresh: ❌ FAILURE
echo If Reset button works: ✅ SUCCESS
echo If Reset button doesn't work: ❌ FAILURE
echo.
echo Test completed!
