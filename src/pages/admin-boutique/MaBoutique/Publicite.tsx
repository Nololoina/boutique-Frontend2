import React, { useState } from 'react';
import {
  MegaphoneIcon,
  PhotoIcon,
  VideoCameraIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlayIcon,
  PauseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpTrayIcon,
  TagIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/common/Button';
import { formatMGA } from '../../../utils/formatMoney';

interface CampagnePublicitaire {
  id: string;
  nom: string;
  type: 'banniere' | 'carrousel' | 'video' | 'texte' | 'popup';
  statut: 'brouillon' | 'en-attente' | 'active' | 'terminee' | 'rejetee';
  budget: number;
  budgetUtilise: number;
  dateDebut: string;
  dateFin: string;
  cible: {
    ageMin?: number;
    ageMax?: number;
    sexe?: 'homme' | 'femme' | 'tous';
    localisation?: string[];
    interets?: string[];
  };
  contenu: {
    titre: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
    lienAction: string;
    texteAction: string;
  };
  performance: {
    impressions: number;
    clics: number;
    conversions: number;
    coutParClic: number;
    tauxConversion: number;
  };
  emplacement: 'homepage' | 'categories' | 'produits' | 'checkout' | 'global';
  priorite: number;
}

interface EmplacementPub {
  id: string;
  nom: string;
  description: string;
  dimensions: string;
  tarifJournalier: number;
  disponible: boolean;
  campagneActive?: string;
}

const mockCampagnes: CampagnePublicitaire[] = [
  {
    id: 'PUB001',
    nom: 'Promotion Noël 2024',
    type: 'banniere',
    statut: 'active',
    budget: 100000,
    budgetUtilise: 45000,
    dateDebut: '2024-12-15',
    dateFin: '2024-12-31',
    cible: {
      ageMin: 25,
      ageMax: 55,
      sexe: 'tous',
      localisation: ['Antananarivo', 'Fianarantsoa'],
      interets: ['mode', 'electronique']
    },
    contenu: {
      titre: 'Soldes de Noël - Jusqu\'à 50% de réduction',
      description: 'Profitez de nos offres exceptionnelles pour les fêtes',
      imageUrl: 'banniere_noel.jpg',
      lienAction: '/promotions/noel-2024',
      texteAction: 'Voir les offres'
    },
    performance: {
      impressions: 12500,
      clics: 450,
      conversions: 23,
      coutParClic: 100,
      tauxConversion: 5.1
    },
    emplacement: 'homepage',
    priorite: 1
  },
  {
    id: 'PUB002',
    nom: 'Nouveaux produits électronique',
    type: 'carrousel',
    statut: 'en-attente',
    budget: 75000,
    budgetUtilise: 0,
    dateDebut: '2025-01-01',
    dateFin: '2025-01-15',
    cible: {
      ageMin: 18,
      ageMax: 45,
      sexe: 'tous',
      interets: ['electronique', 'technologie']
    },
    contenu: {
      titre: 'Découvrez nos nouveautés tech',
      description: 'Les derniers smartphones et accessoires',
      lienAction: '/categories/electronique',
      texteAction: 'Découvrir'
    },
    performance: {
      impressions: 0,
      clics: 0,
      conversions: 0,
      coutParClic: 0,
      tauxConversion: 0
    },
    emplacement: 'categories',
    priorite: 2
  }
];

const mockEmplacements: EmplacementPub[] = [
  {
    id: 'EMP001',
    nom: 'Bannière homepage',
    description: 'Bannière principale en haut de la page d\'accueil',
    dimensions: '1200x300px',
    tarifJournalier: 5000,
    disponible: false,
    campagneActive: 'PUB001'
  },
  {
    id: 'EMP002',
    nom: 'Sidebar produits',
    description: 'Encart publicitaire dans la sidebar des pages produits',
    dimensions: '300x250px',
    tarifJournalier: 2000,
    disponible: true
  },
  {
    id: 'EMP003',
    nom: 'Footer global',
    description: 'Bannière dans le footer de toutes les pages',
    dimensions: '728x90px',
    tarifJournalier: 1500,
    disponible: true
  }
];

export const Publicite: React.FC = () => {
  const [activeTab, setActiveTab] = useState('campagnes');
  const [campagnes, setCampagnes] = useState<CampagnePublicitaire[]>(mockCampagnes);
  const [emplacements] = useState<EmplacementPub[]>(mockEmplacements);
  const [selectedCampagne, setSelectedCampagne] = useState<CampagnePublicitaire | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'create' | 'stats'>('view');
  const [formData, setFormData] = useState({
    nom: '',
    type: 'banniere' as const,
    budget: 0,
    dateDebut: '',
    dateFin: '',
    titre: '',
    description: '',
    lienAction: '',
    texteAction: '',
    emplacement: 'homepage' as const,
    ageMin: 18,
    ageMax: 65,
    sexe: 'tous' as const,
    localisation: '',
    interets: ''
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'active':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'en-attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'brouillon':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      case 'terminee':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'rejetee':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'en-attente':
        return <ClockIcon className="h-4 w-4" />;
      case 'brouillon':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'terminee':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'rejetee':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'banniere':
        return <PhotoIcon className="h-4 w-4" />;
      case 'video':
        return <VideoCameraIcon className="h-4 w-4" />;
      case 'carrousel':
        return <PhotoIcon className="h-4 w-4" />;
      case 'texte':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'popup':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      default:
        return <MegaphoneIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (campagne: CampagnePublicitaire | null, action: typeof modalType) => {
    setSelectedCampagne(campagne);
    setModalType(action);
    if (action === 'create') {
      setFormData({
        nom: '',
        type: 'banniere',
        budget: 0,
        dateDebut: '',
        dateFin: '',
        titre: '',
        description: '',
        lienAction: '',
        texteAction: '',
        emplacement: 'homepage',
        ageMin: 18,
        ageMax: 65,
        sexe: 'tous',
        localisation: '',
        interets: ''
      });
    } else if (action === 'edit' && campagne) {
      setFormData({
        nom: campagne.nom,
        type: campagne.type,
        budget: campagne.budget,
        dateDebut: campagne.dateDebut,
        dateFin: campagne.dateFin,
        titre: campagne.contenu.titre,
        description: campagne.contenu.description,
        lienAction: campagne.contenu.lienAction,
        texteAction: campagne.contenu.texteAction,
        emplacement: campagne.emplacement,
        ageMin: campagne.cible.ageMin || 18,
        ageMax: campagne.cible.ageMax || 65,
        sexe: campagne.cible.sexe || 'tous',
        localisation: campagne.cible.localisation?.join(', ') || '',
        interets: campagne.cible.interets?.join(', ') || ''
      });
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    switch (modalType) {
      case 'create':
        const newCampagne: CampagnePublicitaire = {
          id: `PUB${String(campagnes.length + 1).padStart(3, '0')}`,
          nom: formData.nom,
          type: formData.type,
          statut: 'brouillon',
          budget: formData.budget,
          budgetUtilise: 0,
          dateDebut: formData.dateDebut,
          dateFin: formData.dateFin,
          cible: {
            ageMin: formData.ageMin,
            ageMax: formData.ageMax,
            sexe: formData.sexe,
            localisation: formData.localisation.split(',').map(l => l.trim()).filter(l => l),
            interets: formData.interets.split(',').map(i => i.trim()).filter(i => i)
          },
          contenu: {
            titre: formData.titre,
            description: formData.description,
            lienAction: formData.lienAction,
            texteAction: formData.texteAction
          },
          performance: {
            impressions: 0,
            clics: 0,
            conversions: 0,
            coutParClic: 0,
            tauxConversion: 0
          },
          emplacement: formData.emplacement,
          priorite: campagnes.length + 1
        };
        setCampagnes(prev => [...prev, newCampagne]);
        break;
      case 'edit':
        if (selectedCampagne) {
          setCampagnes(prev => prev.map(c => 
            c.id === selectedCampagne.id ? {
              ...c,
              nom: formData.nom,
              type: formData.type,
              budget: formData.budget,
              dateDebut: formData.dateDebut,
              dateFin: formData.dateFin,
              cible: {
                ageMin: formData.ageMin,
                ageMax: formData.ageMax,
                sexe: formData.sexe,
                localisation: formData.localisation.split(',').map(l => l.trim()).filter(l => l),
                interets: formData.interets.split(',').map(i => i.trim()).filter(i => i)
              },
              contenu: {
                ...c.contenu,
                titre: formData.titre,
                description: formData.description,
                lienAction: formData.lienAction,
                texteAction: formData.texteAction
              },
              emplacement: formData.emplacement
            } : c
          ));
        }
        break;
      case 'delete':
        if (selectedCampagne) {
          setCampagnes(prev => prev.filter(c => c.id !== selectedCampagne.id));
        }
        break;
    }
    setShowModal(false);
    setSelectedCampagne(null);
  };

  const toggleCampagneStatus = (campagneId: string) => {
    setCampagnes(prev => prev.map(c => 
      c.id === campagneId ? {
        ...c,
        statut: c.statut === 'active' ? 'brouillon' as const : 'en-attente' as const
      } : c
    ));
  };

  const stats = {
    totalCampagnes: campagnes.length,
    actives: campagnes.filter(c => c.statut === 'active').length,
    budgetTotal: campagnes.reduce((sum, c) => sum + c.budget, 0),
    budgetUtilise: campagnes.reduce((sum, c) => sum + c.budgetUtilise, 0),
    impressionsTotal: campagnes.reduce((sum, c) => sum + c.performance.impressions, 0),
    clicsTotal: campagnes.reduce((sum, c) => sum + c.performance.clics, 0)
  };

  const renderCampagnes = () => (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Campagnes actives
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.actives}
              </p>
            </div>
            <MegaphoneIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Budget utilisé
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatMGA(stats.budgetUtilise)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Impressions
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.impressionsTotal.toLocaleString()}
              </p>
            </div>
            <EyeIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Clics
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.clicsTotal}
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Mes campagnes publicitaires
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Créez et gérez vos campagnes de publicité
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => handleAction(null, 'create')}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouvelle campagne
        </Button>
      </div>

      {/* Liste des campagnes */}
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
                  Budget
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
              {campagnes.map((campagne) => (
                <tr key={campagne.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(campagne.type)}
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {campagne.nom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {campagne.emplacement}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      campagne.type === 'banniere' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : campagne.type === 'video'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    }`}>
                      {campagne.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatMGA(campagne.budgetUtilise)} / {formatMGA(campagne.budget)}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(campagne.budgetUtilise / campagne.budget) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {new Date(campagne.dateDebut).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      au {new Date(campagne.dateFin).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(campagne.statut)}>
                      {getStatusIcon(campagne.statut)}
                      <span className="ml-1">{campagne.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {campagne.performance.impressions.toLocaleString()} vues
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {campagne.performance.clics} clics ({campagne.performance.tauxConversion}%)
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(campagne, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(campagne, 'edit')}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleCampagneStatus(campagne.id)}
                        className={`${campagne.statut === 'active' 
                          ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300' 
                          : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={campagne.statut === 'active' ? 'Mettre en pause' : 'Activer'}
                      >
                        {campagne.statut === 'active' ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => handleAction(campagne, 'delete')}
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
    </div>
  );

  const renderEmplacements = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Emplacements publicitaires disponibles
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choisissez où diffuser vos publicités sur la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emplacements.map((emplacement) => (
          <div key={emplacement.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {emplacement.nom}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {emplacement.description}
                </p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                emplacement.disponible 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {emplacement.disponible ? 'Disponible' : 'Occupé'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Dimensions:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {emplacement.dimensions}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tarif/jour:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatMGA(emplacement.tarifJournalier)}
                </span>
              </div>
              {emplacement.campagneActive && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Campagne:</span>
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {campagnes.find(c => c.id === emplacement.campagneActive)?.nom}
                  </span>
                </div>
              )}
            </div>

            <Button
              variant={emplacement.disponible ? "primary" : "outline"}
              size="sm"
              className="w-full"
              disabled={!emplacement.disponible}
            >
              {emplacement.disponible ? 'Réserver' : 'Occupé'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatistiques = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique de performance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance des campagnes (30 jours)
          </h3>
          <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <ChartBarIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Graphique de performance</p>
              <p className="text-sm">(Fonctionnalité à développer)</p>
            </div>
          </div>
        </div>

        {/* Top campagnes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Meilleures campagnes
          </h3>
          <div className="space-y-4">
            {campagnes
              .filter(c => c.performance.impressions > 0)
              .sort((a, b) => b.performance.tauxConversion - a.performance.tauxConversion)
              .slice(0, 3)
              .map((campagne, index) => (
                <div key={campagne.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {campagne.nom}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {campagne.performance.impressions} impressions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {campagne.performance.tauxConversion}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      conversion
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Résumé financier */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Résumé financier publicitaire
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatMGA(stats.budgetTotal)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Budget total alloué</div>
          </div>
          <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {formatMGA(stats.budgetUtilise)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Budget utilisé</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatMGA(stats.budgetTotal - stats.budgetUtilise)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Budget restant</div>
          </div>
          <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {stats.clicsTotal > 0 ? Math.round(stats.budgetUtilise / stats.clicsTotal) : 0} MGA
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Coût par clic moyen</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {(modalType === 'create' || modalType === 'edit') && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modalType === 'create' ? 'Créer une campagne publicitaire' : 'Modifier la campagne'}
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom de la campagne *
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
                        Type de publicité *
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="banniere">Bannière</option>
                        <option value="carrousel">Carrousel</option>
                        <option value="video">Vidéo</option>
                        <option value="texte">Texte</option>
                        <option value="popup">Pop-up</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Budget (MGA) *
                      </label>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date de début *
                      </label>
                      <input
                        type="date"
                        value={formData.dateDebut}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateDebut: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Date de fin *
                      </label>
                      <input
                        type="date"
                        value={formData.dateFin}
                        onChange={(e) => setFormData(prev => ({ ...prev, dateFin: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Emplacement *
                    </label>
                    <select
                      value={formData.emplacement}
                      onChange={(e) => setFormData(prev => ({ ...prev, emplacement: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="homepage">Page d'accueil</option>
                      <option value="categories">Pages catégories</option>
                      <option value="produits">Pages produits</option>
                      <option value="checkout">Page de commande</option>
                      <option value="global">Global (toutes pages)</option>
                    </select>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                      Contenu publicitaire
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Titre *
                        </label>
                        <input
                          type="text"
                          value={formData.titre}
                          onChange={(e) => setFormData(prev => ({ ...prev, titre: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Lien d'action
                          </label>
                          <input
                            type="url"
                            value={formData.lienAction}
                            onChange={(e) => setFormData(prev => ({ ...prev, lienAction: e.target.value }))}
                            placeholder="/promotions/ma-promo"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Texte du bouton
                          </label>
                          <input
                            type="text"
                            value={formData.texteAction}
                            onChange={(e) => setFormData(prev => ({ ...prev, texteAction: e.target.value }))}
                            placeholder="Voir l'offre"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                      Ciblage audience
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Âge minimum
                          </label>
                          <input
                            type="number"
                            value={formData.ageMin}
                            onChange={(e) => setFormData(prev => ({ ...prev, ageMin: parseInt(e.target.value) }))}
                            min="13"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Âge maximum
                          </label>
                          <input
                            type="number"
                            value={formData.ageMax}
                            onChange={(e) => setFormData(prev => ({ ...prev, ageMax: parseInt(e.target.value) }))}
                            min="13"
                            max="100"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Sexe
                          </label>
                          <select
                            value={formData.sexe}
                            onChange={(e) => setFormData(prev => ({ ...prev, sexe: e.target.value as any }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            <option value="tous">Tous</option>
                            <option value="homme">Homme</option>
                            <option value="femme">Femme</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Localisation (villes séparées par des virgules)
                        </label>
                        <input
                          type="text"
                          value={formData.localisation}
                          onChange={(e) => setFormData(prev => ({ ...prev, localisation: e.target.value }))}
                          placeholder="Antananarivo, Fianarantsoa, Toamasina"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Centres d'intérêt (séparés par des virgules)
                        </label>
                        <input
                          type="text"
                          value={formData.interets}
                          onChange={(e) => setFormData(prev => ({ ...prev, interets: e.target.value }))}
                          placeholder="mode, electronique, sport"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'view' && selectedCampagne && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails de la campagne
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedCampagne.nom}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Type
                        </label>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`}>
                          {selectedCampagne.type}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Statut
                        </label>
                        <span className={getStatusBadge(selectedCampagne.statut)}>
                          {selectedCampagne.statut}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Budget
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {formatMGA(selectedCampagne.budgetUtilise)} / {formatMGA(selectedCampagne.budget)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Période
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        Du {new Date(selectedCampagne.dateDebut).toLocaleDateString('fr-FR')} 
                        au {new Date(selectedCampagne.dateFin).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Performance
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {selectedCampagne.performance.impressions.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Impressions</div>
                        </div>
                        <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {selectedCampagne.performance.clics}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Clics</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                            {selectedCampagne.performance.conversions}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Conversions</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                            {selectedCampagne.performance.tauxConversion}%
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Taux conversion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'delete' && selectedCampagne && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Supprimer la campagne
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      Cette action supprimera définitivement la campagne "{selectedCampagne.nom}" 
                      et toutes ses statistiques.
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
                >
                  {modalType === 'create' ? 'Créer' : modalType === 'edit' ? 'Sauvegarder' : 'Supprimer'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'campagnes', name: 'Mes campagnes', icon: MegaphoneIcon },
    { id: 'emplacements', name: 'Emplacements', icon: GlobeAltIcon },
    { id: 'statistiques', name: 'Statistiques', icon: ChartBarIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Publicité & Marketing
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Créez et gérez vos campagnes publicitaires sur la plateforme
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
      {activeTab === 'campagnes' && renderCampagnes()}
      {activeTab === 'emplacements' && renderEmplacements()}
      {activeTab === 'statistiques' && renderStatistiques()}

      {renderModal()}
    </div>
  );
};