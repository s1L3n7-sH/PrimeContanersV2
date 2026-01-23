# Ubuntu Server Deployment Guide - File Upload Configuration

This guide helps you fix the **413 Request Entity Too Large** error on your Ubuntu server.

## Problem

The 413 error occurs when your **reverse proxy** (Nginx/Apache) rejects large file uploads, even though your Next.js application is configured to accept them.

---

## Solution: Configure Your Reverse Proxy

### Step 1: Check Which Web Server You're Using

SSH into your Ubuntu server and run:

```bash
# Check if Nginx is running
sudo systemctl status nginx

# Check if Apache is running
sudo systemctl status apache2
```

---

## If You're Using **Nginx** (Most Common)

### Step 1: Edit Nginx Configuration

Find your site's Nginx configuration file. It's usually in one of these locations:

```bash
# Option 1: Sites-available
sudo nano /etc/nginx/sites-available/default

# Option 2: Nginx config
sudo nano /etc/nginx/nginx.conf

# Option 3: Your specific site config
sudo nano /etc/nginx/sites-available/your-domain.com
```

### Step 2: Add `client_max_body_size` Directive

Add this line inside the `http`, `server`, or `location` block:

```nginx
server {
    listen 80;
    server_name 164.90.134.53;  # or your domain
    
    # Add this line - allows up to 10MB uploads
    client_max_body_size 10M;
    
    location / {
        proxy_pass http://localhost:3000;  # Your Next.js app
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Also add this for proxied requests
        proxy_request_buffering off;
    }
}
```

**Important:** The `client_max_body_size` should be **larger** than your actual max file size to account for form data overhead.

### Step 3: Test Configuration

Before restarting, test your Nginx configuration:

```bash
sudo nginx -t
```

If you see **"syntax is ok"** and **"test is successful"**, proceed to the next step.

### Step 4: Reload Nginx

```bash
sudo systemctl reload nginx

# Or restart if reload doesn't work
sudo systemctl restart nginx
```

### Step 5: Verify

Check that Nginx is running properly:

```bash
sudo systemctl status nginx
```

---

## If You're Using **Apache**

### Step 1: Edit Apache Configuration

```bash
# Option 1: Sites-available
sudo nano /etc/apache2/sites-available/000-default.conf

# Option 2: Your specific site config
sudo nano /etc/apache2/sites-available/your-domain.com.conf
```

### Step 2: Add LimitRequestBody Directive

Add this inside your `<VirtualHost>` block:

```apache
<VirtualHost *:80>
    ServerName 164.90.134.53
    
    # Allow up to 10MB (value is in bytes)
    LimitRequestBody 10485760
    
    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

### Step 3: Test Configuration

```bash
sudo apache2ctl configtest
```

### Step 4: Restart Apache

```bash
sudo systemctl restart apache2
```

---

## Ensure Next.js Config is Deployed

Make sure your updated `next.config.mjs` is on the server:

### Step 1: Verify the File Exists on Server

```bash
cat ~/your-project-directory/next.config.mjs
```

It should contain:

```javascript
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};
```

### Step 2: Rebuild Your Application

After updating the config, rebuild your Next.js application:

```bash
cd ~/your-project-directory
npm run build
pm2 restart all  # Or restart your process manager
```

---

## Full Deployment Checklist

When deploying changes from Windows to Ubuntu:

- [ ] **1. Push code to repository**
  ```bash
  git add .
  git commit -m "Fix: Increase file upload limit"
  git push origin main
  ```

- [ ] **2. SSH into Ubuntu server**
  ```bash
  ssh user@164.90.134.53
  ```

- [ ] **3. Pull latest changes**
  ```bash
  cd ~/PrimeContanersV2  # Or your project directory
  git pull origin main
  ```

- [ ] **4. Install dependencies (if needed)**
  ```bash
  npm install
  ```

- [ ] **5. Rebuild Next.js**
  ```bash
  npm run build
  ```

- [ ] **6. Configure Nginx/Apache** (see above)

- [ ] **7. Restart services**
  ```bash
  # Restart Nginx
  sudo systemctl restart nginx
  
  # Restart Next.js app (if using PM2)
  pm2 restart all
  
  # Or if using systemd
  sudo systemctl restart your-nextjs-service
  ```

---

## Testing the Fix

### 1. Check Nginx Error Logs (if issues persist)

```bash
sudo tail -f /var/log/nginx/error.log
```

### 2. Check Next.js Application Logs

```bash
# If using PM2
pm2 logs

# If using systemd
sudo journalctl -u your-nextjs-service -f
```

### 3. Test Upload

Try uploading a PDF file through the career page and check if it succeeds.

---

## Common Issues & Solutions

### Issue: "Permission denied" when editing Nginx config

**Solution:** Use `sudo` before commands:
```bash
sudo nano /etc/nginx/sites-available/default
```

### Issue: Changes don't take effect

**Solution:** 
1. Clear browser cache
2. Restart both Nginx AND your Next.js application
3. Verify the configuration was saved correctly

### Issue: Still getting 413 error

**Solution:**
1. Check if there are **multiple Nginx config files** that might override your settings
2. Make sure `client_max_body_size` is in the correct block (server or location)
3. Verify your Next.js app restarted after the config change

---

## Quick Reference

### Recommended Values:

- **Next.js bodySizeLimit**: `10mb` (in `next.config.mjs`)
- **Nginx client_max_body_size**: `10M`
- **Apache LimitRequestBody**: `10485760` (10MB in bytes)

### Why 10MB when max file is 5MB?

The total request size includes:
- The PDF file (up to 5MB)
- Form data (name, email, phone)
- HTTP headers
- Multipart form boundaries

10MB provides enough overhead for all of this.

---

## Need Help?

If you're still experiencing issues:

1. Check which process manager you're using:
   ```bash
   pm2 list  # For PM2
   sudo systemctl list-units | grep next  # For systemd
   ```

2. Verify your Next.js app is running:
   ```bash
   sudo netstat -tulpn | grep :3000
   ```

3. Test directly without proxy:
   ```bash
   curl -X POST http://localhost:3000/career \
     -F "resume=@test.pdf" \
     -F "fullName=Test" \
     -F "email=test@example.com" \
     -F "phone=1234567890"
   ```
