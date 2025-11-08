
export interface TrialFeature {
  id: string;
  text: string;
}

export interface TrialPlan {
  id: string;
  title: string; // e.g., "1 Day Trial", "7 Day Pro Access"
  durationDays: number;
  description: string;
  features: TrialFeature[];
  status: 'Active' | 'Archived';
  lastModified: string;
}
