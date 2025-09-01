import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, MapPin, AudioLines, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-liberation-war.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-museum" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-accent rounded-full animate-pulse opacity-60" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary rounded-full animate-pulse opacity-40 delay-1000" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary-light rounded-full animate-pulse opacity-50 delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 animate-fade-in">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-white">Commemorating 1971 Liberation War</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in delay-200">
            Digital
            <span className="block text-transparent bg-gradient-to-r from-accent to-accent-light bg-clip-text">
              Liberation War
            </span>
            Museum
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto animate-fade-in delay-400">
            Experience the heroic journey of Bangladesh's independence through immersive digital archives, 
            360° virtual tours, and interactive historical narratives.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in delay-600">
            <Button 
              onClick={() => navigate('/virtual-tour')}
              className="tour-button text-lg px-8 py-4 h-auto"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Start Virtual Tour
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              onClick={() => navigate('/exhibits')}
              variant="outline" 
              className="glass border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              <Play className="w-5 h-5 mr-2" />
              View Exhibits
            </Button>
            
            <Button 
              variant="outline" 
              className="glass border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
            >
              <AudioLines className="w-5 h-5 mr-2" />
              Play Audio Guide
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in delay-800">
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <div className="text-sm text-gray-300">Historical Artifacts</div>
            </div>
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-secondary mb-2">12</div>
              <div className="text-sm text-gray-300">Virtual Galleries</div>
            </div>
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-primary-light mb-2">360°</div>
              <div className="text-sm text-gray-300">Immersive Views</div>
            </div>
            <div className="glass p-6 rounded-xl">
              <div className="text-3xl font-bold text-accent-light mb-2">1971</div>
              <div className="text-sm text-gray-300">Year of Liberation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};