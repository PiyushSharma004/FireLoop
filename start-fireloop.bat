@echo off
echo 🔥 Starting FireLoop...
echo.

echo Installing dependencies...
npm install --legacy-peer-deps

echo.
echo Starting development server...
npm run dev

echo.
echo 🚀 FireLoop should open at http://localhost:3000
pause
