import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Search, Shield, Users, Download, BookOpen, Terminal, Eye, Globe, MessageCircle, CheckCircle } from 'lucide-react'
import LearningModule from './components/LearningModule.jsx'
import ResourcesPage from './components/ResourcesPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import './App.css'

// Mock data for learning modules
const learningModules = {
  'osint-fundamentals': {
    id: 'osint-fundamentals',
    title: 'OSINT Fundamentals',
    description: 'Learn the basics of Open Source Intelligence gathering. We\'ll teach you to find information like a digital bloodhound!',
    level: 'Beginner',
    estimatedTime: '4-6 hours',
    sections: [
      {
        title: 'What is OSINT?',
        duration: '30 min',
        content: 'Introduction to Open Source Intelligence...',
        exercise: 'Practice basic Google searches with different operators'
      },
      {
        title: 'OSINT Methodology',
        duration: '45 min',
        content: 'Learn the systematic approach to OSINT investigations...',
        exercise: 'Create your first investigation plan'
      },
      {
        title: 'Legal and Ethical Considerations',
        duration: '30 min',
        content: 'Understanding the legal boundaries of OSINT work...',
        exercise: 'Review case studies of ethical dilemmas'
      }
    ]
  },
  'kali-tools': {
    id: 'kali-tools',
    title: 'Kali Linux Mastery',
    description: 'Master the tools of the trade. From nmap to Maltego, we\'ll turn you into a command-line ninja!',
    level: 'Intermediate',
    estimatedTime: '8-10 hours',
    sections: [
      {
        title: 'Kali Linux Setup',
        duration: '45 min',
        content: 'Setting up your Kali environment...',
        exercise: 'Install and configure Kali Linux'
      },
      {
        title: 'Network Reconnaissance',
        duration: '90 min',
        content: 'Using nmap, masscan, and other network tools...',
        exercise: 'Scan a test network and analyze results'
      },
      {
        title: 'Web Application Analysis',
        duration: '90 min',
        content: 'Dirb, Nikto, and web vulnerability scanning...',
        exercise: 'Analyze a vulnerable web application'
      }
    ]
  },
  'people-profiling': {
    id: 'people-profiling',
    title: 'People Profiling',
    description: 'Learn to gather information about individuals ethically. Become a digital detective without the trench coat!',
    level: 'Intermediate',
    estimatedTime: '6-8 hours',
    sections: [
      {
        title: 'Social Media Intelligence',
        duration: '60 min',
        content: 'Extracting information from social platforms...',
        exercise: 'Analyze a public figure\'s social media presence'
      },
      {
        title: 'Public Records Research',
        duration: '60 min',
        content: 'Finding and analyzing public records...',
        exercise: 'Research property and business records'
      },
      {
        title: 'Verification Techniques',
        duration: '45 min',
        content: 'How to verify and cross-reference information...',
        exercise: 'Verify information using multiple sources'
      }
    ]
  }
}

// Header Component
function Header({ user, onLogout }) {
  const navigate = useNavigate()

  return (
    <header className="bg-black text-green-400 p-4 border-b border-green-400">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <Eye className="h-8 w-8" />
          <h1 className="text-2xl font-bold font-mono">OSINTAcademy</h1>
          <Badge variant="outline" className="border-green-400 text-green-400">
            v1.0.0
          </Badge>
        </div>
        <nav className="flex space-x-4">
          <Button 
            variant="ghost" 
            className="text-green-400 hover:bg-green-400 hover:text-black"
            onClick={() => navigate('/')}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Learn
          </Button>
          <Button 
            variant="ghost" 
            className="text-green-400 hover:bg-green-400 hover:text-black"
            onClick={() => navigate('/resources')}
          >
            <Download className="h-4 w-4 mr-2" />
            Resources
          </Button>
          <Button variant="ghost" className="text-green-400 hover:bg-green-400 hover:text-black">
            <Users className="h-4 w-4 mr-2" />
            Community
          </Button>
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">Welcome, {user.email.split('@')[0]}!</span>
              <Button 
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
                onClick={onLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              className="bg-green-400 text-black hover:bg-green-300"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

// Hero Section
function HeroSection({ user, onNavigateToModule }) {
  return (
    <section className="bg-gradient-to-br from-black via-gray-900 to-black text-white py-20">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-5xl font-bold mb-6 font-mono">
          Master the Art of <span className="text-green-400">Open Source Intelligence</span>
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
          Welcome to OSINTAcademy, where we turn curious minds into digital detectives! 
          Learn OSINT techniques, Kali Linux tools, and become the Sherlock Holmes of the internet. 
          No deerstalker hat required (but we won't judge if you wear one).
        </p>
        
        {user && (
          <Alert className="max-w-md mx-auto mb-8 border-green-400 bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-400">
              Welcome back! Ready to continue your OSINT journey?
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex justify-center space-x-4">
          <Button 
            size="lg" 
            className="bg-green-400 text-black hover:bg-green-300"
            onClick={() => onNavigateToModule('osint-fundamentals')}
          >
            <Search className="h-5 w-5 mr-2" />
            Start Your Journey
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
            onClick={() => onNavigateToModule('kali-tools')}
          >
            <Terminal className="h-5 w-5 mr-2" />
            Explore Tools
          </Button>
        </div>
      </div>
    </section>
  )
}

// Learning Topics Section
function LearningTopics({ onNavigateToModule, onRequestMoreInfo }) {
  const topics = [
    {
      id: 'osint-fundamentals',
      title: "OSINT Fundamentals",
      description: "Learn the basics of Open Source Intelligence gathering. We'll teach you to find information like a digital bloodhound!",
      icon: <Search className="h-8 w-8 text-green-400" />,
      level: "Beginner",
      modules: 8
    },
    {
      id: 'kali-tools',
      title: "Kali Linux Mastery",
      description: "Master the tools of the trade. From nmap to Maltego, we'll turn you into a command-line ninja!",
      icon: <Terminal className="h-8 w-8 text-green-400" />,
      level: "Intermediate",
      modules: 12
    },
    {
      id: 'people-profiling',
      title: "People Profiling",
      description: "Learn to gather information about individuals ethically. Become a digital detective without the trench coat!",
      icon: <Users className="h-8 w-8 text-green-400" />,
      level: "Intermediate",
      modules: 10
    },
    {
      id: 'social-media',
      title: "Social Media Intelligence",
      description: "Uncover insights from social platforms. Learn to read between the posts and tweets!",
      icon: <Globe className="h-8 w-8 text-green-400" />,
      level: "Advanced",
      modules: 15
    },
    {
      id: 'network-recon',
      title: "Network Reconnaissance",
      description: "Map networks like a digital cartographer. Discover the hidden topology of the internet!",
      icon: <Shield className="h-8 w-8 text-green-400" />,
      level: "Advanced",
      modules: 18
    },
    {
      id: 'digital-forensics',
      title: "Digital Forensics",
      description: "Investigate digital crime scenes. CSI: Cyber edition, but with more coffee and fewer explosions!",
      icon: <Eye className="h-8 w-8 text-green-400" />,
      level: "Expert",
      modules: 20
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Choose Your Learning Path</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-green-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  {topic.icon}
                  <Badge variant={topic.level === 'Beginner' ? 'default' : topic.level === 'Expert' ? 'destructive' : 'secondary'}>
                    {topic.level}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {topic.modules} modules available
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{topic.description}</p>
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-green-400 text-black hover:bg-green-300"
                    onClick={() => onNavigateToModule(topic.id)}
                  >
                    Start Learning
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => onRequestMoreInfo(topic.id)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="h-12 w-12 text-green-400" />,
      title: "Interactive Guides",
      description: "Learn with humor-filled, step-by-step tutorials that make complex topics digestible. Like Netflix, but educational!"
    },
    {
      icon: <Download className="h-12 w-12 text-green-400" />,
      title: "Downloadable Resources",
      description: "Get checklists, cheat sheets, and reference cards. Perfect for when your memory needs a backup drive!"
    },
    {
      icon: <Users className="h-12 w-12 text-green-400" />,
      title: "Community Support",
      description: "Join fellow digital detectives in our forums. Share discoveries, ask questions, and geek out together!"
    },
    {
      icon: <Terminal className="h-12 w-12 text-green-400" />,
      title: "Hands-on Practice",
      description: "Real tools, real scenarios, real learning. We believe in learning by doing, not just reading!"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose OSINTAcademy?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-black text-green-400 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Eye className="h-6 w-6" />
          <span className="text-xl font-bold font-mono">OSINTAcademy</span>
        </div>
        <p className="text-gray-400 mb-4">
          Master the art of Open Source Intelligence. Legally and ethically, of course!
        </p>
        <p className="text-sm text-gray-500">
          © 2025 OSINTAcademy. All rights reserved. No data was harmed in the making of this website.
        </p>
      </div>
    </footer>
  )
}

// Main App Component
function AppContent() {
  const [user, setUser] = useState(null)
  const [requestMoreInfoAlert, setRequestMoreInfoAlert] = useState('')
  const navigate = useNavigate()

  const handleLogin = (userData) => {
    setUser(userData)
    navigate('/')
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const handleNavigateToModule = (moduleId) => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate(`/learn/${moduleId}`)
  }

  const handleRequestMoreInfo = (topicId) => {
    setRequestMoreInfoAlert(`More information requested for ${topicId}. Our team will reach out soon!`)
    setTimeout(() => setRequestMoreInfoAlert(''), 5000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} onLogout={handleLogout} />
      
      {requestMoreInfoAlert && (
        <Alert className="mx-4 mt-4 border-blue-400 bg-blue-50">
          <MessageCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            {requestMoreInfoAlert}
          </AlertDescription>
        </Alert>
      )}
      
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection user={user} onNavigateToModule={handleNavigateToModule} />
            <LearningTopics onNavigateToModule={handleNavigateToModule} onRequestMoreInfo={handleRequestMoreInfo} />
            <FeaturesSection />
          </>
        } />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/learn/:moduleId" element={
          <LearningModule 
            module={learningModules[window.location.pathname.split('/').pop()] || learningModules['osint-fundamentals']}
            onRequestMoreInfo={handleRequestMoreInfo}
          />
        } />
      </Routes>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

