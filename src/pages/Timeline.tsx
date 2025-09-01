import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Award, Clock, Play, Pause } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  category: 'political' | 'military' | 'cultural' | 'international';
  significance: 'high' | 'medium' | 'low';
  casualties?: number;
  hasAudio: boolean;
  hasVideo: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'March 7, 1971',
    title: 'Historic Speech by Sheikh Mujibur Rahman',
    description: 'The historic speech at Ramna Race Course that ignited the independence movement. "This time the struggle is for our freedom, this time the struggle is for our independence."',
    location: 'Dhaka',
    category: 'political',
    significance: 'high',
    hasAudio: true,
    hasVideo: false
  },
  {
    id: '2',
    date: 'March 25, 1971',
    title: 'Operation Searchlight Begins',
    description: 'Pakistani military launched a systematic genocide targeting Bengali intellectuals, students, and civilians. The night that changed everything.',
    location: 'Dhaka',
    category: 'military',
    significance: 'high',
    casualties: 50000,
    hasAudio: true,
    hasVideo: false
  },
  {
    id: '3',
    date: 'March 26, 1971',
    title: 'Declaration of Independence',
    description: 'Sheikh Mujibur Rahman declared independence of Bangladesh before his arrest. The birth of a new nation was proclaimed.',
    location: 'Dhaka',
    category: 'political',
    significance: 'high',
    hasAudio: true,
    hasVideo: false
  },
  {
    id: '4',
    date: 'April 17, 1971',
    title: 'Provisional Government Formation',
    description: 'The Provisional Government of Bangladesh was formed in Mujibnagar (Baidyanathtala), establishing the legal framework for independence.',
    location: 'Mujibnagar',
    category: 'political',
    significance: 'high',
    hasAudio: true,
    hasVideo: false
  },
  {
    id: '5',
    date: 'December 3, 1971',
    title: 'Indo-Pakistani War Begins',
    description: 'India officially entered the war in support of Bangladesh liberation forces, significantly changing the course of the conflict.',
    location: 'Multiple Fronts',
    category: 'international',
    significance: 'high',
    hasAudio: true,
    hasVideo: false
  },
  {
    id: '6',
    date: 'December 16, 1971',
    title: 'Victory Day - Liberation of Bangladesh',
    description: 'Pakistani forces surrendered at Ramna Race Course. Lieutenant General A.A.K. Niazi signed the instrument of surrender, marking the birth of independent Bangladesh.',
    location: 'Dhaka',
    category: 'military',
    significance: 'high',
    hasAudio: true,
    hasVideo: true
  }
];

const categoryColors = {
  political: 'bg-primary text-primary-foreground',
  military: 'bg-secondary text-secondary-foreground',
  cultural: 'bg-accent text-accent-foreground',
  international: 'bg-muted text-muted-foreground'
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-white/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-heritage mb-4">
            Liberation War Timeline
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow the chronological journey of Bangladesh's struggle for independence, 
            from the political awakening to the final victory in 1971.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary-light to-primary opacity-30" />
              
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="timeline-item">
                    <Card 
                      className={`ml-16 card-museum cursor-pointer transition-all duration-300 ${
                        selectedEvent?.id === event.id ? 'shadow-glow border-primary' : ''
                      }`}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={categoryColors[event.category]}>
                              {event.category}
                            </Badge>
                            {event.significance === 'high' && (
                              <Badge variant="outline" className="border-accent text-accent">
                                <Award className="w-3 h-3 mr-1" />
                                Significant
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-serif font-bold text-heritage mb-3">
                          {event.title}
                        </h3>
                        
                        <p className="text-muted-foreground mb-4">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                            {event.casualties && (
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {event.casualties.toLocaleString()} casualties
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            {event.hasAudio && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPlayingAudio(playingAudio === event.id ? null : event.id);
                                }}
                              >
                                {playingAudio === event.id ? (
                                  <Pause className="w-4 h-4" />
                                ) : (
                                  <Play className="w-4 h-4" />
                                )}
                              </Button>
                            )}
                            {event.hasVideo && (
                              <Button size="sm" variant="outline">
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {selectedEvent ? (
                <Card className="card-museum p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={categoryColors[selectedEvent.category]}>
                      {selectedEvent.category}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {selectedEvent.date}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-heritage mb-4">
                    {selectedEvent.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6">
                    {selectedEvent.description}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Location:</span>
                      <span className="text-muted-foreground">{selectedEvent.location}</span>
                    </div>
                    
                    {selectedEvent.casualties && (
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Casualties:</span>
                        <span className="text-muted-foreground">{selectedEvent.casualties.toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Significance:</span>
                      <Badge variant="outline" className={
                        selectedEvent.significance === 'high' ? 'border-accent text-accent' :
                        selectedEvent.significance === 'medium' ? 'border-secondary text-secondary' :
                        'border-muted text-muted-foreground'
                      }>
                        {selectedEvent.significance}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedEvent.hasAudio && (
                      <Button 
                        className="w-full btn-heritage"
                        onClick={() => setPlayingAudio(playingAudio === selectedEvent.id ? null : selectedEvent.id)}
                      >
                        {playingAudio === selectedEvent.id ? (
                          <>
                            <Pause className="w-4 h-4 mr-2" />
                            Pause Audio
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Play Audio Commentary
                          </>
                        )}
                      </Button>
                    )}
                    
                    {selectedEvent.hasVideo && (
                      <Button variant="outline" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Watch Historical Footage
                      </Button>
                    )}
                    
                    <Button variant="outline" className="w-full">
                      <MapPin className="w-4 h-4 mr-2" />
                      View on Museum Map
                    </Button>
                  </div>
                </Card>
              ) : (
                <Card className="card-museum p-8 text-center">
                  <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold mb-2 text-heritage">Select a Timeline Event</h3>
                  <p className="text-muted-foreground">
                    Click on any event in the timeline to view detailed information, 
                    audio commentary, and historical context.
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Timeline Navigation */}
        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-4 p-4 glass rounded-xl">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Filter by Year
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Filter by Location
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Filter by Category
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}