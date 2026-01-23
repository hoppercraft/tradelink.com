# Quick Start Guide - TradeLink

## Prerequisites Check
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed and running
- [ ] Cloudinary account created

## Step-by-Step Setup

### 1. Backend Setup (5 minutes)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env-sample .env

# Edit .env with your credentials
# Required fields:
# - MONGO_URL (your MongoDB connection string)
# - accessToken_SECRET (any random string)
# - refreshToken_SECRET (any random string)  
# - CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET

# Start backend
npm start
```

**Expected Output:**
```
Server is running on port 8000
MongoDB connected successfully
```

### 2. Frontend Setup (3 minutes)

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# .env file is already created with:
# VITE_API_URL=http://localhost:8000

# Start frontend
npm run dev
```

**Expected Output:**
```
VITE ready in XXX ms
Local: http://localhost:5173
```

### 3. Test the Application

1. **Open Browser:** Go to `http://localhost:5173`
2. **Register Account:** Click "Register" and create a new account
3. **Login:** Login with your credentials
4. **Create Post:** 
   - Click "Post" in sidebar
   - Upload image
   - Fill details (name, price, location, description)
   - Click "Post"
5. **View Posts:** Click "Explore" to see all posts
6. **Check Profile:** Click "Profile" to see your posted items

## Common Issues & Quick Fixes

### Backend Won't Start
```bash
# Check if MongoDB is running
sudo systemctl status mongodb

# Start MongoDB if needed
sudo systemctl start mongodb
```

### Frontend Can't Connect
```bash
# Check if backend is running on port 8000
curl http://localhost:8000/api/v1/tradelink/profile

# Should see: unauthorized error (expected without login)
```

### Port Already in Use
```bash
# Backend: Change PORT in backend/.env
# Frontend: Update VITE_API_URL in frontend/.env
```

## Default Configuration

- **Backend:** http://localhost:8000
- **Frontend:** http://localhost:5173
- **CORS:** Configured for localhost:5173
- **Auth:** Cookie-based with JWT

## Test Credentials
Create your own during registration!

## Next Steps
- Post your first product
- Explore other products
- Update your profile with email and location
- Try editing/deleting your posts

## Need Help?
Check the full README.md for detailed troubleshooting and API documentation.

---

**Quick Command Reference:**

```bash
# Start backend
cd backend && npm start

# Start frontend (new terminal)
cd frontend && npm run dev

# Stop servers: Ctrl+C in each terminal
```
