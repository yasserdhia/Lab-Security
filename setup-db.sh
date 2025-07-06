#!/bin/bash

echo "🛡️  SQL Injection Lab Setup"
echo "=========================="
echo

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "✅ Docker is running"

# Create network if it doesn't exist
docker network create sqli-network 2>/dev/null || true

echo "🐘 Starting PostgreSQL database..."
docker run -d \
  --name sqli-lab-db \
  --network sqli-network \
  -e POSTGRES_DB=sqli_lab \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  postgres:15

echo "⏳ Waiting for database to be ready..."
sleep 15

echo "📊 Initializing database schema..."
docker exec -i sqli-lab-db psql -U postgres -d sqli_lab < database/init.sql

echo
echo "✅ Database setup complete!"
echo
echo "🚀 You can now run:"
echo "   npm install"
echo "   npm run dev"
echo
echo "🌐 Access the application at: http://localhost:3000"
echo "🗄️  Database: localhost:5432"
echo
echo "Happy ethical hacking! 🎯"
