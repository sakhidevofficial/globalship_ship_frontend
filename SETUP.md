# 🚀 Frontend Setup Guide

This guide will help you set up the Cartzilla Frontend project for development and deployment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**
- **Botble CMS Backend** (running on localhost:8000)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration

Copy the example environment file and configure it:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your backend URLs:

```env
# Development (local backend)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_ECOMMERCE_API_URL=http://localhost:8000/api/v1/ecommerce
NEXT_PUBLIC_AUTH_URL=http://localhost:8000

# Production (update with your actual domain)
# NEXT_PUBLIC_API_URL=https://yourdomain.com/api/v1
# NEXT_PUBLIC_ECOMMERCE_API_URL=https://yourdomain.com/api/v1/ecommerce
# NEXT_PUBLIC_AUTH_URL=https://yourdomain.com
```

### 4. Start Development Server

```bash
npm run dev
```

Your application will be available at `http://localhost:3000`

## 🔧 Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run build-icon-font` | Build custom icon font |

## 🚀 Deployment Setup

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://yourdomain.com/api/v1
   NEXT_PUBLIC_ECOMMERCE_API_URL=https://yourdomain.com/api/v1/ecommerce
   NEXT_PUBLIC_AUTH_URL=https://yourdomain.com
   ```

3. **Deploy**
   - Push to main branch for automatic deployment
   - Or manually deploy from Vercel dashboard

### Other Deployment Options

#### Netlify
```bash
# Build command
npm run build

# Publish directory
.next
```

#### Railway
- Connect GitHub repository
- Railway auto-detects Next.js
- Set environment variables in dashboard

#### DigitalOcean App Platform
- Connect GitHub repository
- Select Next.js framework
- Configure environment variables

## 🔐 Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | ✅ | Main API endpoint | `https://api.yourdomain.com/api/v1` |
| `NEXT_PUBLIC_ECOMMERCE_API_URL` | ✅ | E-commerce API endpoint | `https://api.yourdomain.com/api/v1/ecommerce` |
| `NEXT_PUBLIC_AUTH_URL` | ✅ | Authentication API endpoint | `https://api.yourdomain.com` |
| `NEXT_PUBLIC_ENABLE_RTL` | ❌ | Enable RTL support | `true` or `false` |

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Product listing works
- [ ] Product details page works
- [ ] Shopping cart functionality
- [ ] User registration/login
- [ ] Checkout process
- [ ] Responsive design on mobile
- [ ] Theme switching (if applicable)

### Automated Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

## 🔧 Troubleshooting

### Common Issues

#### 1. API Connection Errors
- Verify backend is running on correct port
- Check environment variables
- Ensure CORS is configured on backend

#### 2. Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

#### 3. Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_`
- Restart development server after changes
- Check for typos in variable names

#### 4. Styling Issues
- Run `npm run build-icon-font` if icons are missing
- Check Bootstrap CSS is loading
- Verify SCSS compilation

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── home/           # Home page
│   │   ├── shop/           # Shop pages
│   │   ├── account/        # User account pages
│   │   └── layout.tsx      # Root layout
│   ├── components/          # Reusable components
│   │   ├── layout/         # Layout components
│   │   ├── shop/           # Shop components
│   │   └── ui/             # UI components
│   ├── contexts/           # React contexts
│   ├── hooks/              # Custom hooks
│   ├── services/           # API services
│   ├── styles/             # SCSS styles
│   ├── types/              # TypeScript types
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── scripts/                # Build scripts
└── package.json           # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `npm run type-check && npm run lint`
5. Submit a pull request

## 📞 Support

- **Documentation**: Check the main README.md
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join GitHub Discussions

## 🔄 Updates

To update dependencies:

```bash
# Update all dependencies
npm update

# Update specific package
npm update package-name

# Check for outdated packages
npm outdated
```

## 📝 Notes

- Always test changes in development before deploying
- Keep environment variables secure
- Regular backups of your configuration
- Monitor performance and errors in production 