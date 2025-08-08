import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Boutique, Produit, AppContextType } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

// Données demo
const mockBoutiques: Boutique[] = [
  {
    id: '1',
    name: 'Épicerie Moderne',
    description: 'Tous vos produits alimentaires de qualité',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Alimentation',
    rating: 4.8,
    isVerified: true,
    productsCount: 150
  },
  {
    id: '2',
    name: 'Fashion Style',
    description: 'Mode et accessoires tendance',
    image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Mode',
    rating: 4.6,
    isVerified: true,
    productsCount: 200
  },
  {
    id: '3',
    name: 'Tech Plus',
    description: 'Électronique et high-tech',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Électronique',
    rating: 4.9,
    isVerified: true,
    productsCount: 89
  },
  {
    id: '4',
    name: 'Maison & Jardin',
    description: 'Décoration et articles pour la maison',
    image: 'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Maison',
    rating: 4.7,
    isVerified: false,
    productsCount: 120
  }
];

const mockProduits: Produit[] = [
  {
    id: '1',
    name: 'Smartphone dernière génération',
    description: 'Téléphone intelligent avec toutes les fonctionnalités modernes',
    price: 1500000,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Électronique',
    rating: 4.8,
    reviewsCount: 45,
    boutique: mockBoutiques[2],
    isNew: true,
    isPopular: true
  },
  {
    id: '2',
    name: 'Robe élégante',
    description: 'Robe parfaite pour toutes occasions',
    price: 85000,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Mode',
    rating: 4.6,
    reviewsCount: 23,
    boutique: mockBoutiques[1],
    isNew: false,
    isPopular: true
  },
  {
    id: '3',
    name: 'Café premium',
    description: 'Café de qualité supérieure pour les connaisseurs',
    price: 25000,
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Alimentation',
    rating: 4.9,
    reviewsCount: 67,
    boutique: mockBoutiques[0],
    isNew: true,
    isPopular: false
  },
  {
    id: '4',
    name: 'Coussin décoratif',
    description: 'Coussin élégant pour décorer votre salon',
    price: 35000,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
    category: 'Maison',
    rating: 4.5,
    reviewsCount: 12,
    boutique: mockBoutiques[3],
    isNew: false,
    isPopular: false
  }
];

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [boutiques] = useState<Boutique[]>(mockBoutiques);
  const [produits] = useState<Produit[]>(mockProduits);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation du chargement des données
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{ boutiques, produits, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};