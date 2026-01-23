# ⚡ Quick Start: Fix Upload Issues on Ubuntu

## What You Have Now

✅ 413 error is **FIXED** (Nginx configured)  
⚠️ Getting "Failed to submit application"  
⚠️ Database error: CareerApplication table doesn't exist

---

## 🎯 Solution in 4 Steps

### Step 1: Pull & Deploy (on Ubuntu server)

```bash
cd ~/PrimeContanersV2
git pull origin main
```

### Step 2: Sync Database Schema (on Ubuntu server)

```bash
chmod +x sync-database-ubuntu.sh
./sync-database-ubuntu.sh
```

This creates the `CareerApplication` table in your database.

### Step 3: Fix Permissions (on Ubuntu server)

```bash
chmod +x fix-permissions-ubuntu.sh
./fix-permissions-ubuntu.sh
```

### Step 4: Rebuild & Restart (on Ubuntu server)

```bash
npm run build
pm2 restart all  # or your restart command
```

---

## 🧪 Test It

1. Go to your career page: `http://164.90.134.53/career`
2. Upload a PDF (< 5MB)
3. Check the logs to see detailed error messages:

```bash
pm2 logs --lines 20
```

---

## ✅ Success Indicators

You'll see logs like this:

```
✓ Uploads directory ready: /home/user/PrimeContanersV2/public/uploads/resumes
✓ File saved: /home/user/.../resume.pdf
✓ File verified: 245678 bytes
✓ Database record created for user@example.com
✓✓✓ Application submitted successfully
```

---

## ❌ If Still Failing

The logs will now show **exactly** what's wrong:

| Log Message | What to Do |
|-------------|------------|
| `Failed to create uploads directory: EACCES` | Run `./fix-permissions-ubuntu.sh` again |
| `Database error: Can't reach database` | Check `.env` file and database service |
| `Failed to save file: ENOSPC` | Free up disk space |

---

## 📚 More Help

- **Quick fix**: `QUICK_FIX_UBUNTU.md`
- **Full guide**: `DEPLOYMENT_UBUNTU_SERVER.md`
- **Debugging**: Run `./debug-ubuntu.sh`
- **Troubleshooting**: `TROUBLESHOOTING_UBUNTU.md`

---

## 💡 Why This Happens

- **Windows**: Uses `C:\` paths, different permissions
- **Ubuntu**: Uses `/home/` paths, strict file permissions
- **Result**: Code works on Windows but fails on Linux without proper permissions

The updated code now:
1. ✅ Has detailed error logging
2. ✅ Shows exactly what failed
3. ✅ Helps you fix it quickly

---

**TL;DR**: Pull code → Fix permissions → Rebuild → Check logs → Success! 🎉
