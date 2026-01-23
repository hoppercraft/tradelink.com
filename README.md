# TradeLink - Trading Platform

A full-stack web application for trading products built with React (Frontend) and Express.js + MongoDB (Backend).


## Working
## author
Prabin K.C.
kcprabin2063@gmail.com

## Features

https://github.com/user-attachments/assets/cef83155-4c95-46f7-a3da-2d795603f11d



- User Authentication (Register/Login/Logout)
- Create and Post Products/Items
- Browse Products
- User Profiles
- Product Management (Edit/Delete)
- Image Upload via Cloudinary

## Tech Stack

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary for image storage
- Cookie-parser for session management
- Bcrypt for password hashing

### Frontend
- React 19
- Vite
- TailwindCSS
- Axios for API calls
- React Router DOM
- JWT Decode

## Prerequisites

Before running this application, make sure you have:
- Node.js (v16 or higher)
- MongoDB installed and running locally or MongoDB Atlas account
- Cloudinary account (for image uploads)

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env-sample .env
```

4. Configure your `.env` file with the following:
```env
PORT=8000
MONGO_URL=mongodb://localhost:27017/tradelink
accessToken_SECRET=your-secret-key-here
accessToken_EXPIRE=1d
refreshToken_SECRET=your-refresh-secret-key-here
refreshToken_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

**Important**: Replace the placeholder values with your actual credentials:
- Generate secure random strings for JWT secrets
- Get Cloudinary credentials from your Cloudinary dashboard

5. Start MongoDB (if running locally):
```bash
# On Linux/Mac
sudo systemctl start mongodb
# or
mongod

# On Windows
# MongoDB should start as a service automatically
```

6. Start the backend server:
```bash
npm start
```

The backend server should now be running on `http://localhost:8000`

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file should already be created with:
```env
VITE_API_URL=http://localhost:8000
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend should now be running on `http://localhost:5173`

## Usage

### 1. Register a New Account
- Open your browser and go to `http://localhost:5173`
- You'll be redirected to the login page
- Click on "Register" and create a new account with a username and password

### 2. Login
- After registration, login with your credentials
- You'll be redirected to the home page with the Explore view

### 3. Create a Post
- Click on "Post" in the sidebar
- Fill in the product details:
  - Upload an image
  - Enter item name
  - Add description
  - Set price
  - Add location
- Click "Post" to create your product listing

### 4. Browse Products
- Click on "Explore" to see all products
- Click on any product card to view details
- Use the "Buy" button to initiate a purchase

### 5. View Your Profile
- Click on "Profile" in the sidebar
- See your username, email, and location
- View all your posted products in "My Shop"
- Edit or remove your products

### 6. Update Profile
- On the Profile page, click "Change Profile"
- Update your information (fullname, email, location)

## API Endpoints

### User Routes (`/api/v1/tradelink`)
- `POST /register` - Register a new user
- `POST /login` - Login user
- `POST /logout` - Logout user (authenticated)
- `GET /profile` - Get user profile (authenticated)
- `POST /change-password` - Change password (authenticated)
- `PUT /update-profile` - Update profile (authenticated)
- `DELETE /delete-user` - Delete user account (authenticated)

### Post Routes (`/api/v1/tradelink/post`)
- `POST /` - Create a new post (authenticated, with file upload)
- `GET /` - Get all posts (authenticated)
- `DELETE /:id` - Delete a post (authenticated)

## Project Structure

```
tradelink.com/
├── backend/
│   ├── controller/       # Request handlers
│   ├── database/         # Database connection
│   ├── middleware/       # Auth and file upload middleware
│   ├── model/           # Mongoose models
│   ├── router/          # API routes
│   ├── service/         # External services (Cloudinary)
│   ├── utils/           # Utility functions
│   ├── app.js           # Express app configuration
│   └── index.js         # Server entry point
│
└── frontend/
    ├── src/
    │   ├── auth/            # Authentication context
    │   ├── components/      # React components
    │   ├── context-products/# Product context
    │   ├── pages/          # Page components
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    └── package.json
```

## Troubleshooting

### Backend Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URL in .env file
   - Try: `mongodb://localhost:27017/tradelink`

2. **Port Already in Use**
   - Change PORT in backend .env file
   - Update VITE_API_URL in frontend .env

3. **Image Upload Fails**
   - Verify Cloudinary credentials in .env
   - Check internet connection
   - Ensure image size is reasonable

### Frontend Issues

1. **API Connection Error**
   - Verify backend is running on port 8000
   - Check VITE_API_URL in frontend .env
   - Check CORS settings in backend app.js

2. **Login/Register Not Working**
   - Check browser console for errors
   - Verify backend is accessible
   - Clear browser cookies and localStorage

3. **Components Not Displaying**
   - Check browser console for errors
   - Verify all npm packages are installed
   - Try clearing browser cache

## Development Notes

- Backend uses cookie-based JWT authentication
- CORS is configured for `http://localhost:5173`
- File uploads are handled by Multer and stored on Cloudinary
- Frontend uses Axios interceptors for token management
- Protected routes require authentication

## Future Enhancements

- Real-time chat functionality
- Payment integration
- Product search and filters
- Reviews and ratings
- Email notifications
- User avatars

## License

This project is for educational purposes.

## Support

For issues or questions, please check the troubleshooting section or contact the development team.

email:kcprabin2063@gmail.com
