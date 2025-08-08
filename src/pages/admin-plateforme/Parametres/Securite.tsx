import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import {
  ShieldCheckIcon,
  KeyIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

export const Securite: React.FC = () => {
  const [settings, setSettings] = useState({
    forcePasswordReset: true,
    autoLogoutMinutes: 30,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 15,
    require2FA: false,
    trackLoginHistory: true,
    allowMultipleSessions: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpireDays: 90
    },
    rolePermissions: {
      'assistant-plateforme': [
        'view-boutiques',
        'validate-boutiques',
        'view-users',
        'moderate-content'
      ],
      'admin-principal': [
        'all-permissions'
      ]
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginHistory] = useState([
    {
      id: 1,
      user: 'Admin Principal',
      ip: '192.168.1.100',
      date: '2024-12-20 14:30:25',
      role: 'admin-principal',
      status: 'success'
    },
    {
      id: 2,
      user: 'Assistant Paul',
      ip: '192.168.1.101',
      date: '2024-12-20 13:15:10',
      role: 'assistant-plateforme',
      status: 'success'
    },
    {
      id: 3,
      user: 'Tentative inconnue',
      ip: '203.45.67.89',
      date: '2024-12-20 12:45:33',
      role: 'unknown',
      status: 'failed'
    }
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres de sécurité sauvegardés avec succès !');
  };

  const handleToggle = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const updatePasswordPolicy = (field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      passwordPolicy: { ...prev.passwordPolicy, [field]: value }
    }));
  };

  const availablePermissions = [
    'view-boutiques',
    'validate-boutiques',
    'edit-boutiques',
    'delete-boutiques',
    'view-users',
    'create-users',
    'edit-users',
    'delete-users',
    'moderate-content',
    'manage-ads',
    'view-reports',
    'system-settings'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres de Sécurité
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configuration de la sécurité et des accès
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Authentification */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <KeyIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Authentification
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Réinitialisation obligatoire (1ère connexion)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Forcer le changement de mot de passe
                </p>
              </div>
              <button
                onClick={() => handleToggle('forcePasswordReset')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.forcePasswordReset ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.forcePasswordReset ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Authentification à deux facteurs (2FA)
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sécurité renforcée avec 2FA
                </p>
              </div>
              <button
                onClick={() => handleToggle('require2FA')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.require2FA ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.require2FA ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Déconnexion automatique (minutes)
              </label>
              <input
                type="number"
                value={settings.autoLogoutMinutes}
                onChange={(e) => setSettings(prev => ({ ...prev, autoLogoutMinutes: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tentatives max
                </label>
                <input
                  type="number"
                  value={settings.maxLoginAttempts}
                  onChange={(e) => setSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Blocage (minutes)
                </label>
                <input
                  type="number"
                  value={settings.lockoutDurationMinutes}
                  onChange={(e) => setSettings(prev => ({ ...prev, lockoutDurationMinutes: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Politique des mots de passe */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ShieldCheckIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Politique des mots de passe
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Longueur minimale
              </label>
              <input
                type="number"
                value={settings.passwordPolicy.minLength}
                onChange={(e) => updatePasswordPolicy('minLength', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Majuscules requises
                </label>
                <button
                  onClick={() => updatePasswordPolicy('requireUppercase', !settings.passwordPolicy.requireUppercase)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.passwordPolicy.requireUppercase ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.passwordPolicy.requireUppercase ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Minuscules requises
                </label>
                <button
                  onClick={() => updatePasswordPolicy('requireLowercase', !settings.passwordPolicy.requireLowercase)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.passwordPolicy.requireLowercase ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.passwordPolicy.requireLowercase ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Chiffres requis
                </label>
                <button
                  onClick={() => updatePasswordPolicy('requireNumbers', !settings.passwordPolicy.requireNumbers)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.passwordPolicy.requireNumbers ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.passwordPolicy.requireNumbers ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Caractères spéciaux requis
                </label>
                <button
                  onClick={() => updatePasswordPolicy('requireSpecialChars', !settings.passwordPolicy.requireSpecialChars)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.passwordPolicy.requireSpecialChars ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.passwordPolicy.requireSpecialChars ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Expiration (jours)
              </label>
              <input
                type="number"
                value={settings.passwordPolicy.passwordExpireDays}
                onChange={(e) => updatePasswordPolicy('passwordExpireDays', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Sessions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ComputerDesktopIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gestion des sessions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sessions multiples autorisées
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre plusieurs connexions simultanées
                </p>
              </div>
              <button
                onClick={() => handleToggle('allowMultipleSessions')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.allowMultipleSessions ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.allowMultipleSessions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Historique des connexions
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enregistrer l'historique des connexions
                </p>
              </div>
              <button
                onClick={() => handleToggle('trackLoginHistory')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.trackLoginHistory ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.trackLoginHistory ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Permissions des rôles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <UserGroupIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Permissions des rôles
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assistant Plateforme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availablePermissions.slice(0, 6).map(permission => (
                  <label key={permission} className="flex items-center text-xs">
                    <input
                      type="checkbox"
                      checked={settings.rolePermissions['assistant-plateforme'].includes(permission)}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500 mr-2"
                      readOnly
                    />
                    {permission}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Admin Principal
              </h3>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Toutes les permissions sont accordées par défaut
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historique des connexions */}
      {settings.trackLoginHistory && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ClockIcon className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Historique des connexions récentes
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Adresse IP
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date/Heure
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {loginHistory.map((entry) => (
                  <tr key={entry.id}>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {entry.user}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {entry.ip}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {entry.date}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        entry.role === 'admin-principal'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : entry.role === 'assistant-plateforme'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {entry.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        entry.status === 'success'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {entry.status === 'success' ? 'Succès' : 'Échec'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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