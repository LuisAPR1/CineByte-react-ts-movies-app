# Movies App

A full-stack web application for discovering and managing movies and TV shows. Built with React, TypeScript, and Node.js, this app provides users with a comprehensive platform to browse popular content, search for specific titles, manage favorites, and maintain user accounts. 
**This project was developed as part of a university course assignment.**


> **First time here?** Check out the [**Complete Installation Guide (SETUP.md)**](SETUP.md) for detailed instructions on how to install Node.js, configure SMTP, and run the application.

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

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety and development experience
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Material-UI** - UI component library
- **Styled Components** - CSS-in-JS styling
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **NeDB** - Embedded database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Nodemailer** - Email functionality
- **UUID** - Unique identifier generation

### External APIs
- **The Movie Database (TMDb)** - Movie and TV show data

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

## API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `GET /activate?token={token}` - Account activation

### User Management
- `GET /profile` - Get user profile (requires authentication)
- `PUT /profile` - Update user profile (requires authentication)
- `GET /favorites` - Get user favorites (requires authentication)
- `POST /favorites` - Add to favorites (requires authentication)
- `DELETE /favorites/:id` - Remove from favorites (requires authentication)

## Usage

1. **Browse Movies**: Visit the home page to see popular, top-rated, and upcoming movies
2. **Search Content**: Use the search bar to find specific movies or TV shows
3. **View Details**: Click on any movie or TV show to see detailed information
4. **Create Account**: Register for an account to access personalized features
5. **Manage Favorites**: Add movies and TV shows to your favorites list
6. **Filter Content**: Use the filter bar to narrow down results by genre, year, or rating

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the movie and TV show data API
- React and TypeScript communities for excellent documentation and tools

---

*This README was AI generated by Claude 2.7 Sonnet*
