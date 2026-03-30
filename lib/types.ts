export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  image?: string; // Replace icon with image thumbnail
  icon?: string; // Fallback just in case
  status: 'live' | 'building' | 'offline';
  category?: string;
  featured?: boolean;
}
