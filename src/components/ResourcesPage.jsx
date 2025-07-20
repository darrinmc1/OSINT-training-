import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Download, 
  FileText, 
  CheckSquare, 
  Terminal, 
  Users, 
  Search,
  Star,
  Calendar,
  Eye,
  Filter
} from 'lucide-react'

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const resources = [
    {
      id: 'osint-checklist',
      title: 'OSINT Investigation Checklist',
      description: 'Comprehensive 10-phase checklist for systematic OSINT investigations. Never miss a step again!',
      category: 'checklists',
      type: 'PDF',
      size: '2.1 MB',
      downloads: 1247,
      rating: 4.9,
      lastUpdated: '2025-01-15',
      icon: <CheckSquare className="h-6 w-6" />,
      tags: ['investigation', 'methodology', 'systematic'],
      featured: true
    },
    {
      id: 'kali-cheatsheet',
      title: 'Kali Linux Tools Quick Reference',
      description: 'Essential commands and usage examples for all major Kali tools. Your pocket guide to digital mastery!',
      category: 'cheatsheets',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 2156,
      rating: 4.8,
      lastUpdated: '2025-01-10',
      icon: <Terminal className="h-6 w-6" />,
      tags: ['kali', 'commands', 'reference'],
      featured: true
    },
    {
      id: 'people-profiling',
      title: 'People Profiling Workflow Template',
      description: 'Step-by-step template for ethical people investigations. Includes legal guidelines and best practices.',
      category: 'templates',
      type: 'PDF',
      size: '3.2 MB',
      downloads: 892,
      rating: 4.7,
      lastUpdated: '2025-01-12',
      icon: <Users className="h-6 w-6" />,
      tags: ['profiling', 'investigation', 'template'],
      featured: true
    },
    {
      id: 'search-operators',
      title: 'Advanced Search Operators Guide',
      description: 'Master Google-fu and other search engines with this comprehensive operators reference.',
      category: 'guides',
      type: 'PDF',
      size: '1.5 MB',
      downloads: 1834,
      rating: 4.6,
      lastUpdated: '2025-01-08',
      icon: <Search className="h-6 w-6" />,
      tags: ['search', 'google', 'operators']
    },
    {
      id: 'osint-tools-list',
      title: 'OSINT Tools Master List',
      description: 'Curated list of 200+ OSINT tools with descriptions, use cases, and direct links.',
      category: 'lists',
      type: 'Excel',
      size: '0.8 MB',
      downloads: 3421,
      rating: 4.9,
      lastUpdated: '2025-01-14',
      icon: <FileText className="h-6 w-6" />,
      tags: ['tools', 'comprehensive', 'links']
    },
    {
      id: 'legal-guidelines',
      title: 'OSINT Legal & Ethical Guidelines',
      description: 'Stay on the right side of the law with this comprehensive legal reference for OSINT practitioners.',
      category: 'guides',
      type: 'PDF',
      size: '2.7 MB',
      downloads: 756,
      rating: 4.8,
      lastUpdated: '2025-01-05',
      icon: <FileText className="h-6 w-6" />,
      tags: ['legal', 'ethics', 'compliance']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Resources', count: resources.length },
    { id: 'checklists', name: 'Checklists', count: resources.filter(r => r.category === 'checklists').length },
    { id: 'cheatsheets', name: 'Cheat Sheets', count: resources.filter(r => r.category === 'cheatsheets').length },
    { id: 'templates', name: 'Templates', count: resources.filter(r => r.category === 'templates').length },
    { id: 'guides', name: 'Guides', count: resources.filter(r => r.category === 'guides').length },
    { id: 'lists', name: 'Tool Lists', count: resources.filter(r => r.category === 'lists').length }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredResources = resources.filter(r => r.featured)

  const handleDownload = (resourceId) => {
    // In a real app, this would trigger the actual download
    console.log(`Downloading resource: ${resourceId}`)
    // For now, we'll just show an alert
    alert(`Download started for ${resources.find(r => r.id === resourceId)?.title}`)
  }

  const ResourceCard = ({ resource, featured = false }) => (
    <Card className={`hover:shadow-lg transition-shadow ${featured ? 'border-green-400 bg-green-50' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`${featured ? 'text-green-600' : 'text-gray-600'}`}>
              {resource.icon}
            </div>
            <div>
              <CardTitle className="text-lg">{resource.title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{resource.type}</Badge>
                <Badge variant="secondary">{resource.size}</Badge>
                {featured && <Badge className="bg-green-400 text-black">Featured</Badge>}
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{resource.rating}</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <Download className="h-4 w-4" />
              <span>{resource.downloads.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {resource.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            Updated {new Date(resource.lastUpdated).toLocaleDateString()}
          </div>
          <Button 
            className="bg-green-400 text-black hover:bg-green-300"
            onClick={() => handleDownload(resource.id)}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-green-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-mono">Resource Library</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your arsenal of OSINT tools, checklists, and guides. Because even digital detectives need their reference materials! 
            All resources are free and regularly updated by our community of experts.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search resources, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recently Updated</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{resources.length}</div>
                  <div className="text-sm text-gray-600">Total Resources</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {resources.reduce((sum, r) => sum + r.downloads, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Downloads</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(resources.reduce((sum, r) => sum + r.rating, 0) / resources.length).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">Free</div>
                  <div className="text-sm text-gray-600">All Resources</div>
                </CardContent>
              </Card>
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No resources found</h3>
                <p className="text-gray-500">
                  Try adjusting your search terms or category filter.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="featured" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Featured Resources</h2>
              <p className="text-gray-600">
                Our most popular and highly-rated resources, handpicked by the community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} featured={true} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Recently Updated</h2>
              <p className="text-gray-600">
                The latest updates to our resource library. Stay current with the newest techniques and tools.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources
                .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
                .slice(0, 6)
                .map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-lg mb-6">
            Our community is always creating new resources. Request a specific guide or contribute your own!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Request a Resource
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
              Contribute Content
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage

