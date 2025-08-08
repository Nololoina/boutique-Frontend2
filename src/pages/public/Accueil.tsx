import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Button } from '../../components/common/Button';
import { Chatbot } from '../../components/chatbot/Chatbot';
import { formatMGA } from '../../utils/formatMoney';
import {
  ArrowRightIcon,
  StarIcon,
  ShoppingCartIcon,
  HeartIcon,
  EyeIcon,
  BuildingStorefrontIcon,
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  TruckIcon,
  CreditCardIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export const Accueil: React.FC = () => {
  const { produits, boutiques, isLoading } = useApp();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  // Données pour le carrousel
  const slides = [
    {
      id: 1,
      title: 'Découvrez les meilleures boutiques de Madagascar',
      subtitle: 'Plus de 247 boutiques locales vous attendent',
      description: 'Explorez notre marketplace 100% malgache et soutenez les entreprises locales',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      cta: 'Découvrir les boutiques',
      ctaAction: () => navigate('/boutiques')
    },
    {
      id: 2,
      title: 'Commandez sans créer de compte',
      subtitle: 'Simplicité et rapidité avant tout',
      description: 'Parcourez, commandez et payez en quelques clics. Aucune inscription requise !',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      cta: 'Commencer mes achats',
      ctaAction: () => navigate('/produits')
    },
    {
      id: 3,
      title: 'Paiement Mobile Money sécurisé',
      subtitle: 'Orange Money, Airtel Money, MVola',
      description: 'Payez facilement avec votre mobile ou en espèces à la livraison',
      image: 'https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      cta: 'Voir les produits',
      ctaAction: () => navigate('/produits')
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
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

  const handleAddToCart = (productId: string, productName: string) => {
    alert(`"${productName}" ajouté au panier ! Vous pouvez continuer vos achats ou finaliser votre commande.`);
  };

  const handleAddToWishlist = (productId: string, productName: string) => {
    alert(`"${productName}" ajouté à vos favoris ! Vous recevrez des notifications sur ce produit.`);
  };

  const handleFollowBoutique = (boutiqueId: string, boutiqueName: string) => {
    alert(`Vous suivez maintenant "${boutiqueName}" ! Vous recevrez des notifications sur ses nouveautés et promotions.`);
  };

  const handleContactClick = (method: string) => {
    switch (method) {
      case 'phone':
        window.open('tel:+261123456789', '_self');
        break;
      case 'email':
        window.open('mailto:contact@boutique3.mg', '_self');
        break;
      case 'chat':
        setShowChatbot(true);
        break;
      default:
        break;
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (email && email.includes('@')) {
      alert(`Merci ! Vous êtes maintenant abonné à notre newsletter avec l'email : ${email}`);
      (e.target as HTMLFormElement).reset();
    } else {
      alert('Veuillez entrer une adresse email valide.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section avec Carrousel */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-2 animate-fade-in-delay">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 text-gray-200 animate-fade-in-delay-2">
              {slides[currentSlide].description}
            </p>
            <div className="flex space-x-4">
              <Button
                variant="primary"
                size="lg"
                onClick={slides[currentSlide].ctaAction}
                className="bg-blue-600 hover:bg-blue-700 transform transition-transform active:scale-95"
              >
                {slides[currentSlide].cta}
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/partenariat')}
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                Ouvrir ma boutique
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation du carrousel */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Indicateurs */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Produits en vedette */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Produits en vedette
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez notre sélection de produits populaires et nouveautés
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {produits.slice(0, 4).map((produit) => (
              <div
                key={produit.id}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-shadow group"
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
                        onClick={() => handleAddToWishlist(produit.id, produit.name)}
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
                        onClick={() => handleAddToCart(produit.id, produit.name)}
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

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/produits')}
              className="bg-white dark:bg-gray-800 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Voir tous les produits
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Boutiques partenaires */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nos boutiques partenaires
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Découvrez des boutiques locales de confiance, vérifiées par notre équipe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {boutiques.slice(0, 4).map((boutique) => (
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
                    <Link to={`/boutique/${boutique.id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        <EyeIcon className="h-4 w-4 mr-2" />
                        Visiter la boutique
                      </Button>
                    </Link>
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

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/boutiques')}
              className="bg-white dark:bg-gray-800 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
            >
              Voir toutes les boutiques
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Commandez en 3 étapes simples, sans créer de compte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Parcourez & Choisissez
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explorez nos boutiques et produits. Utilisez les filtres pour trouver exactement ce que vous cherchez.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/produits')}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Commencer à parcourir
              </Button>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Ajoutez au panier
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sélectionnez vos articles et ajoutez-les au panier. Pas besoin de créer un compte !
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => alert('Ajoutez des produits à votre panier depuis les pages produits !')}
                className="mt-4 text-emerald-600 hover:text-emerald-700"
              >
                Voir le panier
              </Button>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Commandez & Payez
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Renseignez vos infos de livraison et payez par Mobile Money ou en espèces à la livraison.
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => alert('Finalisez votre commande depuis votre panier !')}
                className="mt-4 text-orange-600 hover:text-orange-700"
              >
                Finaliser commande
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nos services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Une expérience d'achat complète et sécurisée
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TruckIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Livraison dans toute l'île
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Livraison rapide et sécurisée dans toutes les régions de Madagascar
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <CreditCardIcon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Paiement sécurisé
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Mobile Money (Orange, Airtel, MVola) ou paiement à la livraison
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheckIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Boutiques vérifiées
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Toutes nos boutiques sont vérifiées et contrôlées par notre équipe
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Support 24/7
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Notre équipe support est disponible pour vous aider à tout moment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact rapide */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Besoin d'aide ?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Notre équipe est là pour vous accompagner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <PhoneIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Appelez-nous
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Support téléphonique disponible 7j/7
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleContactClick('phone')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                +261 12 345 67 89
              </Button>
            </div>

            <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <EnvelopeIcon className="h-12 w-12 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Écrivez-nous
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Réponse garantie sous 24h
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleContactClick('email')}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                contact@boutique3.mg
              </Button>
            </div>

            <div className="text-center p-6 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Chat en direct
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Assistance immédiate par chat
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleContactClick('chat')}
                className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20"
              >
                Démarrer le chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer vos achats ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Découvrez des milliers de produits de qualité de nos boutiques partenaires
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/produits')}
              className="bg-white text-blue-600 hover:bg-gray-100 transform transition-transform active:scale-95"
            >
              <ShoppingCartIcon className="mr-2 h-5 w-5" />
              Commencer mes achats
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/partenariat')}
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <BuildingStorefrontIcon className="mr-2 h-5 w-5" />
              Ouvrir ma boutique
            </Button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      {showChatbot && <Chatbot context="public" />}
    </div>
  );
};