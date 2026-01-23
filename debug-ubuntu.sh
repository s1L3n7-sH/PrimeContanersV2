#!/bin/bash

# ======================================================
# Ubuntu Server Debugging Script for File Upload Issues
# ======================================================

echo "=========================================="
echo "Prime Containers - Upload Debugging"
echo "=========================================="
echo ""

# Get the project directory
if [ ! -f "package.json" ]; then
    echo "⚠ Warning: package.json not found"
    read -p "Enter the full path to your project: " PROJECT_DIR
    cd "$PROJECT_DIR" || exit 1
else
    PROJECT_DIR=$(pwd)
fi

echo "Project directory: $PROJECT_DIR"
echo ""

# Step 1: Check uploads directory
echo "Step 1: Checking uploads directory..."
echo "----------------------------------------"

UPLOADS_DIR="$PROJECT_DIR/public/uploads/resumes"

if [ -d "$UPLOADS_DIR" ]; then
    echo "✓ Directory exists: $UPLOADS_DIR"
    
    # Check permissions
    echo ""
    echo "Directory permissions:"
    ls -ld "$UPLOADS_DIR"
    
    # Check owner
    echo ""
    echo "Directory owner:"
    stat -c "Owner: %U:%G" "$UPLOADS_DIR"
    
    # Test write permission
    echo ""
    echo "Testing write permission..."
    TEST_FILE="$UPLOADS_DIR/.test_write_$(date +%s)"
    if touch "$TEST_FILE" 2>/dev/null; then
        echo "✓ Write permission OK"
        rm "$TEST_FILE"
    else
        echo "✗ NO WRITE PERMISSION!"
        echo ""
        echo "Fix with:"
        echo "  sudo chown -R \$USER:\$USER $UPLOADS_DIR"
        echo "  chmod -R 755 $UPLOADS_DIR"
    fi
else
    echo "✗ Directory does not exist: $UPLOADS_DIR"
    echo ""
    echo "Creating directory..."
    mkdir -p "$UPLOADS_DIR"
    
    if [ -d "$UPLOADS_DIR" ]; then
        echo "✓ Directory created successfully"
    else
        echo "✗ Failed to create directory"
        echo ""
        echo "Fix with:"
        echo "  sudo mkdir -p $UPLOADS_DIR"
        echo "  sudo chown -R \$USER:\$USER $UPLOADS_DIR"
        echo "  chmod -R 755 $UPLOADS_DIR"
    fi
fi

echo ""
echo ""

# Step 2: Check parent directories
echo "Step 2: Checking parent directories..."
echo "----------------------------------------"

echo ""
echo "public/ directory:"
if [ -d "$PROJECT_DIR/public" ]; then
    echo "✓ Exists"
    ls -ld "$PROJECT_DIR/public"
else
    echo "✗ Does not exist"
    echo "Creating..."
    mkdir -p "$PROJECT_DIR/public"
fi

echo ""
echo "public/uploads/ directory:"
if [ -d "$PROJECT_DIR/public/uploads" ]; then
    echo "✓ Exists"
    ls -ld "$PROJECT_DIR/public/uploads"
else
    echo "✗ Does not exist"
    echo "Creating..."
    mkdir -p "$PROJECT_DIR/public/uploads"
fi

echo ""
echo ""

# Step 3: Check database connectivity
echo "Step 3: Checking database connectivity..."
echo "----------------------------------------"

if [ -f ".env" ]; then
    echo "✓ .env file exists"
    
    # Check if DATABASE_URL is set (without showing the actual URL)
    if grep -q "DATABASE_URL" .env; then
        echo "✓ DATABASE_URL is configured"
    else
        echo "✗ DATABASE_URL not found in .env"
    fi
else
    echo "✗ .env file not found"
    echo "Please create .env file with DATABASE_URL"
fi

echo ""
echo ""

# Step 4: Check Node.js process
echo "Step 4: Checking Node.js process..."
echo "----------------------------------------"

if command -v pm2 &> /dev/null; then
    echo "PM2 processes:"
    pm2 list
    echo ""
    echo "To view logs in real-time:"
    echo "  pm2 logs"
elif pgrep -f "next" > /dev/null; then
    echo "✓ Next.js process is running"
    echo ""
    echo "Process details:"
    ps aux | grep "[n]ext"
else
    echo "✗ No Next.js process found"
    echo ""
    echo "Start your application first!"
fi

echo ""
echo ""

# Step 5: Check disk space
echo "Step 5: Checking disk space..."
echo "----------------------------------------"
df -h "$PROJECT_DIR"

echo ""
echo ""

# Step 6: Provide manual test command
echo "Step 6: Manual test instructions"
echo "----------------------------------------"
echo ""
echo "To test file upload manually, run this on the server:"
echo ""
echo "1. Create a test PDF:"
echo "   echo '%PDF-1.4 test' > /tmp/test.pdf"
echo ""
echo "2. Try to copy it to uploads directory:"
echo "   cp /tmp/test.pdf $UPLOADS_DIR/test-upload.pdf"
echo ""
echo "3. If that fails, fix permissions:"
echo "   sudo chown -R \$USER:\$USER $PROJECT_DIR/public"
echo "   chmod -R 755 $PROJECT_DIR/public"
echo ""
echo ""

# Step 7: Check Prisma
echo "Step 7: Checking Prisma..."
echo "----------------------------------------"

if [ -f "prisma/schema.prisma" ]; then
    echo "✓ Prisma schema exists"
    
    # Check if CareerApplication model exists
    if grep -q "model CareerApplication" prisma/schema.prisma; then
        echo "✓ CareerApplication model found"
    else
        echo "✗ CareerApplication model not found in schema"
    fi
    
    # Check if node_modules/.prisma exists
    if [ -d "node_modules/.prisma" ]; then
        echo "✓ Prisma client generated"
    else
        echo "⚠ Prisma client may not be generated"
        echo "Run: npx prisma generate"
    fi
else
    echo "✗ Prisma schema not found"
fi

echo ""
echo ""

# Summary
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Fix any permission issues shown above"
echo ""
echo "2. Deploy the updated code with better error logging:"
echo "   git pull"
echo "   npm run build"
echo "   pm2 restart all  # or your restart command"
echo ""
echo "3. Try uploading again and check the logs:"
echo "   pm2 logs  # if using PM2"
echo "   journalctl -u your-service -f  # if using systemd"
echo ""
echo "4. Look for detailed error messages like:"
echo "   - 'Failed to create uploads directory'"
echo "   - 'Failed to save file'"
echo "   - 'Database error'"
echo ""
echo "The improved error logging will tell you exactly what's wrong!"
echo ""
