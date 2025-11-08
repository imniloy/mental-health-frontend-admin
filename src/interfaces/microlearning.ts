// src/interfaces/microlearning.ts

export interface StorySegment {
  id: string;
  title: string; 
  text: string;
  imageUrl: string;
}

export interface Episode {
  id: string;
  title: string;
  story: StorySegment[];
}

export interface MicrolearningTopic {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // New property for the topic's main image
  episodes: Episode[];
  status: 'Published' | 'Draft';
  lastModified: string;
}

