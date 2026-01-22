# PowerShell Script to Update All HTML Files with Firebase and Latest React
# This script updates all HTML files to use:
# 1. React 18.3.1 (latest stable - security fix)
# 2. Firebase SDK
# 3. Updated auth system

Write-Host "🔥 Updating NileLancers HTML files with Firebase and React 18.3.1..." -ForegroundColor Cyan
Write-Host ""

# List of files to update
$files = @(
    "login.html",
    "signup.html",
    "jobs.html",
    "saved.html",
    "applications.html",
    "wallet.html",
    "profile.html",
    "settings.html",
    "client-dashboard.html",
    "post-job.html"
)

# Old React CDN patterns to replace
$oldReactPatterns = @(
    '<script src="https://resource.trickle.so/vendor_lib/unpkg/react@18/umd/react.production.min.js"></script>',
    '<script src="https://resource.trickle.so/vendor_lib/unpkg/react-dom@18/umd/react-dom.production.min.js"></script>',
    '<script src="https://resource.trickle.so/vendor_lib/unpkg/@babel/standalone/babel.min.js"></script>'
)

# New React CDN (18.3.1 - security update)
$newReactScripts = @'
    <!-- React 18.3.1 - Latest Stable (Security Update) -->
    <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
'@

# Firebase scripts to add
$firebaseScripts = @'
    
    <!-- Firebase SDK (v9 compat mode) -->
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-storage-compat.js"></script>
    
    <!-- Firebase Configuration and Auth -->
    <script src="firebase-config.js"></script>
    <script src="auth-firebase.js"></script>
    <script src="db-firebase.js"></script>
'@

$successCount = 0
$failCount = 0

foreach ($file in $files) {
    try {
        Write-Host "Processing: $file" -ForegroundColor Yellow
        
        if (Test-Path $file) {
            # Read the file
            $content = Get-Content $file -Raw
            
            # Replace old React with new React
            $content = $content -replace [regex]::Escape($oldReactPatterns[0]), $newReactScripts.Split([Environment]::NewLine)[1]
            $content = $content -replace [regex]::Escape($oldReactPatterns[1]), ''
            $content = $content -replace [regex]::Escape($oldReactPatterns[2]), $newReactScripts.Split([Environment]::NewLine)[4]
            
            # Remove old auth.js
            $content = $content -replace '\s*<script src="auth\.js"></script>', ''
            
            # Add Firebase scripts before components.js
            $content = $content -replace '(\s*<script type="text/babel" src="components\.js"></script>)', "$firebaseScripts`r`n    `$1"
            
            # Write back to file
            Set-Content -Path $file -Value $content -NoNewline
            
            Write-Host "  ✓ Updated successfully" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  ✗ File not found" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host "  ✗ Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Update Complete!" -ForegroundColor Green
Write-Host "Success: $successCount files" -ForegroundColor Green
Write-Host "Failed:  $failCount files" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ React updated to 18.3.1 (security fix)" -ForegroundColor Green
Write-Host "✅ Firebase SDK added to all files" -ForegroundColor Green
Write-Host "✅ Old auth.js removed" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️  IMPORTANT NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Update firebase-config.js with your Firebase credentials" -ForegroundColor White
Write-Host "2. Create Firebase project at https://console.firebase.google.com" -ForegroundColor White
Write-Host "3. Enable Authentication and Firestore" -ForegroundColor White
Write-Host "4. Test locally before deploying to Vercel" -ForegroundColor White
Write-Host ""
Write-Host "📚 See FIREBASE_SETUP_INSTRUCTIONS.md for detailed setup guide" -ForegroundColor Cyan
