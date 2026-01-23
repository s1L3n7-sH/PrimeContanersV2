#!/bin/bash

# Quick Permission Fix for Ubuntu Server
# Run this if you get "Failed to submit application" errors

echo "=========================================="
echo "Quick Permission Fix"
echo "=========================================="
echo ""

# Get project directory
if [ ! -f "package.json" ]; then
    echo "Run this script from your project root directory"
    exit 1
fi

PROJECT_DIR=$(pwd)
echo "Project: $PROJECT_DIR"
echo ""

# Create directories if they don't exist
echo "Creating upload directories..."
mkdir -p "$PROJECT_DIR/public/uploads/resumes"

# Fix ownership (current user)
echo "Fixing ownership..."
sudo chown -R $USER:$USER "$PROJECT_DIR/public"

# Fix permissions
echo "Fixing permissions..."
chmod -R 755 "$PROJECT_DIR/public"

# Verify
echo ""
echo "Verification:"
echo "----------------------------------------"
ls -la "$PROJECT_DIR/public/uploads/resumes" 2>/dev/null || echo "Directory created"

# Test write
echo ""
echo "Testing write permission..."
TEST_FILE="$PROJECT_DIR/public/uploads/resumes/.test"
if touch "$TEST_FILE" 2>/dev/null; then
    echo "✓ Write permission OK!"
    rm "$TEST_FILE"
else
    echo "✗ Still no write permission"
    echo ""
    echo "Try running with sudo:"
    echo "  sudo chown -R $USER:$USER $PROJECT_DIR/public"
fi

echo ""
echo "Done! Now rebuild and restart:"
echo "  git pull"
echo "  npm run build"
echo "  pm2 restart all"
