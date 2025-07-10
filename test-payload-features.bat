@echo off
echo ====================================
echo PAYLOAD MANAGEMENT FEATURE TEST
echo ====================================
echo.
echo This script will help you test the new payload management features
echo in the SQL Injection Lab.
echo.

echo 1. Starting the lab environment...
echo.
docker-compose down
docker-compose up -d

echo.
echo 2. Waiting for services to start...
timeout /t 10 /nobreak > nul

echo.
echo 3. Opening the lab in your browser...
start http://localhost:3000/level1

echo.
echo ====================================
echo TESTING INSTRUCTIONS:
echo ====================================
echo.
echo 1. Go to Level 1: http://localhost:3000/level1
echo 2. In the right panel, click "Show Payloads"
echo 3. Click "Manage" to enable payload management
echo 4. Test the following features:
echo.
echo    a) CLICK TO USE: Click any payload to fill username field
echo    b) ADD PAYLOAD: Try adding: admin'/* comment */--
echo    c) EDIT PAYLOAD: Edit an existing payload
echo    d) DELETE PAYLOAD: Remove a payload you don't need
echo.
echo 5. Test on different levels (1-6) to see which payloads work
echo 6. Try the impossible level to see how all payloads fail
echo.
echo ====================================
echo EXPECTED BEHAVIOR:
echo ====================================
echo.
echo Level 1: All payloads should work
echo Level 2-6: Some payloads may be filtered
echo Impossible: All payloads should fail
echo.
echo Management features:
echo - Hover over payloads to see edit/delete buttons
echo - Add button should prevent duplicates
echo - Edit mode with Enter/Escape keyboard shortcuts
echo - Payload counter shows total number
echo.

echo ====================================
echo SAMPLE PAYLOADS TO TEST:
echo ====================================
echo.
echo Basic bypass:        ' OR '1'='1' --
echo Admin bypass:        admin' --
echo UNION attack:        ' UNION SELECT username, password FROM users --
echo Time delay:          ' OR pg_sleep(5) --
echo Custom bypass:       admin'/* bypass */--
echo.

echo ====================================
echo Press any key to open pgAdmin (optional)...
pause
start http://localhost:8888

echo.
echo ====================================
echo TESTING COMPLETE
echo ====================================
echo.
echo Check the following:
echo 1. Web app is accessible at http://localhost:3000
echo 2. Database is accessible via pgAdmin at http://localhost:8888
echo 3. Payload management works on all levels
echo 4. Custom payloads can be added/edited/deleted
echo.
echo For detailed testing guide, see: PAYLOAD_MANAGEMENT_GUIDE.md
echo.
pause
