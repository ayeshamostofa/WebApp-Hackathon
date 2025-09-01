import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Compass,
  Play,
  Pause
} from 'lucide-react';
import { PanoramaViewer } from '@/components/ui/panorama-viewer';
import FloorBasedTour from '@/components/tour/FloorBasedTour';
import { audioGuides } from '@/config/audio';
import { generateAudio } from '@/utils/audioGenerator';
import artifactsImage from '@/assets/artifacts-display.jpg';
import heroImage from '@/assets/hero-liberation-war.jpg';
import museumLogo from '@/assets/museum-logo.jpg';

interface Gallery {
  id: string;
  name: string;
  description: string;
  artifacts: number;
  featured: boolean;
}

const galleries: Gallery[] = [
  {
    id: 'liberation-hall',
    name: 'Liberation War Hall',
    description: 'Main exhibition showcasing the journey to independence',
    artifacts: 45,
    featured: true
  },
  {
    id: 'martyrs-memorial',
    name: 'Martyrs Memorial Gallery',
    description: 'Honoring the brave souls who sacrificed their lives',
    artifacts: 32,
    featured: true
  },
  {
    id: 'weapons-display',
    name: 'Weapons & Equipment',
    description: 'Military equipment used during the liberation war',
    artifacts: 28,
    featured: false
  },
  {
    id: 'documents-archive',
    name: 'Documents Archive',
    description: 'Historical documents and official papers',
    artifacts: 67,
    featured: false
  },
  {
    id: 'photo-gallery',
    name: 'Photographic Gallery',
    description: 'Rare photographs from 1971',
    artifacts: 89,
    featured: false
  },
  {
    id: 'cultural-heritage',
    name: 'Cultural Heritage',
    description: 'Songs, poems, and cultural artifacts',
    artifacts: 23,
    featured: false
  }
];

export default function VirtualTour() {
  const [selectedGallery, setSelectedGallery] = useState<Gallery>(galleries[0]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);
  const [activeTab, setActiveTab] = useState('floor-tour');

  const toggleAudio = () => {
    if (isAudioPlaying) {
      setIsAudioPlaying(false);
    } else {
      setIsAudioPlaying(true);
      // Generate audio using text-to-speech
      generateAudio('museum-intro').catch(console.error);
    }
  };

  // Sample panorama images for 360° view
  const panoramaImages = [
    {
      id: '1',
      src: heroImage,
      alt: 'Liberation War Hall 360° View',
      title: 'Liberation War Hall',
      description: 'Main exhibition showcasing the journey to independence',
      hotspots: [
        {
          id: 'rifle-display',
          x: 25,
          y: 45,
          title: 'Liberation War Rifle',
          description: 'A .303 rifle used by Mukti Bahini fighters',
          hasAudio: true,
          audioUrl: '/api/audio/rifle-guide.mp3'
        },
        {
          id: 'documents-case',
          x: 75,
          y: 30,
          title: 'Historical Documents',
          description: 'Original manuscripts and official papers',
          hasAudio: true,
          audioUrl: '/api/audio/documents-guide.mp3'
        }
      ]
    },
    {
      id: '2',
      src: artifactsImage,
      alt: 'Martyrs Memorial 360° View',
      title: 'Martyrs Memorial Gallery',
      description: 'Honoring the brave souls who sacrificed their lives',
      hotspots: [
        {
          id: 'memorial-wall',
          x: 50,
          y: 50,
          title: 'Memorial Wall',
          description: 'Wall inscribed with names of martyrs',
          hasAudio: true,
          audioUrl: '/api/audio/memorial-guide.mp3'
        }
      ]
    },
    {
      id: '3',
      src: museumLogo,
      alt: 'Welcome Hall 360° View',
      title: 'Welcome Hall',
      description: 'Introduction to the Liberation War Museum',
      hotspots: [
        {
          id: 'entrance',
          x: 40,
          y: 60,
          title: 'Main Entrance',
          description: 'Welcome to the Liberation War Museum',
          hasAudio: true,
          audioUrl: '/api/audio/entrance-guide.mp3'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Controls */}
      <div className="glass border-b border-white/10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif font-bold text-heritage">Virtual Museum Tour</h1>
            <div className="text-sm text-muted-foreground">
              {activeTab === 'floor-tour' ? 'Floor-Based Tour' : '360° Panorama View'}
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
              onClick={toggleAudio}
            >
              <Volume2 className={`w-4 h-4 ${isAudioPlaying ? 'text-secondary' : ''}`} />
              Audio Guide
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => setShowPanorama(true)}
            >
              <Compass className="w-4 h-4" />
              360° View
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="floor-tour" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Floor-Based Tour
            </TabsTrigger>
            <TabsTrigger value="panorama" className="flex items-center gap-2">
              <Compass className="w-4 h-4" />
              360° Panorama
            </TabsTrigger>
          </TabsList>

          <TabsContent value="floor-tour">
            <FloorBasedTour />
          </TabsContent>

          <TabsContent value="panorama">
            <Card className="card-museum p-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-heritage flex items-center justify-center shadow-glow">
                  <Compass className="w-16 h-16 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4 text-heritage">
                  360° Panorama Experience
                </h3>
                <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                  Explore the museum in immersive 360° panoramic views. Click on hotspots to learn more about specific exhibits.
                </p>
                
                <div className="flex justify-center gap-4">
                  <Button 
                    className="btn-heritage gap-2"
                    onClick={() => setShowPanorama(true)}
                  >
                    <Eye className="w-4 h-4" />
                    Start 360° Tour
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Volume2 className="w-4 h-4" />
                    Audio Guide
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 360° Panorama Viewer */}
      {showPanorama && (
        <PanoramaViewer
          images={panoramaImages}
          onClose={() => setShowPanorama(false)}
        />
      )}
    </div>
  );
}