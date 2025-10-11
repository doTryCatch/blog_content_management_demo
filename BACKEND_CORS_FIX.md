# Backend CORS Configuration Fix

## The Problem
Your frontend is getting **401 Unauthorized** errors because cookies are not being saved/sent properly. This is a **CORS and cookie configuration issue** on the backend.

## Required Backend Changes

### 1. CORS Configuration
Your backend needs to allow credentials from your frontend domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',  // Development
    'https://your-frontend-domain.com'  // Production - replace with your actual domain
  ],
  credentials: true,  // This is CRITICAL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));
```

### 2. Cookie Settings
When setting authentication cookies, use these settings:

```javascript
// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  // ... your login logic ...
  
  const token = generateToken(user);
  
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true for HTTPS
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.yourdomain.com' : undefined,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  
  res.json({ message: 'Login successful', user });
});
```

### 3. Handle Preflight Requests
Make sure your backend handles OPTIONS requests:

```javascript
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie');
  res.sendStatus(200);
});
```

### 4. Authentication Middleware
Update your auth middleware to handle cookies properly:

```javascript
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Get from cookies, not headers
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```

## Testing the Fix

### 1. Check CORS Headers
After implementing the fix, check these headers in the response:
```
Access-Control-Allow-Origin: [your-frontend-domain]
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

### 2. Check Cookie Headers
When logging in, check for this header:
```
Set-Cookie: token=[jwt-token]; HttpOnly; Secure; SameSite=None
```

### 3. Test with Frontend
Use the debug buttons in the login form to test:
- "Test Cookie Handling" - Tests if cookies are being sent
- "Test CORS" - Tests if CORS is working properly

## Common Issues

### Issue 1: SameSite=None without Secure
**Error**: Cookie blocked due to SameSite=None without Secure
**Fix**: Set `secure: true` for production

### Issue 2: Domain Mismatch
**Error**: Cookie not sent because domain doesn't match
**Fix**: Set correct domain or use relative paths

### Issue 3: CORS Preflight Failure
**Error**: OPTIONS request fails
**Fix**: Handle OPTIONS requests properly

## Production Checklist

- [ ] CORS allows your frontend domain
- [ ] CORS has `credentials: true`
- [ ] Cookies set with `secure: true` and `sameSite: 'none'`
- [ ] OPTIONS requests handled
- [ ] Authentication middleware reads from cookies
- [ ] HTTPS enabled in production

## Debug Commands

Test your backend directly:

```bash
# Test CORS
curl -X OPTIONS \
  -H "Origin: https://your-frontend-domain.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  https://backend-rest-api-jwt-auth-rolebased.onrender.com/api/auth/login

# Test login
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-frontend-domain.com" \
  -d '{"email":"test@example.com","password":"password"}' \
  -c cookies.txt \
  https://backend-rest-api-jwt-auth-rolebased.onrender.com/api/auth/login

# Test auth with cookie
curl -X GET \
  -H "Origin: https://your-frontend-domain.com" \
  -b cookies.txt \
  https://backend-rest-api-jwt-auth-rolebased.onrender.com/api/auth/me
```

This should resolve the 401 Unauthorized errors and cookie issues.
