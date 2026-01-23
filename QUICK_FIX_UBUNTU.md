# 🚀 Quick Fix: Ubuntu Server Upload Issue

## The Problem
- ✅ Works on Windows
- ❌ Fails on Ubuntu Server (413 error)

## Why? 
Your **Nginx reverse proxy** on Ubuntu has a **1MB default limit**, blocking uploads before they reach Next.js.

---

## Quick Solution (5 minutes)

### 1️⃣ SSH into your Ubuntu server
```bash
ssh user@164.90.134.53
```

### 2️⃣ Edit Nginx config
```bash
sudo nano /etc/nginx/sites-available/default
```

### 3️⃣ Add this line in the `server` block
```nginx
client_max_body_size 10M;
```

**Full example:**
```nginx
server {
    listen 80;
    server_name 164.90.134.53;
    
    client_max_body_size 10M;  # ← Add this line
    
    location / {
        proxy_pass http://localhost:3000;
        # ... other proxy settings
    }
}
```

### 4️⃣ Test & reload
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 5️⃣ Pull latest code & rebuild
```bash
cd ~/PrimeContanersV2
git pull
npm run build
pm2 restart all  # or your process manager
```

---

## ✅ Done!

Your career page should now accept PDF uploads up to 5MB.

---

## 📁 Additional Resources

- **Full guide**: See `DEPLOYMENT_UBUNTU_SERVER.md`
- **Auto script**: Run `deploy-ubuntu-fix.sh` on Ubuntu server
- **Diagram**: See the visual flow diagram above

---

## 🆘 Still Having Issues?

### Check Nginx logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check your app logs:
```bash
pm2 logs  # if using PM2
```

### Verify Next.js is running:
```bash
pm2 list
# or
sudo netstat -tulpn | grep :3000
```

---

## 📊 Configuration Summary

| Component | Setting | Value |
|-----------|---------|-------|
| Next.js | `bodySizeLimit` | `10mb` |
| Nginx | `client_max_body_size` | `10M` |
| Client validation | Max file size | 5MB |

---

**Note:** The 10MB limit provides overhead for form data and headers. Users can upload PDFs up to 5MB.
