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
  Info
} from 'lucide-react';

interface Model3DViewerProps {
  artifactName: string;
  modelUrl?: string;
  onClose?: () => void;
}

export const Model3DViewer: React.FC<Model3DViewerProps> = ({ 
  artifactName, 
  modelUrl, 
  onClose 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Sample 3D models for different artifacts
  const get3DModel = (artifactName: string) => {
    const models = {
      'Liberation War Rifle': (
        <div className="relative w-80 h-80">
          {/* Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-8 bg-gradient-to-r from-muted via-border to-muted rounded-full opacity-30" />
          
          {/* Main Object (Liberation War Rifle simulation) */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-64 h-16 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg shadow-2xl">
              {/* Rifle barrel */}
              <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 w-20 h-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-r-full" />
              
              {/* Stock */}
              <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-amber-700 to-amber-900 rounded-lg" />
              
              {/* Trigger guard */}
              <div className="absolute left-8 bottom-0 w-8 h-6 border-2 border-gray-500 rounded-b-lg" />
              
              {/* Sight */}
              <div className="absolute right-4 -top-2 w-2 h-4 bg-gray-400 rounded-t-sm" />
              
              {/* Details */}
              <div className="absolute top-2 left-4 right-20 h-1 bg-gray-500 rounded-full" />
              <div className="absolute bottom-2 left-4 right-20 h-1 bg-gray-500 rounded-full" />
            </div>
            
            {/* Shadow effect */}
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-black/10 blur-sm rounded-full" />
          </div>
        </div>
      ),
      'Freedom Fighter Helmet': (
        <div className="relative w-80 h-80">
          {/* Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-8 bg-gradient-to-r from-muted via-border to-muted rounded-full opacity-30" />
          
          {/* Helmet */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-48 h-32 bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-t-full shadow-2xl">
              {/* Helmet rim */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-green-800 to-green-700 rounded-b-full" />
              
              {/* Helmet details */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-green-500 rounded-full" />
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-400 rounded-full" />
              
              {/* Strap */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full" />
            </div>
            
            {/* Shadow effect */}
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-black/10 blur-sm rounded-full" />
          </div>
        </div>
      ),
      'Victory Medal': (
        <div className="relative w-80 h-80">
          {/* Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-8 bg-gradient-to-r from-muted via-border to-muted rounded-full opacity-30" />
          
          {/* Medal */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full shadow-2xl border-4 border-yellow-300">
              {/* Medal design */}
              <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-full flex items-center justify-center">
                <div className="text-center text-yellow-800 font-bold text-xs">
                  <div>LIBERATION</div>
                  <div>1971</div>
                </div>
              </div>
              
              {/* Ribbon */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-red-600 via-green-600 to-red-600 rounded-b-full" />
            </div>
            
            {/* Shadow effect */}
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-black/10 blur-sm rounded-full" />
          </div>
        </div>
      ),
      'default': (
        <div className="relative w-80 h-80">
          {/* Base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-60 h-8 bg-gradient-to-r from-muted via-border to-muted rounded-full opacity-30" />
          
          {/* Generic 3D object */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-48 h-48 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-lg shadow-2xl">
              {/* Object details */}
              <div className="absolute inset-4 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg" />
              <div className="absolute top-2 left-2 right-2 h-1 bg-blue-300 rounded-full" />
              <div className="absolute bottom-2 left-2 right-2 h-1 bg-blue-300 rounded-full" />
            </div>
            
            {/* Shadow effect */}
            <div className="absolute -bottom-4 left-0 right-0 h-2 bg-black/10 blur-sm rounded-full" />
          </div>
        </div>
      )
    };
    
    return models[artifactName as keyof typeof models] || models.default;
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleRotate = (direction: 'left' | 'right' | 'up' | 'down') => {
    setRotation(prev => {
      switch (direction) {
        case 'left':
          return { ...prev, y: prev.y - 15 };
        case 'right':
          return { ...prev, y: prev.y + 15 };
        case 'up':
          return { ...prev, x: prev.x - 15 };
        case 'down':
          return { ...prev, x: prev.x + 15 };
        default:
          return prev;
      }
    });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-serif font-bold text-heritage">3D Model Viewer</h2>
            <p className="text-sm text-muted-foreground">{artifactName}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex">
          {/* 3D Viewer Area */}
          <div className="flex-1 relative bg-gradient-to-br from-muted/20 to-background">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-heritage animate-spin flex items-center justify-center">
                    <RotateCcw className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <p className="text-muted-foreground">Loading 3D Model...</p>
                </div>
              </div>
            ) : (
              <div 
                ref={containerRef}
                className="w-full h-full flex items-center justify-center overflow-hidden cursor-move"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`
                }}
              >
                {/* 3D Model */}
                <div 
                  className="relative"
                  style={{
                    transform: `scale(${zoom}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  {get3DModel(artifactName)}
                  
                  {/* Lighting effects */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-lg" />
                </div>
              </div>
            )}

            {/* Info overlay */}
            <div className="absolute top-4 left-4">
              <Card className="glass p-3">
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Click and drag to rotate</div>
                  <div>Scroll to zoom</div>
                  <div>Use controls to navigate</div>
                </div>
              </Card>
            </div>

            {/* Model info */}
            <div className="absolute bottom-4 left-4 right-4">
              <Card className="glass p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-heritage mb-1">{artifactName}</h4>
                    <p className="text-sm text-muted-foreground">
                      This authentic artifact was used during the 1971 Liberation War. 
                      The object shows signs of historical use and has been carefully preserved to maintain its significance.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-80 p-6 border-l border-border bg-muted/20 space-y-6">
            <div>
              <h3 className="font-semibold text-heritage mb-4">3D Controls</h3>
              
              {/* Rotation Controls */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Rotation</div>
                <div className="grid grid-cols-3 gap-2">
                  <div></div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRotate('up')}
                  >
                    ↑
                  </Button>
                  <div></div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRotate('left')}
                  >
                    ←
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={resetView}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRotate('right')}
                  >
                    →
                  </Button>
                  <div></div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRotate('down')}
                  >
                    ↓
                  </Button>
                  <div></div>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-muted-foreground">Zoom Level: {zoom.toFixed(1)}x</div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleZoom('out')}
                    disabled={zoom <= 0.5}
                  >
                    <ZoomOut className="w-4 h-4 mr-1" />
                    Zoom Out
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleZoom('in')}
                    disabled={zoom >= 3}
                  >
                    <ZoomIn className="w-4 h-4 mr-1" />
                    Zoom In
                  </Button>
                </div>
              </div>
            </div>

            {/* Model Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-heritage">Model Details</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vertices:</span>
                  <span className="font-medium">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faces:</span>
                  <span className="font-medium">5,694</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Textures:</span>
                  <span className="font-medium">4K Resolution</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size:</span>
                  <span className="font-medium">12.4 MB</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full btn-heritage">
                <Eye className="w-4 h-4 mr-2" />
                View in AR
              </Button>
              <Button variant="outline" className="w-full">
                <Maximize2 className="w-4 h-4 mr-2" />
                Fullscreen Mode
              </Button>
              <Button variant="outline" className="w-full">
                <Move className="w-4 h-4 mr-2" />
                Compare Models
              </Button>
            </div>

            {/* Instructions */}
            <div className="p-4 glass rounded-lg">
              <h4 className="font-medium mb-2 text-heritage">How to Navigate</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Use arrow buttons to rotate</div>
                <div>• Zoom in/out with buttons</div>
                <div>• Click reset to return to center</div>
                <div>• Drag on model to move position</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};