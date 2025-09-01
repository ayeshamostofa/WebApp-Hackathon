import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward,
  RotateCcw,
  Download,
  Share2,
  List,
  Clock,
  Headphones
} from 'lucide-react';
import { audioGuides, audioCategories } from '@/config/audio';
import { AudioGenerator, audioContent } from '@/utils/audioGenerator';

interface AudioManagerProps {
  className?: string;
}

export const AudioManager: React.FC<AudioManagerProps> = ({ className = "" }) => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('floor-tours');
  const audioGenerator = AudioGenerator.getInstance();
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [estimatedDuration, setEstimatedDuration] = useState<number>(0);

  useEffect(() => {
    // Cleanup interval on unmount
    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [progressInterval]);

  const playAudio = async (audioKey: string) => {
    const audioGuide = audioGuides[audioKey as keyof typeof audioGuides];
    if (!audioGuide) return;

    if (currentAudio === audioKey && isPlaying) {
      // Pause current audio
      audioGenerator.stop();
      setIsPlaying(false);
      setCurrentAudio(null);
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    } else {
      // Play new audio
      audioGenerator.stop();
      
      setCurrentAudio(audioKey);
      setIsLoading(true);
      setCurrentTime(0);
      setStartTime(Date.now());
      
      // Estimate duration based on text length (words per minute)
      const content = audioContent[audioKey as keyof typeof audioContent];
      if (content) {
        const wordCount = content.split(' ').length;
        const estimatedMinutes = wordCount / 150; // 150 words per minute
        setEstimatedDuration(estimatedMinutes * 60);
        setTotalDuration(estimatedMinutes * 60);
      }

      try {
        await audioGenerator.speak(content || audioGuide.description, {
          rate: 0.9,
          pitch: 1,
          volume: volume,
          voice: 'en'
        });
        
        setIsPlaying(true);
        setIsLoading(false);
        
        // Start progress tracking
        const interval = setInterval(() => {
          setCurrentTime(prev => {
            const elapsed = (Date.now() - startTime) / 1000;
            if (elapsed >= estimatedDuration) {
              clearInterval(interval);
              setIsPlaying(false);
              setCurrentTime(0);
              setCurrentAudio(null);
              return 0;
            }
            return elapsed;
          });
        }, 100);
        
        setProgressInterval(interval);
        
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsLoading(false);
        setCurrentAudio(null);
      }
    }
  };

  const togglePlayPause = () => {
    if (!currentAudio) return;

    if (isPlaying) {
      audioGenerator.pause();
      setIsPlaying(false);
      if (progressInterval) {
        clearInterval(progressInterval);
        setProgressInterval(null);
      }
    } else {
      audioGenerator.resume();
      setIsPlaying(true);
      
      // Restart progress tracking
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          const elapsed = (Date.now() - startTime) / 1000;
          if (elapsed >= estimatedDuration) {
            clearInterval(interval);
            setIsPlaying(false);
            setCurrentTime(0);
            setCurrentAudio(null);
            return 0;
          }
          return elapsed;
        });
      }, 100);
      
      setProgressInterval(interval);
    }
  };

  const handleSeek = (value: number[]) => {
    if (!currentAudio) return;
    
    const newTime = (value[0] / 100) * totalDuration;
    setCurrentTime(newTime);
    setStartTime(Date.now() - (newTime * 1000));
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    // Update current audio volume if playing
    if (currentAudio && isPlaying) {
      // For text-to-speech, we can't change volume mid-speech
      // This would require restarting the speech
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isMuted) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const skipBackward = () => {
    if (!currentAudio) return;
    
    const newTime = Math.max(0, currentTime - 10);
    setCurrentTime(newTime);
    setStartTime(Date.now() - (newTime * 1000));
  };

  const skipForward = () => {
    if (!currentAudio) return;
    
    const newTime = Math.min(totalDuration, currentTime + 10);
    setCurrentTime(newTime);
    setStartTime(Date.now() - (newTime * 1000));
  };

  const restart = () => {
    if (!currentAudio) return;
    
    setCurrentTime(0);
    setStartTime(Date.now());
    
    // Restart the audio
    playAudio(currentAudio);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const getCurrentAudioGuide = () => {
    if (!currentAudio) return null;
    return audioGuides[currentAudio as keyof typeof audioGuides];
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-heritage">Audio Guide Manager</h2>
        <Headphones className="w-6 h-6 text-primary" />
      </div>

      {/* Current Audio Player */}
      {currentAudio && getCurrentAudioGuide() && (
        <div className="mb-6 p-4 glass rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-heritage">{getCurrentAudioGuide()?.title}</h3>
              <p className="text-sm text-muted-foreground">{getCurrentAudioGuide()?.description}</p>
            </div>
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              {getCurrentAudioGuide()?.duration}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-muted-foreground">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1">
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatTime(totalDuration)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={skipBackward}
                disabled={currentTime < 10}
              >
                <SkipBack className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={restart}
                disabled={currentTime === 0}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                className="btn-heritage"
                size="sm"
                onClick={togglePlayPause}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={skipForward}
                disabled={currentTime >= totalDuration - 10}
              >
                <SkipForward className="w-4 h-4" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleMute}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <div className="w-20">
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audio Categories */}
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {Object.keys(audioCategories).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "btn-heritage" : ""}
            >
              {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Button>
          ))}
        </div>

        {/* Audio List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audioCategories[selectedCategory as keyof typeof audioCategories]?.map((audioKey) => {
            const audioGuide = audioGuides[audioKey as keyof typeof audioGuides];
            if (!audioGuide) return null;

            const isCurrentAudio = currentAudio === audioKey;
            const isCurrentPlaying = isCurrentAudio && isPlaying;

            return (
              <Card 
                key={audioKey}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-glow ${
                  isCurrentAudio ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => playAudio(audioKey)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-heritage mb-1">{audioGuide.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{audioGuide.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {audioGuide.duration}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={isCurrentPlaying ? "default" : "outline"}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(audioKey);
                      }}
                    >
                      {isCurrentPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Info about Text-to-Speech */}
      <div className="mt-6 p-4 glass rounded-lg">
        <h4 className="font-medium mb-2 text-heritage">Text-to-Speech Audio</h4>
        <p className="text-sm text-muted-foreground">
          This audio system uses text-to-speech technology to provide narrated guides for all museum sections. 
          The audio is generated in real-time and provides clear, understandable narration of the museum content.
        </p>
      </div>
    </Card>
  );
};
