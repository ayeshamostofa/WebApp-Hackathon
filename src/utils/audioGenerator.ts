// Audio Generator using Web Speech API
export class AudioGenerator {
  private static instance: AudioGenerator;
  private speechSynthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private constructor() {
    this.speechSynthesis = window.speechSynthesis;
  }

  public static getInstance(): AudioGenerator {
    if (!AudioGenerator.instance) {
      AudioGenerator.instance = new AudioGenerator();
    }
    return AudioGenerator.instance;
  }

  public speak(text: string, options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    voice?: string;
  } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
      // Cancel any current speech
      if (this.currentUtterance) {
        this.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set default options
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;

      // Try to set a preferred voice
      if (options.voice) {
        const voices = this.speechSynthesis.getVoices();
        const preferredVoice = voices.find(voice => 
          voice.name.includes(options.voice!) || 
          voice.lang.includes('en')
        );
        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        resolve();
      };

      utterance.onerror = (event) => {
        this.currentUtterance = null;
        reject(new Error(`Speech synthesis error: ${event.error}`));
      };

      this.currentUtterance = utterance;
      this.speechSynthesis.speak(utterance);
    });
  }

  public stop(): void {
    if (this.currentUtterance) {
      this.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public pause(): void {
    this.speechSynthesis.pause();
  }

  public resume(): void {
    this.speechSynthesis.resume();
  }

  public isSpeaking(): boolean {
    return this.speechSynthesis.speaking;
  }

  public getVoices(): SpeechSynthesisVoice[] {
    return this.speechSynthesis.getVoices();
  }
}

// Predefined audio content for different sections
export const audioContent = {
  'ground-floor-guide': `Welcome to the Ground Floor of the Liberation War Museum. This floor serves as the main entrance and introduction to our comprehensive collection of artifacts, documents, and multimedia content from the 1971 Liberation War. Here you'll find the Welcome Hall, Timeline Gallery, and Martyrs Memorial. The estimated tour duration is 45 minutes.`,
  
  'first-floor-guide': `Welcome to the First Floor of the Liberation War Museum. This floor contains the main exhibition halls and artifacts, including the Liberation War Hall, Weapons & Equipment display, and Documents Archive. Here you'll see the most significant artifacts from the liberation period. The estimated tour duration is 90 minutes.`,
  
  'second-floor-guide': `Welcome to the Second Floor of the Liberation War Museum. This floor features multimedia and interactive exhibits, including the Photographic Gallery, Cultural Heritage section, and Interactive Media Center. Here you can experience the liberation war through modern technology. The estimated tour duration is 60 minutes.`,
  
  'welcome-hall': `Welcome to the Liberation War Museum. This museum is dedicated to preserving and showcasing the history of Bangladesh's Liberation War of 1971. Here you'll find an introduction to the exhibits and a brief overview of what you can expect during your visit.`,
  
  'timeline-gallery': `The Timeline Gallery presents a chronological journey through the events of 1971. Starting from the early months of the year, through the declaration of independence on March 26th, the formation of the Mukti Bahini, and finally to victory on December 16th. Each artifact tells a story of courage and sacrifice.`,
  
  'martyrs-memorial': `The Martyrs Memorial honors the brave souls who sacrificed their lives for the independence of Bangladesh. This solemn space contains photographs, personal belongings, and stories of the freedom fighters and civilians who gave everything for their country.`,
  
  'liberation-hall': `The Liberation War Hall is the heart of our museum, showcasing the main exhibition of artifacts from the 1971 Liberation War. Here you'll see weapons, uniforms, documents, and personal items that tell the story of the struggle for independence.`,
  
  'weapons-display': `The Weapons & Equipment section displays military equipment used during the liberation war. This includes rifles, ammunition, communication devices, and other military artifacts that were used by both the Mukti Bahini freedom fighters and the Pakistani military.`,
  
  'documents-archive': `The Documents Archive contains historical documents and official papers from the liberation period. This includes the original Declaration of Independence, government communications, military orders, and personal letters that provide insight into the events of 1971.`,
  
  'photo-gallery': `The Photographic Gallery features rare photographs from 1971, capturing the moments of the liberation war. These images show the reality of the conflict, the resilience of the people, and the ultimate victory that led to the birth of Bangladesh.`,
  
  'cultural-heritage': `The Cultural Heritage section celebrates the songs, poems, and cultural artifacts from the liberation period. This includes patriotic songs, revolutionary poetry, traditional crafts, and other cultural expressions that inspired and united the people during the war.`,
  
  'interactive-media': `The Interactive Media Center offers digital exhibits and virtual experiences related to the liberation war. Here you can use touch screens, virtual reality, and other modern technologies to explore the history in an engaging and interactive way.`,
  
  'rifle-guide': `This .303 rifle was used by Mukti Bahini fighters during the 1971 Liberation War. The rifle shows signs of battlefield use and has been carefully preserved to maintain its historical significance. It represents the determination and courage of the freedom fighters.`,
  
  'helmet-guide': `This military helmet was worn by a freedom fighter in the Chittagong region during the liberation war. The helmet protected the fighter during combat and has become a symbol of the sacrifice and bravery shown by those who fought for independence.`,
  
  'medal-guide': `This Victory Medal was awarded to liberation war veterans in recognition of their service and sacrifice. The medal features the national emblem and serves as a reminder of the victory achieved on December 16th, 1971.`,
  
  'documents-guide': `These historical documents include original manuscripts and official papers from the liberation period. They provide valuable insight into the political, military, and social aspects of the war, helping us understand the full scope of the struggle for independence.`,
  
  'memorial-guide': `The Memorial Wall is inscribed with the names of martyrs who sacrificed their lives during the liberation war. Each name represents a story of courage and sacrifice, and serves as a permanent reminder of the cost of freedom.`,
  
  'entrance-guide': `Welcome to the Liberation War Museum. This entrance leads you into a world of history, courage, and sacrifice. As you walk through these halls, you'll discover the story of how Bangladesh achieved its independence through the bravery of its people.`,
  
  'panorama-guide': `Welcome to the 360° Panorama Tour. This immersive experience allows you to explore the museum from different angles and perspectives. Use your mouse or touch controls to navigate through the panoramic views and discover hidden details in each exhibit.`,
  
  'museum-intro': `Welcome to the Liberation War Museum, a place dedicated to preserving the memory of the 1971 Liberation War. Our mission is to educate visitors about the struggle for independence and honor those who sacrificed everything for the birth of Bangladesh.`,
  
  'liberation-war-history': `The Liberation War of 1971 was a nine-month armed conflict between East Pakistan and West Pakistan. The war began on March 26th with the declaration of independence and ended on December 16th with the surrender of Pakistani forces. This victory led to the creation of the independent nation of Bangladesh.`
};

// Generate audio for a specific key
export const generateAudio = async (audioKey: string): Promise<void> => {
  const content = audioContent[audioKey as keyof typeof audioContent];
  if (!content) {
    throw new Error(`No audio content found for key: ${audioKey}`);
  }

  const audioGenerator = AudioGenerator.getInstance();
  await audioGenerator.speak(content, {
    rate: 0.9,
    pitch: 1,
    volume: 1,
    voice: 'en'
  });
};
