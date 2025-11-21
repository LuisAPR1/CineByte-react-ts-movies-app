#  Installation and Configuration Guide

This guide will help you install and configure the Movies App from scratch.

---

##  Prerequisites

### 1. Check if you have Node.js installed

Open the terminal/PowerShell and run:

```bash
node --version
```

**Expected result**: Should show the Node.js version (example: `v18.0.0` or higher)

**If you don't have Node.js installed:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version
3. Run the installer and follow the instructions
4. Restart the terminal and check again with `node --version`

### 2. Check if you have npm installed

npm comes automatically with Node.js. Check with:

```bash
npm --version
```

**Expected result**: Should show the npm version (example: `9.0.0` or higher)

---

##  Installing Dependencies

### 1. Install server dependencies (backend)

```bash
cd server
npm install
```

This will install all necessary packages for the backend (Express, JWT, bcrypt, etc.)

### 2. Install client dependencies (frontend)

```bash
cd ../client
npm install
```

This will install all necessary packages for the frontend (React, TypeScript, Material-UI, etc.)

---

##  Configuration

### 1. Configure JWT Secret

The server uses JWT (JSON Web Tokens) for authentication. You need to define a secret key.

**File**: `server/.env`

Create the `.env` file in the `server` folder (if it doesn't exist) and add:

```env
JWT_SECRET=your_super_secure_secret_key_here_123456
```

> **Tip**: Use a random and complex string. You can generate one with:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
> ```

### 2. Configure SMTP (Email)

The server sends confirmation emails when a user registers. You need to configure the SMTP credentials.

**File**: `server/server/serverInfo.json`

Edit the `server/server/serverInfo.json` file with your email credentials:

```json
{
  "smtp": {
    "host": "smtp.gmail.com",
    "port": 587,
    "auth": {
      "user": "your_email@gmail.com",
      "pass": "your_password_or_app_password"
    }
  }
}
```

#### SMTP Options:

**Gmail** (recommended for testing):
```json
{
  "smtp": {
    "host": "smtp.gmail.com",
    "port": 587,
    "auth": {
      "user": "your_email@gmail.com",
      "pass": "your_app_password"
    }
  }
}
```
>  **Important**: For Gmail, you need to generate an [App Password](https://myaccount.google.com/apppasswords), don't use your normal password!

**Outlook/Hotmail**:
```json
{
  "smtp": {
    "host": "smtp-mail.outlook.com",
    "port": 587,
    "auth": {
      "user": "your_email@outlook.com",
      "pass": "your_password"
    }
  }
}
```

**Yahoo**:
```json
{
  "smtp": {
    "host": "smtp.mail.yahoo.com",
    "port": 587,
    "auth": {
      "user": "your_email@yahoo.com",
      "pass": "your_app_password"
    }
  }
}
```

**For testing without real email**:
- SMTP errors will not block user registration
- The activation token appears in the server console
- You can activate accounts manually using: `http://localhost:8080/activate?token=<token>`

---

##  Running the Application

### Option 1: Development Mode (Recommended)

**1. Start the server (backend)**

```bash
cd server
npm run dev
```

The server will:
- Compile automatically when you make code changes
- Restart automatically with nodemon
- Run on `http://localhost:8080`

**2. Start the client (frontend)**

In a new terminal window:

```bash
cd client
npm start
```

The client will:
- Open automatically in the browser
- Update automatically when you make code changes
- Run on `http://localhost:3000`

### Option 2: Production Mode

**1. Compile the server**

```bash
cd server
npm run compile
```

**2. Start the server**

```bash
npm start
```

**3. Build the client**

```bash
cd client
npm run build
```

The compiled files will be in `client/build/` and can be served by any web server.

---

##  Verify Everything is Working

### 1. Check the server

Open your browser at `http://localhost:8080` - you should see a message or the static application.

### 2. Check the API

Test the status endpoint (if it exists) or try registering a user:

```bash
# PowerShell
$body = @{username='test'; email='test@example.com'; password='123456'} | ConvertTo-Json
Invoke-WebRequest -Uri 'http://localhost:8080/register' -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing
```

### 3. Check the client

Open your browser at `http://localhost:3000` - you should see the Movies App interface.

---

##  Troubleshooting

### Error: "Port 8080 already in use"

A process is already running on port 8080.

**Windows (PowerShell)**:
```bash
# See which process is using the port
netstat -ano | findstr :8080

# Kill the process (replace <PID> with the process number)
taskkill /PID <PID> /F
```

**Linux/Mac**:
```bash
# See which process is using the port
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Error: "npm: command not found"

Node.js is not installed or not in PATH. Reinstall Node.js and restart the terminal.

### Error: "Cannot find module"

Dependencies were not installed correctly. Run:

```bash
# On server
cd server
rm -rf node_modules package-lock.json
npm install

# On client
cd client
rm -rf node_modules package-lock.json
npm install
```

### SMTP Error: "Invalid login" or "Authentication unsuccessful"

SMTP credentials are incorrect. Check:
- If the email and password are correct in `serverInfo.json`
- If you're using an App Password (required for Gmail)
- If the account allows SMTP authentication

**Temporary solution**: The application works even without SMTP configured. The activation token appears in the server console.

### Error: "Access denied for user"

Database problem. Since this application uses NeDB (local file), this error should not happen. Check if you have write permissions in the `server/build/` folder.

---

##  Available Scripts

### Server (server/)

- `npm start` - Starts the compiled server
- `npm run dev` - Development mode with nodemon
- `npm run compile` - Compiles TypeScript and starts the server

### Client (client/)

- `npm start` - Starts in development mode
- `npm run build` - Builds for production
- `npm test` - Runs tests (if they exist)

---

##  Next Steps

After you have everything working:

1. **Test Registration**: Create a new account at `http://localhost:3000/register`
2. **Activate Account**: Use the link from the email or server console
3. **Login**: Sign in with your credentials
4. **Explore**: Browse movies and add favorites!

---

##  Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [The Movie Database API](https://www.themoviedb.org/documentation/api)

---

##  Need Help?

If you encounter problems not covered in this guide:

1. Check the logs in the server console and browser
2. Search for the specific error online
3. Verify that all dependencies were installed correctly
4. Confirm you're using compatible Node.js versions (v16+)

---
