import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  X, 
  Clock, 
  MapPin, 
  Calendar, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'artifact' | 'gallery' | 'timeline' | 'document';
  description: string;
  category?: string;
  year?: number;
  location?: string;
}

const searchResults: SearchResult[] = [
  {
    id: '1',
    title: 'Liberation War Rifle',
    type: 'artifact',
    description: 'A .303 rifle used by Mukti Bahini fighters during the 1971 Liberation War.',
    category: 'Weapons',
    year: 1971,
    location: 'Weapons Gallery'
  },
  {
    id: '2',
    title: 'March 7 Speech',
    type: 'timeline',
    description: 'Sheikh Mujibur Rahman\'s historic speech that ignited the independence movement.',
    year: 1971,
    location: 'Timeline Section'
  },
  {
    id: '3',
    title: 'Martyrs Memorial Gallery',
    type: 'gallery',
    description: 'Gallery dedicated to the brave souls who sacrificed their lives for independence.',
    location: 'Second Floor'
  },
  {
    id: '4',
    title: 'Declaration of Independence',
    type: 'document',
    description: 'Original manuscript of the Independence Declaration.',
    year: 1971,
    category: 'Documents',
    location: 'Documents Archive'
  }
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const navigate = useNavigate();

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || result.type === selectedType;
    return matchesSearch && matchesType;
  });

  const typeIcons = {
    artifact: '🏺',
    gallery: '🖼️',
    timeline: '⏰',
    document: '📄'
  };

  const typeColors = {
    artifact: 'bg-primary text-primary-foreground',
    gallery: 'bg-secondary text-secondary-foreground',
    timeline: 'bg-accent text-accent-foreground',
    document: 'bg-muted text-muted-foreground'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4">
      <Card className="w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-serif font-bold text-heritage">Search Museum</h2>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search artifacts, galleries, timeline events, documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 text-lg"
                autoFocus
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
                className={selectedType === 'all' ? 'btn-heritage' : ''}
              >
                All Results
              </Button>
              <Button
                variant={selectedType === 'artifact' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('artifact')}
                className={selectedType === 'artifact' ? 'btn-heritage' : ''}
              >
                🏺 Artifacts
              </Button>
              <Button
                variant={selectedType === 'gallery' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('gallery')}
                className={selectedType === 'gallery' ? 'btn-heritage' : ''}
              >
                🖼️ Galleries
              </Button>
              <Button
                variant={selectedType === 'timeline' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('timeline')}
                className={selectedType === 'timeline' ? 'btn-heritage' : ''}
              >
                ⏰ Timeline
              </Button>
              <Button
                variant={selectedType === 'document' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('document')}
                className={selectedType === 'document' ? 'btn-heritage' : ''}
              >
                📄 Documents
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto max-h-96">
          {searchTerm === '' ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2 text-heritage">Start Your Search</h3>
              <p className="text-muted-foreground">
                Search through our extensive collection of artifacts, galleries, and historical content.
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2 text-heritage">No Results Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or browsing different categories.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} for "{searchTerm}"
              </div>
              
              {filteredResults.map((result) => (
                <Card 
                  key={result.id} 
                  className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer border border-border hover:border-primary"
                  onClick={() => {
                    onClose();
                    if (result.type === 'gallery') navigate('/virtual-tour');
                    else if (result.type === 'timeline') navigate('/timeline');
                    else navigate('/exhibits');
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{typeIcons[result.type]}</div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-heritage">{result.title}</h3>
                        <Badge className={typeColors[result.type]}>
                          {result.type}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {result.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {result.location}
                          </span>
                        )}
                        {result.year && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {result.year}
                          </span>
                        )}
                        {result.category && (
                          <span className="flex items-center gap-1">
                            <Filter className="w-3 h-3" />
                            {result.category}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Press <kbd className="px-2 py-1 bg-background border border-border rounded text-xs">Esc</kbd> to close
            </div>
            <div className="flex gap-4">
              <span>500+ Artifacts</span>
              <span>12 Galleries</span>
              <span>Timeline Events</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};