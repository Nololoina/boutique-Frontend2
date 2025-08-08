import { Produit } from '../types';

export const produitService = {
  async getProduits(): Promise<Produit[]> {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: '1',
        name: 'Smartphone dernière génération',
        description: 'Téléphone intelligent avec toutes les fonctionnalités modernes',
        price: 1500000,
        image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
        category: 'Électronique',
        rating: 4.8,
        reviewsCount: 45,
        boutique: {
          id: '3',
          name: 'Tech Plus',
          description: 'Électronique et high-tech',
          image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop',
          category: 'Électronique',
          rating: 4.9,
          isVerified: true,
          productsCount: 89
        },
        isNew: true,
        isPopular: true
      }
    ];
  },

  async getProduitById(id: string): Promise<Produit | null> {
    const produits = await this.getProduits();
    return produits.find(p => p.id === id) || null;
  },

  async searchProduits(query: string): Promise<Produit[]> {
    const produits = await this.getProduits();
    return produits.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }
};