# Blog Content Management Demo

A modern blog content management system built with Next.js 15, featuring role-based authentication, blog creation, and user management.

## 🚀 Features

- **Authentication System**: Login/Register with JWT token-based authentication
- **Role-Based Access**: Admin and User roles with different permissions
- **Blog Management**: Create, view, and manage blog posts
- **User Management**: Admin can view and manage all users
- **Responsive Design**: Modern UI with Tailwind CSS and Radix UI components
- **Production Ready**: Optimized for deployment with proper routing and error handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: JWT with HTTP-only cookies
- **State Management**: React Context API
- **HTTP Client**: Axios with proper CORS configuration
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── dashboard/         # Protected dashboard pages
│   ├── login/            # Authentication pages
│   ├── register/         # User registration
│   └── layout.tsx        # Root layout with providers
├── components/           # Reusable UI components
│   ├── dashboard/        # Dashboard-specific components
│   └── ui/              # Base UI components
├── context/             # React Context providers
├── lib/                 # Utility functions and API client
├── middleware.ts        # Next.js middleware for auth
└── config.ts           # Environment configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see Backend Requirements)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog_content_management_demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=https://your-backend-api.com
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://backend-rest-api-jwt-auth-rolebased.onrender.com

# For local development, use:
# NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend Requirements

Your backend API must support:

- **CORS with credentials** enabled
- **JWT authentication** with HTTP-only cookies
- **Endpoints**:
  - `POST /api/auth/login` - User login
  - `POST /api/auth/register` - User registration
  - `GET /api/auth/me` - Get current user
  - `POST /api/auth/logout` - User logout

See `BACKEND_CORS_FIX.md` for detailed backend configuration.

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy on Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Deploy on Other Platforms

The app is optimized for deployment on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 🔐 Authentication Flow

1. **User visits `/`** → Redirects to login or dashboard based on auth status
2. **User logs in** → JWT token stored in HTTP-only cookie
3. **Protected routes** → Middleware checks authentication
4. **Dashboard access** → Role-based content and permissions

## 🎨 UI Components

Built with modern design system:
- **Radix UI** for accessible components
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive design** for all screen sizes

## 📱 Pages

- **`/`** - Home page with auth-based redirect
- **`/login`** - User login
- **`/register`** - User registration  
- **`/dashboard`** - Main dashboard (protected)

## 🛡️ Security Features

- **HTTP-only cookies** for JWT storage
- **CORS protection** with proper configuration
- **Route protection** with Next.js middleware
- **Role-based access control**
- **Secure API communication**

## 🐛 Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check backend CORS configuration
2. **Cookies not saving**: Verify SameSite and Secure cookie settings
3. **Routing issues**: Ensure proper middleware configuration

See `COOKIE_DEBUG.md` and `BACKEND_CORS_FIX.md` for detailed troubleshooting.

## 📄 License

This project is created as a demo for internship assignment purposes.

## 🤝 Contributing

This is a demo project, but feel free to fork and modify for your own use.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
