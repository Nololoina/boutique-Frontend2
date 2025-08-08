export interface Utilisateur {
  id: string;
  name: string;
  email: string;
  role: 'admin-plateforme' | 'admin-boutique' | 'client';
  avatar?: string;
  createdAt: Date;
  isActive: boolean;
  permissions?: string[];
  boutique?: {
    id: string;
    name: string;
  };
}