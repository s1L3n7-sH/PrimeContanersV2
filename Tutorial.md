# Prime Containers Project - Setup & Run Guide

This guide provides step-by-step instructions for setting up and running the Prime Containers application on **Windows** and **Linux**.

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

1.  **Node.js**: Version 18.17.0 or higher is required.
    *   [Download Node.js](https://nodejs.org/)
2.  **MySQL Database**: You need a running MySQL server (e.g., via XAMPP, MySQL Workbench, or a Docker container).
    *   [Download MySQL](https://dev.mysql.com/downloads/installer/) (Windows)
    *   `sudo apt install mysql-server` (Linux/Ubuntu)
3.  **Git**: To clone the repository.

---

## 🚀 Quick Start (Both Platforms)

These steps are common for both Windows and Linux environments.

### 1. Clone the Repository
```bash
git clone <repository_url>
cd PrimeContainers
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env` in the root directory:
```bash
# Copy the example file if it exists, or create new
cp .env.example .env
```

Open `.env` and add the following configuration:
```env
# Database Connection String
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
DATABASE_URL="mysql://root:@localhost:3306/prime_containers"

# Security Secret for Admin Sessions (Change this to a long random string)
JWT_SECRET="your_super_secret_secure_key_123"
```
> **Note:** If you are using XAMPP on Windows with default settings, the password is often empty (as shown above). On Linux, you likely set a password during installation.

---

## 🪟 Running on Windows

### 1. Database Setup
Make sure your MySQL server (e.g., XAMPP Apache & MySQL) is **Running**.

Initialize the database schema and generate the Prisma Client:
```powershell
# Updates the DB schema to match your code
npx prisma db push

# Generate the type definitions
npx prisma generate
```

### 2. Seed the Database (Create Admin)
Create the initial Administrator account:
```powershell
npx tsx prisma/seed.ts
```
> *Default Admin Login:*
> *   **Email:** `admin@prime.com`
> *   **Password:** `admin`

### 3. Run the Development Server
```powershell
npm run dev
```
Access the site at: `http://localhost:3000`
Access the Admin Panel at: `http://localhost:3000/prime-panel/login`

---

## 🐧 Running on Linux (Ubuntu/Debian)

### 1. Database Setup
Ensure your MySQL service is active:
```bash
sudo systemctl status mysql
```

Initialize the database:
```bash
# Push schema to DB
npx prisma db push

# Generate Client
npx prisma generate
```

### 2. Seed the Database
```bash
npx tsx prisma/seed.ts
```

### 3. Run the Server
**Development Mode:**
```bash
npm run dev
```

**Production Mode (Recommended for Deployment):**
```bash
# Build the application
npm run build

# Start the production server
npm start
```

---

## 🔧 Common Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server with Hot Module Reloading. |
| `npx prisma studio` | Opens a visual database editor in your browser. |
| `npx prisma db push` | Syncs your schema.prisma changes to the database. |
| `npx prisma generate` | Regenerates the Prisma Client (run this after schema changes). |

## ⚠️ Troubleshooting

1.  **Prisma Client Error / "isActive" missing**:
    *   Run `npx prisma generate` and restart your dev server.
    *   This usually happens if the database schema changed but the client wasn't updated.

2.  **Database Connection Failed**:
    *   Double-check your `DATABASE_URL` in the `.env` file.
    *   Ensure MySQL is running on port 3306.
    *   Verify the username and password are correct.
