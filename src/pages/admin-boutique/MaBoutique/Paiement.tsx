import React, { useState } from 'react';
import {
  CreditCardIcon,
  BanknotesIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  BuildingLibraryIcon,
  TruckIcon,
  CalendarIcon,
  UserIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/common/Button';
import { formatMGA } from '../../../utils/formatMoney';

interface Paiement {
  id: string;
  type: 'client-vers-boutique' | 'boutique-vers-plateforme';
  montant: number;
  methode: 'mobile-money' | 'virement' | 'cash-delivery' | 'prelevement-auto';
  statut: 'en-attente' | 'valide' | 'rejete' | 'expire';
  date: string;
  reference: string;
  commandeId?: string;
  serviceId?: string;
  client?: {
    nom: string;
    email: string;
    telephone: string;
  };
  preuveDocument?: string;
  motifRejet?: string;
  dateExpiration?: string;
  description: string;
}

interface Facture {
  id: string;
  numero: string;
  type: 'abonnement' | 'commission' | 'service-pub' | 'autre';
  montant: number;
  dateEmission: string;
  dateEcheance: string;
  statut: 'impayee' | 'payee' | 'en-retard' | 'annulee';
  description: string;
}

const mockPaiements: Paiement[] = [
  {
    id: 'PAY001',
    type: 'client-vers-boutique',
    montant: 125000,
    methode: 'mobile-money',
    statut: 'valide',
    date: '2024-12-20',
    reference: 'MM-2024-001',
    commandeId: 'CMD-001',
    client: {
      nom: 'Jean Rakoto',
      email: 'jean@email.mg',
      telephone: '+261 32 12 345 67'
    },
    preuveDocument: 'recu_mobile_money.jpg',
    description: 'Paiement commande smartphone'
  },
  {
    id: 'PAY002',
    type: 'boutique-vers-plateforme',
    montant: 50000,
    methode: 'mobile-money',
    statut: 'en-attente',
    date: '2024-12-20',
    reference: 'COMM-2024-12',
    serviceId: 'COMMISSION',
    dateExpiration: '2024-12-25',
    description: 'Commission mensuelle décembre 2024'
  },
  {
    id: 'PAY003',
    type: 'client-vers-boutique',
    montant: 89000,
    methode: 'cash-delivery',
    statut: 'en-attente',
    date: '2024-12-19',
    reference: 'COD-2024-002',
    commandeId: 'CMD-002',
    client: {
      nom: 'Marie Andry',
      email: 'marie@email.mg',
      telephone: '+261 33 98 765 43'
    },
    description: 'Paiement à la livraison - Robe élégante'
  }
];

const mockFactures: Facture[] = [
  {
    id: 'FACT001',
    numero: 'FACT-2024-12-001',
    type: 'abonnement',
    montant: 25000,
    dateEmission: '2024-12-01',
    dateEcheance: '2024-12-31',
    statut: 'payee',
    description: 'Abonnement mensuel décembre 2024'
  },
  {
    id: 'FACT002',
    numero: 'FACT-2024-12-002',
    type: 'commission',
    montant: 45000,
    dateEmission: '2024-12-15',
    dateEcheance: '2024-12-25',
    statut: 'impayee',
    description: 'Commission sur ventes (15%)'
  },
  {
    id: 'FACT003',
    numero: 'FACT-2024-12-003',
    type: 'service-pub',
    montant: 15000,
    dateEmission: '2024-12-10',
    dateEcheance: '2024-12-20',
    statut: 'en-retard',
    description: 'Publicité bannière homepage'
  }
];

export const Paiement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recus');
  const [paiements, setPaiements] = useState<Paiement[]>(mockPaiements);
  const [factures, setFactures] = useState<Facture[]>(mockFactures);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [typeFilter, setTypeFilter] = useState<string>('tous');
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'upload-proof' | 'pay-invoice'>('view');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const filteredPaiements = paiements.filter(paiement => {
    const matchesSearch = paiement.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paiement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (paiement.client?.nom.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'tous' || paiement.statut === statusFilter;
    const matchesType = typeFilter === 'tous' || paiement.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'valide':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'en-attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'rejete':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'expire':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      case 'impayee':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'payee':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'en-retard':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'valide':
      case 'payee':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'en-attente':
        return <ClockIcon className="h-4 w-4" />;
      case 'rejete':
      case 'impayee':
        return <XCircleIcon className="h-4 w-4" />;
      case 'expire':
      case 'en-retard':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getMethodeIcon = (methode: string) => {
    switch (methode) {
      case 'mobile-money':
        return <PhoneIcon className="h-4 w-4" />;
      case 'virement':
        return <BuildingLibraryIcon className="h-4 w-4" />;
      case 'cash-delivery':
        return <TruckIcon className="h-4 w-4" />;
      case 'prelevement-auto':
        return <CreditCardIcon className="h-4 w-4" />;
      default:
        return <CreditCardIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (paiement: Paiement, action: typeof modalType) => {
    setSelectedPaiement(paiement);
    setModalType(action);
    setShowModal(true);
    setUploadedFile(null);
  };

  const handlePayInvoice = (facture: Facture) => {
    const newPaiement: Paiement = {
      id: `PAY${String(paiements.length + 1).padStart(3, '0')}`,
      type: 'boutique-vers-plateforme',
      montant: facture.montant,
      methode: 'mobile-money',
      statut: 'en-attente',
      date: new Date().toISOString().split('T')[0],
      reference: `PAY-${facture.numero}`,
      serviceId: facture.id,
      description: `Paiement ${facture.description}`
    };
    
    setPaiements(prev => [...prev, newPaiement]);
    setFactures(prev => prev.map(f => 
      f.id === facture.id ? { ...f, statut: 'payee' as const } : f
    ));
    
    alert('Paiement initié avec succès !');
  };

  const confirmUpload = () => {
    if (!selectedPaiement || !uploadedFile) return;
    
    setPaiements(prev => prev.map(p => 
      p.id === selectedPaiement.id ? {
        ...p,
        preuveDocument: uploadedFile.name,
        statut: 'en-attente' as const
      } : p
    ));
    
    setShowModal(false);
    alert('Preuve de paiement téléversée avec succès !');
  };

  const stats = {
    totalRecus: paiements.filter(p => p.type === 'client-vers-boutique' && p.statut === 'valide').reduce((sum, p) => sum + p.montant, 0),
    totalEnvoyes: paiements.filter(p => p.type === 'boutique-vers-plateforme' && p.statut === 'valide').reduce((sum, p) => sum + p.montant, 0),
    enAttente: paiements.filter(p => p.statut === 'en-attente').length,
    facturesImpayees: factures.filter(f => f.statut === 'impayee' || f.statut === 'en-retard').reduce((sum, f) => sum + f.montant, 0)
  };

  const renderPaiementsRecus = () => (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total reçu
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatMGA(stats.totalRecus)}
              </p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                En attente
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.enAttente}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Mobile Money
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {paiements.filter(p => p.methode === 'mobile-money' && p.statut === 'valide').length}
              </p>
            </div>
            <PhoneIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Virements
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {paiements.filter(p => p.methode === 'virement' && p.statut === 'valide').length}
              </p>
            </div>
            <BuildingLibraryIcon className="h-8 w-8 text-purple-500" />
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
                placeholder="Rechercher par référence, client ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les statuts</option>
              <option value="valide">Validé</option>
              <option value="en-attente">En attente</option>
              <option value="rejete">Rejeté</option>
              <option value="expire">Expiré</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les types</option>
              <option value="client-vers-boutique">Paiements reçus</option>
              <option value="boutique-vers-plateforme">Paiements envoyés</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des paiements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Paiement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client/Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Méthode
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPaiements.map((paiement) => (
                <tr key={paiement.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {paiement.reference}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {paiement.type === 'client-vers-boutique' ? '← Reçu' : '→ Envoyé'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      {paiement.client ? (
                        <>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {paiement.client.nom}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {paiement.client.telephone}
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-900 dark:text-white">
                          {paiement.description}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-medium ${
                      paiement.type === 'client-vers-boutique' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {paiement.type === 'client-vers-boutique' ? '+' : '-'}{formatMGA(paiement.montant)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getMethodeIcon(paiement.methode)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {paiement.methode}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(paiement.statut)}>
                      {getStatusIcon(paiement.statut)}
                      <span className="ml-1">{paiement.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(paiement.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(paiement, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {paiement.statut === 'en-attente' && paiement.type === 'boutique-vers-plateforme' && (
                        <button
                          onClick={() => handleAction(paiement, 'upload-proof')}
                          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                          title="Téléverser preuve"
                        >
                          <DocumentArrowUpIcon className="h-4 w-4" />
                        </button>
                      )}
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

  const renderFactures = () => (
    <div className="space-y-6">
      {/* Solde dû */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Solde dû à la plateforme
            </h3>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              {formatMGA(stats.facturesImpayees)}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {factures.filter(f => f.statut === 'impayee' || f.statut === 'en-retard').length} facture(s) impayée(s)
            </p>
          </div>
          <div className="text-right">
            <Button variant="primary" size="sm">
              Régler maintenant
            </Button>
          </div>
        </div>
      </div>

      {/* Liste des factures */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Factures de la plateforme
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Facture
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Échéance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {factures.map((facture) => (
                <tr key={facture.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {facture.numero}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {facture.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      facture.type === 'abonnement' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : facture.type === 'commission'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                    }`}>
                      {facture.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {formatMGA(facture.montant)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(facture.dateEcheance).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(facture.statut)}>
                      {getStatusIcon(facture.statut)}
                      <span className="ml-1">{facture.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Télécharger PDF"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4" />
                      </button>
                      {(facture.statut === 'impayee' || facture.statut === 'en-retard') && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handlePayInvoice(facture)}
                        >
                          Payer
                        </Button>
                      )}
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

  const renderStatistiques = () => (
    <div className="space-y-6">
      {/* Graphiques de revenus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Évolution des revenus (30 jours)
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Graphique des revenus</p>
              <p className="text-sm">(Fonctionnalité à développer)</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Répartition par méthode de paiement
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Mobile Money</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">65%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BuildingLibraryIcon className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Virement</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">25%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TruckIcon className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Livraison</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Résumé financier */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Résumé financier mensuel
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatMGA(stats.totalRecus)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Revenus bruts</div>
          </div>
          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatMGA(stats.totalEnvoyes)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Commissions payées</div>
          </div>
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatMGA(stats.totalRecus - stats.totalEnvoyes)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Revenus nets</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatMGA(stats.facturesImpayees)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Solde dû</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal || !selectedPaiement) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails du paiement
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Référence
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPaiement.reference}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Type
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedPaiement.type === 'client-vers-boutique' ? 'Paiement reçu' : 'Paiement envoyé'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Montant
                      </label>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {formatMGA(selectedPaiement.montant)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Méthode
                      </label>
                      <div className="flex items-center">
                        {getMethodeIcon(selectedPaiement.methode)}
                        <span className="ml-2 text-gray-900 dark:text-white">{selectedPaiement.methode}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedPaiement.description}</p>
                  </div>
                  {selectedPaiement.client && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Client
                      </label>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-900 dark:text-white">{selectedPaiement.client.nom}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPaiement.client.email}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{selectedPaiement.client.telephone}</p>
                      </div>
                    </div>
                  )}
                  {selectedPaiement.preuveDocument && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Preuve de paiement
                      </label>
                      <div className="flex items-center space-x-2">
                        <DocumentArrowDownIcon className="h-5 w-5 text-blue-500" />
                        <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                          {selectedPaiement.preuveDocument}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {modalType === 'upload-proof' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Téléverser une preuve de paiement
                </h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Paiement: {selectedPaiement.reference} - {formatMGA(selectedPaiement.montant)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Document (PDF, JPG, PNG)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="proof-upload"
                      />
                      <label
                        htmlFor="proof-upload"
                        className="cursor-pointer text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        Cliquez pour sélectionner un fichier
                      </label>
                      {uploadedFile && (
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {uploadedFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fermer
              </Button>
              {modalType === 'upload-proof' && (
                <Button
                  variant="primary"
                  onClick={confirmUpload}
                  disabled={!uploadedFile}
                >
                  Téléverser
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'recus', name: 'Paiements reçus/envoyés', icon: CreditCardIcon },
    { id: 'factures', name: 'Factures plateforme', icon: BanknotesIcon },
    { id: 'stats', name: 'Statistiques', icon: ChartBarIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestion des Paiements
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez tous vos flux de paiements entrants et sortants
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
      {activeTab === 'recus' && renderPaiementsRecus()}
      {activeTab === 'factures' && renderFactures()}
      {activeTab === 'stats' && renderStatistiques()}

      {renderModal()}
    </div>
  );
};