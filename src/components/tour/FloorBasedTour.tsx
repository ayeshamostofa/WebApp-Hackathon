import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  AudioLines, 
  RotateCcw, 
  ZoomIn, 
  Volume2, 
  Map,
  Navigation,
  Eye,
  ArrowLeft,
  ArrowRight,
  Building,
  Users,
  Clock,
  Star,
  Play,
  Pause
} from 'lucide-react';
import { sectionImages, fallbackImages } from '@/config/images';
import { audioGuides } from '@/config/audio';
import { generateAudio } from '@/utils/audioGenerator';
import artifactsImage from '@/assets/artifacts-display.jpg';
import heroImage from '@/assets/hero-liberation-war.jpg';
import museumLogo from '@/assets/museum-logo.jpg';

interface Floor {
  id: string;
  name: string;
  level: number;
  description: string;
  galleries: Gallery[];
  estimatedTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hasAudio: boolean;
  audioUrl?: string;
}

interface Gallery {
  id: string;
  name: string;
  description: string;
  artifacts: number;
  featured: boolean;
  estimatedTime: string;
  hasAudio: boolean;
  audioUrl?: string;
  imageUrl?: string;
}

const floors: Floor[] = [
  {
    id: 'ground-floor',
    name: 'Ground Floor',
    level: 0,
    description: 'Main entrance and introductory exhibits',
    estimatedTime: '45 minutes',
    difficulty: 'Easy',
    hasAudio: true,
    audioUrl: '/api/audio/ground-floor-guide.mp3',
    galleries: [
      {
        id: 'welcome-hall',
        name: 'Welcome Hall',
        description: 'Introduction to the Liberation War Museum',
        artifacts: 12,
        featured: true,
        estimatedTime: '15 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/welcome-hall.mp3',
        imageUrl: museumLogo
      },
      {
        id: 'timeline-gallery',
        name: 'Timeline Gallery',
        description: 'Chronological journey through 1971',
        artifacts: 28,
        featured: true,
        estimatedTime: '20 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/timeline-gallery.mp3',
        imageUrl: heroImage
      },
      {
        id: 'martyrs-memorial',
        name: 'Martyrs Memorial',
        description: 'Honoring the brave souls who sacrificed their lives',
        artifacts: 32,
        featured: true,
        estimatedTime: '10 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/martyrs-memorial.mp3',
        imageUrl: artifactsImage
      }
    ]
  },
  {
    id: 'first-floor',
    name: 'First Floor',
    level: 1,
    description: 'Main exhibition halls and artifacts',
    estimatedTime: '90 minutes',
    difficulty: 'Medium',
    hasAudio: true,
    audioUrl: '/api/audio/first-floor-guide.mp3',
    galleries: [
      {
        id: 'liberation-hall',
        name: 'Liberation War Hall',
        description: 'Main exhibition showcasing the journey to independence',
        artifacts: 45,
        featured: true,
        estimatedTime: '30 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/liberation-hall.mp3',
        imageUrl: heroImage
      },
      {
        id: 'weapons-display',
        name: 'Weapons & Equipment',
        description: 'Military equipment used during the liberation war',
        artifacts: 28,
        featured: false,
        estimatedTime: '25 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/weapons-display.mp3',
        imageUrl: artifactsImage
      },
      {
        id: 'documents-archive',
        name: 'Documents Archive',
        description: 'Historical documents and official papers',
        artifacts: 67,
        featured: false,
        estimatedTime: '35 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/documents-archive.mp3',
        imageUrl: museumLogo
      }
    ]
  },
  {
    id: 'second-floor',
    name: 'Second Floor',
    level: 2,
    description: 'Multimedia and interactive exhibits',
    estimatedTime: '60 minutes',
    difficulty: 'Easy',
    hasAudio: true,
    audioUrl: '/api/audio/second-floor-guide.mp3',
    galleries: [
      {
        id: 'photo-gallery',
        name: 'Photographic Gallery',
        description: 'Rare photographs from 1971',
        artifacts: 89,
        featured: false,
        estimatedTime: '25 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/photo-gallery.mp3',
        imageUrl: artifactsImage
      },
      {
        id: 'cultural-heritage',
        name: 'Cultural Heritage',
        description: 'Songs, poems, and cultural artifacts',
        artifacts: 23,
        featured: false,
        estimatedTime: '20 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/cultural-heritage.mp3',
        imageUrl: museumLogo
      },
      {
        id: 'interactive-media',
        name: 'Interactive Media Center',
        description: 'Digital exhibits and virtual experiences',
        artifacts: 15,
        featured: true,
        estimatedTime: '15 minutes',
        hasAudio: true,
        audioUrl: '/api/audio/interactive-media.mp3',
        imageUrl: heroImage
      }
    ]
  }
];

export default function FloorBasedTour() {
  const [selectedFloor, setSelectedFloor] = useState<Floor>(floors[0]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);

  const toggleAudio = (audioUrl?: string) => {
    if (isAudioPlaying) {
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      
      // Generate audio using text-to-speech
      if (audioUrl) {
        const audioKey = audioUrl.split('/').pop()?.replace('.mp3', '');
        if (audioKey) {
          generateAudio(audioKey).catch(console.error);
        }
      }
    }
  };

  const startFloorTour = (floor: Floor) => {
    setSelectedFloor(floor);
    setSelectedGallery(null);
    setCurrentTourStep(0);
    if (floor.hasAudio) {
      toggleAudio(floor.audioUrl);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Controls */}
      <div className="glass border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif font-bold text-heritage">Floor-Based Tour Guide</h1>
            <div className="text-sm text-muted-foreground">
              Floor: {selectedFloor.name}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Map className="w-4 h-4" />
              Floor Plan
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => toggleAudio(selectedFloor.audioUrl)}
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'text-secondary' : ''}`} />
              Audio Guide
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Navigation className="w-4 h-4" />
              Navigation
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Floor Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-museum p-6">
              <h3 className="text-lg font-serif font-semibold mb-4 text-heritage">Museum Floors</h3>
              
              <div className="space-y-3">
                {floors.map((floor) => (
                  <button
                    key={floor.id}
                    onClick={() => startFloorTour(floor)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
                      selectedFloor.id === floor.id 
                        ? 'bg-primary text-primary-foreground shadow-glow border-primary' 
                        : 'hover:bg-muted border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <h4 className="font-medium">{floor.name}</h4>
                      </div>
                      <Badge 
                        className={`text-xs ${getDifficultyColor(floor.difficulty)} text-white`}
                      >
                        {floor.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm opacity-75 mb-2">{floor.description}</p>
                    <div className="flex items-center justify-between text-xs opacity-60">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {floor.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {floor.galleries.length} galleries
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Tour Progress */}
              <div className="mt-8 p-4 glass rounded-lg">
                <h4 className="font-semibold mb-3 text-heritage">Tour Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Floor:</span>
                    <span className="font-medium">{selectedFloor.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Galleries Visited:</span>
                    <span className="font-medium">{currentTourStep}/{selectedFloor.galleries.length}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentTourStep / selectedFloor.galleries.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card className="card-museum p-6">
              {/* Floor Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-heritage mb-2">
                      {selectedFloor.name}
                    </h2>
                    <p className="text-muted-foreground">{selectedFloor.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(selectedFloor.difficulty)}>
                      {selectedFloor.difficulty}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      {selectedFloor.estimatedTime}
                    </Badge>
                  </div>
                </div>

                {/* Floor Audio Controls */}
                <div className="flex items-center gap-4 p-4 glass rounded-lg">
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={isAudioPlaying ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleAudio(selectedFloor.audioUrl)}
                    >
                      {isAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      Floor Audio Guide
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {selectedFloor.estimatedTime} tour duration
                    </span>
                  </div>
                </div>
              </div>

              {/* Galleries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFloor.galleries.map((gallery, index) => (
                  <Card 
                    key={gallery.id} 
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-glow ${
                      selectedGallery?.id === gallery.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedGallery(gallery)}
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={gallery.imageUrl || artifactsImage}
                          alt={gallery.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-heritage mb-1">{gallery.name}</h3>
                            <p className="text-sm text-muted-foreground">{gallery.description}</p>
                          </div>
                          {gallery.featured && (
                            <Badge className="bg-accent text-accent-foreground">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>{gallery.artifacts} artifacts</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {gallery.estimatedTime}
                            </span>
                          </div>
                          {gallery.hasAudio && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleAudio(gallery.audioUrl);
                              }}
                            >
                              <Volume2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Selected Gallery Details */}
              {selectedGallery && (
                <div className="mt-6 p-6 glass rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-serif font-bold text-heritage">
                      {selectedGallery.name}
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedGallery(null)}
                    >
                      ×
                    </Button>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{selectedGallery.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 glass rounded-lg">
                      <div className="text-2xl font-bold text-heritage">{selectedGallery.artifacts}</div>
                      <div className="text-xs text-muted-foreground">Artifacts</div>
                    </div>
                    <div className="text-center p-3 glass rounded-lg">
                      <div className="text-2xl font-bold text-heritage">{selectedGallery.estimatedTime}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center p-3 glass rounded-lg">
                      <div className="text-2xl font-bold text-heritage">
                        {selectedGallery.hasAudio ? '✓' : '✗'}
                      </div>
                      <div className="text-xs text-muted-foreground">Audio Guide</div>
                    </div>
                    <div className="text-center p-3 glass rounded-lg">
                      <div className="text-2xl font-bold text-heritage">
                        {selectedGallery.featured ? '★' : '☆'}
                      </div>
                      <div className="text-xs text-muted-foreground">Featured</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="btn-heritage">
                      <Eye className="w-4 h-4 mr-2" />
                      Start Gallery Tour
                    </Button>
                    {selectedGallery.hasAudio && (
                      <Button 
                        variant="outline"
                        onClick={() => toggleAudio(selectedGallery.audioUrl)}
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Play Audio Guide
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
