import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/common/Button';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  StarIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserPlusIcon,
  BuildingStorefrontIcon,
  XMarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface FilterState {
  search: string;
  category: string;
  rating: number;
  verified: boolean;
  sortBy: 'name' | 'rating' | 'products' | 'newest';
}

export const BoutiquesList: React.FC = () => {
  const { boutiques, isLoading } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    rating: 0,
    verified: false,
    sortBy: 'rating'
  });

  // Filtrage et tri des boutiques
  const filteredBoutiques = boutiques
    .filter(boutique => {
      const matchesSearch = boutique.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           boutique.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || boutique.category === filters.category;
      const matchesRating = boutique.rating >= filters.rating;
      const matchesVerified = !filters.verified || boutique.isVerified;
      
      return matchesSearch && matchesCategory && matchesRating && matchesVerified;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.productsCount - a.productsCount;
        case 'newest':
        default:
          return 0; // Tri par défaut
      }
    });

  const categories = [...new Set(boutiques.map(b => b.category))];

  const handleFilterChange = (field: keyof FilterState, value: string | number | boolean) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      rating: 0,
      verified: false,
      sortBy: 'rating'
    });
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

  const handleFollowBoutique = (boutiqueId: string, boutiqueName: string) => {
    alert(`Vous suivez maintenant ${boutiqueName} ! Vous recevrez des notifications sur ses nouveautés.`);
  };

  const handleViewBoutique = (boutiqueId: string) => {
    // Navigation vers la page de détail de la boutique
    window.location.href = `/boutique/${boutiqueId}`;
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
            Toutes nos boutiques
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Découvrez {boutiques.length} boutiques partenaires de confiance
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
                  placeholder="Rechercher des boutiques..."
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
                <option value="rating">Mieux notées</option>
                <option value="name">Nom A-Z</option>
                <option value="products">Plus de produits</option>
                <option value="newest">Plus récentes</option>
              </select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center"
              >
                <FunnelIcon className="h-4 w-4 mr-2" />
                Filtres
                {(filters.category || filters.rating > 0 || filters.verified) && (
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Options
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.verified}
                        onChange={(e) => handleFilterChange('verified', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Boutiques vérifiées uniquement
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredBoutiques.length} boutique(s) trouvée(s)
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
        {filteredBoutiques.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <BuildingStorefrontIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Aucune boutique trouvée
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Essayez de modifier vos critères de recherche.
              </p>
              <Button variant="primary" onClick={clearFilters}>
                Voir toutes les boutiques
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode grille */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBoutiques.map((boutique) => (
                  <div
                    key={boutique.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
                  >
                    <div className="relative">
                      <img
                        src={boutique.image}
                        alt={boutique.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {boutique.isVerified && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                          <ShieldCheckIcon className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {boutique.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {boutique.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          {renderStars(boutique.rating)}
                          <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                            {boutique.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {boutique.productsCount} produits
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <Button
                          variant="primary"
                          size="sm"
                          className="w-full"
                          onClick={() => handleViewBoutique(boutique.id)}
                        >
                          <EyeIcon className="h-4 w-4 mr-2" />
                          Visiter la boutique
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => handleFollowBoutique(boutique.id, boutique.name)}
                        >
                          <UserPlusIcon className="h-4 w-4 mr-2" />
                          Suivre cette boutique
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Mode liste */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredBoutiques.map((boutique) => (
                  <div
                    key={boutique.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-6">
                      <div className="relative flex-shrink-0">
                        <img
                          src={boutique.image}
                          alt={boutique.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        {boutique.isVerified && (
                          <div className="absolute -top-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                            <ShieldCheckIcon className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                              {boutique.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {boutique.description}
                            </p>
                            <div className="flex items-center space-x-4 mb-3">
                              <div className="flex items-center space-x-1">
                                {renderStars(boutique.rating)}
                                <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                                  {boutique.rating} étoiles
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {boutique.productsCount} produits
                              </span>
                              <span className="text-sm text-blue-600 dark:text-blue-400">
                                {boutique.category}
                              </span>
                            </div>
                            
                            {/* Informations de contact simulées */}
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <div className="flex items-center">
                                <MapPinIcon className="h-4 w-4 mr-1" />
                                Antananarivo
                              </div>
                              <div className="flex items-center">
                                <PhoneIcon className="h-4 w-4 mr-1" />
                                +261 32 XX XX XX
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col space-y-2">
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => handleViewBoutique(boutique.id)}
                            >
                              <EyeIcon className="h-4 w-4 mr-2" />
                              Visiter
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleFollowBoutique(boutique.id, boutique.name)}
                            >
                              <UserPlusIcon className="h-4 w-4 mr-2" />
                              Suivre
                            </Button>
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