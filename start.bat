@echo off
echo 🔥 Starting FireLoop...
echo Installing dependencies...
call npm install

echo Starting development server...
call npm run dev

echo 🚀 FireLoop is running at http://localhost:3000
pause
