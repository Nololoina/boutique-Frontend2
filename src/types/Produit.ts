import { Boutique } from './index';

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
  stock: number;
  images: string[];
}

export interface ProductFilter {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  sortBy?: 'price' | 'rating' | 'popularity' | 'newest';
}