import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import {
  CogIcon,
  PhotoIcon,
  GlobeAltIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  PaintBrushIcon
} from '@heroicons/react/24/outline';

export const General: React.FC = () => {
  const [settings, setSettings] = useState({
    platformName: 'Boutique en Ligne 3.0',
    logo: '',
    favicon: '',
    defaultLanguage: 'fr',
    timezone: 'Indian/Antananarivo',
    dateFormat: 'dd/MM/yyyy',
    timeFormat: '24h',
    itemsPerPage: 20,
    defaultCurrency: 'MGA',
    footerText: '© 2025 Boutique en Ligne 3.0. Tous droits réservés.',
    footerLinks: [
      { name: 'Conditions d\'utilisation', url: '/terms' },
      { name: 'Politique de confidentialité', url: '/privacy' },
      { name: 'FAQ', url: '/faq' }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulation de sauvegarde
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres généraux sauvegardés avec succès !');
  };

  const handleInputChange = (field: string, value: string | number) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const addFooterLink = () => {
    setSettings(prev => ({
      ...prev,
      footerLinks: [...prev.footerLinks, { name: '', url: '' }]
    }));
  };

  const updateFooterLink = (index: number, field: 'name' | 'url', value: string) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: prev.footerLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeFooterLink = (index: number) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: prev.footerLinks.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres Généraux
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configuration générale de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations de base */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CogIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Informations de base
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la plateforme
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => handleInputChange('platformName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo de la plateforme
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  Changer le logo
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Favicon
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                  <PhotoIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  Changer le favicon
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Localisation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <GlobeAltIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Localisation
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Langue par défaut
              </label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => handleInputChange('defaultLanguage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="fr">Français</option>
                <option value="mg">Malagasy</option>
                <option value="en">English</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fuseau horaire
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleInputChange('timezone', e.target.value)}
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
                  Format de date
                </label>
                <select
                  value={settings.dateFormat}
                  onChange={(e) => handleInputChange('dateFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="dd/MM/yyyy">DD/MM/YYYY</option>
                  <option value="MM/dd/yyyy">MM/DD/YYYY</option>
                  <option value="yyyy-MM-dd">YYYY-MM-DD</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format d'heure
                </label>
                <select
                  value={settings.timeFormat}
                  onChange={(e) => handleInputChange('timeFormat', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="24h">24 heures</option>
                  <option value="12h">12 heures (AM/PM)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Affichage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PaintBrushIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Affichage
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Éléments par page
              </label>
              <select
                value={settings.itemsPerPage}
                onChange={(e) => handleInputChange('itemsPerPage', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value={10}>10 éléments</option>
                <option value={20}>20 éléments</option>
                <option value={50}>50 éléments</option>
                <option value={100}>100 éléments</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Devise par défaut
              </label>
              <select
                value={settings.defaultCurrency}
                onChange={(e) => handleInputChange('defaultCurrency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="MGA">Ariary Malgache (MGA)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar US (USD)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DocumentTextIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Pied de page
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Texte du copyright
              </label>
              <textarea
                value={settings.footerText}
                onChange={(e) => handleInputChange('footerText', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Liens du pied de page
                </label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addFooterLink}
                >
                  Ajouter un lien
                </Button>
              </div>
              <div className="space-y-2">
                {settings.footerLinks.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Nom du lien"
                      value={link.name}
                      onChange={(e) => updateFooterLink(index, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => updateFooterLink(index, 'url', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFooterLink(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Annuler
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