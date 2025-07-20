# OSINTAcademy Deployment Guide

This guide provides step-by-step instructions for deploying OSINTAcademy to various hosting platforms.

## 🚀 Quick Deployment Options

### 1. Vercel (Recommended - Free Tier Available)

Vercel is the easiest option for React applications with automatic deployments.

#### Method A: GitHub Integration (Recommended)
1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/osint-academy.git
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings:
     - Framework Preset: Vite
     - Build Command: `pnpm run build`
     - Output Directory: `dist`
   - Click "Deploy"

3. **Automatic Updates**: Every git push will trigger a new deployment

#### Method B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd osint-academy
vercel --prod

# Follow the prompts to configure your project
```

### 2. Netlify (Free Tier Available)

#### Method A: Drag & Drop
1. **Build the project**:
   ```bash
   pnpm run build
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag the `dist` folder to the deploy area
   - Your site will be live instantly

#### Method B: GitHub Integration
1. **Connect Repository**:
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Configure Build Settings**:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

### 3. GitHub Pages (Free)

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/osint-academy",
     "scripts": {
       "predeploy": "pnpm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**:
   ```bash
   pnpm run deploy
   ```

4. **Enable GitHub Pages**:
   - Go to repository settings
   - Scroll to "Pages" section
   - Select "gh-pages" branch as source

### 4. Firebase Hosting (Free Tier Available)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```

2. **Login and Initialize**:
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**:
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Build and Deploy**:
   ```bash
   pnpm run build
   firebase deploy
   ```

## 🔧 Advanced Configuration

### Custom Domain Setup

#### Vercel
1. Go to your project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

#### Netlify
1. Go to "Domain settings"
2. Add custom domain
3. Update DNS records with your domain provider

### Environment Variables

For production deployments, you may need to configure environment variables:

1. **Create `.env.production`**:
   ```env
   VITE_API_BASE_URL=https://your-api-domain.com
   VITE_EMAIL_SERVICE_URL=https://your-email-service.com
   VITE_ANALYTICS_ID=your-analytics-id
   ```

2. **Platform-specific setup**:
   - **Vercel**: Add in project settings → Environment Variables
   - **Netlify**: Add in site settings → Environment Variables
   - **GitHub Pages**: Use repository secrets for build actions

### Email Service Integration

The demo uses mock email verification. For production:

1. **Choose an Email Service**:
   - SendGrid (free tier: 100 emails/day)
   - AWS SES (pay-as-you-go)
   - Mailgun (free tier: 5,000 emails/month)
   - EmailJS (client-side, 200 emails/month free)

2. **Backend API Setup** (recommended):
   ```javascript
   // Example with Vercel Serverless Functions
   // api/send-code.js
   export default async function handler(req, res) {
     const { email } = req.body;
     const code = Math.floor(1000 + Math.random() * 9000);
     
     // Send email with your service
     await sendEmail(email, code);
     
     // Store code temporarily (Redis, database, etc.)
     await storeCode(email, code);
     
     res.json({ success: true });
   }
   ```

3. **Update Frontend**:
   ```javascript
   // In LoginPage.jsx
   const handleEmailSubmit = async (e) => {
     e.preventDefault();
     const response = await fetch('/api/send-code', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email })
     });
     // Handle response
   };
   ```

## 🛡️ Security Considerations

### HTTPS Configuration
- Most platforms enable HTTPS by default
- For custom domains, ensure SSL certificates are configured
- Update any hardcoded HTTP URLs to HTTPS

### Content Security Policy
Add to your `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### Rate Limiting
For production email services, implement rate limiting:
```javascript
// Example rate limiting for email sending
const rateLimiter = new Map();

function checkRateLimit(email) {
  const now = Date.now();
  const userRequests = rateLimiter.get(email) || [];
  
  // Remove requests older than 1 hour
  const recentRequests = userRequests.filter(time => now - time < 3600000);
  
  if (recentRequests.length >= 5) {
    throw new Error('Too many requests');
  }
  
  recentRequests.push(now);
  rateLimiter.set(email, recentRequests);
}
```

## 📊 Analytics Setup

### Google Analytics
1. **Add to index.html**:
   ```html
   <!-- Google tag (gtag.js) -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

2. **Track Events**:
   ```javascript
   // Track learning module completion
   gtag('event', 'module_complete', {
     'module_name': 'osint-fundamentals',
     'section': 'what-is-osint'
   });
   ```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🐛 Troubleshooting

### Common Issues

1. **Build Fails**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Routing Issues (404 on refresh)**:
   - Ensure your hosting platform is configured for SPA routing
   - Add `_redirects` file for Netlify:
     ```
     /*    /index.html   200
     ```

3. **Environment Variables Not Working**:
   - Ensure variables start with `VITE_`
   - Restart development server after adding variables
   - Check platform-specific environment variable settings

4. **Email Service Not Working**:
   - Verify API keys and configuration
   - Check CORS settings for client-side services
   - Test with a simple email first

### Performance Optimization

1. **Bundle Analysis**:
   ```bash
   npm run build -- --analyze
   ```

2. **Image Optimization**:
   - Use WebP format for images
   - Implement lazy loading
   - Optimize image sizes

3. **Code Splitting**:
   ```javascript
   // Lazy load components
   const LearningModule = lazy(() => import('./components/LearningModule'));
   ```

## 📞 Support

If you encounter issues during deployment:

1. Check the platform-specific documentation
2. Review the browser console for errors
3. Verify all environment variables are set correctly
4. Test the build locally before deploying
5. Check the hosting platform's status page for outages

## 🎯 Post-Deployment Checklist

- [ ] Test all authentication flows
- [ ] Verify all learning modules load correctly
- [ ] Check resource downloads work
- [ ] Test responsive design on mobile
- [ ] Verify custom domain (if applicable)
- [ ] Test email functionality (if implemented)
- [ ] Check analytics tracking (if implemented)
- [ ] Verify HTTPS is working
- [ ] Test all navigation paths
- [ ] Check performance with Lighthouse

---

Your OSINTAcademy is now ready to train the next generation of digital detectives! 🕵️‍♂️

