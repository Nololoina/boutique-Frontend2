import React, { useState } from 'react';
import {
  DocumentTextIcon,
  PhotoIcon,
  VideoCameraIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon,
  GlobeAltIcon,
  CogIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  LinkIcon,
  TagIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowUpTrayIcon,
  Squares2X2Icon,
  ListBulletIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/common/Button';

interface PageContenu {
  id: string;
  titre: string;
  slug: string;
  type: 'page-statique' | 'blog' | 'actualite';
  contenu: string;
  statut: 'publie' | 'brouillon' | 'archive';
  dateCreation: string;
  derniereModification: string;
  vues: number;
  seo: {
    metaTitre: string;
    metaDescription: string;
    imagePartage?: string;
  };
  langue: 'fr' | 'mg' | 'en';
}

interface BlocDynamique {
  id: string;
  nom: string;
  type: 'produits-vedette' | 'nouveautes' | 'promotions' | 'temoignages' | 'galerie';
  position: number;
  actif: boolean;
  configuration: {
    nombreElements?: number;
    triAutomatique?: boolean;
    produitsManuels?: string[];
    titre?: string;
    sousTitre?: string;
  };
}

interface ConfigurationBoutique {
  nom: string;
  slogan: string;
  description: string;
  logo?: string;
  banniere?: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  police: string;
  horaires: {
    lundi: { ouvert: boolean; heures: string };
    mardi: { ouvert: boolean; heures: string };
    mercredi: { ouvert: boolean; heures: string };
    jeudi: { ouvert: boolean; heures: string };
    vendredi: { ouvert: boolean; heures: string };
    samedi: { ouvert: boolean; heures: string };
    dimanche: { ouvert: boolean; heures: string };
  };
  reseauxSociaux: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  urlPersonnalisee: string;
  multiLangue: boolean;
}

const mockPages: PageContenu[] = [
  {
    id: 'PAGE001',
    titre: 'À propos de notre boutique',
    slug: 'a-propos',
    type: 'page-statique',
    contenu: 'Notre boutique existe depuis 2020 et propose des produits de qualité...',
    statut: 'publie',
    dateCreation: '2024-11-01',
    derniereModification: '2024-12-15',
    vues: 245,
    seo: {
      metaTitre: 'À propos - Notre histoire et nos valeurs',
      metaDescription: 'Découvrez l\'histoire de notre boutique et nos valeurs'
    },
    langue: 'fr'
  },
  {
    id: 'PAGE002',
    titre: 'Conditions de vente',
    slug: 'conditions-vente',
    type: 'page-statique',
    contenu: 'Nos conditions générales de vente...',
    statut: 'publie',
    dateCreation: '2024-11-05',
    derniereModification: '2024-11-05',
    vues: 89,
    seo: {
      metaTitre: 'Conditions générales de vente',
      metaDescription: 'Consultez nos conditions de vente et de livraison'
    },
    langue: 'fr'
  },
  {
    id: 'PAGE003',
    titre: 'Nouveautés de décembre',
    slug: 'nouveautes-decembre-2024',
    type: 'blog',
    contenu: 'Découvrez nos dernières nouveautés pour ce mois de décembre...',
    statut: 'brouillon',
    dateCreation: '2024-12-18',
    derniereModification: '2024-12-20',
    vues: 0,
    seo: {
      metaTitre: 'Nouveautés décembre 2024',
      metaDescription: 'Découvrez nos derniers produits arrivés en décembre'
    },
    langue: 'fr'
  }
];

const mockBlocs: BlocDynamique[] = [
  {
    id: 'BLOC001',
    nom: 'Produits en vedette',
    type: 'produits-vedette',
    position: 1,
    actif: true,
    configuration: {
      nombreElements: 4,
      triAutomatique: true,
      titre: 'Nos coups de cœur',
      sousTitre: 'Sélection de nos meilleurs produits'
    }
  },
  {
    id: 'BLOC002',
    nom: 'Dernières nouveautés',
    type: 'nouveautes',
    position: 2,
    actif: true,
    configuration: {
      nombreElements: 6,
      triAutomatique: true,
      titre: 'Nouveautés',
      sousTitre: 'Découvrez nos derniers arrivages'
    }
  },
  {
    id: 'BLOC003',
    nom: 'Promotions en cours',
    type: 'promotions',
    position: 3,
    actif: false,
    configuration: {
      nombreElements: 3,
      titre: 'Offres spéciales',
      sousTitre: 'Profitez de nos promotions'
    }
  }
];

const mockConfiguration: ConfigurationBoutique = {
  nom: 'Ma Boutique Demo',
  slogan: 'Qualité et service depuis 2020',
  description: 'Nous proposons une large gamme de produits de qualité avec un service client exceptionnel.',
  couleurPrimaire: '#3B82F6',
  couleurSecondaire: '#10B981',
  police: 'Inter',
  horaires: {
    lundi: { ouvert: true, heures: '08:00-18:00' },
    mardi: { ouvert: true, heures: '08:00-18:00' },
    mercredi: { ouvert: true, heures: '08:00-18:00' },
    jeudi: { ouvert: true, heures: '08:00-18:00' },
    vendredi: { ouvert: true, heures: '08:00-18:00' },
    samedi: { ouvert: true, heures: '09:00-17:00' },
    dimanche: { ouvert: false, heures: '' }
  },
  reseauxSociaux: {
    facebook: 'https://facebook.com/maboutique',
    instagram: 'https://instagram.com/maboutique'
  },
  urlPersonnalisee: 'ma-boutique-demo',
  multiLangue: false
};

export const Contenu: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [pages, setPages] = useState<PageContenu[]>(mockPages);
  const [blocs, setBlocs] = useState<BlocDynamique[]>(mockBlocs);
  const [configuration, setConfiguration] = useState<ConfigurationBoutique>(mockConfiguration);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [selectedPage, setSelectedPage] = useState<PageContenu | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'create' | 'seo'>('view');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [formData, setFormData] = useState({
    titre: '',
    slug: '',
    type: 'page-statique' as const,
    contenu: '',
    metaTitre: '',
    metaDescription: '',
    langue: 'fr' as const
  });

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.contenu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || page.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'publie':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'brouillon':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'archive':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'publie':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'brouillon':
        return <ClockIcon className="h-4 w-4" />;
      case 'archive':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'page-statique':
        return <DocumentTextIcon className="h-4 w-4" />;
      case 'blog':
        return <PencilIcon className="h-4 w-4" />;
      case 'actualite':
        return <MegaphoneIcon className="h-4 w-4" />;
      default:
        return <DocumentTextIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (page: PageContenu | null, action: typeof modalType) => {
    setSelectedPage(page);
    setModalType(action);
    if (action === 'create') {
      setFormData({
        titre: '',
        slug: '',
        type: 'page-statique',
        contenu: '',
        metaTitre: '',
        metaDescription: '',
        langue: 'fr'
      });
    } else if (action === 'edit' && page) {
      setFormData({
        titre: page.titre,
        slug: page.slug,
        type: page.type,
        contenu: page.contenu,
        metaTitre: page.seo.metaTitre,
        metaDescription: page.seo.metaDescription,
        langue: page.langue
      });
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    switch (modalType) {
      case 'create':
        const newPage: PageContenu = {
          id: `PAGE${String(pages.length + 1).padStart(3, '0')}`,
          titre: formData.titre,
          slug: formData.slug,
          type: formData.type,
          contenu: formData.contenu,
          statut: 'brouillon',
          dateCreation: new Date().toISOString().split('T')[0],
          derniereModification: new Date().toISOString().split('T')[0],
          vues: 0,
          seo: {
            metaTitre: formData.metaTitre,
            metaDescription: formData.metaDescription
          },
          langue: formData.langue
        };
        setPages(prev => [...prev, newPage]);
        break;
      case 'edit':
        if (selectedPage) {
          setPages(prev => prev.map(p => 
            p.id === selectedPage.id ? {
              ...p,
              titre: formData.titre,
              slug: formData.slug,
              type: formData.type,
              contenu: formData.contenu,
              seo: {
                ...p.seo,
                metaTitre: formData.metaTitre,
                metaDescription: formData.metaDescription
              },
              langue: formData.langue,
              derniereModification: new Date().toISOString().split('T')[0]
            } : p
          ));
        }
        break;
      case 'delete':
        if (selectedPage) {
          setPages(prev => prev.filter(p => p.id !== selectedPage.id));
        }
        break;
    }
    setShowModal(false);
    setSelectedPage(null);
  };

  const togglePageStatus = (pageId: string) => {
    setPages(prev => prev.map(p => 
      p.id === pageId ? {
        ...p,
        statut: p.statut === 'publie' ? 'brouillon' as const : 'publie' as const,
        derniereModification: new Date().toISOString().split('T')[0]
      } : p
    ));
  };

  const toggleBlocStatus = (blocId: string) => {
    setBlocs(prev => prev.map(b => 
      b.id === blocId ? { ...b, actif: !b.actif } : b
    ));
  };

  const renderPages = () => (
    <div className="space-y-6">
      {/* Header avec actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Pages de contenu
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gérez vos pages statiques, blog et actualités
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 border border-gray-300 dark:border-gray-600 rounded-lg">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-400'}`}
            >
              <ListBulletIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' : 'text-gray-400'}`}
            >
              <Squares2X2Icon className="h-4 w-4" />
            </button>
          </div>
          <Button variant="primary" size="sm" onClick={() => handleAction(null, 'create')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nouvelle page
          </Button>
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
                placeholder="Rechercher dans les pages..."
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
              <option value="publie">Publié</option>
              <option value="brouillon">Brouillon</option>
              <option value="archive">Archivé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste/Grille des pages */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Vues
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Modifiée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {getTypeIcon(page.type)}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {page.titre}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            /{page.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        page.type === 'page-statique' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : page.type === 'blog'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          : 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      }`}>
                        {page.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(page.statut)}>
                        {getStatusIcon(page.statut)}
                        <span className="ml-1">{page.statut}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {page.vues}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(page.derniereModification).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAction(page, 'view')}
                          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          title="Voir"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleAction(page, 'edit')}
                          className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          title="Modifier"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => togglePageStatus(page.id)}
                          className={`${page.statut === 'publie' 
                            ? 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300' 
                            : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                          }`}
                          title={page.statut === 'publie' ? 'Dépublier' : 'Publier'}
                        >
                          {page.statut === 'publie' ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleAction(page, 'delete')}
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <div key={page.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getTypeIcon(page.type)}
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {page.titre}
                  </h4>
                </div>
                <span className={getStatusBadge(page.statut)}>
                  {page.statut}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {page.contenu}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <span>{page.vues} vues</span>
                <span>{new Date(page.derniereModification).toLocaleDateString('fr-FR')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleAction(page, 'edit')}>
                  Modifier
                </Button>
                <Button 
                  variant={page.statut === 'publie' ? 'outline' : 'primary'} 
                  size="sm"
                  onClick={() => togglePageStatus(page.id)}
                >
                  {page.statut === 'publie' ? 'Dépublier' : 'Publier'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderBlocs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Blocs dynamiques
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configurez l'affichage automatique de vos produits
          </p>
        </div>
        <Button variant="primary" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouveau bloc
        </Button>
      </div>

      <div className="space-y-4">
        {blocs.map((bloc) => (
          <div key={bloc.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    #{bloc.position}
                  </span>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {bloc.nom}
                  </h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    bloc.type === 'produits-vedette' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : bloc.type === 'nouveautes'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : bloc.type === 'promotions'
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {bloc.type}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleBlocStatus(bloc.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    bloc.actif ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      bloc.actif ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <Button variant="outline" size="sm">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Configurer
                </Button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500 dark:text-gray-400">Éléments:</span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {bloc.configuration.nombreElements || 'Auto'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Tri:</span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {bloc.configuration.triAutomatique ? 'Automatique' : 'Manuel'}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400">Statut:</span>
                <span className={`ml-2 ${bloc.actif ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {bloc.actif ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderConfiguration = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informations générales */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CogIcon className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Informations générales
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nom de la boutique
              </label>
              <input
                type="text"
                value={configuration.nom}
                onChange={(e) => setConfiguration(prev => ({ ...prev, nom: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slogan
              </label>
              <input
                type="text"
                value={configuration.slogan}
                onChange={(e) => setConfiguration(prev => ({ ...prev, slogan: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={configuration.description}
                onChange={(e) => setConfiguration(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                URL personnalisée
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-sm">
                  plateforme.mg/
                </span>
                <input
                  type="text"
                  value={configuration.urlPersonnalisee}
                  onChange={(e) => setConfiguration(prev => ({ ...prev, urlPersonnalisee: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Apparence */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PaintBrushIcon className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Apparence
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" size="sm">
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                  Changer
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Couleur primaire
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={configuration.couleurPrimaire}
                    onChange={(e) => setConfiguration(prev => ({ ...prev, couleurPrimaire: e.target.value }))}
                    className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    value={configuration.couleurPrimaire}
                    onChange={(e) => setConfiguration(prev => ({ ...prev, couleurPrimaire: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Couleur secondaire
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={configuration.couleurSecondaire}
                    onChange={(e) => setConfiguration(prev => ({ ...prev, couleurSecondaire: e.target.value }))}
                    className="w-10 h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    value={configuration.couleurSecondaire}
                    onChange={(e) => setConfiguration(prev => ({ ...prev, couleurSecondaire: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Police de caractères
              </label>
              <select
                value={configuration.police}
                onChange={(e) => setConfiguration(prev => ({ ...prev, police: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <LinkIcon className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Réseaux sociaux
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={configuration.reseauxSociaux.facebook || ''}
                onChange={(e) => setConfiguration(prev => ({ 
                  ...prev, 
                  reseauxSociaux: { ...prev.reseauxSociaux, facebook: e.target.value }
                }))}
                placeholder="https://facebook.com/maboutique"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={configuration.reseauxSociaux.instagram || ''}
                onChange={(e) => setConfiguration(prev => ({ 
                  ...prev, 
                  reseauxSociaux: { ...prev.reseauxSociaux, instagram: e.target.value }
                }))}
                placeholder="https://instagram.com/maboutique"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Horaires */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ClockIcon className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Horaires d'ouverture
            </h3>
          </div>
          <div className="space-y-3">
            {Object.entries(configuration.horaires).map(([jour, horaire]) => (
              <div key={jour} className="flex items-center space-x-4">
                <div className="w-20">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                    {jour}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={horaire.ouvert}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      horaires: {
                        ...prev.horaires,
                        [jour]: { ...horaire, ouvert: e.target.checked }
                      }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ouvert</span>
                </div>
                {horaire.ouvert && (
                  <input
                    type="text"
                    value={horaire.heures}
                    onChange={(e) => setConfiguration(prev => ({
                      ...prev,
                      horaires: {
                        ...prev.horaires,
                        [jour]: { ...horaire, heures: e.target.value }
                      }
                    }))}
                    placeholder="08:00-18:00"
                    className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="primary">
          Sauvegarder la configuration
        </Button>
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
                  {modalType === 'create' ? 'Créer une nouvelle page' : 'Modifier la page'}
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                        Slug URL *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Type de page
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="page-statique">Page statique</option>
                        <option value="blog">Article de blog</option>
                        <option value="actualite">Actualité</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Langue
                      </label>
                      <select
                        value={formData.langue}
                        onChange={(e) => setFormData(prev => ({ ...prev, langue: e.target.value as any }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="fr">Français</option>
                        <option value="mg">Malagasy</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contenu
                    </label>
                    <textarea
                      value={formData.contenu}
                      onChange={(e) => setFormData(prev => ({ ...prev, contenu: e.target.value }))}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
                      Paramètres SEO
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Meta titre
                        </label>
                        <input
                          type="text"
                          value={formData.metaTitre}
                          onChange={(e) => setFormData(prev => ({ ...prev, metaTitre: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Meta description
                        </label>
                        <textarea
                          value={formData.metaDescription}
                          onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'view' && selectedPage && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Aperçu de la page
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Titre
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPage.titre}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        URL
                      </label>
                      <p className="text-blue-600 dark:text-blue-400">/{selectedPage.slug}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contenu
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-64 overflow-y-auto">
                      <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
                        {selectedPage.contenu}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Vues
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPage.vues}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Dernière modification
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedPage.derniereModification).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'delete' && selectedPage && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Supprimer la page
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Êtes-vous sûr de vouloir supprimer la page "{selectedPage.titre}" ? Cette action est irréversible.
                </p>
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
    { id: 'pages', name: 'Pages de contenu', icon: DocumentTextIcon },
    { id: 'blocs', name: 'Blocs dynamiques', icon: Squares2X2Icon },
    { id: 'config', name: 'Configuration', icon: CogIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contenu & Présentation
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personnalisez l'apparence et le contenu de votre boutique
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
      {activeTab === 'pages' && renderPages()}
      {activeTab === 'blocs' && renderBlocs()}
      {activeTab === 'config' && renderConfiguration()}

      {renderModal()}
    </div>
  );
};