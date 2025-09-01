// Audio configuration for museum tour
export const audioGuides = {
  // Floor-based tour audio
  'ground-floor-guide': {
    url: '/audio/ground-floor-guide.mp3',
    title: 'Ground Floor Tour Guide',
    description: 'Introduction to the main entrance and introductory exhibits',
    duration: '45 minutes'
  },
  'first-floor-guide': {
    url: '/audio/first-floor-guide.mp3',
    title: 'First Floor Tour Guide',
    description: 'Main exhibition halls and artifacts tour',
    duration: '90 minutes'
  },
  'second-floor-guide': {
    url: '/audio/second-floor-guide.mp3',
    title: 'Second Floor Tour Guide',
    description: 'Multimedia and interactive exhibits tour',
    duration: '60 minutes'
  },

  // Gallery-specific audio guides
  'welcome-hall': {
    url: '/audio/welcome-hall.mp3',
    title: 'Welcome Hall Audio Guide',
    description: 'Introduction to the Liberation War Museum',
    duration: '15 minutes'
  },
  'timeline-gallery': {
    url: '/audio/timeline-gallery.mp3',
    title: 'Timeline Gallery Audio Guide',
    description: 'Chronological journey through 1971',
    duration: '20 minutes'
  },
  'martyrs-memorial': {
    url: '/audio/martyrs-memorial.mp3',
    title: 'Martyrs Memorial Audio Guide',
    description: 'Honoring the brave souls who sacrificed their lives',
    duration: '10 minutes'
  },
  'liberation-hall': {
    url: '/audio/liberation-hall.mp3',
    title: 'Liberation War Hall Audio Guide',
    description: 'Main exhibition showcasing the journey to independence',
    duration: '30 minutes'
  },
  'weapons-display': {
    url: '/audio/weapons-display.mp3',
    title: 'Weapons & Equipment Audio Guide',
    description: 'Military equipment used during the liberation war',
    duration: '25 minutes'
  },
  'documents-archive': {
    url: '/audio/documents-archive.mp3',
    title: 'Documents Archive Audio Guide',
    description: 'Historical documents and official papers',
    duration: '35 minutes'
  },
  'photo-gallery': {
    url: '/audio/photo-gallery.mp3',
    title: 'Photographic Gallery Audio Guide',
    description: 'Rare photographs from 1971',
    duration: '25 minutes'
  },
  'cultural-heritage': {
    url: '/audio/cultural-heritage.mp3',
    title: 'Cultural Heritage Audio Guide',
    description: 'Songs, poems, and cultural artifacts',
    duration: '20 minutes'
  },
  'interactive-media': {
    url: '/audio/interactive-media.mp3',
    title: 'Interactive Media Center Audio Guide',
    description: 'Digital exhibits and virtual experiences',
    duration: '15 minutes'
  },

  // Artifact-specific audio guides
  'rifle-guide': {
    url: '/audio/rifle-guide.mp3',
    title: 'Liberation War Rifle Audio Guide',
    description: 'Detailed information about the .303 rifle used by Mukti Bahini fighters',
    duration: '5 minutes'
  },
  'helmet-guide': {
    url: '/audio/helmet-guide.mp3',
    title: 'Freedom Fighter Helmet Audio Guide',
    description: 'Information about the military helmet worn by freedom fighters',
    duration: '4 minutes'
  },
  'medal-guide': {
    url: '/audio/medal-guide.mp3',
    title: 'Victory Medal Audio Guide',
    description: 'Details about the commemorative medal awarded to liberation war veterans',
    duration: '3 minutes'
  },
  'documents-guide': {
    url: '/audio/documents-guide.mp3',
    title: 'Historical Documents Audio Guide',
    description: 'Information about original manuscripts and official papers',
    duration: '6 minutes'
  },
  'memorial-guide': {
    url: '/audio/memorial-guide.mp3',
    title: 'Memorial Wall Audio Guide',
    description: 'Details about the wall inscribed with names of martyrs',
    duration: '4 minutes'
  },
  'entrance-guide': {
    url: '/audio/entrance-guide.mp3',
    title: 'Main Entrance Audio Guide',
    description: 'Welcome message and introduction to the museum',
    duration: '2 minutes'
  },

  // Panorama and 360° tour audio
  'panorama-guide': {
    url: '/audio/panorama-guide.mp3',
    title: '360° Panorama Tour Guide',
    description: 'Audio guide for the immersive 360° museum experience',
    duration: '20 minutes'
  },

  // General museum audio
  'museum-intro': {
    url: '/audio/museum-intro.mp3',
    title: 'Museum Introduction',
    description: 'Welcome to the Liberation War Museum',
    duration: '3 minutes'
  },
  'liberation-war-history': {
    url: '/audio/liberation-war-history.mp3',
    title: 'Liberation War History',
    description: 'Overview of the 1971 Liberation War',
    duration: '10 minutes'
  }
};

// Audio categories for organization
export const audioCategories = {
  'floor-tours': [
    'ground-floor-guide',
    'first-floor-guide',
    'second-floor-guide'
  ],
  'gallery-guides': [
    'welcome-hall',
    'timeline-gallery',
    'martyrs-memorial',
    'liberation-hall',
    'weapons-display',
    'documents-archive',
    'photo-gallery',
    'cultural-heritage',
    'interactive-media'
  ],
  'artifact-guides': [
    'rifle-guide',
    'helmet-guide',
    'medal-guide',
    'documents-guide',
    'memorial-guide',
    'entrance-guide'
  ],
  'special-tours': [
    'panorama-guide',
    'museum-intro',
    'liberation-war-history'
  ]
};
