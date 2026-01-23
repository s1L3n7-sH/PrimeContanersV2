#!/bin/bash

# Quick Fix Script for Ubuntu Server File Upload Issues
# Run this on your Ubuntu server after pulling the latest code

echo "=========================================="
echo "Prime Containers - Upload Fix Deployment"
echo "=========================================="
echo ""

# Step 1: Check which web server is running
echo "Step 1: Checking web server..."
if systemctl is-active --quiet nginx; then
    echo "✓ Nginx is running"
    WEB_SERVER="nginx"
elif systemctl is-active --quiet apache2; then
    echo "✓ Apache is running"
    WEB_SERVER="apache2"
else
    echo "⚠ No web server detected. You may need to configure manually."
    WEB_SERVER="none"
fi
echo ""

# Step 2: Configure Nginx
if [ "$WEB_SERVER" = "nginx" ]; then
    echo "Step 2: Configuring Nginx..."
    echo ""
    echo "Please add the following line to your Nginx config:"
    echo ""
    echo "----------------------------------------"
    echo "client_max_body_size 10M;"
    echo "----------------------------------------"
    echo ""
    echo "Config file locations to check:"
    echo "  • /etc/nginx/sites-available/default"
    echo "  • /etc/nginx/nginx.conf"
    echo "  • /etc/nginx/sites-available/your-domain.com"
    echo ""
    read -p "Press Enter after you've added the configuration..."
    
    echo ""
    echo "Testing Nginx configuration..."
    if sudo nginx -t; then
        echo "✓ Nginx configuration is valid"
        echo ""
        echo "Reloading Nginx..."
        sudo systemctl reload nginx
        echo "✓ Nginx reloaded successfully"
    else
        echo "✗ Nginx configuration has errors. Please fix them and try again."
        exit 1
    fi
fi

# Step 3: Configure Apache
if [ "$WEB_SERVER" = "apache2" ]; then
    echo "Step 2: Configuring Apache..."
    echo ""
    echo "Please add the following line to your Apache VirtualHost:"
    echo ""
    echo "----------------------------------------"
    echo "LimitRequestBody 10485760"
    echo "----------------------------------------"
    echo ""
    echo "Config file locations to check:"
    echo "  • /etc/apache2/sites-available/000-default.conf"
    echo "  • /etc/apache2/sites-available/your-domain.com.conf"
    echo ""
    read -p "Press Enter after you've added the configuration..."
    
    echo ""
    echo "Testing Apache configuration..."
    if sudo apache2ctl configtest; then
        echo "✓ Apache configuration is valid"
        echo ""
        echo "Restarting Apache..."
        sudo systemctl restart apache2
        echo "✓ Apache restarted successfully"
    else
        echo "✗ Apache configuration has errors. Please fix them and try again."
        exit 1
    fi
fi

# Step 4: Rebuild Next.js
echo ""
echo "Step 3: Rebuilding Next.js application..."
echo ""

if [ ! -f "package.json" ]; then
    echo "⚠ Warning: package.json not found. Are you in the project directory?"
    read -p "Enter the full path to your project: " PROJECT_DIR
    cd "$PROJECT_DIR" || exit 1
fi

# Check if next.config.mjs has the correct configuration
if grep -q "bodySizeLimit" next.config.mjs; then
    echo "✓ next.config.mjs has bodySizeLimit configuration"
else
    echo "⚠ Warning: next.config.mjs may not have the correct configuration"
    echo "Please ensure it contains:"
    echo ""
    echo "  experimental: {"
    echo "    serverActions: {"
    echo "      bodySizeLimit: '10mb',"
    echo "    },"
    echo "  },"
    echo ""
fi

echo ""
echo "Building Next.js..."
npm run build

if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "✗ Build failed. Please check the errors above."
    exit 1
fi

# Step 5: Restart Next.js application
echo ""
echo "Step 4: Restarting Next.js application..."

# Check for PM2
if command -v pm2 &> /dev/null; then
    echo "Detected PM2. Restarting..."
    pm2 restart all
    echo "✓ PM2 restarted"
# Check for systemd service
elif systemctl list-units --type=service | grep -q "nextjs"; then
    echo "Detected systemd service. Restarting..."
    sudo systemctl restart nextjs
    echo "✓ Systemd service restarted"
else
    echo "⚠ Could not automatically restart Next.js app."
    echo "Please restart your Next.js application manually."
fi

echo ""
echo "=========================================="
echo "✓ Deployment Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Test the career page upload functionality"
echo "2. Check logs if issues persist:"
echo "   • Nginx: sudo tail -f /var/log/nginx/error.log"
echo "   • PM2: pm2 logs"
echo "   • Systemd: sudo journalctl -u nextjs -f"
echo ""
echo "File upload should now work up to 5MB!"
