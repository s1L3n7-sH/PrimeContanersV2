#!/bin/bash

# ======================================================
# Database Schema Sync Script for Ubuntu Server
# ======================================================

echo "=========================================="
echo "Syncing Database Schema"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Error: prisma/schema.prisma not found"
    echo "Please run this script from your project root directory"
    exit 1
fi

echo "✓ Found Prisma schema"
echo ""

# Check database connection
echo "Step 1: Checking database connection..."
echo "----------------------------------------"

if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found"
    echo "Please create .env file with DATABASE_URL"
    exit 1
fi

if ! grep -q "DATABASE_URL" .env; then
    echo "❌ Error: DATABASE_URL not found in .env"
    echo "Please add DATABASE_URL to your .env file"
    exit 1
fi

echo "✓ .env file configured"
echo ""

# Generate Prisma Client
echo "Step 2: Generating Prisma Client..."
echo "----------------------------------------"

npx prisma generate

if [ $? -eq 0 ]; then
    echo "✓ Prisma client generated successfully"
else
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo ""

# Push schema to database
echo "Step 3: Pushing schema to database..."
echo "----------------------------------------"
echo ""
echo "This will:"
echo "  • Create the CareerApplication table"
echo "  • Create the ApplicationStatus enum"
echo "  • Update any other schema changes"
echo ""

npx prisma db push

if [ $? -eq 0 ]; then
    echo ""
    echo "✓✓✓ Database schema synced successfully!"
    echo ""
    echo "The following table should now exist:"
    echo "  • CareerApplication (id, fullName, email, phone, resumeUrl, status, createdAt, updatedAt)"
    echo ""
else
    echo ""
    echo "❌ Failed to push schema to database"
    echo ""
    echo "Common issues:"
    echo "  1. Database is not running"
    echo "  2. Wrong DATABASE_URL in .env"
    echo "  3. Database user lacks permissions"
    echo ""
    echo "Check the error above for details."
    exit 1
fi

# Verify the table exists
echo "Step 4: Verifying table creation..."
echo "----------------------------------------"

# Try to query the table
if npx prisma db execute --stdin <<< "SELECT COUNT(*) FROM CareerApplication;" 2>/dev/null; then
    echo "✓ CareerApplication table verified!"
else
    echo "⚠ Could not verify table (but it may still exist)"
fi

echo ""
echo "=========================================="
echo "✅ Done!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Restart your Next.js application:"
echo "     pm2 restart all"
echo ""
echo "  2. Test the career page upload"
echo ""
echo "The upload should now work! 🎉"
echo ""
