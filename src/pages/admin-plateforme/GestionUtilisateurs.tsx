import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PowerIcon,
  DocumentArrowDownIcon,
  UserIcon,
  KeyIcon,
  ShieldCheckIcon,
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';

interface UtilisateurAssistant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'assistant' | 'moderateur' | 'support';
  statut: 'actif' | 'inactif';
  dateCreation: string;
  derniereActivite: string;
  droitsAcces: string[];
}

const mockUtilisateurs: UtilisateurAssistant[] = [
  {
    id: 'U001',
    nom: 'Rakoto',
    prenom: 'Paul',
    email: 'paul.rakoto@plateforme.mg',
    role: 'assistant',
    statut: 'actif',
    dateCreation: '2024-01-10',
    derniereActivite: '2024-12-20',
    droitsAcces: ['gestion-boutiques', 'moderation']
  },
  {
    id: 'U002',
    nom: 'Andry',
    prenom: 'Sophie',
    email: 'sophie.andry@plateforme.mg',
    role: 'moderateur',
    statut: 'actif',
    dateCreation: '2024-02-15',
    derniereActivite: '2024-12-19',
    droitsAcces: ['moderation', 'support']
  },
  {
    id: 'U003',
    nom: 'Rabe',
    prenom: 'Marie',
    email: 'marie.rabe@plateforme.mg',
    role: 'support',
    statut: 'inactif',
    dateCreation: '2024-03-20',
    derniereActivite: '2024-12-15',
    droitsAcces: ['support']
  }
];

export const GestionUtilisateurs: React.FC = () => {
  const [utilisateurs, setUtilisateurs] = useState<UtilisateurAssistant[]>(mockUtilisateurs);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('tous');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [selectedUser, setSelectedUser] = useState<UtilisateurAssistant | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'activate' | 'deactivate' | 'reset-password' | 'add'>('view');
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    role: 'assistant' as const,
    motDePasse: '',
    droitsAcces: [] as string[]
  });

  const filteredUtilisateurs = utilisateurs.filter(user => {
    const matchesSearch = user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'tous' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'tous' || user.statut === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'actif':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'inactif':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return baseClasses;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (role) {
      case 'assistant':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'moderateur':
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
      case 'support':
        return `${baseClasses} bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200`;
      default:
        return baseClasses;
    }
  };

  const handleAction = (user: UtilisateurAssistant | null, action: typeof modalType) => {
    setSelectedUser(user);
    setModalType(action);
    if (action === 'edit' && user) {
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        motDePasse: '',
        droitsAcces: user.droitsAcces
      });
    } else if (action === 'add') {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        role: 'assistant',
        motDePasse: '',
        droitsAcces: []
      });
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedUser && modalType !== 'add') return;

    switch (modalType) {
      case 'activate':
        setUtilisateurs(prev => prev.map(u => 
          u.id === selectedUser!.id ? { ...u, statut: 'actif' as const } : u
        ));
        break;
      case 'deactivate':
        setUtilisateurs(prev => prev.map(u => 
          u.id === selectedUser!.id ? { ...u, statut: 'inactif' as const } : u
        ));
        break;
      case 'delete':
        setUtilisateurs(prev => prev.filter(u => u.id !== selectedUser!.id));
        break;
      case 'reset-password':
        // Simulation de réinitialisation
        alert('Nouveau mot de passe généré et envoyé par email');
        break;
      case 'add':
        const newUser: UtilisateurAssistant = {
          id: `U${String(utilisateurs.length + 1).padStart(3, '0')}`,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          role: formData.role,
          statut: 'actif',
          dateCreation: new Date().toISOString().split('T')[0],
          derniereActivite: new Date().toISOString().split('T')[0],
          droitsAcces: formData.droitsAcces
        };
        setUtilisateurs(prev => [...prev, newUser]);
        break;
      case 'edit':
        setUtilisateurs(prev => prev.map(u => 
          u.id === selectedUser!.id ? {
            ...u,
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            role: formData.role,
            droitsAcces: formData.droitsAcces
          } : u
        ));
        break;
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  const stats = {
    total: utilisateurs.length,
    actifs: utilisateurs.filter(u => u.statut === 'actif').length,
    assistants: utilisateurs.filter(u => u.role === 'assistant').length,
    moderateurs: utilisateurs.filter(u => u.role === 'moderateur').length,
    support: utilisateurs.filter(u => u.role === 'support').length
  };

  const droitsDisponibles = [
    'gestion-boutiques',
    'gestion-utilisateurs',
    'moderation',
    'support',
    'publicites',
    'parametres'
  ];

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && selectedUser && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails de l'utilisateur
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom complet
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.prenom} {selectedUser.nom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Rôle
                      </label>
                      <span className={getRoleBadge(selectedUser.role)}>
                        {selectedUser.role}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Statut
                      </label>
                      <span className={getStatusBadge(selectedUser.statut)}>
                        {selectedUser.statut}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Droits d'accès
                    </label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedUser.droitsAcces.map(droit => (
                        <span key={droit} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {droit}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date de création
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedUser.dateCreation).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dernière activité
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedUser.derniereActivite).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(modalType === 'add' || modalType === 'edit') && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modalType === 'add' ? 'Ajouter un utilisateur' : 'Modifier l\'utilisateur'}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rôle *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="assistant">Assistant</option>
                      <option value="moderateur">Modérateur</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  {modalType === 'add' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mot de passe *
                      </label>
                      <input
                        type="password"
                        value={formData.motDePasse}
                        onChange={(e) => setFormData({...formData, motDePasse: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Droits d'accès
                    </label>
                    <div className="space-y-2">
                      {droitsDisponibles.map(droit => (
                        <label key={droit} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.droitsAcces.includes(droit)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({...formData, droitsAcces: [...formData.droitsAcces, droit]});
                              } else {
                                setFormData({...formData, droitsAcces: formData.droitsAcces.filter(d => d !== droit)});
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{droit}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {(modalType === 'activate' || modalType === 'deactivate') && selectedUser && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Confirmation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Êtes-vous sûr de vouloir {modalType === 'activate' ? 'activer' : 'désactiver'} le compte de "{selectedUser.prenom} {selectedUser.nom}" ?
                </p>
              </>
            )}

            {modalType === 'reset-password' && selectedUser && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Réinitialisation du mot de passe
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Un nouveau mot de passe sera généré et envoyé à l'adresse email de "{selectedUser.prenom} {selectedUser.nom}".
                </p>
              </>
            )}

            {modalType === 'delete' && selectedUser && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Suppression définitive
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      Cette action est irréversible. L'utilisateur "{selectedUser.prenom} {selectedUser.nom}" sera définitivement supprimé.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </Button>
              {modalType !== 'view' && (
                <Button
                  variant={modalType === 'delete' ? 'danger' : 'primary'}
                  onClick={confirmAction}
                >
                  {modalType === 'add' ? 'Ajouter' : 'Confirmer'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestion des Utilisateurs Assistants
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez les assistants, modérateurs et équipe support
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + 
                "ID,Nom,Prenom,Email,Role,Statut,Date Creation\n" +
                utilisateurs.map(u => `${u.id},${u.nom},${u.prenom},${u.email},${u.role},${u.statut},${u.dateCreation}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "utilisateurs_export.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleAction(null, 'add')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nouvel utilisateur
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total utilisateurs
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Actifs
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.actifs}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Assistants
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.assistants}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Modérateurs
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.moderateurs}
              </p>
            </div>
            <ShieldCheckIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Support
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {stats.support}
              </p>
            </div>
            <UserIcon className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Recherche et filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les rôles</option>
              <option value="assistant">Assistant</option>
              <option value="moderateur">Modérateur</option>
              <option value="support">Support</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dernière activité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUtilisateurs.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.prenom} {user.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {user.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getRoleBadge(user.role)}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(user.statut)}>
                      {user.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.derniereActivite).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(user, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(user, 'edit')}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(user, 'reset-password')}
                        className="text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                        title="Réinitialiser mot de passe"
                      >
                        <KeyIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(user, user.statut === 'actif' ? 'deactivate' : 'activate')}
                        className={`${user.statut === 'actif' 
                          ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                          : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={user.statut === 'actif' ? 'Désactiver' : 'Activer'}
                      >
                        <PowerIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(user, 'delete')}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Supprimer"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Journal d'activités */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Journal d'activités récentes
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Assistant Paul Rakoto a validé la boutique "Épicerie Moderne"
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 1 heure
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Modérateur Sophie Andry a modéré un contenu signalé
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 3 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Nouvel utilisateur support Marie Rabe ajouté
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hier à 16:45
              </p>
            </div>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};