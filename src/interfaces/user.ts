// src/interfaces/user.ts

export interface User {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  status: 'Active' | 'Disabled';
  joinDate: string;
}
