@echo off
REM Batch script to update all HTML files
echo Updating HTML files with Firebase and React 18.3.1...
echo.
echo NOTE: This is a notification script.
echo Please manually update the remaining HTML files by:
echo.
echo 1. Replacing React CDN links with:
echo    https://unpkg.com/react@18.3.1/umd/react.production.min.js
echo    https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js
echo.
echo 2. Removing: ^<script src="auth.js"^>^</script^>
echo.
echo 3. Adding Firebase scripts before components.js
echo.
echo Files to update:
echo - login.html
echo - signup.html
echo - jobs.html
echo - saved.html
echo - applications.html
echo - wallet.html
echo - profile.html
echo - settings.html
echo - client-dashboard.html
echo - post-job.html
echo.
echo See HTML_UPDATE_GUIDE.html for the exact code to add.
echo.
pause
