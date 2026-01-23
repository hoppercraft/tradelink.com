# Deployment Checklist

## Pre-Deployment

### Backend Preparation
- [ ] Update `.env` with production values
- [ ] Set `NODE_ENV=production`
- [ ] Use production MongoDB URL (MongoDB Atlas recommended)
- [ ] Update CORS origin to production frontend URL
- [ ] Verify all environment variables are set
- [ ] Test all API endpoints
- [ ] Enable MongoDB indexes for performance
- [ ] Set up MongoDB backups

### Frontend Preparation
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Run `npm run build` to create production build
- [ ] Test production build locally: `npm run preview`
- [ ] Verify all API calls work with production backend
- [ ] Check browser console for errors
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Optimize images and assets

## Security Checklist

### Backend Security
- [ ] Use strong JWT secrets (32+ characters, random)
- [ ] Enable HTTPS in production
- [ ] Set `secure: true` for cookies in production
- [ ] Set `sameSite: 'strict'` for cookies
- [ ] Add rate limiting middleware
- [ ] Add helmet.js for security headers
- [ ] Validate and sanitize all user inputs
- [ ] Implement CSRF protection
- [ ] Keep dependencies updated
- [ ] Never commit `.env` file

### Frontend Security
- [ ] Never expose API keys in frontend code
- [ ] Use environment variables for sensitive data
- [ ] Implement proper error handling
- [ ] Sanitize user inputs before display
- [ ] Use HTTPS for all API calls
- [ ] Implement proper logout functionality
- [ ] Clear sensitive data on logout

## Performance Optimization

### Backend
- [ ] Enable gzip compression
- [ ] Implement response caching where appropriate
- [ ] Optimize database queries
- [ ] Add pagination for post listings
- [ ] Optimize image uploads (resize before upload)
- [ ] Set up CDN for static assets
- [ ] Monitor server performance

### Frontend
- [ ] Code splitting and lazy loading
- [ ] Optimize images (WebP format)
- [ ] Minimize bundle size
- [ ] Enable browser caching
- [ ] Implement loading states
- [ ] Add error boundaries
- [ ] Use React.memo for expensive components

## Testing Before Deploy

### Functionality Tests
- [ ] User registration works
- [ ] User login/logout works
- [ ] Create post with image upload works
- [ ] View all posts works
- [ ] View single post details works
- [ ] Update profile works
- [ ] Delete post works
- [ ] Protected routes work correctly
- [ ] Unauthorized access redirects to login

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome)

### Responsive Design
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667, 414x896)

## Deployment Platforms

### Backend Options
1. **Heroku**
   - Easy deployment
   - Free tier available
   - Set environment variables in dashboard
   
2. **Railway**
   - Modern platform
   - Auto-deploys from GitHub
   - Easy MongoDB integration

3. **DigitalOcean**
   - More control
   - Requires server setup
   - Cost-effective

4. **AWS/Google Cloud**
   - Enterprise-grade
   - More complex setup
   - Scalable

### Frontend Options
1. **Vercel** (Recommended for Vite)
   - Free tier
   - Auto-deploys from GitHub
   - Fast CDN
   - Easy environment variable setup

2. **Netlify**
   - Free tier
   - Simple deployment
   - Form handling built-in

3. **GitHub Pages**
   - Free
   - Requires manual deployment
   - Static sites only

### Database
- **MongoDB Atlas** (Recommended)
  - Free tier (512MB)
  - Managed service
  - Automatic backups
  - Global clusters

## Environment Variables Setup

### Heroku/Railway Backend
```bash
# Set each variable
heroku config:set PORT=8000
heroku config:set MONGO_URL=your-mongodb-url
heroku config:set accessToken_SECRET=your-secret
heroku config:set refreshToken_SECRET=your-refresh-secret
heroku config:set CLOUDINARY_CLOUD_NAME=your-name
heroku config:set CLOUDINARY_API_KEY=your-key
heroku config:set CLOUDINARY_API_SECRET=your-secret
```

### Vercel Frontend
```bash
# In Vercel dashboard or CLI
vercel env add VITE_API_URL production
# Enter your production backend URL
```

## Post-Deployment

### Immediate Checks
- [ ] Backend health check endpoint responds
- [ ] Frontend loads without errors
- [ ] Can register new user
- [ ] Can login
- [ ] Can create post
- [ ] Images upload correctly
- [ ] Can view posts
- [ ] Can update profile
- [ ] Can logout

### Monitoring Setup
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Set up uptime monitoring (UptimeRobot)
- [ ] Set up performance monitoring
- [ ] Configure logging
- [ ] Set up alerts for server errors

### Documentation
- [ ] Document deployment process
- [ ] Document environment variables
- [ ] Document API endpoints
- [ ] Create user guide
- [ ] Document troubleshooting steps

## Rollback Plan
- [ ] Keep previous version tagged in git
- [ ] Document rollback procedure
- [ ] Have database backup ready
- [ ] Test rollback in staging first

## Long-term Maintenance
- [ ] Schedule regular dependency updates
- [ ] Monitor security advisories
- [ ] Regular database backups
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Bug fix process
- [ ] Feature request tracking

## Quick Deploy Commands

### Backend (Heroku Example)
```bash
# Login to Heroku
heroku login

# Create app
heroku create tradelink-backend

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment variables
heroku config:set KEY=VALUE

# Deploy
git push heroku main
```

### Frontend (Vercel Example)
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod
```

## Cost Estimates (Free Tiers)

| Service | Free Tier | Limitations |
|---------|-----------|-------------|
| MongoDB Atlas | 512MB | Shared cluster |
| Heroku | 550 hours/month | Sleeps after 30 min |
| Vercel | Unlimited | 100GB bandwidth |
| Cloudinary | 25 credits | ~25K transformations |

## Need Help?
- Check platform-specific documentation
- Review logs for errors
- Test locally with production config
- Ask in platform community forums

---

**Remember:** Always test thoroughly before deploying to production!
