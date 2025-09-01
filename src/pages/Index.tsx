import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Eye, 
  Calendar, 
  Users, 
  AudioLines, 
  Star,
  Award,
  Clock,
  ArrowRight,
  Play,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import artifactsImage from '@/assets/artifacts-display.jpg';

const featuredExhibits = [
  {
    id: 1,
    title: "Liberation War Weapons Collection",
    description: "Authentic weapons and military equipment used during the 1971 Liberation War",
    image: artifactsImage,
    category: "Military Heritage",
    artifacts: 45,
    hasAudio: true,
    has3D: true
  },
  {
    id: 2,
    title: "Martyrs Memorial Gallery",
    description: "Honoring the brave souls who sacrificed their lives for independence",
    image: artifactsImage,
    category: "Memorial",
    artifacts: 32,
    hasAudio: true,
    has3D: false
  },
  {
    id: 3,
    title: "Historical Documents Archive",
    description: "Original manuscripts, declarations, and official wartime correspondence",
    image: artifactsImage,
    category: "Documents",
    artifacts: 67,
    hasAudio: true,
    has3D: false
  }
];

const timelineHighlights = [
  {
    date: "March 7, 1971",
    title: "Historic Speech",
    description: "Sheikh Mujibur Rahman's call for independence"
  },
  {
    date: "March 26, 1971", 
    title: "Declaration of Independence",
    description: "The birth of Bangladesh proclaimed"
  },
  {
    date: "December 16, 1971",
    title: "Victory Day",
    description: "Pakistani forces surrender, Bangladesh liberated"
  }
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      {/* Features Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage mb-6">
              Explore Digital Heritage
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in Bangladesh's liberation history through cutting-edge technology, 
              interactive exhibits, and comprehensive digital archives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-exhibit text-center p-8 group cursor-pointer" onClick={() => navigate('/virtual-tour')}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-heritage flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold text-heritage mb-3">360° Virtual Tours</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Navigate through 12 virtual galleries with immersive 360-degree views
              </p>
              <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary">
                Start Tour
              </Button>
            </Card>

            <Card className="card-exhibit text-center p-8 group cursor-pointer" onClick={() => navigate('/exhibits')}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-liberation flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Eye className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold text-heritage mb-3">Interactive Exhibits</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Browse 500+ artifacts with detailed information and 3D models
              </p>
              <Button variant="outline" size="sm" className="group-hover:border-secondary group-hover:text-secondary">
                View Exhibits
              </Button>
            </Card>

            <Card className="card-exhibit text-center p-8 group cursor-pointer" onClick={() => navigate('/timeline')}>
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-golden flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold text-heritage mb-3">Historical Timeline</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Follow the chronological journey from 1971 liberation war
              </p>
              <Button variant="outline" size="sm" className="group-hover:border-accent group-hover:text-accent">
                Explore Timeline
              </Button>
            </Card>

            <Card className="card-exhibit text-center p-8 group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-heritage flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <AudioLines className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-serif font-bold text-heritage mb-3">Audio Guides</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Listen to expert commentary and survivor testimonials
              </p>
              <Button variant="outline" size="sm" className="group-hover:border-primary group-hover:text-primary">
                Play Audio Guide
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Exhibits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage mb-4">
                Featured Exhibits
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover our most significant collections and artifacts
              </p>
            </div>
            <Button 
              onClick={() => navigate('/exhibits')}
              className="btn-heritage gap-2"
            >
              View All Exhibits
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredExhibits.map((exhibit) => (
              <Card key={exhibit.id} className="card-museum overflow-hidden group">
                <div className="relative">
                  <img
                    src={exhibit.image}
                    alt={exhibit.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {exhibit.hasAudio && (
                      <Badge variant="outline" className="glass border-white/30 text-white">
                        Audio
                      </Badge>
                    )}
                    {exhibit.has3D && (
                      <Badge variant="outline" className="glass border-white/30 text-white">
                        3D
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">{exhibit.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {exhibit.artifacts}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-heritage mb-3">
                    {exhibit.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-6">
                    {exhibit.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button 
                      size="sm" 
                      className="flex-1 btn-heritage"
                      onClick={() => navigate('/exhibits')}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {exhibit.hasAudio && (
                      <Button size="sm" variant="outline">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heritage mb-6">
              Liberation War Timeline
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Key moments that shaped Bangladesh's journey to independence in 1971
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary opacity-30" />
              
              <div className="space-y-8">
                {timelineHighlights.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <Card className="ml-16 card-museum p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-secondary text-secondary-foreground">
                          Key Event
                        </Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-heritage mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-muted-foreground">
                        {event.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Button 
                onClick={() => navigate('/timeline')}
                className="btn-heritage gap-2"
              >
                <Clock className="w-4 h-4" />
                Explore Full Timeline
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="card-museum p-12 text-center bg-gradient-heritage text-primary-foreground">
            <Award className="w-20 h-20 mx-auto mb-8 text-white" />
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Begin Your Digital Heritage Journey
            </h2>
            
            <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
              Experience the Liberation War Museum like never before. Start your virtual tour, 
              create an account to save favorites, or contribute to preserving our heritage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <Button 
                onClick={() => navigate('/virtual-tour')}
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 py-4"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Start Virtual Tour
              </Button>
              
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 py-4"
              >
                <Users className="w-5 h-5 mr-2" />
                Create Account
              </Button>
              
              <Button 
                onClick={() => navigate('/donors')}
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 py-4"
              >
                <Award className="w-5 h-5 mr-2" />
                Support Museum
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
