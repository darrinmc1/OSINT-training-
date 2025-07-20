import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { 
  BookOpen, 
  Download, 
  CheckCircle, 
  Clock, 
  Users, 
  MessageCircle,
  ArrowRight,
  FileText,
  Terminal,
  Search,
  Shield
} from 'lucide-react'

const LearningModule = ({ module, onRequestMoreInfo }) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState(new Set())

  const markSectionComplete = (sectionIndex) => {
    setCompletedSections(prev => new Set([...prev, sectionIndex]))
  }

  const getModuleIcon = (moduleId) => {
    const icons = {
      'osint-fundamentals': <Search className="h-6 w-6" />,
      'kali-tools': <Terminal className="h-6 w-6" />,
      'people-profiling': <Users className="h-6 w-6" />,
      'social-media': <MessageCircle className="h-6 w-6" />,
      'network-recon': <Shield className="h-6 w-6" />,
      'digital-forensics': <FileText className="h-6 w-6" />
    }
    return icons[moduleId] || <BookOpen className="h-6 w-6" />
  }

  const calculateProgress = () => {
    if (!module.sections) return 0
    return (completedSections.size / module.sections.length) * 100
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Module Header */}
      <Card className="mb-6 border-green-400">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-green-400">
                {getModuleIcon(module.id)}
              </div>
              <div>
                <CardTitle className="text-2xl">{module.title}</CardTitle>
                <CardDescription className="text-lg mt-2">
                  {module.description}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <Badge variant={module.level === 'Beginner' ? 'default' : 
                            module.level === 'Expert' ? 'destructive' : 'secondary'}>
                {module.level}
              </Badge>
              <p className="text-sm text-gray-600 mt-2">
                {module.sections?.length || 0} sections • {module.estimatedTime}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">
                {completedSections.size} of {module.sections?.length || 0} completed
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Table of Contents */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Table of Contents</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {module.sections?.map((section, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentSection === index 
                          ? 'bg-green-100 border border-green-400' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setCurrentSection(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {completedSections.has(index) ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                          <span className="text-sm font-medium">
                            {section.title}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 ml-6">
                        {section.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => onRequestMoreInfo && onRequestMoreInfo(module.id)}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Request More Info
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Download Resources
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Join Discussion
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {module.sections?.[currentSection]?.title || 'Welcome to the Module'}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    Section {currentSection + 1} of {module.sections?.length || 1}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="exercises">Exercises</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-6">
                  <ScrollArea className="h-96">
                    <div className="prose max-w-none">
                      {module.sections?.[currentSection]?.content || (
                        <div className="text-center py-12">
                          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            Welcome to {module.title}!
                          </h3>
                          <p className="text-gray-500 mb-6">
                            This module will teach you {module.description.toLowerCase()}. 
                            Get ready for an exciting journey into the world of OSINT!
                          </p>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                            <h4 className="font-semibold text-green-800 mb-2">
                              🎯 What You'll Learn:
                            </h4>
                            <ul className="text-green-700 space-y-1">
                              <li>• Fundamental concepts and methodologies</li>
                              <li>• Hands-on practical techniques</li>
                              <li>• Real-world application scenarios</li>
                              <li>• Best practices and ethical considerations</li>
                              <li>• Advanced tips and tricks from the pros</li>
                            </ul>
                          </div>
                          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                            <h4 className="font-semibold text-blue-800 mb-2">
                              💡 Pro Tip:
                            </h4>
                            <p className="text-blue-700">
                              Take your time with each section and don't hesitate to use the "Request More Info" 
                              button if you need additional clarification on any topic. Remember, even Sherlock 
                              Holmes had to start somewhere! 🕵️‍♂️
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="exercises" className="mt-6">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                          🏋️‍♂️ Hands-On Exercise
                        </h4>
                        <p className="text-yellow-700 mb-3">
                          Practice what you've learned with this interactive exercise:
                        </p>
                        <div className="bg-white rounded p-3 border">
                          <p className="text-sm text-gray-700">
                            {module.sections?.[currentSection]?.exercise || 
                             "Try applying the techniques you've learned to a real-world scenario. Start with basic searches and gradually work your way up to more advanced methods."}
                          </p>
                        </div>
                        <Button className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                          Start Exercise
                        </Button>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2">
                          🧠 Knowledge Check
                        </h4>
                        <p className="text-purple-700 mb-3">
                          Test your understanding with these quick questions:
                        </p>
                        <div className="space-y-2">
                          <Button variant="outline" className="w-full justify-start text-left">
                            1. What are the key principles of OSINT?
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left">
                            2. How do you verify information from multiple sources?
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-left">
                            3. What are the legal considerations?
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
                
                <TabsContent value="resources" className="mt-6">
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border-green-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <Download className="h-5 w-5 mr-2 text-green-600" />
                              Cheat Sheets
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <FileText className="h-4 w-4 mr-2" />
                                OSINT Checklist
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Terminal className="h-4 w-4 mr-2" />
                                Kali Tools Reference
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                <Users className="h-4 w-4 mr-2" />
                                People Profiling Guide
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-blue-200">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center">
                              <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                              Additional Reading
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                Advanced Techniques
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                Case Studies
                              </Button>
                              <Button variant="outline" size="sm" className="w-full justify-start">
                                Legal Guidelines
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">🔗 Useful Links</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <a href="#" className="text-blue-600 hover:underline">OSINT Framework</a>
                          <a href="#" className="text-blue-600 hover:underline">Kali Linux Documentation</a>
                          <a href="#" className="text-blue-600 hover:underline">Privacy Laws Guide</a>
                          <a href="#" className="text-blue-600 hover:underline">Community Forums</a>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-6 pt-6 border-t">
                <Button 
                  variant="outline"
                  disabled={currentSection === 0}
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                >
                  Previous Section
                </Button>
                
                <div className="flex space-x-2">
                  {!completedSections.has(currentSection) && (
                    <Button 
                      variant="outline"
                      onClick={() => markSectionComplete(currentSection)}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </Button>
                  )}
                  
                  <Button 
                    className="bg-green-400 text-black hover:bg-green-300"
                    onClick={() => onRequestMoreInfo && onRequestMoreInfo(module.id)}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Need Help?
                  </Button>
                </div>
                
                <Button 
                  disabled={currentSection >= (module.sections?.length || 1) - 1}
                  onClick={() => setCurrentSection(Math.min((module.sections?.length || 1) - 1, currentSection + 1))}
                >
                  Next Section
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LearningModule

