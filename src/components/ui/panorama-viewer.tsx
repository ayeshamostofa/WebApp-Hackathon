import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Move, 
  Eye,
  Maximize2,
  X,
  Info,
  Compass,
  MapPin,
  Volume2,
  Play,
  Pause
} from 'lucide-react';

interface PanoramaViewerProps {
  images: {
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
    hotspots?: {
      id: string;
      x: number;
      y: number;
      title: string;
      description: string;
      hasAudio?: boolean;
      audioUrl?: string;
    }[];
  }[];
  onClose?: () => void;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({ 
  images, 
  onClose 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);

  const currentImage = images[currentImageIndex];

  useEffect(() => {
    // Clean up audio when component unmounts
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [audioElement]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      if (audioElement) {
        audioElement.pause();
      }
      setIsAudioPlaying(false);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      // Simulate audio playback
      const audio = new Audio('/api/audio/panorama-guide.mp3');
      audio.play();
      setAudioElement(audio);
      setIsAudioPlaying(true);
      
      audio.onended = () => {
        setIsAudioPlaying(false);
      };
    }
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    resetView();
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    resetView();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl h-[95vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-serif font-bold text-heritage">360° Museum Tour</h2>
            <p className="text-sm text-muted-foreground">{currentImage.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleAudio}
            >
              {isAudioPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              Audio Guide
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* 360° Viewer Area */}
          <div className="flex-1 relative bg-gradient-to-br from-muted/20 to-background overflow-hidden">
            <div 
              ref={containerRef}
              className="w-full h-full relative cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
            >
              {/* Panorama Image */}
              <div 
                className="absolute inset-0 transition-transform duration-300"
                style={{
                  transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                  backgroundImage: `url(${currentImage.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              />

              {/* Hotspots */}
              {currentImage.hotspots?.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute w-6 h-6 cursor-pointer group"
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <div className="w-full h-full bg-primary rounded-full flex items-center justify-center shadow-glow animate-pulse">
                    <MapPin className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-background border border-border rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-lg">
                      {hotspot.title}
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 glass border-white/30 hover:bg-white/10"
                onClick={goToPreviousImage}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 glass border-white/30 hover:bg-white/10"
                onClick={goToNextImage}
              >
                <RotateCw className="w-4 h-4" />
              </Button>

              {/* Compass */}
              <div className="absolute top-4 right-4">
                <Card className="glass p-3">
                  <Compass className="w-6 h-6 text-primary" />
                </Card>
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-white/30 hover:bg-white/10"
                  onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-white/30 hover:bg-white/10"
                  onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-white/30 hover:bg-white/10"
                  onClick={resetView}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4">
                <Card className="glass px-3 py-2">
                  <span className="text-sm text-muted-foreground">
                    {currentImageIndex + 1} / {images.length}
                  </span>
                </Card>
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <div className="w-80 p-6 border-l border-border bg-muted/20 space-y-6">
            <div>
              <h3 className="font-semibold text-heritage mb-4">Location Info</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-heritage">{currentImage.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {currentImage.description}
                  </p>
                </div>
                
                {currentImage.hotspots && (
                  <div>
                    <h5 className="font-medium mb-2">Points of Interest</h5>
                    <div className="space-y-2">
                      {currentImage.hotspots.map((hotspot) => (
                        <button
                          key={hotspot.id}
                          className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                          onClick={() => setSelectedHotspot(hotspot)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-medium text-sm">{hotspot.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{hotspot.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls Guide */}
            <div className="space-y-4">
              <h3 className="font-semibold text-heritage">Controls</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Move className="w-4 h-4" />
                  <span>Click & drag to rotate view</span>
                </div>
                <div className="flex items-center gap-2">
                  <ZoomIn className="w-4 h-4" />
                  <span>Scroll to zoom in/out</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset view to center</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Click hotspots for details</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full btn-heritage">
                <Eye className="w-4 h-4 mr-2" />
                View in VR
              </Button>
              <Button variant="outline" className="w-full">
                <Maximize2 className="w-4 h-4 mr-2" />
                Fullscreen Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Hotspot Detail Modal */}
        {selectedHotspot && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-serif font-bold text-heritage">
                    {selectedHotspot.title}
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedHotspot(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  {selectedHotspot.description}
                </p>
                
                {selectedHotspot.hasAudio && (
                  <Button 
                    className="w-full btn-heritage"
                    onClick={() => {
                      // Handle hotspot audio
                      setSelectedHotspot(null);
                    }}
                  >
                    <Volume2 className="w-4 h-4 mr-2" />
                    Play Audio Guide
                  </Button>
                )}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
};
