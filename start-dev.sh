#!/bin/bash
echo "Starting CodeMaster Pro..."
echo "Make sure XAMPP MySQL is running and database codemaster_pro is imported"

cd backend
npm install &
BACKEND_PID=$!

cd ../frontend
npm install &
FRONTEND_PID=$!

wait $BACKEND_PID
wait $FRONTEND_PID

echo "Dependencies installed. Run:"
echo "  cd backend && npm run dev"
echo "  cd frontend && npm run dev"
