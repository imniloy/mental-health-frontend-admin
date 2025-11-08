// src/interfaces/program.ts

export interface Music {
  id: string;
  name: string;
  category: string;
  url: string; // This would be the URL after uploading
  status: 'Enabled' | 'Disabled'; // Added status property
}

export interface Day {
  id: string;
  title: string;
  music: Music | null;
}

export interface Season {
  id: string;
  title: string;
  imageUrl: string; 
  days: Day[];
}

export interface Course {
  seasons: Season[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  type: 'Single' | 'Course';
  courseDetails?: Course; // Will now contain seasons
  singleSessionMusic?: Music | null; // Only present if type is 'Single'
  status: 'Published' | 'Draft';
  lastModified: string;
}
