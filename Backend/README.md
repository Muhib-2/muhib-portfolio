# Portfolio Backend API

A Node.js/Express backend API for managing portfolio data with MongoDB Atlas.

## Features

- RESTful API for portfolio data management
- JWT authentication for admin access
- MongoDB Atlas integration
- CORS enabled for frontend integration
- Environment-based configuration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Portfolio Routes
- `GET /api/portfolio` - Get portfolio data
- `PUT /api/portfolio` - Update entire portfolio (requires auth)
- `PUT /api/portfolio/section/:section` - Update specific section (requires auth)

### Authentication Routes
- `POST /api/auth/register` - Register new admin user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (requires auth)

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer your_jwt_token
```

## Database Schema

The portfolio data includes:
- Profile information
- About section
- Skills and tech stack
- Education history
- Work experience
- Projects
- Contact information