import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AudioPlayer } from '@/components/ui/audio-player';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Eye,
  Download,
  Share2
} from 'lucide-react';

interface ImageSliderProps {
  images: {
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
    hasAudio?: boolean;
    audioUrl?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showThumbnails?: boolean;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showThumbnails = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isPlaying && images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, interval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, interval, images.length]);

  useEffect(() => {
    // Clean up audio when component unmounts
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [audioElement]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleAudio = () => {
    const currentImage = images[currentIndex];
    if (!currentImage.hasAudio || !currentImage.audioUrl) return;

    if (isAudioPlaying) {
      if (audioElement) {
        audioElement.pause();
      }
      setIsAudioPlaying(false);
    } else {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(currentImage.audioUrl);
      audio.play();
      setAudioElement(audio);
      setIsAudioPlaying(true);
      
      audio.onended = () => {
        setIsAudioPlaying(false);
      };
    }
  };

  const openAudioPlayer = () => {
    const currentImage = images[currentIndex];
    if (currentImage.hasAudio && currentImage.audioUrl) {
      setShowAudioPlayer(true);
    }
  };

  if (!images.length) {
    return (
      <Card className="card-museum p-8 text-center">
        <p className="text-muted-foreground">No images available</p>
      </Card>
    );
  }

  return (
    <Card className="card-museum overflow-hidden">
      {/* Main Slider */}
      <div className="relative">
        <div className="aspect-video relative overflow-hidden">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with image info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-white/90 text-sm">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {showControls && images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass border-white/30 hover:bg-white/10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass border-white/30 hover:bg-white/10"
              onClick={goToNext}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Play/Pause Control */}
        {images.length > 1 && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 glass border-white/30 hover:bg-white/10"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        )}

        {/* Audio Control */}
        {images[currentIndex].hasAudio && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 glass border-white/30 hover:bg-white/10"
            onClick={openAudioPlayer}
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button variant="outline" size="sm" className="glass border-white/30 hover:bg-white/10">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="glass border-white/30 hover:bg-white/10">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="glass border-white/30 hover:bg-white/10">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-primary shadow-glow'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      {images.length > 1 && (
        <div className="px-4 pb-4">
          <div className="flex gap-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index === currentIndex ? 'bg-primary' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Audio Player Modal */}
      {showAudioPlayer && images[currentIndex].hasAudio && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-heritage">
                  Audio Guide
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAudioPlayer(false)}
                >
                  ×
                </Button>
              </div>
              
              <AudioPlayer
                audioUrl={images[currentIndex].audioUrl || ''}
                title={images[currentIndex].title}
                description={images[currentIndex].description}
                showControls={true}
                className="mb-4"
              />
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};
