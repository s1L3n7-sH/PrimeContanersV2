# 🐛 Troubleshooting: "Failed to submit application" on Ubuntu

## ✅ Good News
The **413 error is gone**, which means Nginx is now accepting uploads!

## ❌ New Problem
Getting "Failed to submit application" - this is now a **server-side error** in your Next.js app.

---

## 🔍 Most Likely Causes (in order)

### 1. **File Permission Issues** (90% of cases)
The Node.js process can't create directories or write files.

### 2. **Missing Directories**
The `public/uploads/resumes` directory doesn't exist.

### 3. **Database Issues**
Prisma can't connect to the database or the schema is out of sync.

---

## 🚀 Quick Fix (Try this first!)

### On your Ubuntu server:

```bash
# 1. Go to your project directory
cd ~/PrimeContanersV2

# 2. Pull the latest code (has better error logging)
git pull

# 3. Run the permission fix
chmod +x fix-permissions-ubuntu.sh
./fix-permissions-ubuntu.sh

# 4. Rebuild
npm run build

# 5. Restart
pm2 restart all  # or your restart command
```

---

## 📊 Detailed Debugging

### Step 1: Deploy Updated Code

The updated code has **detailed error logging** that will tell you exactly what's wrong.

```bash
cd ~/PrimeContanersV2
git pull
npm install  # in case there are new dependencies
npm run build
pm2 restart all
```

### Step 2: Check Logs

Try uploading again, then immediately check the logs:

```bash
# If using PM2:
pm2 logs --lines 50

# If using systemd:
sudo journalctl -u your-nextjs-service -n 50

# If using direct node:
# Check wherever your console.log output goes
```

### Step 3: Look for Specific Errors

The new error logging will show one of these:

| Error Message | Cause | Fix |
|---------------|-------|-----|
| "Failed to create uploads directory: EACCES" | Permission denied | Run `fix-permissions-ubuntu.sh` |
| "Failed to save file: ENOSPC" | Disk full | Free up disk space |
| "Database error: Can't reach database" | DB connection issue | Check `.env` DATABASE_URL |
| "Database error: Unknown column" | Schema mismatch | Run `npx prisma db push` |

### Step 4: Run Debug Script

```bash
cd ~/PrimeContanersV2
chmod +x debug-ubuntu.sh
./debug-ubuntu.sh
```

This will check:
- ✓ Directory existence and permissions
- ✓ Disk space
- ✓ Database configuration
- ✓ Process status

---

## 🔧 Manual Fixes

### Fix 1: Permission Issues

```bash
# Create the directory
mkdir -p ~/PrimeContanersV2/public/uploads/resumes

# Fix ownership (replace 'youruser' with your username)
sudo chown -R $USER:$USER ~/PrimeContanersV2/public

# Fix permissions
chmod -R 755 ~/PrimeContanersV2/public

# Test write permission
touch ~/PrimeContanersV2/public/uploads/resumes/test.txt
# If above works:
rm ~/PrimeContanersV2/public/uploads/resumes/test.txt
```

### Fix 2: Database Issues

```bash
cd ~/PrimeContanersV2

# Check if .env exists
cat .env | grep DATABASE_URL

# Regenerate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Test database connection
npx prisma db execute --stdin <<< "SELECT 1;"
```

### Fix 3: Disk Space Issues

```bash
# Check disk space
df -h

# If disk is full, clean up:
# - Old log files
# - PM2 logs: pm2 flush
# - Node modules: find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
#   Then run: npm install
```

---

## 🎯 Common Scenarios

### Scenario A: Permission Denied

**Symptoms:**
- Works on Windows
- Fails on Ubuntu with "Failed to submit application"
- Logs show: `EACCES: permission denied`

**Solution:**
```bash
sudo chown -R $USER:$USER ~/PrimeContanersV2/public
chmod -R 755 ~/PrimeContanersV2/public
pm2 restart all
```

### Scenario B: Database Connection Failed

**Symptoms:**
- Error mentions "database" or "prisma"
- Logs show: `Can't reach database server`

**Solution:**
```bash
# Check database is running
sudo systemctl status mysql  # or postgresql

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Test connection
npx prisma db execute --stdin <<< "SELECT 1;"

# Regenerate and push
npx prisma generate
npx prisma db push
```

### Scenario C: Missing CareerApplication Table

**Symptoms:**
- Error mentions "table doesn't exist"
- Logs show: `Table 'CareerApplication' doesn't exist`

**Solution:**
```bash
# Push the schema
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

---

## 📝 Understanding the Error Flow

With the updated code, you'll see detailed logs like this:

### ✅ Success Flow:
```
✓ Uploads directory ready: /home/user/PrimeContanersV2/public/uploads/resumes
✓ File saved: /home/user/PrimeContanersV2/public/uploads/resumes/1234567890-abc123-resume.pdf
✓ File verified: 245678 bytes
✓ Database record created for user@example.com
✓✓✓ Application submitted successfully for user@example.com
```

### ❌ Error Examples:

**Permission Error:**
```
Failed to create uploads directory: EACCES: permission denied, mkdir '/path/to/public/uploads/resumes'
```

**Write Error:**
```
✓ Uploads directory ready: /path/to/public/uploads/resumes
Failed to write file: EACCES: permission denied, open '/path/to/resumes/file.pdf'
```

**Database Error:**
```
✓ Uploads directory ready: /path/to/public/uploads/resumes
✓ File saved: /path/to/resumes/file.pdf
✓ File verified: 245678 bytes
Failed to save to database: Error: Can't reach database server at `localhost:3306`
✓ Cleaned up file after DB error: /path/to/resumes/file.pdf
```

---

## 🆘 Still Not Working?

### 1. Share the exact error from logs

After uploading, check PM2 logs and share the **exact error message**:

```bash
pm2 logs --lines 100 > error-log.txt
```

### 2. Check file system info

```bash
# Run the debug script
./debug-ubuntu.sh > debug-output.txt
```

### 3. Verify environment differences

```bash
# On Ubuntu server:
node --version
npm --version
pwd
whoami
ls -la public/

# Compare with Windows (your dev machine)
```

---

## 📋 Checklist

Before asking for more help, verify:

- [ ] Pulled latest code with improved error logging
- [ ] Ran `npm install` and `npm run build`
- [ ] Restarted the application (`pm2 restart all`)
- [ ] Checked the logs (`pm2 logs`)
- [ ] Verified directory exists and has correct permissions
- [ ] Tested database connection (`npx prisma db execute --stdin <<< "SELECT 1;"`)
- [ ] Have enough disk space (`df -h`)

---

## 🎉 Once Fixed

After fixing, you should see:
- ✅ No 413 errors
- ✅ No "Failed to submit application" errors
- ✅ Success message: "Application submitted successfully!"
- ✅ File saved in `/public/uploads/resumes/`
- ✅ Record created in database

Test with:
1. Small PDF (< 1MB) - should work
2. Larger PDF (2-3 MB) - should work
3. Very large PDF (> 5MB) - should show clear error message
