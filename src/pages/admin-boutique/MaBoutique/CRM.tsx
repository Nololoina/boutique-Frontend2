import React, { useState } from 'react';
import {
  UserIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  TagIcon,
  TrashIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  UserGroupIcon,
  HeartIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  ChatBubbleLeftRightIcon,
  GiftIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/common/Button';
import { formatMGA } from '../../../utils/formatMoney';

interface ClientAnonyme {
  id: string;
  nom?: string;
  prenom?: string;
  email: string;
  telephone?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  dateCreation: string;
  derniereActivite: string;
  segment: 'nouveau' | 'fidele' | 'dormant' | 'vip';
  totalDepense: number;
  nombreCommandes: number;
  moyennePanier: number;
  commandes: {
    id: string;
    date: string;
    montant: number;
    statut: string;
    produits: number;
  }[];
  interactions: {
    id: string;
    type: 'commande' | 'message' | 'support' | 'visite';
    date: string;
    description: string;
  }[];
  preferences?: {
    categories: string[];
    budgetMoyen: number;
    frequenceAchat: string;
  };
  notes?: string;
}

interface CampagneEmail {
  id: string;
  nom: string;
  type: 'remerciement' | 'relance-panier' | 'promotion' | 'newsletter';
  segment: string;
  dateEnvoi: string;
  statut: 'brouillon' | 'envoye' | 'programme';
  destinataires: number;
  ouvertures: number;
  clics: number;
}

const mockClients: ClientAnonyme[] = [
  {
    id: 'CLI001',
    nom: 'Rakoto',
    prenom: 'Jean',
    email: 'jean.rakoto@email.mg',
    telephone: '+261 32 12 345 67',
    adresse: '123 Rue de la Paix',
    ville: 'Antananarivo',
    codePostal: '101',
    dateCreation: '2024-10-15',
    derniereActivite: '2024-12-20',
    segment: 'fidele',
    totalDepense: 450000,
    nombreCommandes: 8,
    moyennePanier: 56250,
    commandes: [
      {
        id: 'CMD-001',
        date: '2024-12-20',
        montant: 125000,
        statut: 'livre',
        produits: 2
      },
      {
        id: 'CMD-002',
        date: '2024-11-15',
        montant: 89000,
        statut: 'livre',
        produits: 1
      }
    ],
    interactions: [
      {
        id: 'INT001',
        type: 'commande',
        date: '2024-12-20',
        description: 'Commande CMD-001 - Smartphone'
      },
      {
        id: 'INT002',
        type: 'message',
        date: '2024-12-18',
        description: 'Question sur la garantie'
      }
    ],
    preferences: {
      categories: ['Électronique', 'Accessoires'],
      budgetMoyen: 75000,
      frequenceAchat: 'mensuelle'
    },
    notes: 'Client fidèle, préfère les produits haut de gamme'
  },
  {
    id: 'CLI002',
    email: 'marie.andry@email.mg',
    telephone: '+261 33 98 765 43',
    dateCreation: '2024-12-19',
    derniereActivite: '2024-12-19',
    segment: 'nouveau',
    totalDepense: 89000,
    nombreCommandes: 1,
    moyennePanier: 89000,
    commandes: [
      {
        id: 'CMD-003',
        date: '2024-12-19',
        montant: 89000,
        statut: 'en-cours',
        produits: 2
      }
    ],
    interactions: [
      {
        id: 'INT003',
        type: 'commande',
        date: '2024-12-19',
        description: 'Première commande - Robe élégante'
      }
    ]
  },
  {
    id: 'CLI003',
    nom: 'Rabe',
    prenom: 'Paul',
    email: 'paul.rabe@email.mg',
    dateCreation: '2024-08-10',
    derniereActivite: '2024-10-15',
    segment: 'dormant',
    totalDepense: 156000,
    nombreCommandes: 3,
    moyennePanier: 52000,
    commandes: [
      {
        id: 'CMD-004',
        date: '2024-10-15',
        montant: 45000,
        statut: 'livre',
        produits: 1
      }
    ],
    interactions: [
      {
        id: 'INT004',
        type: 'commande',
        date: '2024-10-15',
        description: 'Dernière commande - Café premium'
      }
    ],
    notes: 'Client inactif depuis 2 mois - Relance nécessaire'
  }
];

const mockCampagnes: CampagneEmail[] = [
  {
    id: 'CAMP001',
    nom: 'Remerciement nouveaux clients',
    type: 'remerciement',
    segment: 'nouveau',
    dateEnvoi: '2024-12-20',
    statut: 'envoye',
    destinataires: 15,
    ouvertures: 12,
    clics: 8
  },
  {
    id: 'CAMP002',
    nom: 'Promotion Noël - Clients fidèles',
    type: 'promotion',
    segment: 'fidele',
    dateEnvoi: '2024-12-22',
    statut: 'programme',
    destinataires: 45,
    ouvertures: 0,
    clics: 0
  }
];

export const CRM: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState<ClientAnonyme[]>(mockClients);
  const [campagnes, setCampagnes] = useState<CampagneEmail[]>(mockCampagnes);
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<string>('tous');
  const [selectedClient, setSelectedClient] = useState<ClientAnonyme | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'email' | 'merge'>('view');
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (client.nom && client.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (client.prenom && client.prenom.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (client.telephone && client.telephone.includes(searchTerm));
    const matchesSegment = segmentFilter === 'tous' || client.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const getSegmentBadge = (segment: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (segment) {
      case 'nouveau':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'fidele':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'dormant':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'vip':
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
      default:
        return baseClasses;
    }
  };

  const getSegmentIcon = (segment: string) => {
    switch (segment) {
      case 'nouveau':
        return <StarIcon className="h-4 w-4" />;
      case 'fidele':
        return <HeartIcon className="h-4 w-4" />;
      case 'dormant':
        return <ClockIcon className="h-4 w-4" />;
      case 'vip':
        return <GiftIcon className="h-4 w-4" />;
      default:
        return <UserIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (client: ClientAnonyme, action: typeof modalType) => {
    setSelectedClient(client);
    setModalType(action);
    if (action === 'email') {
      setEmailSubject('');
      setEmailContent('');
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedClient) return;

    switch (modalType) {
      case 'delete':
        setClients(prev => prev.filter(c => c.id !== selectedClient.id));
        alert('Données client supprimées conformément au RGPD');
        break;
      case 'email':
        if (emailSubject && emailContent) {
          alert(`Email envoyé à ${selectedClient.email}`);
        }
        break;
    }
    setShowModal(false);
    setSelectedClient(null);
  };

  const stats = {
    totalClients: clients.length,
    nouveaux: clients.filter(c => c.segment === 'nouveau').length,
    fideles: clients.filter(c => c.segment === 'fidele').length,
    dormants: clients.filter(c => c.segment === 'dormant').length,
    vip: clients.filter(c => c.segment === 'vip').length,
    chiffreAffaires: clients.reduce((sum, c) => sum + c.totalDepense, 0),
    panierMoyen: clients.reduce((sum, c) => sum + c.moyennePanier, 0) / clients.length
  };

  const renderClients = () => (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total clients
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalClients}
              </p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Clients fidèles
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.fideles}
              </p>
            </div>
            <HeartIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                CA total
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatMGA(stats.chiffreAffaires)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Panier moyen
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatMGA(stats.panierMoyen)}
              </p>
            </div>
            <ShoppingBagIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Segmentation rapide */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Segmentation automatique
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">Nouveaux clients</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.nouveaux}</p>
              </div>
              <StarIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>

          <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Clients fidèles</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.fideles}</p>
              </div>
              <HeartIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-200">Clients dormants</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.dormants}</p>
              </div>
              <ClockIcon className="h-6 w-6 text-red-500" />
            </div>
          </div>

          <div className="p-4 border border-purple-200 dark:border-purple-800 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">Clients VIP</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.vip}</p>
              </div>
              <GiftIcon className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filtres */}
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
              value={segmentFilter}
              onChange={(e) => setSegmentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les segments</option>
              <option value="nouveau">Nouveaux</option>
              <option value="fidele">Fidèles</option>
              <option value="dormant">Dormants</option>
              <option value="vip">VIP</option>
            </select>
            <Button variant="outline" size="sm">
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>

      {/* Tableau des clients */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commandes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total dépensé
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
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {client.prenom && client.nom ? `${client.prenom} ${client.nom}` : 'Client anonyme'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {client.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {client.email}
                      </div>
                      {client.telephone && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {client.telephone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getSegmentBadge(client.segment)}>
                      {getSegmentIcon(client.segment)}
                      <span className="ml-1">{client.segment}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {client.nombreCommandes} commande(s)
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Panier moyen: {formatMGA(client.moyennePanier)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {formatMGA(client.totalDepense)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(client.derniereActivite).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(client, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(client, 'email')}
                        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        title="Envoyer email"
                      >
                        <EnvelopeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(client, 'delete')}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Supprimer données (RGPD)"
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
    </div>
  );

  const renderCampagnes = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Campagnes email
        </h3>
        <Button variant="primary" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouvelle campagne
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Campagne
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Destinataires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {campagnes.map((campagne) => (
                <tr key={campagne.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {campagne.nom}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(campagne.dateEnvoi).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campagne.type === 'remerciement' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : campagne.type === 'promotion'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {campagne.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {campagne.segment}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {campagne.destinataires}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {campagne.ouvertures}/{campagne.destinataires} ouvertures
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {campagne.clics} clics
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campagne.statut === 'envoye' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : campagne.statut === 'programme'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {campagne.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal || !selectedClient) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Fiche client détaillée
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
                            {selectedClient.prenom && selectedClient.nom 
                              ? `${selectedClient.prenom} ${selectedClient.nom}` 
                              : 'Nom non renseigné'}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedClient.email}
                          </span>
                        </div>
                        {selectedClient.telephone && (
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {selectedClient.telephone}
                            </span>
                          </div>
                        )}
                        {selectedClient.adresse && (
                          <div className="flex items-start">
                            <MapPinIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {selectedClient.adresse}<br />
                              {selectedClient.ville} {selectedClient.codePostal}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Statistiques
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {selectedClient.nombreCommandes}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Commandes</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-lg font-bold text-green-600 dark:text-green-400">
                            {formatMGA(selectedClient.totalDepense)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                        </div>
                      </div>
                    </div>

                    {selectedClient.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Notes internes
                        </h4>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {selectedClient.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Historique des commandes
                      </h4>
                      <div className="space-y-2">
                        {selectedClient.commandes.map((commande) => (
                          <div key={commande.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {commande.id}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {commande.produits} produit(s) • {new Date(commande.date).toLocaleDateString('fr-FR')}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {formatMGA(commande.montant)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {commande.statut}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Interactions récentes
                      </h4>
                      <div className="space-y-2">
                        {selectedClient.interactions.slice(0, 5).map((interaction) => (
                          <div key={interaction.id} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900 dark:text-white">
                                {interaction.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(interaction.date).toLocaleDateString('fr-FR')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'email' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Envoyer un email à {selectedClient.prenom} {selectedClient.nom}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="Sujet de l'email..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={emailContent}
                      onChange={(e) => setEmailContent(e.target.value)}
                      rows={6}
                      placeholder="Votre message..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      L'email sera envoyé à {selectedClient.email}
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === 'delete' && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Suppression des données (RGPD)
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      Cette action supprimera définitivement toutes les données personnelles de ce client, 
                      conformément au RGPD. Les données de commandes seront anonymisées.
                    </p>
                  </div>
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
                  disabled={modalType === 'email' && (!emailSubject || !emailContent)}
                >
                  {modalType === 'email' ? 'Envoyer' : 'Confirmer'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'clients', name: 'Base clients', icon: UserGroupIcon },
    { id: 'campagnes', name: 'Campagnes email', icon: EnvelopeIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          CRM - Gestion Clientèle
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez vos clients anonymes et vos campagnes marketing
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
      {activeTab === 'clients' && renderClients()}
      {activeTab === 'campagnes' && renderCampagnes()}
      {activeTab === 'analytics' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <div className="text-center">
            <ChartBarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Analytics CRM
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fonctionnalité en développement - Analyses comportementales détaillées
            </p>
          </div>
        </div>
      )}

      {renderModal()}
    </div>
  );
};