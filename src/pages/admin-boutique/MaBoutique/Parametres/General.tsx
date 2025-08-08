import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button';
import {
  CogIcon,
  PhotoIcon,
  GlobeAltIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface ConfigurationBoutique {
  // Informations générales
  nom: string;
  description: string;
  descriptionLongue: string;
  logo?: string;
  slogan: string;
  urlPersonnalisee: string;
  
  // Contact
  email: string;
  telephone: string;
  whatsapp?: string;
  adressePhysique: string;
  ville: string;
  codePostal: string;
  
  // Horaires
  horaires: {
    [key: string]: {
      ouvert: boolean;
      heures: string;
    };
  };
  
  // Localisation
  fuseauHoraire: string;
  devise: string;
  langue: string;
  
  // Réseaux sociaux
  reseauxSociaux: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  
  // Paramètres avancés
  affichageStock: boolean;
  commandesSansStock: boolean;
  validationCommandes: boolean;
  notificationsEmail: boolean;
  notificationsSMS: boolean;
}

export const General: React.FC = () => {
  const [configuration, setConfiguration] = useState<ConfigurationBoutique>({
    nom: 'Ma Boutique Demo',
    description: 'Boutique de produits de qualité avec un service client exceptionnel',
    descriptionLongue: 'Nous sommes une boutique familiale spécialisée dans la vente de produits de qualité. Depuis notre création en 2020, nous nous efforçons de proposer les meilleurs produits à nos clients avec un service personnalisé.',
    slogan: 'Qualité et service depuis 2020',
    urlPersonnalisee: 'ma-boutique-demo',
    email: 'contact@maboutique.mg',
    telephone: '+261 32 12 345 67',
    whatsapp: '+261 32 12 345 67',
    adressePhysique: '123 Rue de la Paix',
    ville: 'Antananarivo',
    codePostal: '101',
    horaires: {
      lundi: { ouvert: true, heures: '08:00-18:00' },
      mardi: { ouvert: true, heures: '08:00-18:00' },
      mercredi: { ouvert: true, heures: '08:00-18:00' },
      jeudi: { ouvert: true, heures: '08:00-18:00' },
      vendredi: { ouvert: true, heures: '08:00-18:00' },
      samedi: { ouvert: true, heures: '09:00-17:00' },
      dimanche: { ouvert: false, heures: '' }
    },
    fuseauHoraire: 'Indian/Antananarivo',
    devise: 'MGA',
    langue: 'fr',
    reseauxSociaux: {
      facebook: 'https://facebook.com/maboutique',
      instagram: 'https://instagram.com/maboutique'
    },
    affichageStock: true,
    commandesSansStock: false,
    validationCommandes: true,
    notificationsEmail: true,
    notificationsSMS: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setConfiguration(prev => ({ ...prev, [field]: value }));
  };

  const handleHoraireChange = (jour: string, field: 'ouvert' | 'heures', value: boolean | string) => {
    setConfiguration(prev => ({
      ...prev,
      horaires: {
        ...prev.horaires,
        [jour]: {
          ...prev.horaires[jour],
          [field]: value
        }
      }
    }));
  };

  const handleReseauSocialChange = (reseau: string, value: string) => {
    setConfiguration(prev => ({
      ...prev,
      reseauxSociaux: {
        ...prev.reseauxSociaux,
        [reseau]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Paramètres Généraux
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Configuration générale de votre boutique
          </p>
        </div>
        {isSaved && (
          <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
            <CheckCircleIcon className="h-5 w-5" />
            <span className="text-sm">Paramètres sauvegardés</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations générales */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CogIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Informations générales
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la boutique *
              </label>
              <input
                type="text"
                value={configuration.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slogan
              </label>
              <input
                type="text"
                value={configuration.slogan}
                onChange={(e) => handleInputChange('slogan', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description courte *
              </label>
              <textarea
                value={configuration.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description longue
              </label>
              <textarea
                value={configuration.descriptionLongue}
                onChange={(e) => handleInputChange('descriptionLongue', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo de la boutique
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                  Changer le logo
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL personnalisée
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                  plateforme.mg/
                </span>
                <input
                  type="text"
                  value={configuration.urlPersonnalisee}
                  onChange={(e) => handleInputChange('urlPersonnalisee', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coordonnées de contact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PhoneIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Coordonnées de contact
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email de contact *
              </label>
              <input
                type="email"
                value={configuration.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={configuration.telephone}
                  onChange={(e) => handleInputChange('telephone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={configuration.whatsapp || ''}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Adresse physique
              </label>
              <input
                type="text"
                value={configuration.adressePhysique}
                onChange={(e) => handleInputChange('adressePhysique', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ville
                </label>
                <input
                  type="text"
                  value={configuration.ville}
                  onChange={(e) => handleInputChange('ville', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Code postal
                </label>
                <input
                  type="text"
                  value={configuration.codePostal}
                  onChange={(e) => handleInputChange('codePostal', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horaires d'ouverture */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ClockIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Horaires d'ouverture
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(configuration.horaires).map(([jour, horaire]) => (
              <div key={jour} className="flex items-center space-x-4">
                <div className="w-24">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {jour}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={horaire.ouvert}
                    onChange={(e) => handleHoraireChange(jour, 'ouvert', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ouvert</span>
                </div>
                {horaire.ouvert && (
                  <input
                    type="text"
                    value={horaire.heures}
                    onChange={(e) => handleHoraireChange(jour, 'heures', e.target.value)}
                    placeholder="08:00-18:00"
                    className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Localisation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <GlobeAltIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Localisation
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fuseau horaire
              </label>
              <select
                value={configuration.fuseauHoraire}
                onChange={(e) => handleInputChange('fuseauHoraire', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Indian/Antananarivo">Madagascar (UTC+3)</option>
                <option value="Europe/Paris">Paris (UTC+1)</option>
                <option value="UTC">UTC (UTC+0)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Devise
                </label>
                <select
                  value={configuration.devise}
                  onChange={(e) => handleInputChange('devise', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="MGA">Ariary Malgache (MGA)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="USD">Dollar US (USD)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Langue principale
                </label>
                <select
                  value={configuration.langue}
                  onChange={(e) => handleInputChange('langue', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="fr">Français</option>
                  <option value="mg">Malagasy</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <LinkIcon className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Réseaux sociaux
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={configuration.reseauxSociaux.facebook || ''}
                onChange={(e) => handleReseauSocialChange('facebook', e.target.value)}
                placeholder="https://facebook.com/maboutique"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={configuration.reseauxSociaux.instagram || ''}
                onChange={(e) => handleReseauSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/maboutique"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={configuration.reseauxSociaux.twitter || ''}
                onChange={(e) => handleReseauSocialChange('twitter', e.target.value)}
                placeholder="https://twitter.com/maboutique"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                YouTube
              </label>
              <input
                type="url"
                value={configuration.reseauxSociaux.youtube || ''}
                onChange={(e) => handleReseauSocialChange('youtube', e.target.value)}
                placeholder="https://youtube.com/maboutique"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Paramètres avancés */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <CogIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Paramètres avancés
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Afficher le stock disponible
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Montrer le nombre d'articles en stock
                </p>
              </div>
              <button
                onClick={() => handleInputChange('affichageStock', !configuration.affichageStock)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  configuration.affichageStock ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    configuration.affichageStock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Commandes sans stock
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Autoriser les commandes même en rupture
                </p>
              </div>
              <button
                onClick={() => handleInputChange('commandesSansStock', !configuration.commandesSansStock)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  configuration.commandesSansStock ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    configuration.commandesSansStock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Validation manuelle des commandes
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Valider chaque commande manuellement
                </p>
              </div>
              <button
                onClick={() => handleInputChange('validationCommandes', !configuration.validationCommandes)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  configuration.validationCommandes ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    configuration.validationCommandes ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifications par email
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recevoir les notifications par email
                </p>
              </div>
              <button
                onClick={() => handleInputChange('notificationsEmail', !configuration.notificationsEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  configuration.notificationsEmail ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    configuration.notificationsEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifications par SMS
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Recevoir les notifications par SMS
                </p>
              </div>
              <button
                onClick={() => handleInputChange('notificationsSMS', !configuration.notificationsSMS)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  configuration.notificationsSMS ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    configuration.notificationsSMS ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu de la boutique */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Aperçu de votre boutique
        </h2>
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PhotoIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {configuration.nom}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {configuration.slogan}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {configuration.description}
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {configuration.ville}
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-4 w-4 mr-1" />
                {configuration.telephone}
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm">
                Prévisualiser la boutique
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Annuler les modifications
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          isLoading={isLoading}
        >
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  );
};