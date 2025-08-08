import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button';
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CogIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  SpeakerWaveIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

interface NotificationSettings {
  // Notifications par email
  emailNotifications: {
    nouvelleCommande: boolean;
    paiementRecu: boolean;
    commandeAnnulee: boolean;
    stockFaible: boolean;
    nouveauMessage: boolean;
    avisClient: boolean;
    promotionExpiree: boolean;
    rapportHebdomadaire: boolean;
  };
  
  // Notifications SMS
  smsNotifications: {
    commandeUrgente: boolean;
    paiementImportant: boolean;
    alerteSecurite: boolean;
  };
  
  // Notifications push (dans l'app)
  pushNotifications: {
    activees: boolean;
    nouvelleCommande: boolean;
    messageClient: boolean;
    stockCritique: boolean;
    promotionActive: boolean;
  };
  
  // Paramètres généraux
  frequenceResume: 'temps-reel' | 'horaire' | 'quotidien' | 'hebdomadaire';
  horairesSilence: {
    actif: boolean;
    heureDebut: string;
    heureFin: string;
  };
  
  // Canaux de notification
  emailPrincipal: string;
  telephoneSMS: string;
  emailSecondaire?: string;
  
  // Seuils d'alerte
  seuilStockFaible: number;
  seuilMontantImportant: number;
  
  // Notifications WhatsApp
  whatsappNotifications: {
    actif: boolean;
    numeroWhatsApp: string;
    commandeImportante: boolean;
    clientVIP: boolean;
  };
}

export const Notifications: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    emailNotifications: {
      nouvelleCommande: true,
      paiementRecu: true,
      commandeAnnulee: true,
      stockFaible: true,
      nouveauMessage: true,
      avisClient: false,
      promotionExpiree: true,
      rapportHebdomadaire: true
    },
    smsNotifications: {
      commandeUrgente: true,
      paiementImportant: false,
      alerteSecurite: true
    },
    pushNotifications: {
      activees: true,
      nouvelleCommande: true,
      messageClient: true,
      stockCritique: true,
      promotionActive: false
    },
    frequenceResume: 'quotidien',
    horairesSilence: {
      actif: true,
      heureDebut: '22:00',
      heureFin: '08:00'
    },
    emailPrincipal: 'admin@maboutique.mg',
    telephoneSMS: '+261 32 12 345 67',
    emailSecondaire: '',
    seuilStockFaible: 5,
    seuilMontantImportant: 100000,
    whatsappNotifications: {
      actif: false,
      numeroWhatsApp: '+261 32 12 345 67',
      commandeImportante: false,
      clientVIP: false
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [testNotification, setTestNotification] = useState<string | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres de notification sauvegardés avec succès !');
  };

  const handleEmailToggle = (field: keyof typeof settings.emailNotifications) => {
    setSettings(prev => ({
      ...prev,
      emailNotifications: {
        ...prev.emailNotifications,
        [field]: !prev.emailNotifications[field]
      }
    }));
  };

  const handleSMSToggle = (field: keyof typeof settings.smsNotifications) => {
    setSettings(prev => ({
      ...prev,
      smsNotifications: {
        ...prev.smsNotifications,
        [field]: !prev.smsNotifications[field]
      }
    }));
  };

  const handlePushToggle = (field: keyof typeof settings.pushNotifications) => {
    setSettings(prev => ({
      ...prev,
      pushNotifications: {
        ...prev.pushNotifications,
        [field]: !prev.pushNotifications[field]
      }
    }));
  };

  const handleWhatsAppToggle = (field: keyof typeof settings.whatsappNotifications) => {
    setSettings(prev => ({
      ...prev,
      whatsappNotifications: {
        ...prev.whatsappNotifications,
        [field]: !prev.whatsappNotifications[field]
      }
    }));
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSilenceToggle = (field: keyof typeof settings.horairesSilence) => {
    setSettings(prev => ({
      ...prev,
      horairesSilence: {
        ...prev.horairesSilence,
        [field]: typeof prev.horairesSilence[field] === 'boolean' 
          ? !prev.horairesSilence[field] 
          : prev.horairesSilence[field]
      }
    }));
  };

  const handleTestNotification = async (type: string) => {
    setTestNotification(type);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTestNotification(null);
    alert(`Notification test ${type} envoyée avec succès !`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres de Notification
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configurez vos préférences de notification pour votre boutique
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Email */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications Email
              </h2>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleTestNotification('email')}
              isLoading={testNotification === 'email'}
            >
              Tester
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email principal
              </label>
              <input
                type="email"
                value={settings.emailPrincipal}
                onChange={(e) => handleInputChange('emailPrincipal', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email secondaire (optionnel)
              </label>
              <input
                type="email"
                value={settings.emailSecondaire || ''}
                onChange={(e) => handleInputChange('emailSecondaire', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Types de notifications
              </h3>
              
              {Object.entries(settings.emailNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      {key === 'nouvelleCommande' && 'Nouvelle commande'}
                      {key === 'paiementRecu' && 'Paiement reçu'}
                      {key === 'commandeAnnulee' && 'Commande annulée'}
                      {key === 'stockFaible' && 'Stock faible'}
                      {key === 'nouveauMessage' && 'Nouveau message client'}
                      {key === 'avisClient' && 'Nouvel avis client'}
                      {key === 'promotionExpiree' && 'Promotion expirée'}
                      {key === 'rapportHebdomadaire' && 'Rapport hebdomadaire'}
                    </label>
                  </div>
                  <button
                    onClick={() => handleEmailToggle(key as keyof typeof settings.emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications SMS */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <DevicePhoneMobileIcon className="h-5 w-5 text-emerald-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications SMS
              </h2>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleTestNotification('sms')}
              isLoading={testNotification === 'sms'}
            >
              Tester
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={settings.telephoneSMS}
                onChange={(e) => handleInputChange('telephoneSMS', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Types de notifications SMS
              </h3>
              
              {Object.entries(settings.smsNotifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      {key === 'commandeUrgente' && 'Commande urgente'}
                      {key === 'paiementImportant' && 'Paiement important'}
                      {key === 'alerteSecurite' && 'Alerte sécurité'}
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {key === 'commandeUrgente' && 'Commandes express ou prioritaires'}
                      {key === 'paiementImportant' && `Paiements > ${settings.seuilMontantImportant.toLocaleString()} MGA`}
                      {key === 'alerteSecurite' && 'Tentatives de connexion suspectes'}
                    </p>
                  </div>
                  <button
                    onClick={() => handleSMSToggle(key as keyof typeof settings.smsNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications Push */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <BellIcon className="h-5 w-5 text-purple-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications Push
              </h2>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              settings.pushNotifications.activees 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {settings.pushNotifications.activees ? 'Activées' : 'Désactivées'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activer les notifications push
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Notifications dans le tableau de bord
                </p>
              </div>
              <button
                onClick={() => handlePushToggle('activees')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.pushNotifications.activees ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.pushNotifications.activees ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.pushNotifications.activees && (
              <div className="space-y-3 pl-4 border-l-2 border-purple-200 dark:border-purple-800">
                {Object.entries(settings.pushNotifications).filter(([key]) => key !== 'activees').map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      {key === 'nouvelleCommande' && 'Nouvelle commande'}
                      {key === 'messageClient' && 'Message client'}
                      {key === 'stockCritique' && 'Stock critique'}
                      {key === 'promotionActive' && 'Promotion active'}
                    </label>
                    <button
                      onClick={() => handlePushToggle(key as keyof typeof settings.pushNotifications)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        value ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications WhatsApp
              </h2>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              settings.whatsappNotifications.actif 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {settings.whatsappNotifications.actif ? 'Activé' : 'Désactivé'}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activer WhatsApp Business
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Notifications via WhatsApp Business API
                </p>
              </div>
              <button
                onClick={() => handleWhatsAppToggle('actif')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.whatsappNotifications.actif ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.whatsappNotifications.actif ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.whatsappNotifications.actif && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Numéro WhatsApp Business
                  </label>
                  <input
                    type="tel"
                    value={settings.whatsappNotifications.numeroWhatsApp}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      whatsappNotifications: {
                        ...prev.whatsappNotifications,
                        numeroWhatsApp: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Commande importante
                    </label>
                    <button
                      onClick={() => handleWhatsAppToggle('commandeImportante')}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.whatsappNotifications.commandeImportante ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.whatsappNotifications.commandeImportante ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Client VIP
                    </label>
                    <button
                      onClick={() => handleWhatsAppToggle('clientVIP')}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.whatsappNotifications.clientVIP ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.whatsappNotifications.clientVIP ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Paramètres avancés */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horaires de silence */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MoonIcon className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Horaires de silence
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activer les horaires de silence
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Suspendre les notifications pendant certaines heures
                </p>
              </div>
              <button
                onClick={() => handleSilenceToggle('actif')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.horairesSilence.actif ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.horairesSilence.actif ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.horairesSilence.actif && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Début du silence
                  </label>
                  <input
                    type="time"
                    value={settings.horairesSilence.heureDebut}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      horairesSilence: {
                        ...prev.horairesSilence,
                        heureDebut: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fin du silence
                  </label>
                  <input
                    type="time"
                    value={settings.horairesSilence.heureFin}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      horairesSilence: {
                        ...prev.horairesSilence,
                        heureFin: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seuils et fréquences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CogIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Seuils et fréquences
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Fréquence des résumés
              </label>
              <select
                value={settings.frequenceResume}
                onChange={(e) => handleInputChange('frequenceResume', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="temps-reel">Temps réel</option>
                <option value="horaire">Toutes les heures</option>
                <option value="quotidien">Quotidien</option>
                <option value="hebdomadaire">Hebdomadaire</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seuil stock faible (unités)
              </label>
              <input
                type="number"
                value={settings.seuilStockFaible}
                onChange={(e) => handleInputChange('seuilStockFaible', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seuil montant important (MGA)
              </label>
              <input
                type="number"
                value={settings.seuilMontantImportant}
                onChange={(e) => handleInputChange('seuilMontantImportant', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Aperçu des notifications récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notifications récentes
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Nouvelle commande reçue
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Commande CMD-001 de Jean Rakoto - Il y a 5 minutes
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Email
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  Push
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Stock faible détecté
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Produit "Smartphone XYZ" - 3 unités restantes - Il y a 1 heure
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Email
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Paiement confirmé
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Paiement Mobile Money de 125 000 MGA - Il y a 2 heures
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Email
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                  SMS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Réinitialiser
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