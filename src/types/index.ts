export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin-plateforme' | 'admin-boutique' | 'client';
  avatar?: string;
}

export interface Boutique {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  isVerified: boolean;
  productsCount: number;
}

export interface Produit {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewsCount: number;
  boutique: Boutique;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createDemoAccount: (type: 'admin-plateforme' | 'admin-boutique') => Promise<boolean>;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export interface AppContextType {
  boutiques: Boutique[];
  produits: Produit[];
  isLoading: boolean;
}