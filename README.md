# Movies App

> **First time here?** Check out the [**Complete Installation Guide (SETUP.md)**](SETUP.md) for detailed instructions on how to install Node.js, configure SMTP, and run the application.

A full-stack web application for discovering and managing movies and TV shows. Built with React, TypeScript, and Node.js, this app provides users with a comprehensive platform to browse popular content, search for specific titles, manage favorites, and maintain user accounts.  
**This project was developed as part of a university course assignment.**

## Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation](#installation)  
- [Running the Application](#running-the-application)  
- [API Endpoints](#api-endpoints)  
- [Usage](#usage)  
- [Contributing](#contributing)

---

## Features

### Frontend Features

- **Movie Discovery**: Browse popular, top-rated, now playing, and upcoming movies  
- **TV Show Discovery**: Explore popular, top-rated, and currently airing TV shows  
- **Advanced Search**: Search for movies and TV shows with real-time results  
- **Movie Details**: View comprehensive information about movies including cast, crew, ratings, and reviews  
- **Favorites System**: Save and manage your favorite movies and TV shows  
- **User Authentication**: Secure user registration and login system  
- **Account Management**: Edit user profile and account settings  
- **Responsive Design**: Modern, mobile-friendly interface  
- **Filter System**: Filter content by genre, certification, and year

### Backend Features

- **RESTful API**: Express.js server with TypeScript  
- **User Authentication**: JWT-based authentication with bcrypt password hashing  
- **Email Verification**: SMTP integration for account activation  
- **Database**: NeDB for user data and favorites storage  
- **Security**: Password hashing, JWT tokens, and input validation

---

## Tech Stack

### Frontend

| Purpose | Technology |
|---------|------------|
| UI Framework | React 18 |
| Type Safety | TypeScript |
| Routing | React Router DOM |
| HTTP Client | Axios |
| UI Components | Material-UI |
| Styling | Styled Components |
| Icons | React Icons |

### Backend

| Purpose | Technology |
|---------|------------|
| Runtime | Node.js |
| Framework | Express.js |
| Type Safety | TypeScript |
| Database | NeDB |
| Authentication | JWT |
| Password Hashing | bcrypt |
| Email | Nodemailer |
| ID Generation | UUID |

### External APIs

- **The Movie Database (TMDb)** – Movie and TV show data

---

## Project Structure

```
DAW/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── modules/       # API services and utilities
│   │   ├── context/       # React context providers
│   │   └── styles/        # CSS stylesheets
│   └── package.json
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── types/         # TypeScript type definitions
│   │   ├── main.ts        # Express server setup
│   │   ├── users.ts       # User management logic
│   │   ├── SMTP.ts        # Email functionality
│   │   └── serverInfo.ts  # Server configuration
│   └── package.json
└── README.md
```

---

## Installation

> **📖 For detailed installation and configuration instructions, see [SETUP.md](SETUP.md)**

### Quick Start

1. **Check Node.js** (v16+)
   ```bash
   node --version
   npm --version
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   Create `.env` in the `server` folder:
   ```env
   JWT_SECRET=your_jwt_secret_here
   ```

   Edit `server/server/serverInfo.json` with SMTP credentials:
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

---

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:8080`

2. **Start the frontend application**
   ```bash
   cd client
   npm start
   ```
   The application will open in your browser at `http://localhost:3000`

### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend**
   ```bash
   cd server
   npm run compile
   npm start
   ```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | User registration |
| POST | `/login` | User login |
| GET | `/activate?token={token}` | Account activation |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get user profile (requires auth) |
| PUT | `/profile` | Update user profile (requires auth) |
| GET | `/favorites` | Get user favorites (requires auth) |
| POST | `/favorites` | Add to favorites (requires auth) |
| DELETE | `/favorites/:id` | Remove from favorites (requires auth) |

---

## Usage

1. **Browse Movies**: Visit the home page to see popular, top-rated, and upcoming movies  
2. **Search Content**: Use the search bar to find specific movies or TV shows  
3. **View Details**: Click on any movie or TV show to see detailed information  
4. **Create Account**: Register for an account to access personalized features  
5. **Manage Favorites**: Add movies and TV shows to your favorites list  
6. **Filter Content**: Use the filter bar to narrow down results by genre, year, or rating

---

## Contributing

1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add some amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request

---

## License & Acknowledgments

- Educational project developed as part of a university course.  
- Licensed under the ISC License.  
- [The Movie Database (TMDb)](https://www.themoviedb.org/) for the movie and TV show data API.  
- React and TypeScript communities for excellent documentation and tools.

---

*README written with supervised assistance from Claude Opus 4.7.*
