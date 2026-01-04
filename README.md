# Cartzilla Frontend - Next.js E-commerce

A modern, responsive e-commerce frontend built with Next.js, React, and Bootstrap. This project connects to a Botble CMS backend for a complete e-commerce solution.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14, React 18, TypeScript
- **Responsive Design**: Bootstrap 5 with custom components
- **E-commerce Ready**: Product catalog, shopping cart, checkout
- **User Authentication**: Login, registration, profile management
- **Theme Support**: Multiple theme variants (Electronics, Fashion, Grocery)
- **RTL Support**: Right-to-left language support
- **SEO Optimized**: Next.js built-in SEO features
- **Performance**: Optimized images, lazy loading, code splitting

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Botble CMS backend running (Laravel/PHP)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your backend API URLs:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
   NEXT_PUBLIC_ECOMMERCE_API_URL=http://localhost:8000/api/v1/ecommerce
   NEXT_PUBLIC_AUTH_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # Reusable React components
│   ├── contexts/           # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API services
│   ├── styles/             # SCSS stylesheets
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── scripts/                # Build scripts
└── package.json           # Dependencies and scripts
```

## 🎨 Available Themes

- **Electronics**: Tech gadgets and electronics
- **Fashion**: Clothing and accessories  
- **Grocery**: Food and household items
- **Beauty**: Cosmetics and beauty products
- **Jewelry**: Jewelry and accessories

## 🔧 Development

### Build Icon Font
```bash
npm run build-icon-font
```

### Enable RTL Support
```bash
# Add to .env.local
NEXT_PUBLIC_ENABLE_RTL=true
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Use `npm run build` and `npm run start`
- **Railway**: Automatic deployment from GitHub
- **DigitalOcean App Platform**: Supports Next.js out of the box

## 🔗 Backend Integration

This frontend connects to a Botble CMS backend. Ensure your backend is running and accessible at the URLs specified in your environment variables.

### Required Backend Features
- RESTful API endpoints
- Authentication system
- Product management
- Order processing
- User management

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Main API endpoint | `http://localhost:8000/api/v1` |
| `NEXT_PUBLIC_ECOMMERCE_API_URL` | E-commerce API endpoint | `http://localhost:8000/api/v1/ecommerce` |
| `NEXT_PUBLIC_AUTH_URL` | Authentication API endpoint | `http://localhost:8000` |
| `NEXT_PUBLIC_ENABLE_RTL` | Enable RTL support | `false` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the [docs](docs/) folder
- **Issues**: Report bugs via [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: Join our [GitHub Discussions](https://github.com/your-repo/discussions)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Bootstrap](https://getbootstrap.com/)
- Icons from [Cartzilla Icons](https://cartzilla.createx.studio/)
- Backend powered by [Botble CMS](https://botble.com/)
