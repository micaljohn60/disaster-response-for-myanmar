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

install_if_needed "earthquake-myanmar"

# Run server

echo "✅ Starting frontend server..."
cd earthquake-myanmar
npm run dev  # run in background

echo "🚀 frontend Server is running!"
