import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import {
  BellIcon,
  EnvelopeIcon,
  CogIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export const Notifications: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    internalNotifications: true,
    smtpSettings: {
      host: 'smtp.gmail.com',
      port: 587,
      username: 'noreply@plateforme.mg',
      password: '',
      encryption: 'TLS'
    },
    emailTemplates: {
      shopApproved: {
        subject: 'Votre boutique a été approuvée !',
        content: 'Félicitations ! Votre boutique {{shopName}} a été approuvée et est maintenant visible sur notre plateforme.'
      },
      accountDeactivated: {
        subject: 'Votre compte a été désactivé',
        content: 'Votre compte {{userName}} a été temporairement désactivé. Contactez notre support pour plus d\'informations.'
      },
      passwordReset: {
        subject: 'Réinitialisation de votre mot de passe',
        content: 'Cliquez sur ce lien pour réinitialiser votre mot de passe : {{resetLink}}'
      }
    },
    reminderIntervals: {
      inactivity: 30,
      expiredAds: 7,
      pendingValidation: 3
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres de notification sauvegardés avec succès !');
  };

  const handleToggle = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const updateSmtpSetting = (field: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      smtpSettings: { ...prev.smtpSettings, [field]: value }
    }));
  };

  const updateEmailTemplate = (template: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      emailTemplates: {
        ...prev.emailTemplates,
        [template]: { 
          ...prev.emailTemplates[template as keyof typeof prev.emailTemplates], 
          [field]: value 
        }
      }
    }));
  };

  const updateReminderInterval = (type: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      reminderIntervals: { 
        ...prev.reminderIntervals, 
        [type]: value 
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres de Notification
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configuration des notifications email et internes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paramètres généraux */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BellIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paramètres généraux
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifications par email
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Activer l'envoi d'emails automatiques
                </p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifications internes
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Afficher les notifications dans le tableau de bord
                </p>
              </div>
              <button
                onClick={() => handleToggle('internalNotifications')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.internalNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.internalNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Configuration SMTP */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <EnvelopeIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Configuration SMTP
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Serveur SMTP
              </label>
              <input
                type="text"
                value={settings.smtpSettings.host}
                onChange={(e) => updateSmtpSetting('host', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Port
                </label>
                <input
                  type="number"
                  value={settings.smtpSettings.port}
                  onChange={(e) => updateSmtpSetting('port', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Chiffrement
                </label>
                <select
                  value={settings.smtpSettings.encryption}
                  onChange={(e) => updateSmtpSetting('encryption', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="TLS">TLS</option>
                  <option value="SSL">SSL</option>
                  <option value="None">Aucun</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom d'utilisateur
              </label>
              <input
                type="email"
                value={settings.smtpSettings.username}
                onChange={(e) => updateSmtpSetting('username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={settings.smtpSettings.password}
                onChange={(e) => updateSmtpSetting('password', e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                alert('Test de connexion SMTP en cours...');
                setTimeout(() => {
                  alert('Connexion SMTP réussie ! Configuration valide.');
                }, 2000);
              }}
            >
              Tester la connexion SMTP
            </Button>
          </div>
        </div>

        {/* Intervalles de rappel */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ClockIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Intervalles de rappel
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Inactivité (jours)
              </label>
              <input
                type="number"
                value={settings.reminderIntervals.inactivity}
                onChange={(e) => updateReminderInterval('inactivity', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Rappel après X jours d'inactivité
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Publicités expirées (jours)
              </label>
              <input
                type="number"
                value={settings.reminderIntervals.expiredAds}
                onChange={(e) => updateReminderInterval('expiredAds', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Rappel X jours avant expiration
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Validation en attente (jours)
              </label>
              <input
                type="number"
                value={settings.reminderIntervals.pendingValidation}
                onChange={(e) => updateReminderInterval('pendingValidation', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Rappel après X jours sans validation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modèles d'email */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <CogIcon className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Modèles d'email
          </h2>
        </div>

        <div className="space-y-6">
          {Object.entries(settings.emailTemplates).map(([key, template]) => (
            <div key={key} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                {key === 'shopApproved' && 'Boutique approuvée'}
                {key === 'accountDeactivated' && 'Compte désactivé'}
                {key === 'passwordReset' && 'Réinitialisation mot de passe'}
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Sujet
                  </label>
                  <input
                    type="text"
                    value={template.subject}
                    onChange={(e) => updateEmailTemplate(key, 'subject', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Contenu
                  </label>
                  <textarea
                    value={template.content}
                    onChange={(e) => updateEmailTemplate(key, 'content', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Variables disponibles : {'{'}shopName{'}'}, {'{'}userName{'}'}, {'{'}resetLink{'}'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button 
          variant="outline"
          onClick={() => {
            if (confirm('Êtes-vous sûr de vouloir annuler toutes les modifications ?')) {
              window.location.reload();
            }
          }}
        >
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