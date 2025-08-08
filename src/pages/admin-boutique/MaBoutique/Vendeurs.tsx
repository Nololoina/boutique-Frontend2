import React, { useState } from 'react';
import {
  UserGroupIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PowerIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CalendarIcon,
  ChartBarIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/common/Button';
import { formatMGA } from '../../../utils/formatMoney';

interface Vendeur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  photo?: string;
  role: 'vendeur-simple' | 'responsable-produits' | 'preparateur-commandes' | 'admin-delegue';
  statut: 'actif' | 'suspendu' | 'inactif';
  dateCreation: string;
  derniereConnexion: string;
  zoneGeographique?: string;
  permissions: string[];
  statistiques: {
    produitsAjoutes: number;
    commandesTraitees: number;
    ventesGenerees: number;
    tauxRetour: number;
    notesSatisfaction: number;
  };
  commissions: {
    tauxCommission: number;
    totalGagne: number;
    dernierPaiement: string;
  };
  activites: {
    id: string;
    action: string;
    date: string;
    details: string;
  }[];
}

interface RolePermissions {
  [key: string]: {
    nom: string;
    description: string;
    permissions: string[];
    couleur: string;
  };
}

const rolesDisponibles: RolePermissions = {
  'vendeur-simple': {
    nom: 'Vendeur Simple',
    description: 'Accès limité aux produits et commandes',
    permissions: ['voir-produits', 'modifier-ses-produits', 'voir-ses-commandes'],
    couleur: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  },
  'responsable-produits': {
    nom: 'Responsable Produits',
    description: 'Gestion complète du catalogue produits',
    permissions: ['voir-produits', 'modifier-produits', 'ajouter-produits', 'supprimer-produits', 'gerer-stock'],
    couleur: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
  },
  'preparateur-commandes': {
    nom: 'Préparateur Commandes',
    description: 'Traitement et préparation des commandes',
    permissions: ['voir-commandes', 'traiter-commandes', 'modifier-statut-commandes', 'imprimer-etiquettes'],
    couleur: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  },
  'admin-delegue': {
    nom: 'Admin Délégué',
    description: 'Accès quasi-complet sauf suppression boutique',
    permissions: ['tous-droits-sauf-suppression'],
    couleur: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
  }
};

const permissionsDisponibles = [
  'voir-produits',
  'modifier-produits',
  'ajouter-produits',
  'supprimer-produits',
  'gerer-stock',
  'voir-commandes',
  'traiter-commandes',
  'modifier-statut-commandes',
  'acceder-crm',
  'voir-statistiques',
  'gerer-promotions',
  'modifier-prix',
  'imprimer-etiquettes',
  'contacter-clients',
  'voir-paiements'
];

const mockVendeurs: Vendeur[] = [
  {
    id: 'V001',
    nom: 'Rakoto',
    prenom: 'Paul',
    email: 'paul.rakoto@maboutique.mg',
    telephone: '+261 32 12 345 67',
    role: 'responsable-produits',
    statut: 'actif',
    dateCreation: '2024-01-15',
    derniereConnexion: '2024-12-20 16:30',
    zoneGeographique: 'Antananarivo',
    permissions: ['voir-produits', 'modifier-produits', 'ajouter-produits', 'gerer-stock'],
    statistiques: {
      produitsAjoutes: 45,
      commandesTraitees: 123,
      ventesGenerees: 2450000,
      tauxRetour: 2.1,
      notesSatisfaction: 4.7
    },
    commissions: {
      tauxCommission: 3,
      totalGagne: 73500,
      dernierPaiement: '2024-12-15'
    },
    activites: [
      {
        id: 'A001',
        action: 'Produit ajouté',
        date: '2024-12-20 15:30',
        details: 'Smartphone XYZ ajouté au catalogue'
      },
      {
        id: 'A002',
        action: 'Stock mis à jour',
        date: '2024-12-20 14:15',
        details: 'Stock Robe élégante: +20 unités'
      }
    ]
  },
  {
    id: 'V002',
    nom: 'Andry',
    prenom: 'Marie',
    email: 'marie.andry@maboutique.mg',
    telephone: '+261 33 98 765 43',
    role: 'preparateur-commandes',
    statut: 'actif',
    dateCreation: '2024-02-20',
    derniereConnexion: '2024-12-20 12:45',
    permissions: ['voir-commandes', 'traiter-commandes', 'modifier-statut-commandes'],
    statistiques: {
      produitsAjoutes: 0,
      commandesTraitees: 89,
      ventesGenerees: 0,
      tauxRetour: 1.5,
      notesSatisfaction: 4.9
    },
    commissions: {
      tauxCommission: 1,
      totalGagne: 24500,
      dernierPaiement: '2024-12-15'
    },
    activites: [
      {
        id: 'A003',
        action: 'Commande traitée',
        date: '2024-12-20 12:30',
        details: 'Commande CMD-001 expédiée'
      }
    ]
  },
  {
    id: 'V003',
    nom: 'Rabe',
    prenom: 'Sophie',
    email: 'sophie.rabe@maboutique.mg',
    telephone: '+261 34 55 666 77',
    role: 'vendeur-simple',
    statut: 'suspendu',
    dateCreation: '2024-03-10',
    derniereConnexion: '2024-12-18 09:20',
    permissions: ['voir-produits', 'modifier-ses-produits'],
    statistiques: {
      produitsAjoutes: 12,
      commandesTraitees: 34,
      ventesGenerees: 890000,
      tauxRetour: 3.2,
      notesSatisfaction: 4.2
    },
    commissions: {
      tauxCommission: 2,
      totalGagne: 17800,
      dernierPaiement: '2024-11-30'
    },
    activites: []
  }
];

export const Vendeurs: React.FC = () => {
  const [vendeurs, setVendeurs] = useState<Vendeur[]>(mockVendeurs);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('tous');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [selectedVendeur, setSelectedVendeur] = useState<Vendeur | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'add' | 'permissions' | 'suspend' | 'activate' | 'reset-password' | 'message'>('view');
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: 'vendeur-simple' as const,
    zoneGeographique: '',
    permissions: [] as string[],
    tauxCommission: 0,
    motDePasse: ''
  });
  const [messageContent, setMessageContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredVendeurs = vendeurs.filter(vendeur => {
    const matchesSearch = vendeur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendeur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendeur.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'tous' || vendeur.role === roleFilter;
    const matchesStatus = statusFilter === 'tous' || vendeur.statut === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'actif':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'suspendu':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'inactif':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'suspendu':
        return <ClockIcon className="h-4 w-4" />;
      case 'inactif':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (vendeur: Vendeur | null, action: typeof modalType) => {
    setSelectedVendeur(vendeur);
    setModalType(action);
    
    if (action === 'add') {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        role: 'vendeur-simple',
        zoneGeographique: '',
        permissions: [],
        tauxCommission: 0,
        motDePasse: ''
      });
    } else if (action === 'edit' && vendeur) {
      setFormData({
        nom: vendeur.nom,
        prenom: vendeur.prenom,
        email: vendeur.email,
        telephone: vendeur.telephone,
        role: vendeur.role,
        zoneGeographique: vendeur.zoneGeographique || '',
        permissions: vendeur.permissions,
        tauxCommission: vendeur.commissions.tauxCommission,
        motDePasse: ''
      });
    } else if (action === 'permissions' && vendeur) {
      setFormData(prev => ({ ...prev, permissions: vendeur.permissions }));
    } else if (action === 'message') {
      setMessageContent('');
    }
    
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedVendeur && modalType !== 'add') return;

    switch (modalType) {
      case 'add':
        const newVendeur: Vendeur = {
          id: `V${String(vendeurs.length + 1).padStart(3, '0')}`,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          role: formData.role,
          statut: 'actif',
          dateCreation: new Date().toISOString().split('T')[0],
          derniereConnexion: 'Jamais',
          zoneGeographique: formData.zoneGeographique,
          permissions: rolesDisponibles[formData.role].permissions,
          statistiques: {
            produitsAjoutes: 0,
            commandesTraitees: 0,
            ventesGenerees: 0,
            tauxRetour: 0,
            notesSatisfaction: 0
          },
          commissions: {
            tauxCommission: formData.tauxCommission,
            totalGagne: 0,
            dernierPaiement: 'Aucun'
          },
          activites: []
        };
        setVendeurs(prev => [...prev, newVendeur]);
        alert(`Vendeur ${formData.prenom} ${formData.nom} ajouté avec succès !`);
        break;
        
      case 'edit':
        setVendeurs(prev => prev.map(v => 
          v.id === selectedVendeur!.id ? {
            ...v,
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            telephone: formData.telephone,
            role: formData.role,
            zoneGeographique: formData.zoneGeographique,
            permissions: formData.permissions,
            commissions: { ...v.commissions, tauxCommission: formData.tauxCommission }
          } : v
        ));
        break;
        
      case 'permissions':
        setVendeurs(prev => prev.map(v => 
          v.id === selectedVendeur!.id ? { ...v, permissions: formData.permissions } : v
        ));
        break;
        
      case 'suspend':
        setVendeurs(prev => prev.map(v => 
          v.id === selectedVendeur!.id ? { ...v, statut: 'suspendu' as const } : v
        ));
        break;
        
      case 'activate':
        setVendeurs(prev => prev.map(v => 
          v.id === selectedVendeur!.id ? { ...v, statut: 'actif' as const } : v
        ));
        break;
        
      case 'delete':
        setVendeurs(prev => prev.filter(v => v.id !== selectedVendeur!.id));
        break;
        
      case 'reset-password':
        alert(`Nouveau mot de passe généré et envoyé à ${selectedVendeur!.email}`);
        break;
        
      case 'message':
        if (messageContent.trim()) {
          alert(`Message envoyé à ${selectedVendeur!.prenom} ${selectedVendeur!.nom}`);
        }
        break;
    }
    
    setShowModal(false);
    setSelectedVendeur(null);
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const stats = {
    total: vendeurs.length,
    actifs: vendeurs.filter(v => v.statut === 'actif').length,
    suspendus: vendeurs.filter(v => v.statut === 'suspendu').length,
    totalVentes: vendeurs.reduce((sum, v) => sum + v.statistiques.ventesGenerees, 0),
    totalCommissions: vendeurs.reduce((sum, v) => sum + v.commissions.totalGagne, 0)
  };

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && selectedVendeur && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Profil de {selectedVendeur.prenom} {selectedVendeur.nom}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Informations personnelles
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedVendeur.prenom} {selectedVendeur.nom}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedVendeur.email}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedVendeur.telephone}
                          </span>
                        </div>
                        {selectedVendeur.zoneGeographique && (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Zone: </span>
                            <span className="text-sm text-gray-900 dark:text-white ml-1">
                              {selectedVendeur.zoneGeographique}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rôle et permissions
                      </h4>
                      <div className="space-y-2">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${rolesDisponibles[selectedVendeur.role].couleur}`}>
                          {rolesDisponibles[selectedVendeur.role].nom}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedVendeur.permissions.map(permission => (
                            <span key={permission} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              {permission}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Commissions
                      </h4>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Taux:</span>
                            <span className="ml-2 font-medium text-gray-900 dark:text-white">
                              {selectedVendeur.commissions.tauxCommission}%
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Total gagné:</span>
                            <span className="ml-2 font-medium text-green-600 dark:text-green-400">
                              {formatMGA(selectedVendeur.commissions.totalGagne)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Statistiques de performance
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {selectedVendeur.statistiques.produitsAjoutes}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Produits ajoutés</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {selectedVendeur.statistiques.commandesTraitees}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Commandes traitées</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {formatMGA(selectedVendeur.statistiques.ventesGenerees)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Ventes générées</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {selectedVendeur.statistiques.notesSatisfaction}/5
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Activités récentes
                      </h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {selectedVendeur.activites.length > 0 ? (
                          selectedVendeur.activites.map((activite) => (
                            <div key={activite.id} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm text-gray-900 dark:text-white">
                                  {activite.action}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {activite.details} - {activite.date}
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Aucune activité récente
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(modalType === 'add' || modalType === 'edit') && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modalType === 'add' ? 'Ajouter un vendeur' : 'Modifier le vendeur'}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
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
                        onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        value={formData.telephone}
                        onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rôle *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => {
                          const newRole = e.target.value as keyof typeof rolesDisponibles;
                          setFormData(prev => ({ 
                            ...prev, 
                            role: newRole,
                            permissions: rolesDisponibles[newRole].permissions
                          }));
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {Object.entries(rolesDisponibles).map(([key, role]) => (
                          <option key={key} value={key}>{role.nom}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Taux de commission (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.tauxCommission}
                        onChange={(e) => setFormData(prev => ({ ...prev, tauxCommission: parseFloat(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Zone géographique (optionnel)
                    </label>
                    <input
                      type="text"
                      value={formData.zoneGeographique}
                      onChange={(e) => setFormData(prev => ({ ...prev, zoneGeographique: e.target.value }))}
                      placeholder="Ex: Antananarivo, Fianarantsoa..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  {modalType === 'add' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Mot de passe temporaire *
                      </label>
                      <input
                        type="password"
                        value={formData.motDePasse}
                        onChange={(e) => setFormData(prev => ({ ...prev, motDePasse: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Le vendeur devra changer ce mot de passe à sa première connexion
                      </p>
                    </div>
                  )}

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Description du rôle: {rolesDisponibles[formData.role].nom}
                    </h5>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      {rolesDisponibles[formData.role].description}
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === 'permissions' && selectedVendeur && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Gérer les permissions de {selectedVendeur.prenom} {selectedVendeur.nom}
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Rôle actuel: <strong>{rolesDisponibles[selectedVendeur.role].nom}</strong>
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Permissions personnalisées
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {permissionsDisponibles.map(permission => (
                        <label key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission)}
                            onChange={() => togglePermission(permission)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {permission}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'message' && selectedVendeur && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Envoyer un message à {selectedVendeur.prenom} {selectedVendeur.nom}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      rows={6}
                      placeholder="Votre message..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Le message sera envoyé par email à {selectedVendeur.email}
                    </p>
                  </div>
                </div>
              </>
            )}

            {(modalType === 'suspend' || modalType === 'activate') && selectedVendeur && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modalType === 'suspend' ? 'Suspendre' : 'Activer'} le vendeur
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Êtes-vous sûr de vouloir {modalType === 'suspend' ? 'suspendre' : 'activer'} le compte de "{selectedVendeur.prenom} {selectedVendeur.nom}" ?
                </p>
                {modalType === 'suspend' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Le vendeur ne pourra plus se connecter à son compte jusqu'à réactivation.
                    </p>
                  </div>
                )}
              </>
            )}

            {modalType === 'delete' && selectedVendeur && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Supprimer le vendeur
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      Cette action supprimera définitivement le vendeur "{selectedVendeur.prenom} {selectedVendeur.nom}" 
                      et toutes ses données associées.
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === 'reset-password' && selectedVendeur && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Réinitialiser le mot de passe
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Un nouveau mot de passe temporaire sera généré et envoyé à l'adresse email de "{selectedVendeur.prenom} {selectedVendeur.nom}".
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Le vendeur devra changer ce mot de passe lors de sa prochaine connexion.
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                {modalType === 'view' ? 'Fermer' : 'Annuler'}
              </Button>
              {modalType !== 'view' && (
                <Button
                  variant={modalType === 'delete' ? 'danger' : 'primary'}
                  onClick={confirmAction}
                  disabled={modalType === 'message' && !messageContent.trim()}
                >
                  {modalType === 'add' ? 'Ajouter le vendeur' : 
                   modalType === 'edit' ? 'Sauvegarder' :
                   modalType === 'permissions' ? 'Mettre à jour' :
                   modalType === 'message' ? 'Envoyer' :
                   'Confirmer'}
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
            Gestion des Vendeurs
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez votre équipe de vendeurs et leurs permissions
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleAction(null, 'add')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Ajouter un vendeur
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total vendeurs
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-blue-500" />
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
                Suspendus
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.suspendus}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ventes totales
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatMGA(stats.totalVentes)}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Commissions
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatMGA(stats.totalCommissions)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-emerald-500" />
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
                placeholder="Rechercher par nom, email ou téléphone..."
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
              {Object.entries(rolesDisponibles).map(([key, role]) => (
                <option key={key} value={key}>{role.nom}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="suspendu">Suspendu</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des vendeurs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vendeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredVendeurs.map((vendeur) => (
                <tr key={vendeur.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {vendeur.prenom} {vendeur.nom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {vendeur.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {vendeur.email}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {vendeur.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${rolesDisponibles[vendeur.role].couleur}`}>
                      {rolesDisponibles[vendeur.role].nom}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(vendeur.statut)}>
                      {getStatusIcon(vendeur.statut)}
                      <span className="ml-1">{vendeur.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {vendeur.statistiques.commandesTraitees} commandes
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatMGA(vendeur.statistiques.ventesGenerees)} générées
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {vendeur.derniereConnexion}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(vendeur, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(vendeur, 'edit')}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(vendeur, 'permissions')}
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        title="Permissions"
                      >
                        <ShieldCheckIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(vendeur, 'message')}
                        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        title="Message"
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(vendeur, vendeur.statut === 'actif' ? 'suspend' : 'activate')}
                        className={`${vendeur.statut === 'actif' 
                          ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300' 
                          : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={vendeur.statut === 'actif' ? 'Suspendre' : 'Activer'}
                      >
                        <PowerIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(vendeur, 'reset-password')}
                        className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                        title="Réinitialiser mot de passe"
                      >
                        <KeyIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(vendeur, 'delete')}
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

      {/* Classement des vendeurs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Classement des vendeurs (ce mois)
        </h2>
        <div className="space-y-4">
          {vendeurs
            .filter(v => v.statut === 'actif')
            .sort((a, b) => b.statistiques.ventesGenerees - a.statistiques.ventesGenerees)
            .slice(0, 5)
            .map((vendeur, index) => (
              <div key={vendeur.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {vendeur.prenom} {vendeur.nom}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {rolesDisponibles[vendeur.role].nom}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatMGA(vendeur.statistiques.ventesGenerees)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {vendeur.statistiques.commandesTraitees} commandes
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Messagerie interne */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Messagerie interne
          </h2>
          <Button variant="outline" size="sm">
            <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
            Nouveau message groupé
          </Button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Tâche assignée à Paul Rakoto
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                "Préparer la commande CMD-456" - Il y a 2 heures
              </p>
            </div>
            <span className="text-xs text-blue-600 dark:text-blue-400">En cours</span>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Message de Marie Andry
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                "Commande CMD-123 expédiée avec succès" - Il y a 5 heures
              </p>
            </div>
            <span className="text-xs text-green-600 dark:text-green-400">Terminé</span>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};