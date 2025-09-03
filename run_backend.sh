#!/bin/bash
set -e

# Function to install dependencies if node_modules doesn't exist
install_if_needed() {
  folder=$1
  echo "🔹 Checking $folder..."
  if [ ! -d "$folder/node_modules" ]; then
    echo "Installing dependencies for $folder..."
    cd $folder
    npm install
    cd ..
  else
    echo "Dependencies already installed for $folder."
  fi
}

# Install dependencies if needed
install_if_needed "backend-dev"


# Run servers
echo "✅ Starting backend server..."
cd backend-dev
nodemon server.js  # run in background


echo "🚀 Backend Server is running!"
