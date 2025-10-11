# Cookie Authentication Debug Guide

## Current Cookie Issues

The application is experiencing cookie authentication issues in production. Here's how to debug and fix them:

## Debugging Steps

### 1. Check Browser Console
Open browser developer tools and look for these console logs:

```
Available cookies: [cookie string]
BASE_URL: [your API URL]
Making request to: [API endpoint]
Auth check failed: [error details]
```

### 2. Check Network Tab
1. Open Network tab in DevTools
2. Try to login
3. Check if cookies are being set in response headers
4. Check if cookies are being sent in request headers

### 3. Common Cookie Issues

#### Issue 1: CORS Configuration
**Problem**: Backend doesn't allow credentials from frontend domain
**Solution**: Backend needs to set:
```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

#### Issue 2: SameSite Cookie Policy
**Problem**: Cookies blocked due to SameSite policy
**Solution**: Backend should set cookies with:
```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: true, // for HTTPS
  sameSite: 'none' // for cross-origin
});
```

#### Issue 3: Domain Mismatch
**Problem**: Cookie domain doesn't match frontend domain
**Solution**: Set cookie domain correctly on backend

### 4. Testing Cookie Issues

#### Test 1: Manual Cookie Check
```javascript
// In browser console
console.log('All cookies:', document.cookie);
```

#### Test 2: API Endpoint Test
```javascript
// Test if API endpoint is accessible
fetch('https://your-api.com/api/auth/me', {
  credentials: 'include'
}).then(r => r.json()).then(console.log);
```

### 5. Production Environment Variables

Make sure these are set in production:

```bash
NEXT_PUBLIC_API_URL=https://backend-rest-api-jwt-auth-rolebased.onrender.com
```

### 6. Backend Requirements

Your backend must:
1. Set CORS headers to allow credentials
2. Set cookies with proper SameSite policy
3. Handle preflight OPTIONS requests
4. Use HTTPS in production

## Current Implementation

The app now includes:
- ✅ Comprehensive debugging logs
- ✅ Proper axios configuration with credentials
- ✅ Error handling for cookie issues
- ✅ Shared API client configuration

## Next Steps

1. **Deploy with debugging** - Check console logs in production
2. **Verify backend CORS** - Ensure backend allows credentials
3. **Check cookie settings** - Ensure cookies are set with correct policies
4. **Test cross-origin** - Verify cookies work across domains

## Debug Output

When you run the app, you should see:
- Cookie availability before/after login
- API request/response details
- Error details if authentication fails

This will help identify exactly where the cookie issue occurs.
