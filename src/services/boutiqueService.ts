import { Boutique } from '../types';

export const boutiqueService = {
  async getBoutiques(): Promise<Boutique[]> {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
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
      }
    ];
  },

  async getBoutiqueById(id: string): Promise<Boutique | null> {
    const boutiques = await this.getBoutiques();
    return boutiques.find(b => b.id === id) || null;
  },

  async createBoutique(boutique: Omit<Boutique, 'id'>): Promise<Boutique> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      ...boutique,
      id: Math.random().toString(36).substr(2, 9)
    };
  }
};