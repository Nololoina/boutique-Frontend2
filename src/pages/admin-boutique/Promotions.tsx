import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  PlayIcon,
  PauseIcon,
  TagIcon,
  CalendarIcon,
  ChartBarIcon,
  GiftIcon,
  PercentBadgeIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';

interface Promotion {
  id: string;
  nom: string;
  type: 'pourcentage' | 'fixe' | '2pour1' | 'livraison-gratuite' | 'code-promo' | 'groupe';
  valeur: number;
  codePromo?: string;
  produitsConcernes: string[];
  dateDebut: string;
  dateFin: string;
  utilisationsMax?: number;
  utilisationsActuelles: number;
  statut: 'active' | 'expiree' | 'programmee' | 'desactivee';
  visibilite: 'publique' | 'privee';
  performance: {
    vues: number;
    utilisations: number;
    montantRemises: number;
    tauxConversion: number;
  };
}

const mockPromotions: Promotion[] = [
  {
    id: 'PROMO001',
    nom: 'Soldes d\'été 2024',
    type: 'pourcentage',
    valeur: 20,
    produitsConcernes: ['P001', 'P002'],
    dateDebut: '2024-12-01',
    dateFin: '2024-12-31',
    utilisationsMax: 100,
    utilisationsActuelles: 45,
    statut: 'active',
    visibilite: 'publique',
    performance: {
      vues: 1250,
      utilisations: 45,
      montantRemises: 180000,
      tauxConversion: 3.6
    }
  },
  {
    id: 'PROMO002',
    nom: 'Livraison gratuite Noël',
    type: 'livraison-gratuite',
    valeur: 0,
    produitsConcernes: ['tous'],
    dateDebut: '2024-12-20',
    dateFin: '2024-12-25',
    utilisationsActuelles: 23,
    statut: 'active',
    visibilite: 'publique',
    performance: {
      vues: 890,
      utilisations: 23,
      montantRemises: 115000,
      tauxConversion: 2.6
    }
  },
  {
    id: 'PROMO003',
    nom: 'Code VIP - SPECIAL50',
    type: 'code-promo',
    valeur: 50000,
    codePromo: 'SPECIAL50',
    produitsConcernes: ['P001'],
    dateDebut: '2024-11-15',
    dateFin: '2024-11-30',
    utilisationsMax: 20,
    utilisationsActuelles: 20,
    statut: 'expiree',
    visibilite: 'privee',
    performance: {
      vues: 456,
      utilisations: 20,
      montantRemises: 1000000,
      tauxConversion: 4.4
    }
  },
  {
    id: 'PROMO004',
    nom: 'Black Friday 2025',
    type: 'pourcentage',
    valeur: 30,
    produitsConcernes: ['tous'],
    dateDebut: '2025-11-29',
    dateFin: '2025-11-29',
    utilisationsActuelles: 0,
    statut: 'programmee',
    visibilite: 'publique',
    performance: {
      vues: 0,
      utilisations: 0,
      montantRemises: 0,
      tauxConversion: 0
    }
  }
];

export const Promotions: React.FC = () => {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [typeFilter, setTypeFilter] = useState<string>('tous');
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'duplicate' | 'create'>('view');

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (promo.codePromo && promo.codePromo.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'tous' || promo.statut === statusFilter;
    const matchesType = typeFilter === 'tous' || promo.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'expiree':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'programmee':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'desactivee':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'expiree':
        return <XCircleIcon className="h-4 w-4" />;
      case 'programmee':
        return <ClockIcon className="h-4 w-4" />;
      case 'desactivee':
        return <PauseIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (type) {
      case 'pourcentage':
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
      case 'fixe':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case '2pour1':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
      case 'livraison-gratuite':
        return `${baseClasses} bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200`;
      case 'code-promo':
        return `${baseClasses} bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200`;
      case 'groupe':
        return `${baseClasses} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200`;
      default:
        return baseClasses;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pourcentage':
        return <PercentBadgeIcon className="h-4 w-4" />;
      case 'fixe':
        return <CurrencyDollarIcon className="h-4 w-4" />;
      case '2pour1':
        return <GiftIcon className="h-4 w-4" />;
      case 'livraison-gratuite':
        return <TruckIcon className="h-4 w-4" />;
      case 'code-promo':
        return <TagIcon className="h-4 w-4" />;
      case 'groupe':
        return <TagIcon className="h-4 w-4" />;
      default:
        return <TagIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (promo: Promotion | null, action: typeof modalType) => {
    setSelectedPromo(promo);
    setModalType(action);
    setShowModal(true);
  };

  const handleToggleStatus = (promoId: string) => {
    setPromotions(prev => prev.map(p => 
      p.id === promoId 
        ? { ...p, statut: p.statut === 'active' ? 'desactivee' as const : 'active' as const }
        : p
    ));
  };

  const handleDuplicate = (promo: Promotion) => {
    const newPromo: Promotion = {
      ...promo,
      id: `PROMO${String(promotions.length + 1).padStart(3, '0')}`,
      nom: `${promo.nom} (Copie)`,
      statut: 'desactivee',
      utilisationsActuelles: 0,
      performance: {
        vues: 0,
        utilisations: 0,
        montantRemises: 0,
        tauxConversion: 0
      }
    };
    setPromotions(prev => [...prev, newPromo]);
  };

  const stats = {
    total: promotions.length,
    actives: promotions.filter(p => p.statut === 'active').length,
    programmees: promotions.filter(p => p.statut === 'programmee').length,
    expirees: promotions.filter(p => p.statut === 'expiree').length,
    totalRemises: promotions.reduce((sum, p) => sum + p.performance.montantRemises, 0)
  };

  const types = [
    'pourcentage', 'fixe', '2pour1', 'livraison-gratuite', 'code-promo', 'groupe'
  ];

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && selectedPromo && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails de la promotion
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom de la promotion
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPromo.nom}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Type
                        </label>
                        <span className={getTypeBadge(selectedPromo.type)}>
                          {getTypeIcon(selectedPromo.type)}
                          <span className="ml-1">{selectedPromo.type}</span>
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Statut
                        </label>
                        <span className={getStatusBadge(selectedPromo.statut)}>
                          {getStatusIcon(selectedPromo.statut)}
                          <span className="ml-1">{selectedPromo.statut}</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Valeur de la remise
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedPromo.type === 'pourcentage' 
                          ? `${selectedPromo.valeur}%`
                          : selectedPromo.type === 'fixe'
                          ? formatMGA(selectedPromo.valeur)
                          : selectedPromo.type === 'livraison-gratuite'
                          ? 'Livraison offerte'
                          : selectedPromo.valeur
                        }
                      </p>
                      {selectedPromo.codePromo && (
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Code: {selectedPromo.codePromo}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date de début
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(selectedPromo.dateDebut).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Date de fin
                        </label>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(selectedPromo.dateFin).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    {selectedPromo.utilisationsMax && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Utilisations
                        </label>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ 
                                width: `${(selectedPromo.utilisationsActuelles / selectedPromo.utilisationsMax) * 100}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {selectedPromo.utilisationsActuelles} / {selectedPromo.utilisationsMax}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Performance
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {selectedPromo.performance.vues}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Vues</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {selectedPromo.performance.utilisations}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Utilisations</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {formatMGA(selectedPromo.performance.montantRemises)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Remises</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {selectedPromo.performance.tauxConversion}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Conversion</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Produits concernés
                      </label>
                      <div className="mt-2">
                        {selectedPromo.produitsConcernes.includes('tous') ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            Tous les produits
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {selectedPromo.produitsConcernes.map(produitId => (
                              <span key={produitId} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                                {produitId}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Visibilité
                      </label>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        selectedPromo.visibilite === 'publique'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {selectedPromo.visibilite}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'create' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Créer une nouvelle promotion
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom de la promotion *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Soldes d'hiver 2025"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Type de promotion *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                      <option value="">Sélectionnez un type</option>
                      <option value="pourcentage">Réduction en pourcentage</option>
                      <option value="fixe">Réduction fixe</option>
                      <option value="2pour1">Offre 2 pour 1</option>
                      <option value="livraison-gratuite">Livraison gratuite</option>
                      <option value="code-promo">Code promo</option>
                      <option value="groupe">Promotion groupée</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date de début *
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date de fin *
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Produits concernés
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="produits" value="tous" className="mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Tous les produits</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="produits" value="selection" className="mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Sélection manuelle</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="produits" value="categorie" className="mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Par catégorie</span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                {modalType === 'view' ? 'Fermer' : 'Annuler'}
              </Button>
              {modalType === 'create' && (
                <Button variant="primary">
                  Créer la promotion
                </Button>
              )}
              {modalType === 'view' && selectedPromo && (
                <>
                  <Button variant="outline" onClick={() => handleDuplicate(selectedPromo)}>
                    Dupliquer
                  </Button>
                  <Button variant="primary" onClick={() => setModalType('edit')}>
                    Modifier
                  </Button>
                </>
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
            Mes Promotions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Créez et gérez vos campagnes promotionnelles
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <ChartBarIcon className="h-4 w-4 mr-2" />
            Statistiques
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleAction(null, 'create')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nouvelle promotion
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total promotions
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <TagIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Actives
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.actives}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Programmées
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.programmees}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Expirées
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.expirees}
              </p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total remises
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatMGA(stats.totalRemises)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-purple-500" />
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
                placeholder="Rechercher par nom ou code promo..."
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
              <option value="active">Active</option>
              <option value="programmee">Programmée</option>
              <option value="expiree">Expirée</option>
              <option value="desactivee">Désactivée</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste des promotions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Promotion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Période
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPromotions.map((promo) => (
                <tr key={promo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {promo.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {promo.codePromo && `Code: ${promo.codePromo}`}
                        {promo.type === 'pourcentage' && ` • ${promo.valeur}%`}
                        {promo.type === 'fixe' && ` • ${formatMGA(promo.valeur)}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getTypeBadge(promo.type)}>
                      {getTypeIcon(promo.type)}
                      <span className="ml-1">{promo.type}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(promo.dateDebut).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      au {new Date(promo.dateFin).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(promo.statut)}>
                      {getStatusIcon(promo.statut)}
                      <span className="ml-1">{promo.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {promo.performance.utilisations} utilisations
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatMGA(promo.performance.montantRemises)} remises
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(promo, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(promo.id)}
                        className={`${promo.statut === 'active' 
                          ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                          : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={promo.statut === 'active' ? 'Désactiver' : 'Activer'}
                      >
                        {promo.statut === 'active' ? (
                          <PauseIcon className="h-4 w-4" />
                        ) : (
                          <PlayIcon className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDuplicate(promo)}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Dupliquer"
                      >
                        <DocumentDuplicateIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(promo, 'delete')}
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

      {/* Promotions en cours */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Promotions en cours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions.filter(p => p.statut === 'active').map((promo) => (
            <div key={promo.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {promo.nom}
                  </h3>
                  <span className={getTypeBadge(promo.type)}>
                    {promo.type}
                  </span>
                </div>
                <span className={getStatusBadge(promo.statut)}>
                  {promo.statut}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Utilisations:</span>
                  <span className="text-gray-900 dark:text-white">{promo.performance.utilisations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Remises:</span>
                  <span className="text-gray-900 dark:text-white">{formatMGA(promo.performance.montantRemises)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Fin:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(promo.dateFin).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};