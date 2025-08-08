import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import {
  BuildingStorefrontIcon,
  CheckCircleIcon,
  XCircleIcon,
  EnvelopeIcon,
  CubeIcon,
  EyeIcon,
  ChatBubbleLeftRightIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export const Boutiques: React.FC = () => {
  const [settings, setSettings] = useState({
    allowNewRegistrations: true,
    autoValidation: false,
    sendApprovalEmail: true,
    maxProductsPerShop: 1000,
    showOnlyValidatedShops: true,
    allowCustomerReviews: true,
    requireShopDescription: true,
    minDescriptionLength: 50,
    allowedCategories: [
      'Électronique',
      'Mode',
      'Alimentaire',
      'Maison & Jardin',
      'Beauté & Santé',
      'Sport & Loisirs',
      'Automobile',
      'Livres & Médias',
      'Artisanat'
    ],
    newCategories: '',
    shopValidationRules: {
      requireBusinessLicense: true,
      requireIdentityDocument: true,
      requirePhoneVerification: true,
      requireEmailVerification: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres des boutiques sauvegardés avec succès !');
  };

  const handleToggle = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleRuleToggle = (rule: string) => {
    setSettings(prev => ({
      ...prev,
      shopValidationRules: {
        ...prev.shopValidationRules,
        [rule]: !prev.shopValidationRules[rule as keyof typeof prev.shopValidationRules]
      }
    }));
  };

  const addCategory = () => {
    if (settings.newCategories.trim()) {
      setSettings(prev => ({
        ...prev,
        allowedCategories: [...prev.allowedCategories, settings.newCategories.trim()],
        newCategories: ''
      }));
    }
  };

  const removeCategory = (index: number) => {
    setSettings(prev => ({
      ...prev,
      allowedCategories: prev.allowedCategories.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres des Boutiques
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configuration des règles et options pour les boutiques
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enregistrement des boutiques */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BuildingStorefrontIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Enregistrement des boutiques
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Autoriser les nouvelles inscriptions
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre aux nouveaux vendeurs de s'inscrire
                </p>
              </div>
              <button
                onClick={() => handleToggle('allowNewRegistrations')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowNewRegistrations ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowNewRegistrations ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Validation automatique
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Valider automatiquement les nouvelles boutiques
                </p>
              </div>
              <button
                onClick={() => handleToggle('autoValidation')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoValidation ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoValidation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email d'approbation
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Envoyer un email lors de l'approbation
                </p>
              </div>
              <button
                onClick={() => handleToggle('sendApprovalEmail')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.sendApprovalEmail ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.sendApprovalEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Règles de validation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Règles de validation
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Licence commerciale requise
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Exiger un document de licence commerciale
                </p>
              </div>
              <button
                onClick={() => handleRuleToggle('requireBusinessLicense')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.shopValidationRules.requireBusinessLicense ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.shopValidationRules.requireBusinessLicense ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Pièce d'identité requise
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Exiger une pièce d'identité valide
                </p>
              </div>
              <button
                onClick={() => handleRuleToggle('requireIdentityDocument')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.shopValidationRules.requireIdentityDocument ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.shopValidationRules.requireIdentityDocument ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vérification téléphone
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Vérifier le numéro de téléphone
                </p>
              </div>
              <button
                onClick={() => handleRuleToggle('requirePhoneVerification')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.shopValidationRules.requirePhoneVerification ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.shopValidationRules.requirePhoneVerification ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vérification email
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Vérifier l'adresse email
                </p>
              </div>
              <button
                onClick={() => handleRuleToggle('requireEmailVerification')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.shopValidationRules.requireEmailVerification ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.shopValidationRules.requireEmailVerification ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Limites et restrictions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CubeIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Limites et restrictions
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nombre maximum de produits par boutique
              </label>
              <input
                type="number"
                value={settings.maxProductsPerShop}
                onChange={(e) => setSettings(prev => ({ ...prev, maxProductsPerShop: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Longueur minimale de la description
              </label>
              <input
                type="number"
                value={settings.minDescriptionLength}
                onChange={(e) => setSettings(prev => ({ ...prev, minDescriptionLength: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Nombre minimum de caractères requis pour la description
              </p>
            </div>
          </div>
        </div>

        {/* Options d'affichage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <EyeIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Options d'affichage
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Afficher uniquement les boutiques validées
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Masquer les boutiques en attente de validation
                </p>
              </div>
              <button
                onClick={() => handleToggle('showOnlyValidatedShops')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.showOnlyValidatedShops ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.showOnlyValidatedShops ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Autoriser les avis clients
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre aux clients de laisser des avis
                </p>
              </div>
              <button
                onClick={() => handleToggle('allowCustomerReviews')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowCustomerReviews ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowCustomerReviews ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Catégories autorisées */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TagIcon className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Catégories autorisées
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {settings.allowedCategories.map((category, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
              >
                <span>{category}</span>
                <button
                  onClick={() => removeCategory(index)}
                  className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                >
                  <XCircleIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={settings.newCategories}
              onChange={(e) => setSettings(prev => ({ ...prev, newCategories: e.target.value }))}
              placeholder="Nouvelle catégorie"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <Button 
              variant="outline" 
              onClick={addCategory}
              disabled={!settings.newCategories.trim()}
            >
              Ajouter
            </Button>
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