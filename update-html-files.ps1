Write-Host "Starting HTML file updates..." -ForegroundColor Cyan
Write-Host ""

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
$errorCount = 0

foreach ($file in $files) {
    Write-Host "Processing: $file" -ForegroundColor Yellow
    
    if (-not (Test-Path $file)) {
        Write-Host "  [ERROR] File not found!" -ForegroundColor Red
        $errorCount++
        continue
    }
    
    try {
        $content = Get-Content $file -Raw -Encoding UTF8
        $modified = $false
        
        # Update React version
        if ($content -match 'resource\.trickle\.so/vendor_lib/unpkg/react@18') {
            $content = $content -replace 'https://resource\.trickle\.so/vendor_lib/unpkg/react@18/umd/react\.production\.min\.js', 'https://unpkg.com/react@18.3.1/umd/react.production.min.js'
            $content = $content -replace 'https://resource\.trickle\.so/vendor_lib/unpkg/react-dom@18/umd/react-dom\.production\.min\.js', 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js'
            $content = $content -replace 'https://resource\.trickle\.so/vendor_lib/unpkg/@babel/standalone/babel\.min\.js', 'https://unpkg.com/@babel/standalone/babel.min.js'
            Write-Host "  [OK] Updated React to 18.3.1" -ForegroundColor Green
            $modified = $true
        }
        
        # Add crossorigin to React scripts if not present
        if ($content -match 'unpkg\.com/react@18\.3\.1' -and $content -notmatch 'crossorigin src="https://unpkg\.com/react@18\.3\.1') {
            $content = $content -replace '<script src="https://unpkg\.com/react@18\.3\.1', '<script crossorigin src="https://unpkg.com/react@18.3.1'
            $content = $content -replace '<script src="https://unpkg\.com/react-dom@18\.3\.1', '<script crossorigin src="https://unpkg.com/react-dom@18.3.1'
        }
        
        # Remove old auth.js and add Firebase
        if ($content -match '<script src="auth\.js"></script>') {
            $content = $content -replace '\s*<script src="auth\.js"></script>', $firebaseScripts
            Write-Host "  [OK] Added Firebase scripts" -ForegroundColor Green
            $modified = $true
        }
        
        if ($modified) {
            Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
            Write-Host "  [SUCCESS] File updated!" -ForegroundColor Green
            $successCount++
        }
        else {
            Write-Host "  [SKIP] No changes needed" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "  [ERROR] $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
    
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Update Complete!" -ForegroundColor Green
Write-Host "Success: $successCount files updated" -ForegroundColor Green
Write-Host "Errors: $errorCount files" -ForegroundColor $(if ($errorCount -gt 0) { "Red" }else { "Green" })
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Enable Authentication in Firebase Console" -ForegroundColor White
Write-Host "2. Enable Firestore Database in Firebase Console" -ForegroundColor White
Write-Host "3. Add Firestore security rules" -ForegroundColor White
Write-Host "4. Test locally" -ForegroundColor White
Write-Host "5. Deploy to Vercel" -ForegroundColor White
