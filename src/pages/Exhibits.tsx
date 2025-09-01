import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Calendar, 
  MapPin, 
  Volume2, 
  Eye,
  Star,
  Download,
  Share2
} from 'lucide-react';
import { Model3DViewer } from '@/components/artifacts/Model3DViewer';
import { ImageSlider } from '@/components/ui/image-slider';
import { sectionImages, fallbackImages } from '@/config/images';
import { audioGuides } from '@/config/audio';
import { generateAudio } from '@/utils/audioGenerator';
import artifactsImage from '@/assets/artifacts-display.jpg';
import heroImage from '@/assets/hero-liberation-war.jpg';
import museumLogo from '@/assets/museum-logo.jpg';

interface Artifact {
  id: string;
  name: string;
  description: string;
  year: number;
  category: string;
  gallery: string;
  featured: boolean;
  hasAudio: boolean;
  has3D: boolean;
  imageUrl: string;
}

const artifacts: Artifact[] = [
  {
    id: '1',
    name: 'Liberation War Rifle',
    description: 'A .303 rifle used by Mukti Bahini fighters during the 1971 Liberation War.',
    year: 1971,
    category: 'Weapons',
    gallery: 'Weapons & Equipment',
    featured: true,
    hasAudio: true,
    has3D: true,
    imageUrl: heroImage
  },
  {
    id: '2',
    name: 'Freedom Fighter Helmet',
    description: 'Military helmet worn by a freedom fighter in the Chittagong region.',
    year: 1971,
    category: 'Military Equipment',
    gallery: 'Weapons & Equipment',
    featured: true,
    hasAudio: true,
    has3D: true,
    imageUrl: artifactsImage
  },
  {
    id: '3',
    name: 'Declaration of Independence',
    description: 'Original manuscript of the Independence Declaration broadcast.',
    year: 1971,
    category: 'Documents',
    gallery: 'Documents Archive',
    featured: true,
    hasAudio: true,
    has3D: false,
    imageUrl: museumLogo
  },
  {
    id: '4',
    name: 'Victory Medal',
    description: 'Commemorative medal awarded to liberation war veterans.',
    year: 1972,
    category: 'Awards',
    gallery: 'Liberation War Hall',
    featured: false,
    hasAudio: true,
    has3D: true,
    imageUrl: heroImage
  },
  {
    id: '5',
    name: 'Martyrs Photograph Collection',
    description: 'Rare photographs of martyred freedom fighters and civilians.',
    year: 1971,
    category: 'Photographs',
    gallery: 'Photographic Gallery',
    featured: true,
    hasAudio: true,
    has3D: false,
    imageUrl: artifactsImage
  },
  {
    id: '6',
    name: 'Liberation War Songs',
    description: 'Original recordings of patriotic songs from the liberation period.',
    year: 1971,
    category: 'Audio',
    gallery: 'Cultural Heritage',
    featured: false,
    hasAudio: true,
    has3D: false,
    imageUrl: museumLogo
  }
];

const categories = ['All', 'Weapons', 'Documents', 'Photographs', 'Military Equipment', 'Awards', 'Audio'];

export default function Exhibits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'slider'>('slider');
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  const [show3DViewer, setShow3DViewer] = useState<Artifact | null>(null);

  // Convert artifacts to image slider format
  const sliderImages = artifacts.map(artifact => ({
    id: artifact.id,
    src: artifact.imageUrl,
    alt: artifact.name,
    title: artifact.name,
    description: artifact.description,
    hasAudio: artifact.hasAudio,
    audioUrl: `/api/audio/${artifact.id}-guide.mp3`
  }));

  const filteredArtifacts = artifacts.filter(artifact => {
    const matchesSearch = artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || artifact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSliderImages = sliderImages.filter(image => {
    const artifact = artifacts.find(a => a.id === image.id);
    if (!artifact) return false;
    const matchesSearch = artifact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artifact.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || artifact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-heritage mb-4">
              Museum Exhibits
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of artifacts, documents, and multimedia 
              content from the 1971 Liberation War.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search artifacts by name, year, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "btn-heritage" : ""}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              
              <div className="flex rounded-lg border border-border overflow-hidden">
                <Button
                  variant={viewMode === 'slider' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('slider')}
                  className="rounded-none border-0"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none border-0"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none border-0"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Found {filteredArtifacts.length} artifact{filteredArtifacts.length !== 1 ? 's' : ''}
          </p>
          <div className="text-sm text-muted-foreground">
            Showing results for: <span className="font-medium">{selectedCategory}</span>
          </div>
        </div>
      </div>

      {/* Artifacts Grid/List/Slider */}
      <div className="container mx-auto px-4 pb-12">
        {viewMode === 'slider' ? (
          <div className="mb-8">
            <ImageSlider 
              images={filteredSliderImages}
              autoPlay={true}
              interval={5000}
              showControls={true}
              showThumbnails={true}
            />
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtifacts.map((artifact) => (
              <Card key={artifact.id} className="card-museum overflow-hidden group">
                <div className="relative">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {artifact.featured && (
                      <Badge className="bg-accent text-accent-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {artifact.has3D && (
                      <Badge variant="outline" className="glass border-white/30 text-white">
                        3D Model
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {artifact.hasAudio && (
                      <Button size="sm" variant="outline" className="glass border-white/30 text-white hover:bg-white/10 p-2">
                        <Volume2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{artifact.category}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {artifact.year}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-serif font-semibold mb-2 text-heritage">
                    {artifact.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {artifact.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {artifact.gallery}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 btn-heritage"
                      onClick={() => setSelectedArtifact(artifact)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {artifact.has3D && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShow3DViewer(artifact)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArtifacts.map((artifact) => (
              <Card key={artifact.id} className="card-museum p-6">
                <div className="flex gap-6">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-heritage mb-1">
                          {artifact.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {artifact.year}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {artifact.gallery}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {artifact.featured && (
                          <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                        )}
                        <Badge variant="outline">{artifact.category}</Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">
                      {artifact.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {artifact.hasAudio && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Volume2 className="w-4 h-4" />
                            Audio Available
                          </div>
                        )}
                        {artifact.has3D && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4" />
                            3D Model Available
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="btn-heritage"
                          onClick={() => setSelectedArtifact(artifact)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Artifact Detail Modal (placeholder) */}
      {selectedArtifact && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-serif font-bold text-heritage">
                  {selectedArtifact.name}
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedArtifact(null)}
                >
                  ×
                </Button>
              </div>
              
              <img
                src={selectedArtifact.imageUrl}
                alt={selectedArtifact.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <p className="text-muted-foreground mb-6">
                {selectedArtifact.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm font-medium mb-1">Year</div>
                  <div className="text-muted-foreground">{selectedArtifact.year}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Category</div>
                  <div className="text-muted-foreground">{selectedArtifact.category}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Gallery</div>
                  <div className="text-muted-foreground">{selectedArtifact.gallery}</div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Features</div>
                  <div className="flex gap-2">
                    {selectedArtifact.hasAudio && <Badge variant="outline">Audio</Badge>}
                    {selectedArtifact.has3D && <Badge variant="outline">3D Model</Badge>}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                {selectedArtifact.has3D && (
                  <Button 
                    className="btn-heritage flex-1"
                    onClick={() => {
                      setShow3DViewer(selectedArtifact);
                      setSelectedArtifact(null);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View 3D Model
                  </Button>
                )}
                {selectedArtifact.hasAudio && (
                  <Button variant="outline" className="flex-1">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Play Audio Guide
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 3D Model Viewer */}
      {show3DViewer && (
        <Model3DViewer
          artifactName={show3DViewer.name}
          onClose={() => setShow3DViewer(null)}
        />
      )}
    </div>
  );
}