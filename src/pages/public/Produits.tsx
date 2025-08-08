import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface FilterState {
  search: string;
  category: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  boutique: string;
}

export const Produits: React.FC = () => {
  const { produits, boutiques, isLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('search') || '',
    category: '',
    priceMin: 0,
    priceMax: 2000000,
    rating: 0,
    sortBy: 'popularity',
    boutique: ''
  });

  // Mise à jour des filtres depuis l'URL
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl) {
      setFilters(prev => ({ ...prev, search: searchFromUrl }));
    }
  }, [searchParams]);

  // Filtrage et tri des produits
  const filteredProduits = produits
    .filter(produit => {
      const matchesSearch = produit.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           produit.description.toLowerCase().includes(filters.search.toLowerCase()) ||
                           produit.boutique.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || produit.category === filters.category;
      const matchesPrice = produit.price >= filters.priceMin && produit.price <= filters.priceMax;
      const matchesRating = produit.rating >= filters.rating;
      const matchesBoutique = !filters.boutique || produit.boutique.id === filters.boutique;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesBoutique;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'popularity':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
    });

  const categories = [...new Set(produits.map(p => p.category))];
  const maxPrice = Math.max(...produits.map(p => p.price));

  const handleFilterChange = (field: keyof FilterState, value: string | number) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    
    // Mise à jour de l'URL pour la recherche
    if (field === 'search') {
      if (value) {
        setSearchParams({ search: value as string });
      } else {
        setSearchParams({});
      }
    }
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priceMin: 0,
      priceMax: maxPrice,
      rating: 0,
      sortBy: 'popularity',
      boutique: ''
    });
    setSearchParams({});
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? (
        <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="h-4 w-4 text-gray-300" />
      )
    ));
  };

  const handleAddToCart = (productId: string) => {
    alert(`Produit ajouté au panier ! Vous pouvez continuer vos achats ou finaliser votre commande.`);
  };

  const handleAddToWishlist = (productId: string) => {
    alert(`Produit ajouté à votre liste de souhaits !`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tous nos produits
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez {produits.length} produits de qualité de nos boutiques partenaires
          </p>
        </div>

        {/* Barre de recherche et contrôles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher des produits, boutiques..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Contrôles */}
            <div className="flex items-center space-x-3">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="popularity">Plus populaires</option>
                <option value="newest">Plus récents</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="rating">Mieux notés</option>
              </select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filtres
                {(filters.category || filters.rating > 0 || filters.boutique) && (
                  <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>

              <div className="flex items-center space-x-1 border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-400'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-400'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Panneau de filtres */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Catégorie
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Boutique
                  </label>
                  <select
                    value={filters.boutique}
                    onChange={(e) => handleFilterChange('boutique', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Toutes les boutiques</option>
                    {boutiques.map(boutique => (
                      <option key={boutique.id} value={boutique.id}>{boutique.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prix maximum
                  </label>
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="10000"
                    value={filters.priceMax}
                    onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>0 MGA</span>
                    <span>{formatMGA(filters.priceMax)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Note minimum
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        onClick={() => handleFilterChange('rating', rating === filters.rating ? 0 : rating)}
                        className={`flex items-center space-x-1 px-2 py-1 rounded ${
                          filters.rating >= rating 
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        <StarSolidIcon className="h-4 w-4" />
                        <span className="text-xs">{rating}+</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProduits.length} produit(s) trouvé(s)
                </span>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <XMarkIcon className="h-4 w-4 mr-2" />
                  Effacer les filtres
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Résultats */}
        {filteredProduits.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <MagnifyingGlassIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Essayez de modifier vos critères de recherche ou parcourez nos catégories.
              </p>
              <Button variant="primary" onClick={clearFilters}>
                Voir tous les produits
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode grille */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProduits.map((produit) => (
                  <div
                    key={produit.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={produit.image}
                        alt={produit.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {produit.isNew && (
                        <span className="absolute top-2 left-2 bg-emerald-500 text-white px-2 py-1 text-xs font-semibold rounded">
                          Nouveau
                        </span>
                      )}
                      {produit.isPopular && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">
                          Populaire
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleAddToWishlist(produit.id)}
                            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Ajouter aux favoris"
                          >
                            <HeartIcon className="h-5 w-5" />
                          </button>
                          <Link to={`/produit/${produit.id}`}>
                            <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                              <EyeIcon className="h-5 w-5" />
                            </button>
                          </Link>
                          <button 
                            onClick={() => handleAddToCart(produit.id)}
                            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            title="Ajouter au panier"
                          >
                            <ShoppingCartIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {produit.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                        {produit.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          {renderStars(produit.rating)}
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            ({produit.reviewsCount})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {formatMGA(produit.price)}
                        </span>
                        <Link to={`/produit/${produit.id}`}>
                          <Button variant="primary" size="sm">
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Par {produit.boutique.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mode liste */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredProduits.map((produit) => (
                  <div
                    key={produit.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={produit.image}
                          alt={produit.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        {produit.isNew && (
                          <span className="absolute top-1 left-1 bg-emerald-500 text-white px-1 py-0.5 text-xs font-semibold rounded">
                            Nouveau
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {produit.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {produit.description}
                            </p>
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                {renderStars(produit.rating)}
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                  ({produit.reviewsCount} avis)
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Par {produit.boutique.name}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                              {formatMGA(produit.price)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button 
                                onClick={() => handleAddToWishlist(produit.id)}
                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                title="Ajouter aux favoris"
                              >
                                <HeartIcon className="h-5 w-5" />
                              </button>
                              <Link to={`/produit/${produit.id}`}>
                                <Button variant="outline" size="sm">
                                  <EyeIcon className="h-4 w-4 mr-2" />
                                  Voir
                                </Button>
                              </Link>
                              <Button 
                                variant="primary" 
                                size="sm"
                                onClick={() => handleAddToCart(produit.id)}
                              >
                                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                                Panier
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Précédent
                </Button>
                <Button variant="primary" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Suivant
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};