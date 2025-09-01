import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Youtube,
  Instagram,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gradient-museum text-white mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Museum Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-accent mb-4">
              Liberation War Museum
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Preserving the heroic history of Bangladesh's independence struggle through 
              digital innovation and immersive experiences.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Agargaon, Sher-e-Bangla Nagar, Dhaka 1207</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="w-4 h-4 text-accent" />
                <span>+880 2 8124090</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@liberationwarmuseum.org</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-accent mb-4">
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link to="/virtual-tour" className="block text-gray-300 hover:text-accent transition-colors text-sm">
                Virtual Museum Tour
              </Link>
              <Link to="/exhibits" className="block text-gray-300 hover:text-accent transition-colors text-sm">
                Exhibits & Archives
              </Link>
              <Link to="/timeline" className="block text-gray-300 hover:text-accent transition-colors text-sm">
                Liberation War Timeline
              </Link>
              <Link to="/donors" className="block text-gray-300 hover:text-accent transition-colors text-sm">
                Support & Donors
              </Link>
              <Link to="/auth" className="block text-gray-300 hover:text-accent transition-colors text-sm">
                Create Account
              </Link>
            </div>
          </div>

          {/* Visit Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-accent mb-4">
              Visit Information
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-white mb-1">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>Opening Hours</span>
                </div>
                <div className="text-sm text-gray-300 ml-6">
                  <div>Mon - Thu: 9:00 AM - 6:00 PM</div>
                  <div>Fri - Sat: 9:00 AM - 8:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-white mb-1">Admission</div>
                <div className="text-sm text-gray-300">
                  <div>Adults: 20 BDT</div>
                  <div>Students: 10 BDT</div>
                  <div>Children: Free</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold text-accent mb-4">
              Stay Connected
            </h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for updates on new exhibits and events.
            </p>
            
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent"
                />
                <Button 
                  size="sm" 
                  className="bg-accent text-accent-foreground hover:bg-accent-dark rounded-l-none"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="p-2 border-white/20 text-white hover:bg-white/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2 border-white/20 text-white hover:bg-white/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2 border-white/20 text-white hover:bg-white/10">
                  <Youtube className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" className="p-2 border-white/20 text-white hover:bg-white/10">
                  <Instagram className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2024 Liberation War Museum Bangladesh. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="hover:text-accent transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};