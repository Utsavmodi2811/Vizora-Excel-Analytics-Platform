# Vizora Backend

Backend server for the Vizora Excel Analytics Web App, built with Node.js, Express, and MongoDB.

## Features

- User & Admin Authentication (JWT)
- Excel File Upload & Processing
- Chart Data Generation
- Analysis History
- Chart Image Download
- Admin Dashboard
- User Management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/vizora
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   UPLOAD_DIR=uploads
   AI_API_KEY=your_ai_api_key_here
   ```
5. Create the uploads directory:
   ```bash
   mkdir uploads
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/profile` - Get user profile

### Excel Processing
- POST `/api/excel/upload` - Upload Excel file
- POST `/api/excel/process` - Process Excel data

### Charts
- GET `/api/charts/data/:analysisId` - Get chart data
- GET `/api/charts/download/:analysisId` - Download chart image
- GET `/api/charts/history` - Get analysis history

### Admin
- GET `/api/admin/dashboard` - Get dashboard stats
- GET `/api/admin/users` - Get all users
- PATCH `/api/admin/users/:userId/block` - Block/Unblock user
- DELETE `/api/admin/users/:userId` - Delete user

## Security

- JWT Authentication
- Password Hashing
- Rate Limiting
- CORS Protection
- Helmet Security Headers

## Error Handling

The API uses a centralized error handling system that returns appropriate HTTP status codes and error messages.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 