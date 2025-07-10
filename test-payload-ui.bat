@echo off
echo ====================================
echo TESTING PAYLOAD MANAGEMENT FEATURE
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
echo MANUAL TESTING CHECKLIST:
echo ====================================
echo.
echo 1. Wait for page to load completely
echo 2. Look for "Common Payloads" section on the right side
echo 3. Click "Show Payloads" button
echo 4. You should see a list of SQL injection payloads
echo 5. Look for "Manage" button next to "Hide Payloads"
echo 6. Click "Manage" button
echo 7. Hover over any payload to see edit and delete icons
echo 8. Try adding a new payload in the "Add New Payload" section
echo.
echo Expected elements:
echo - "Show Payloads" / "Hide Payloads" button
echo - "Manage" button (appears when payloads are shown)
echo - Edit icon (pencil) on hover
echo - Delete icon (trash) on hover  
echo - "Add New Payload" section when manage is enabled
echo.

echo ====================================
echo If you don't see the Manage button:
echo ====================================
echo 1. Check browser console for errors (F12)
echo 2. Try refreshing the page (Ctrl+F5)
echo 3. Clear browser cache
echo 4. Try a different browser
echo.

echo Press any key when you're done testing...
pause

echo.
echo Stopping containers...
docker-compose down

echo.
echo Test completed!
