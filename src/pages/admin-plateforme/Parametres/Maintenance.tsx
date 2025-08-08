import React, { useState } from 'react';
import { Button } from '../../../components/common/Button';
import {
  WrenchScrewdriverIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowPathIcon,
  TrashIcon,
  DocumentArrowDownIcon,
  ServerIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export const Maintenance: React.FC = () => {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    maintenanceMessage: 'La plateforme est actuellement en maintenance. Nous serons de retour bientôt.',
    scheduledMaintenance: {
      enabled: false,
      date: '',
      time: '',
      duration: 2,
      notifyUsers: true
    },
    autoBackup: {
      enabled: true,
      frequency: 'daily',
      retentionDays: 30,
      lastBackup: '2024-12-20 02:00:00'
    },
    systemInfo: {
      version: '3.0.1',
      lastUpdate: '2024-12-15',
      uptime: '15 jours, 8 heures',
      diskUsage: '45%',
      memoryUsage: '62%'
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres de maintenance sauvegardés avec succès !');
  };

  const handleToggle = (field: string) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleScheduledMaintenanceToggle = (field: string) => {
    setSettings(prev => ({
      ...prev,
      scheduledMaintenance: {
        ...prev.scheduledMaintenance,
        [field]: !prev.scheduledMaintenance[field as keyof typeof prev.scheduledMaintenance]
      }
    }));
  };

  const handleAutoBackupToggle = (field: string) => {
    setSettings(prev => ({
      ...prev,
      autoBackup: {
        ...prev.autoBackup,
        [field]: !prev.autoBackup[field as keyof typeof prev.autoBackup]
      }
    }));
  };

  const handleManualBackup = async () => {
    setBackupInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setBackupInProgress(false);
    setSettings(prev => ({
      ...prev,
      autoBackup: {
        ...prev.autoBackup,
        lastBackup: new Date().toLocaleString('fr-FR')
      }
    }));
    alert('Sauvegarde manuelle terminée avec succès !');
  };

  const handleClearLogs = async () => {
    if (confirm('Êtes-vous sûr de vouloir vider tous les logs ? Cette action est irréversible.')) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      alert('Logs vidés avec succès !');
    }
  };

  const handleClearCache = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Cache vidé avec succès !');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres de Maintenance
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestion de la maintenance et des sauvegardes système
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mode maintenance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <WrenchScrewdriverIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Mode maintenance
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activer le mode maintenance
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Bloquer l'accès aux utilisateurs
                </p>
              </div>
              <button
                onClick={() => handleToggle('maintenanceMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.maintenanceMode ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.maintenanceMode && (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <ExclamationTriangleIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                    Mode maintenance activé
                  </span>
                </div>
                <p className="text-xs text-orange-700 dark:text-orange-300">
                  Seuls les administrateurs peuvent accéder à la plateforme
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message affiché aux utilisateurs
              </label>
              <textarea
                value={settings.maintenanceMessage}
                onChange={(e) => setSettings(prev => ({ ...prev, maintenanceMessage: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Maintenance programmée */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ClockIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Maintenance programmée
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Programmer une maintenance
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Planifier une maintenance automatique
                </p>
              </div>
              <button
                onClick={() => handleScheduledMaintenanceToggle('enabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.scheduledMaintenance.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.scheduledMaintenance.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.scheduledMaintenance.enabled && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={settings.scheduledMaintenance.date}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        scheduledMaintenance: { ...prev.scheduledMaintenance, date: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Heure
                    </label>
                    <input
                      type="time"
                      value={settings.scheduledMaintenance.time}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        scheduledMaintenance: { ...prev.scheduledMaintenance, time: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Durée estimée (heures)
                  </label>
                  <input
                    type="number"
                    value={settings.scheduledMaintenance.duration}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      scheduledMaintenance: { ...prev.scheduledMaintenance, duration: parseInt(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Notifier les utilisateurs
                  </label>
                  <button
                    onClick={() => handleScheduledMaintenanceToggle('notifyUsers')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.scheduledMaintenance.notifyUsers ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.scheduledMaintenance.notifyUsers ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sauvegardes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ArrowPathIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sauvegardes
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sauvegarde automatique
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sauvegarder automatiquement la base de données
                </p>
              </div>
              <button
                onClick={() => handleAutoBackupToggle('enabled')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoBackup.enabled ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoBackup.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.autoBackup.enabled && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Fréquence
                  </label>
                  <select
                    value={settings.autoBackup.frequency}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      autoBackup: { ...prev.autoBackup, frequency: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rétention (jours)
                  </label>
                  <input
                    type="number"
                    value={settings.autoBackup.retentionDays}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      autoBackup: { ...prev.autoBackup, retentionDays: parseInt(e.target.value) }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg">
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Dernière sauvegarde : {settings.autoBackup.lastBackup}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              onClick={handleManualBackup}
              isLoading={backupInProgress}
              className="w-full"
            >
              <ArrowPathIcon className="h-4 w-4 mr-2" />
              Sauvegarde manuelle
            </Button>
          </div>
        </div>

        {/* Informations système */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ServerIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Informations système
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-gray-500 dark:text-gray-400">Version</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {settings.systemInfo.version}
                </p>
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400">Dernière mise à jour</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {settings.systemInfo.lastUpdate}
                </p>
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400">Temps de fonctionnement</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {settings.systemInfo.uptime}
                </p>
              </div>

              <div>
                <label className="text-gray-500 dark:text-gray-400">Utilisation disque</label>
                <p className="font-medium text-gray-900 dark:text-white">
                  {settings.systemInfo.diskUsage}
                </p>
              </div>
            </div>

            <div>
              <label className="text-gray-500 dark:text-gray-400 text-sm">Utilisation mémoire</label>
              <div className="mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: settings.systemInfo.memoryUsage }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {settings.systemInfo.memoryUsage}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions de nettoyage */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <TrashIcon className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Nettoyage système
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={handleClearCache}
            isLoading={isLoading}
            className="flex items-center justify-center"
          >
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Vider le cache
          </Button>

          <Button
            variant="outline"
            onClick={handleClearLogs}
            isLoading={isLoading}
            className="flex items-center justify-center text-orange-600 border-orange-300 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-orange-900/20"
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Vider les logs
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              if (confirm('Êtes-vous sûr de vouloir effectuer une réinitialisation partielle ? Cette action peut affecter certaines données.')) {
                alert('Réinitialisation partielle en cours...');
                setTimeout(() => {
                  alert('Réinitialisation partielle terminée avec succès !');
                }, 3000);
              }
            }}
            className="flex items-center justify-center text-red-600 border-red-300 hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
          >
            <ShieldCheckIcon className="h-4 w-4 mr-2" />
            Réinitialisation partielle
          </Button>
        </div>

        <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300">
              Attention : Ces actions peuvent affecter les performances et supprimer des données importantes.
            </p>
          </div>
        </div>
      </div>

      {/* Journal de mise à jour */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <DocumentArrowDownIcon className="h-5 w-5 text-indigo-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Journal des mises à jour
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Version 3.0.1 - Correctifs de sécurité
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                15 décembre 2024
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Version 3.0.0 - Lancement de la plateforme
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                1 décembre 2024
              </p>
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