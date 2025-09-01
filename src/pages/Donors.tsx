import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Star, 
  Award, 
  Users, 
  Building, 
  Globe, 
  Gift,
  Trophy,
  Crown,
  Diamond,
  Handshake
} from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  type: 'individual' | 'organization' | 'government' | 'foundation';
  level: 'platinum' | 'gold' | 'silver' | 'bronze' | 'supporter';
  contribution: string;
  since: number;
  location: string;
  description: string;
  featured: boolean;
}

const donors: Donor[] = [
  {
    id: '1',
    name: 'Bangladesh Government',
    type: 'government',
    level: 'platinum',
    contribution: '$500,000+',
    since: 1996,
    location: 'Dhaka, Bangladesh',
    description: 'Primary funding for museum establishment and ongoing operations',
    featured: true
  },
  {
    id: '2',
    name: 'Liberation War Veterans Association',
    type: 'organization',
    level: 'gold',
    contribution: '$100,000+',
    since: 1998,
    location: 'Bangladesh',
    description: 'Donated personal artifacts, photographs, and firsthand accounts',
    featured: true
  },
  {
    id: '3',
    name: 'UNESCO',
    type: 'organization',
    level: 'gold',
    contribution: '$75,000+',
    since: 2001,
    location: 'International',
    description: 'Heritage preservation and digital archive development support',
    featured: true
  },
  {
    id: '4',
    name: 'Dr. Aminul Islam',
    type: 'individual',
    level: 'silver',
    contribution: '$50,000+',
    since: 2005,
    location: 'Dhaka, Bangladesh',
    description: 'Historian and freedom fighter, donated rare documents and memoirs',
    featured: false
  },
  {
    id: '5',
    name: 'Bangabandhu Foundation',
    type: 'foundation',
    level: 'gold',
    contribution: '$80,000+',
    since: 2000,
    location: 'Dhaka, Bangladesh',
    description: 'Support for Sheikh Mujibur Rahman memorial section and research',
    featured: true
  },
  {
    id: '6',
    name: 'International Community',
    type: 'organization',
    level: 'silver',
    contribution: '$60,000+',
    since: 2010,
    location: 'Global',
    description: 'Various international organizations supporting heritage preservation',
    featured: false
  }
];

const levelConfig = {
  platinum: {
    icon: Diamond,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: 'Platinum Patron'
  },
  gold: {
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    label: 'Gold Supporter'
  },
  silver: {
    icon: Trophy,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    label: 'Silver Contributor'
  },
  bronze: {
    icon: Award,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    label: 'Bronze Supporter'
  },
  supporter: {
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Community Supporter'
  }
};

const typeIcons = {
  individual: Users,
  organization: Building,
  government: Globe,
  foundation: Handshake
};

export default function Donors() {
  const featuredDonors = donors.filter(donor => donor.featured);
  const regularDonors = donors.filter(donor => !donor.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-white/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-heritage mb-4">
            Our Generous Donors
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            The Liberation War Museum exists thanks to the generous support of individuals, 
            organizations, and institutions who believe in preserving our heritage for future generations.
          </p>
          
          <div className="flex justify-center">
            <Button className="btn-heritage gap-2">
              <Gift className="w-4 h-4" />
              Make a Donation
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="card-museum p-6 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-secondary" />
            <div className="text-2xl font-bold text-heritage mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Total Donors</div>
          </Card>
          
          <Card className="card-museum p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4 text-accent" />
            <div className="text-2xl font-bold text-heritage mb-2">$2.5M+</div>
            <div className="text-sm text-muted-foreground">Total Contributions</div>
          </Card>
          
          <Card className="card-museum p-6 text-center">
            <Building className="w-12 h-12 mx-auto mb-4 text-primary" />
            <div className="text-2xl font-bold text-heritage mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Artifacts Preserved</div>
          </Card>
          
          <Card className="card-museum p-6 text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-primary-light" />
            <div className="text-2xl font-bold text-heritage mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Countries Involved</div>
          </Card>
        </div>

        {/* Featured Donors */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-heritage mb-8 text-center">
            Major Contributors
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDonors.map((donor) => {
              const LevelIcon = levelConfig[donor.level].icon;
              const TypeIcon = typeIcons[donor.type];
              
              return (
                <Card key={donor.id} className="card-museum overflow-hidden">
                  <div className={`p-6 ${levelConfig[donor.level].bgColor} border-b ${levelConfig[donor.level].borderColor}`}>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      <LevelIcon className={`w-6 h-6 ${levelConfig[donor.level].color}`} />
                    </div>
                    
                    <div className="text-center">
                      <TypeIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-serif font-bold text-heritage mb-2">
                        {donor.name}
                      </h3>
                      <Badge variant="outline" className="mb-3">
                        {levelConfig[donor.level].label}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contribution:</span>
                        <span className="font-semibold text-accent">{donor.contribution}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Supporting since:</span>
                        <span className="font-semibold">{donor.since}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-semibold">{donor.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      {donor.description}
                    </p>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* All Donors */}
        <div className="mb-16">
          <h2 className="text-3xl font-serif font-bold text-heritage mb-8 text-center">
            All Supporters
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularDonors.map((donor) => {
              const LevelIcon = levelConfig[donor.level].icon;
              const TypeIcon = typeIcons[donor.type];
              
              return (
                <Card key={donor.id} className="card-museum p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${levelConfig[donor.level].bgColor}`}>
                      <TypeIcon className={`w-6 h-6 ${levelConfig[donor.level].color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-serif font-semibold text-heritage">
                          {donor.name}
                        </h3>
                        <LevelIcon className={`w-5 h-5 ${levelConfig[donor.level].color}`} />
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <span>{donor.contribution}</span>
                        <span>Since {donor.since}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {donor.description}
                      </p>
                      
                      <Badge variant="outline">
                        {levelConfig[donor.level].label}
                      </Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="card-museum p-8 text-center bg-gradient-heritage text-primary-foreground">
          <Heart className="w-16 h-16 mx-auto mb-6 text-white" />
          <h3 className="text-2xl font-serif font-bold mb-4">
            Help Preserve History
          </h3>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Your contribution helps us digitize artifacts, create virtual exhibitions, 
            and ensure future generations can access this important heritage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Gift className="w-4 h-4 mr-2" />
              One-time Donation
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Heart className="w-4 h-4 mr-2" />
              Monthly Support
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Building className="w-4 h-4 mr-2" />
              Corporate Partnership
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}