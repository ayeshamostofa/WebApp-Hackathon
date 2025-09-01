import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, MapPin, AudioLines, Search } from 'lucide-react';
import { SearchModal } from '@/components/search/SearchModal';
import { AudioManager } from '@/components/audio/AudioManager';
import museumLogo from '@/assets/museum-logo.jpg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAudioOpen, setIsAudioOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="glass border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img 
                src={museumLogo} 
                alt="Liberation War Museum" 
                className="w-12 h-12 rounded-full shadow-artifact"
              />
              <div>
                <h1 className="text-xl font-serif font-bold text-heritage">Liberation War Museum</h1>
                <p className="text-sm text-muted-foreground">মুক্তিযুদ্ধ জাদুঘর</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-foreground hover:text-heritage transition-colors">
                Home
              </Link>
              <Link to="/virtual-tour" className="text-foreground hover:text-heritage transition-colors">
                Virtual Tour
              </Link>
              <Link to="/floor-tour" className="text-foreground hover:text-heritage transition-colors">
                Floor Tour
              </Link>
              <Link to="/exhibits" className="text-foreground hover:text-heritage transition-colors">
                Exhibits
              </Link>
              <Link to="/timeline" className="text-foreground hover:text-heritage transition-colors">
                Timeline
              </Link>
              <Link to="/donors" className="text-foreground hover:text-heritage transition-colors">
                Donors
              </Link>
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setIsAudioOpen(true)}
              >
                <AudioLines className="w-4 h-4" />
                Audio Guide
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline" 
                size="sm" 
                className="gap-2"
              >
                <User className="w-4 h-4" />
                Login
              </Button>
              <Button 
                onClick={() => navigate('/virtual-tour')}
                className="btn-heritage gap-2"
              >
                <MapPin className="w-4 h-4" />
                Start Tour
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-6 pb-6 border-t border-white/10">
              <nav className="flex flex-col gap-4 mt-6">
                <Link to="/" className="text-foreground hover:text-heritage transition-colors py-2">
                  Home
                </Link>
                <Link to="/virtual-tour" className="text-foreground hover:text-heritage transition-colors py-2">
                  Virtual Tour
                </Link>
                <Link to="/floor-tour" className="text-foreground hover:text-heritage transition-colors py-2">
                  Floor Tour
                </Link>
                <Link to="/exhibits" className="text-foreground hover:text-heritage transition-colors py-2">
                  Exhibits
                </Link>
                <Link to="/timeline" className="text-foreground hover:text-heritage transition-colors py-2">
                  Timeline
                </Link>
                <Link to="/donors" className="text-foreground hover:text-heritage transition-colors py-2">
                  Donors
                </Link>
                <div className="flex flex-col gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Search className="w-4 h-4" />
                    Search
                  </Button>
                                    <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setIsAudioOpen(true)}
                  >
                    <AudioLines className="w-4 h-4" />
                    Audio Guide
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth')}
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                  <Button 
                    onClick={() => navigate('/virtual-tour')}
                    className="btn-heritage gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Start Tour
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* Audio Manager Modal */}
      {isAudioOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <AudioManager />
            <div className="text-center mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAudioOpen(false)}
                className="btn-heritage"
              >
                Close Audio Manager
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};