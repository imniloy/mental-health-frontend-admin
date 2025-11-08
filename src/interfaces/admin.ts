// src/interfaces/admin.ts

/**
 * Represents a single statistic displayed in an analytics card.
 */
export interface StatCard {
  title: string;
  value: string;
  change: string; // e.g., "+15%"
  changeType: 'positive' | 'negative';
  icon: React.ElementType; // Lucide React icon component
}

/**
 * Represents a data point for a time-series chart.
 */
export interface ChartDataPoint {
  date: string;
  users: number;
}

/**
 * Represents a recently signed-up user.
 */
export interface RecentUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  signupDate: string; // ISO date string
}
