// src/interfaces/exercise.ts

export interface Exercise {
  imageUrl: any;
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  inhaleSeconds: number;
  holdSeconds: number;
  exhaleSeconds: number;
  status: 'Active' | 'Archived';
  lastModified: string;
}
