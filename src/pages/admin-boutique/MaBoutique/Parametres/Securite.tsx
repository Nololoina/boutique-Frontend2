import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button';
import {
  ShieldCheckIcon,
  KeyIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  EyeIcon,
  EyeSlashIcon,
  DevicePhoneMobileIcon,
  LockClosedIcon,
  FingerPrintIcon,
  GlobeAltIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface SecuritySettings {
  // Authentification
  motDePasseActuel: string;
  nouveauMotDePasse: string;
  confirmerMotDePasse: string;
  
  // Double authentification
  doubleAuth: {
    active: boolean;
    methode: 'email' | 'sms' | 'app';
    numeroTelephone: string;
    emailSecurite: string;
    codeSecret?: string;
  };
  
  // Sessions
  sessionSettings: {
    dureeSession: number; // en minutes
    deconnexionAuto: boolean;
    sessionsMultiples: boolean;
    notifierNouvelleSession: boolean;
  };
  
  // Restrictions d'accès
  restrictionsAcces: {
    restrictionIP: boolean;
    adressesIPAutorisees: string[];
    restrictionHoraire: boolean;
    heureDebut: string;
    heureFin: string;
    joursAutorises: string[];
  };
  
  // Historique et logs
  historiqueConnexions: boolean;
  alertesTentativesEchouees: boolean;
  nombreTentativesMax: number;
  dureeBloquage: number; // en minutes
  
  // Sauvegarde et récupération
  sauvegardeAuto: {
    active: boolean;
    frequence: 'quotidien' | 'hebdomadaire' | 'mensuel';
    conservation: number; // en jours
  };
  
  // Permissions vendeurs
  permissionsVendeurs: {
    modifierProduits: boolean;
    voirCommandes: boolean;
    accederCRM: boolean;
    gererStock: boolean;
    voirStatistiques: boolean;
    modifierPrix: boolean;
  };
}

interface SessionActive {
  id: string;
  utilisateur: string;
  ip: string;
  navigateur: string;
  dateConnexion: string;
  derniereActivite: string;
  localisation: string;
  actuelle: boolean;
}

interface TentativeConnexion {
  id: string;
  ip: string;
  email: string;
  date: string;
  statut: 'succes' | 'echec';
  localisation: string;
  navigateur: string;
}

export const Securite: React.FC = () => {
  const [settings, setSettings] = useState<SecuritySettings>({
    motDePasseActuel: '',
    nouveauMotDePasse: '',
    confirmerMotDePasse: '',
    doubleAuth: {
      active: false,
      methode: 'email',
      numeroTelephone: '+261 32 12 345 67',
      emailSecurite: 'admin@maboutique.mg'
    },
    sessionSettings: {
      dureeSession: 480, // 8 heures
      deconnexionAuto: true,
      sessionsMultiples: false,
      notifierNouvelleSession: true
    },
    restrictionsAcces: {
      restrictionIP: false,
      adressesIPAutorisees: [],
      restrictionHoraire: false,
      heureDebut: '08:00',
      heureFin: '18:00',
      joursAutorises: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']
    },
    historiqueConnexions: true,
    alertesTentativesEchouees: true,
    nombreTentativesMax: 5,
    dureeBloquage: 30,
    sauvegardeAuto: {
      active: true,
      frequence: 'quotidien',
      conservation: 30
    },
    permissionsVendeurs: {
      modifierProduits: true,
      voirCommandes: true,
      accederCRM: false,
      gererStock: true,
      voirStatistiques: false,
      modifierPrix: false
    }
  });

  const [showPassword, setShowPassword] = useState({
    actuel: false,
    nouveau: false,
    confirmer: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('password');
  const [newIP, setNewIP] = useState('');

  // Données simulées
  const sessionsActives: SessionActive[] = [
    {
      id: 'S001',
      utilisateur: 'Admin Boutique',
      ip: '192.168.1.100',
      navigateur: 'Chrome 120.0',
      dateConnexion: '2024-12-20 14:30',
      derniereActivite: '2024-12-20 16:45',
      localisation: 'Antananarivo, Madagascar',
      actuelle: true
    },
    {
      id: 'S002',
      utilisateur: 'Vendeur Paul',
      ip: '192.168.1.101',
      navigateur: 'Firefox 121.0',
      dateConnexion: '2024-12-20 09:15',
      derniereActivite: '2024-12-20 16:30',
      localisation: 'Antananarivo, Madagascar',
      actuelle: false
    }
  ];

  const tentativesConnexion: TentativeConnexion[] = [
    {
      id: 'T001',
      ip: '192.168.1.100',
      email: 'admin@maboutique.mg',
      date: '2024-12-20 16:45',
      statut: 'succes',
      localisation: 'Antananarivo, Madagascar',
      navigateur: 'Chrome 120.0'
    },
    {
      id: 'T002',
      ip: '203.45.67.89',
      email: 'admin@maboutique.mg',
      date: '2024-12-20 15:20',
      statut: 'echec',
      localisation: 'Localisation inconnue',
      navigateur: 'Unknown'
    },
    {
      id: 'T003',
      ip: '192.168.1.101',
      email: 'vendeur@maboutique.mg',
      date: '2024-12-20 09:15',
      statut: 'succes',
      localisation: 'Antananarivo, Madagascar',
      navigateur: 'Firefox 121.0'
    }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres de sécurité sauvegardés avec succès !');
  };

  const handlePasswordChange = async () => {
    if (!settings.motDePasseActuel || !settings.nouveauMotDePasse) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (settings.nouveauMotDePasse !== settings.confirmerMotDePasse) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    
    if (settings.nouveauMotDePasse.length < 8) {
      alert('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    setSettings(prev => ({
      ...prev,
      motDePasseActuel: '',
      nouveauMotDePasse: '',
      confirmerMotDePasse: ''
    }));
    
    alert('Mot de passe modifié avec succès !');
  };

  const handleToggle = (section: string, field: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: !prev[section as keyof typeof prev][field as keyof any]
      }
    }));
  };

  const handleSimpleToggle = (field: keyof SecuritySettings) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const addIPAddress = () => {
    if (newIP && /^(\d{1,3}\.){3}\d{1,3}$/.test(newIP)) {
      setSettings(prev => ({
        ...prev,
        restrictionsAcces: {
          ...prev.restrictionsAcces,
          adressesIPAutorisees: [...prev.restrictionsAcces.adressesIPAutorisees, newIP]
        }
      }));
      setNewIP('');
    } else {
      alert('Format d\'adresse IP invalide');
    }
  };

  const removeIPAddress = (index: number) => {
    setSettings(prev => ({
      ...prev,
      restrictionsAcces: {
        ...prev.restrictionsAcces,
        adressesIPAutorisees: prev.restrictionsAcces.adressesIPAutorisees.filter((_, i) => i !== index)
      }
    }));
  };

  const toggleJourAutorise = (jour: string) => {
    setSettings(prev => ({
      ...prev,
      restrictionsAcces: {
        ...prev.restrictionsAcces,
        joursAutorises: prev.restrictionsAcces.joursAutorises.includes(jour)
          ? prev.restrictionsAcces.joursAutorises.filter(j => j !== jour)
          : [...prev.restrictionsAcces.joursAutorises, jour]
      }
    }));
  };

  const deconnecterSession = (sessionId: string) => {
    if (confirm('Êtes-vous sûr de vouloir déconnecter cette session ?')) {
      alert(`Session ${sessionId} déconnectée`);
    }
  };

  const renderPasswordTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Changement de mot de passe */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <KeyIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Changer le mot de passe
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe actuel *
              </label>
              <div className="relative">
                <input
                  type={showPassword.actuel ? 'text' : 'password'}
                  value={settings.motDePasseActuel}
                  onChange={(e) => setSettings(prev => ({ ...prev, motDePasseActuel: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, actuel: !prev.actuel }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword.actuel ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPassword.nouveau ? 'text' : 'password'}
                  value={settings.nouveauMotDePasse}
                  onChange={(e) => setSettings(prev => ({ ...prev, nouveauMotDePasse: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, nouveau: !prev.nouveau }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword.nouveau ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirmer le nouveau mot de passe *
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirmer ? 'text' : 'password'}
                  value={settings.confirmerMotDePasse}
                  onChange={(e) => setSettings(prev => ({ ...prev, confirmerMotDePasse: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirmer: !prev.confirmer }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword.confirmer ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                Critères de sécurité du mot de passe
              </h4>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Au moins 8 caractères</li>
                <li>• Au moins une majuscule</li>
                <li>• Au moins une minuscule</li>
                <li>• Au moins un chiffre</li>
                <li>• Au moins un caractère spécial</li>
              </ul>
            </div>

            <Button
              variant="primary"
              onClick={handlePasswordChange}
              isLoading={isLoading}
              className="w-full"
            >
              Changer le mot de passe
            </Button>
          </div>
        </div>

        {/* Double authentification */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <FingerPrintIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Double authentification (2FA)
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Activer la double authentification
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Sécurité renforcée pour votre compte
                </p>
              </div>
              <button
                onClick={() => handleToggle('doubleAuth', 'active')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.doubleAuth.active ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.doubleAuth.active ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.doubleAuth.active && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Méthode de vérification
                  </label>
                  <select
                    value={settings.doubleAuth.methode}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      doubleAuth: { ...prev.doubleAuth, methode: e.target.value as 'email' | 'sms' | 'app' }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="app">Application d'authentification</option>
                  </select>
                </div>

                {settings.doubleAuth.methode === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email de sécurité
                    </label>
                    <input
                      type="email"
                      value={settings.doubleAuth.emailSecurite}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        doubleAuth: { ...prev.doubleAuth, emailSecurite: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                {settings.doubleAuth.methode === 'sms' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      value={settings.doubleAuth.numeroTelephone}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        doubleAuth: { ...prev.doubleAuth, numeroTelephone: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                )}

                {settings.doubleAuth.methode === 'app' && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-2">
                      Scannez ce QR code avec votre application d'authentification
                    </p>
                    <div className="w-32 h-32 bg-white border-2 border-emerald-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">QR Code</span>
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                      Code secret: ABCD-EFGH-IJKL-MNOP
                    </p>
                  </div>
                )}

                <Button variant="outline" size="sm" className="w-full">
                  Tester la double authentification
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSessionsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paramètres de session */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ComputerDesktopIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gestion des sessions
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée de session (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionSettings.dureeSession}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  sessionSettings: { ...prev.sessionSettings, dureeSession: parseInt(e.target.value) }
                }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Déconnexion automatique
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Déconnexion après inactivité
                </p>
              </div>
              <button
                onClick={() => handleToggle('sessionSettings', 'deconnexionAuto')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.sessionSettings.deconnexionAuto ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.sessionSettings.deconnexionAuto ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sessions multiples
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Autoriser plusieurs connexions simultanées
                </p>
              </div>
              <button
                onClick={() => handleToggle('sessionSettings', 'sessionsMultiples')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.sessionSettings.sessionsMultiples ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.sessionSettings.sessionsMultiples ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Notifier nouvelle session
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Alerte lors d'une nouvelle connexion
                </p>
              </div>
              <button
                onClick={() => handleToggle('sessionSettings', 'notifierNouvelleSession')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.sessionSettings.notifierNouvelleSession ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.sessionSettings.notifierNouvelleSession ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Restrictions d'accès */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <LockClosedIcon className="h-5 w-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Restrictions d'accès
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Restriction par IP
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Limiter l'accès à certaines adresses IP
                </p>
              </div>
              <button
                onClick={() => handleToggle('restrictionsAcces', 'restrictionIP')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.restrictionsAcces.restrictionIP ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.restrictionsAcces.restrictionIP ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.restrictionsAcces.restrictionIP && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresses IP autorisées
                </label>
                <div className="space-y-2">
                  {settings.restrictionsAcces.adressesIPAutorisees.map((ip, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-900 dark:text-white">
                        {ip}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeIPAddress(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newIP}
                      onChange={(e) => setNewIP(e.target.value)}
                      placeholder="192.168.1.100"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <Button variant="outline" size="sm" onClick={addIPAddress}>
                      Ajouter
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Restriction horaire
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Limiter l'accès à certaines heures
                </p>
              </div>
              <button
                onClick={() => handleToggle('restrictionsAcces', 'restrictionHoraire')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.restrictionsAcces.restrictionHoraire ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.restrictionsAcces.restrictionHoraire ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.restrictionsAcces.restrictionHoraire && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Heure de début
                    </label>
                    <input
                      type="time"
                      value={settings.restrictionsAcces.heureDebut}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        restrictionsAcces: { ...prev.restrictionsAcces, heureDebut: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Heure de fin
                    </label>
                    <input
                      type="time"
                      value={settings.restrictionsAcces.heureFin}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        restrictionsAcces: { ...prev.restrictionsAcces, heureFin: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Jours autorisés
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'].map(jour => (
                      <button
                        key={jour}
                        onClick={() => toggleJourAutorise(jour)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          settings.restrictionsAcces.joursAutorises.includes(jour)
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {jour.charAt(0).toUpperCase() + jour.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sessions actives */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Sessions actives
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  IP / Localisation
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Navigateur
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dernière activité
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sessionsActives.map((session) => (
                <tr key={session.id} className={session.actuelle ? 'bg-blue-50 dark:bg-blue-900/20' : ''}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 dark:text-white">
                        {session.utilisateur}
                      </span>
                      {session.actuelle && (
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          Session actuelle
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">{session.ip}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{session.localisation}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {session.navigateur}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {session.derniereActivite}
                  </td>
                  <td className="px-4 py-4">
                    {!session.actuelle && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deconnecterSession(session.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Déconnecter
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistoriqueTab = () => (
    <div className="space-y-6">
      {/* Paramètres de sécurité */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sécurité des connexions
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tentatives de connexion max
              </label>
              <input
                type="number"
                value={settings.nombreTentativesMax}
                onChange={(e) => setSettings(prev => ({ ...prev, nombreTentativesMax: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Durée de blocage (minutes)
              </label>
              <input
                type="number"
                value={settings.dureeBloquage}
                onChange={(e) => setSettings(prev => ({ ...prev, dureeBloquage: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Historique des connexions
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enregistrer toutes les connexions
                </p>
              </div>
              <button
                onClick={() => handleSimpleToggle('historiqueConnexions')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.historiqueConnexions ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.historiqueConnexions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Alertes tentatives échouées
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Notifier les tentatives suspectes
                </p>
              </div>
              <button
                onClick={() => handleSimpleToggle('alertesTentativesEchouees')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.alertesTentativesEchouees ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.alertesTentativesEchouees ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Permissions vendeurs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <UserGroupIcon className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Permissions par défaut des vendeurs
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(settings.permissionsVendeurs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  {key === 'modifierProduits' && 'Modifier les produits'}
                  {key === 'voirCommandes' && 'Voir les commandes'}
                  {key === 'accederCRM' && 'Accéder au CRM'}
                  {key === 'gererStock' && 'Gérer le stock'}
                  {key === 'voirStatistiques' && 'Voir les statistiques'}
                  {key === 'modifierPrix' && 'Modifier les prix'}
                </label>
                <button
                  onClick={() => handleToggle('permissionsVendeurs', key)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    value ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
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
        </div>
      </div>

      {/* Historique des connexions */}
      {settings.historiqueConnexions && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Historique des tentatives de connexion
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    IP / Localisation
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date/Heure
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Navigateur
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {tentativesConnexion.map((tentative) => (
                  <tr key={tentative.id}>
                    <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                      {tentative.email}
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">{tentative.ip}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{tentative.localisation}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {tentative.date}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        tentative.statut === 'succes'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {tentative.statut === 'succes' ? 'Succès' : 'Échec'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {tentative.navigateur}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'password', name: 'Mot de passe & 2FA', icon: KeyIcon },
    { id: 'sessions', name: 'Sessions & Accès', icon: ComputerDesktopIcon },
    { id: 'historique', name: 'Historique & Permissions', icon: DocumentTextIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres de Sécurité
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sécurisez votre boutique et gérez les accès
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'password' && renderPasswordTab()}
      {activeTab === 'sessions' && renderSessionsTab()}
      {activeTab === 'historique' && renderHistoriqueTab()}

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