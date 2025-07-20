# OSINTAcademy - OSINT Training Platform

A comprehensive Open Source Intelligence (OSINT) training website featuring interactive learning modules, downloadable resources, and humorous content designed to teach OSINT techniques and Kali Linux tools.

## 🎯 Features

### Core Functionality
- **Topic-Based Learning**: Six comprehensive learning paths from beginner to expert level
- **Email Authentication**: Secure 4-digit code login system (no passwords required)
- **Interactive Modules**: Progress tracking, section navigation, and completion status
- **Downloadable Resources**: Checklists, cheat sheets, and reference guides
- **Request More Info**: Users can request additional information on any topic
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Learning Content
- **OSINT Fundamentals**: Basic methodology and techniques
- **Kali Linux Mastery**: Command-line tools and usage
- **People Profiling**: Ethical investigation techniques
- **Social Media Intelligence**: Platform-specific research methods
- **Network Reconnaissance**: Network mapping and analysis
- **Digital Forensics**: Crime scene investigation techniques

### Resources Library
- OSINT Investigation Checklist (10-phase systematic approach)
- Kali Linux Tools Quick Reference (essential commands)
- People Profiling Workflow Template (ethical guidelines included)
- Advanced Search Operators Guide
- OSINT Tools Master List (200+ tools)
- Legal & Ethical Guidelines

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/pnpm
- Modern web browser

### Local Development
```bash
# Clone the repository
git clone <your-repo-url>
cd osint-academy

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open browser to http://localhost:5173
```

### Demo Login
- Email: any valid email address
- Verification Code: `1234` (for demo purposes)

## 📁 Project Structure

```
osint-academy/
├── src/
│   ├── components/
│   │   ├── LearningModule.jsx    # Interactive learning interface
│   │   ├── ResourcesPage.jsx     # Downloadable resources
│   │   └── LoginPage.jsx         # Email + 4-digit authentication
│   ├── content/
│   │   ├── osint-fundamentals.md # OSINT basics content
│   │   └── kali-tools-guide.md   # Kali Linux documentation
│   ├── resources/
│   │   ├── osint-checklist.md    # Investigation checklist
│   │   ├── kali-tools-cheatsheet.md # Quick reference
│   │   └── people-profiling-guide.md # Profiling workflow
│   ├── App.jsx                   # Main application
│   └── main.jsx                  # Entry point
├── public/                       # Static assets
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Deploy with one click
4. Automatic deployments on git push

```bash
# Using Vercel CLI
npm i -g vercel
vercel --prod
```

### Option 2: GitHub Pages
1. Build the project: `pnpm run build`
2. Push the `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### Option 3: Netlify
1. Connect your GitHub repository
2. Set build command: `pnpm run build`
3. Set publish directory: `dist`
4. Deploy automatically

### Option 4: Traditional Web Hosting
1. Run `pnpm run build`
2. Upload the `dist` folder contents to your web server
3. Configure your web server to serve the index.html for all routes

## 🔧 Configuration

### Environment Variables
For production deployment, you may want to configure:

```env
# .env.local
VITE_API_BASE_URL=https://your-api-domain.com
VITE_EMAIL_SERVICE_URL=https://your-email-service.com
```

### Email Service Integration
The current implementation uses a mock email service. For production:

1. Choose an email service (SendGrid, AWS SES, etc.)
2. Update the authentication logic in `LoginPage.jsx`
3. Implement backend API for code generation and verification

## 🎨 Customization

### Branding
- Update colors in `src/App.css`
- Replace logo/icons in `public/` folder
- Modify site title in `index.html`

### Content
- Add new learning modules in `src/content/`
- Create additional resources in `src/resources/`
- Update module data in `App.jsx`

### Features
- Add user progress persistence
- Implement community forums
- Add video content support
- Create assessment/quiz system

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 📝 Content Guidelines

All content follows these principles:
- **Humor**: Tech culture references and light-hearted explanations
- **Practical**: Real-world examples and hands-on exercises
- **Ethical**: Strong emphasis on legal and ethical considerations
- **Progressive**: Beginner-friendly with advanced options
- **Interactive**: Encourages user engagement and questions

## 🔒 Security Considerations

- Email-based authentication (no password storage)
- Session-based tracking (no persistent user data)
- Client-side only (no sensitive backend data)
- HTTPS recommended for production
- Regular security updates for dependencies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your content or improvements
4. Test thoroughly
5. Submit a pull request

### Content Contributions
- Follow the humorous, educational tone
- Include practical exercises
- Ensure ethical guidelines are met
- Add proper attribution for sources

## 📄 License

This project is open source. Please ensure all content and tools referenced comply with their respective licenses.

## 🆘 Support

- Check the documentation in `/src/content/`
- Review the resource guides in `/src/resources/`
- Open an issue for bugs or feature requests
- Contact the development team for deployment assistance

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Basic website with authentication
- ✅ Learning modules and resources
- ✅ Responsive design

### Phase 2 (Future)
- [ ] User progress persistence
- [ ] Community forums
- [ ] Video content integration
- [ ] Assessment system

### Phase 3 (Future)
- [ ] Advanced analytics
- [ ] Certification system
- [ ] Mobile app
- [ ] API for third-party integrations

---

**OSINTAcademy** - Master the art of Open Source Intelligence. Legally and ethically, of course! 🕵️‍♂️

*No data was harmed in the making of this website.*

