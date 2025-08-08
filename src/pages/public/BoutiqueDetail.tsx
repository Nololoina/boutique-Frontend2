import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';
import {
  ArrowLeftIcon,
  StarIcon,
  BuildingStorefrontIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserPlusIcon,
  ShieldCheckIcon,
  HeartIcon,
  ShareIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export const BoutiqueDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { boutiques, produits } = useApp();
  const [isFollowing, setIsFollowing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const boutique = boutiques.find(b => b.id === id);
  const boutiqueProduits = produits.filter(p => p.boutique.id === id);

  const filteredProduits = boutiqueProduits.filter(produit =>
    produit.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!boutique) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Boutique non trouvée
          </h1>
          <Link to="/">
            <Button variant="primary">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? (
        <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="h-5 w-5 text-gray-300" />
      )
    ));
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      alert('Vous suivez maintenant cette boutique ! Vous recevrez des notifications sur ses nouveautés.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header de la boutique */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{boutique.name}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
            {/* Image de la boutique */}
            <div className="flex-shrink-0 mb-6 lg:mb-0">
              <img
                src={boutique.image}
                alt={boutique.name}
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-xl object-cover"
              />
            </div>

            {/* Informations de la boutique */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {boutique.name}
                    </h1>
                    {boutique.isVerified && (
                      <ShieldCheckIcon className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(boutique.rating)}
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {boutique.rating} étoiles
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {boutique.productsCount} produits
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
                    {boutique.description}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={isFollowing ? "secondary" : "primary"}
                    onClick={handleFollow}
                    className="flex items-center"
                  >
                    <UserPlusIcon className="h-4 w-4 mr-2" />
                    {isFollowing ? 'Suivi' : 'Suivre'}
                  </Button>
                  <Button variant="outline">
                    <ShareIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Informations de contact */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <MapPinIcon className="h-4 w-4" />
                  <span>Antananarivo, Madagascar</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <PhoneIcon className="h-4 w-4" />
                  <span>+261 32 12 345 67</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>contact@{boutique.name.toLowerCase().replace(/\s+/g, '')}.mg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produits de la boutique */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Produits ({filteredProduits.length})
          </h2>
          
          {/* Recherche dans la boutique */}
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher dans cette boutique..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {filteredProduits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? 'Aucun produit trouvé pour cette recherche.' : 'Cette boutique n\'a pas encore de produits.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProduits.map((produit) => (
              <Link
                key={produit.id}
                to={`/produit/${produit.id}`}
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
                    <Button variant="primary" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};