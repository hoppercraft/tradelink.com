# TradeLink Startup Script
# Starts both backend and frontend servers

Write-Host "Starting TradeLink..." -ForegroundColor Green

# Run database migrations first
Write-Host "Checking database migrations..." -ForegroundColor Yellow
cd "$PSScriptRoot\backend"
& ..\env\Scripts\python manage.py migrate --no-input
if ($LASTEXITCODE -ne 0) {
    Write-Host "Migration failed! Please check the error above." -ForegroundColor Red
    exit 1
}

# Start Backend in new window
Write-Host "Starting Django backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot'; .\env\Scripts\Activate.ps1; cd backend; python manage.py runserver"

# Wait a moment for backend to initialize
Start-Sleep -Seconds 2

# Start Frontend in current window
Write-Host "Starting React frontend..." -ForegroundColor Cyan
cd "$PSScriptRoot\frontend"
npm run dev
