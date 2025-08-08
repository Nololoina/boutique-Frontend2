import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';
import {
  ArrowLeftIcon,
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  ShareIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export const ProduitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { produits } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const produit = produits.find(p => p.id === id);

  if (!produit) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Produit non trouvé
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

  const images = [produit.image, produit.image, produit.image]; // Mock multiple images

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      i < Math.floor(rating) ? (
        <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
      ) : (
        <StarIcon key={i} className="h-5 w-5 text-gray-300" />
      )
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/produits" className="hover:text-blue-600 dark:hover:text-blue-400">
            Produits
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">{produit.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={produit.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index
                      ? 'border-blue-600'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${produit.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {produit.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(produit.rating)}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({produit.reviewsCount} avis)
                  </span>
                </div>
                {produit.isNew && (
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 px-2 py-1 text-xs font-semibold rounded">
                    Nouveau
                  </span>
                )}
              </div>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {formatMGA(produit.price)}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {produit.description}
              </p>
            </div>

            {/* Boutique */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BuildingStorefrontIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {produit.boutique.name}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {renderStars(produit.boutique.rating)}
                      {produit.boutique.isVerified && (
                        <ShieldCheckIcon className="h-4 w-4 text-green-500 ml-2" />
                      )}
                    </div>
                  </div>
                </div>
                <Link to={`/boutique/${produit.boutique.id}`}>
                  <Button variant="outline" size="sm">
                    Voir la boutique
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quantité et actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantité :
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900 dark:text-white border-x border-gray-300 dark:border-gray-600">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button variant="primary" size="lg" className="flex-1">
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Ajouter au panier
                </Button>
                <Button variant="outline" size="lg">
                  <HeartIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <ShareIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Informations livraison */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TruckIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-blue-900 dark:text-blue-100">
                  Livraison disponible
                </span>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Livraison gratuite pour les commandes supérieures à 50 000 MGA
              </p>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Produits similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produits.slice(0, 4).map((similarProduct) => (
              <Link
                key={similarProduct.id}
                to={`/produit/${similarProduct.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow group"
              >
                <img
                  src={similarProduct.image}
                  alt={similarProduct.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {similarProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {formatMGA(similarProduct.price)}
                    </span>
                    <div className="flex items-center space-x-1">
                      {renderStars(similarProduct.rating)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};