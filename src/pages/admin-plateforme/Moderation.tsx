import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  DocumentArrowDownIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  FlagIcon,
  UserIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';

interface ContenuModeration {
  id: string;
  auteur: string;
  roleAuteur: 'client' | 'admin-boutique';
  typeContenu: 'avis' | 'commentaire' | 'signalement';
  contenu: string;
  cible: string;
  typeCible: 'boutique' | 'produit' | 'fonctionnalite';
  statut: 'en-attente' | 'approuve' | 'rejete';
  datePublication: string;
  motifRejet?: string;
  priorite: 'basse' | 'moyenne' | 'haute';
}

const mockContenus: ContenuModeration[] = [
  {
    id: 'MOD001',
    auteur: 'Jean Rakoto',
    roleAuteur: 'client',
    typeContenu: 'avis',
    contenu: 'Excellent service, livraison rapide et produits de qualité. Je recommande vivement cette boutique !',
    cible: 'Tech Plus',
    typeCible: 'boutique',
    statut: 'en-attente',
    datePublication: '2024-12-20',
    priorite: 'basse'
  },
  {
    id: 'MOD002',
    auteur: 'Marie Andry',
    roleAuteur: 'client',
    typeContenu: 'signalement',
    contenu: 'Cette boutique vend des produits contrefaits. J\'ai reçu un téléphone qui ne fonctionne pas correctement.',
    cible: 'Fashion Style',
    typeCible: 'boutique',
    statut: 'en-attente',
    datePublication: '2024-12-19',
    priorite: 'haute'
  },
  {
    id: 'MOD003',
    auteur: 'Paul Rabe',
    roleAuteur: 'admin-boutique',
    typeContenu: 'commentaire',
    contenu: 'Merci pour votre avis ! Nous nous efforçons toujours d\'améliorer nos services.',
    cible: 'Smartphone XYZ',
    typeCible: 'produit',
    statut: 'approuve',
    datePublication: '2024-12-18',
    priorite: 'basse'
  },
  {
    id: 'MOD004',
    auteur: 'Sophie Hery',
    roleAuteur: 'client',
    typeContenu: 'avis',
    contenu: 'Produit de mauvaise qualité, service client inexistant. À éviter absolument !',
    cible: 'Épicerie Moderne',
    typeCible: 'boutique',
    statut: 'rejete',
    datePublication: '2024-12-17',
    motifRejet: 'Propos diffamatoires sans preuves',
    priorite: 'moyenne'
  }
];

const mockSignalements = [
  {
    id: 'SIG001',
    type: 'Boutique inappropriée',
    description: 'Vente de produits interdits',
    cible: 'Boutique XYZ',
    statut: 'en-cours',
    date: '2024-12-20'
  },
  {
    id: 'SIG002',
    type: 'Contenu offensant',
    description: 'Commentaire à caractère discriminatoire',
    cible: 'Avis produit ABC',
    statut: 'traite',
    date: '2024-12-19'
  }
];

export const Moderation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('contenus');
  const [contenus, setContenus] = useState<ContenuModeration[]>(mockContenus);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [typeFilter, setTypeFilter] = useState<string>('tous');
  const [priorityFilter, setPriorityFilter] = useState<string>('tous');
  const [selectedContent, setSelectedContent] = useState<ContenuModeration | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'approve' | 'reject' | 'delete'>('view');
  const [rejectReason, setRejectReason] = useState('');

  const filteredContenus = contenus.filter(contenu => {
    const matchesSearch = contenu.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contenu.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contenu.cible.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || contenu.statut === statusFilter;
    const matchesType = typeFilter === 'tous' || contenu.typeContenu === typeFilter;
    const matchesPriority = priorityFilter === 'tous' || contenu.priorite === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'approuve':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejete':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'en-attente':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'approuve':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'rejete':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'en-attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      default:
        return baseClasses;
    }
  };

  const getPriorityBadge = (priorite: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (priorite) {
      case 'haute':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'moyenne':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'basse':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      default:
        return baseClasses;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'avis':
        return <StarIcon className="h-4 w-4" />;
      case 'commentaire':
        return <ChatBubbleLeftRightIcon className="h-4 w-4" />;
      case 'signalement':
        return <FlagIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const handleAction = (contenu: ContenuModeration, action: typeof modalType) => {
    setSelectedContent(contenu);
    setModalType(action);
    setShowModal(true);
    if (action === 'reject') {
      setRejectReason('');
    }
  };

  const confirmAction = () => {
    if (!selectedContent) return;

    switch (modalType) {
      case 'approve':
        setContenus(prev => prev.map(c => 
          c.id === selectedContent.id ? { ...c, statut: 'approuve' as const } : c
        ));
        break;
      case 'reject':
        setContenus(prev => prev.map(c => 
          c.id === selectedContent.id ? { 
            ...c, 
            statut: 'rejete' as const,
            motifRejet: rejectReason
          } : c
        ));
        break;
      case 'delete':
        setContenus(prev => prev.filter(c => c.id !== selectedContent.id));
        break;
    }
    setShowModal(false);
    setSelectedContent(null);
  };

  const stats = {
    total: contenus.length,
    enAttente: contenus.filter(c => c.statut === 'en-attente').length,
    approuves: contenus.filter(c => c.statut === 'approuve').length,
    rejetes: contenus.filter(c => c.statut === 'rejete').length,
    signalements: mockSignalements.filter(s => s.statut === 'en-cours').length
  };

  const renderContenus = () => (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total contenus
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <ShieldCheckIcon className="h-8 w-8 text-blue-500" />
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
                Approuvés
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.approuves}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rejetés
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.rejetes}
              </p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Signalements
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.signalements}
              </p>
            </div>
            <FlagIcon className="h-8 w-8 text-orange-500" />
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
                placeholder="Rechercher dans les contenus..."
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
              <option value="en-attente">En attente</option>
              <option value="approuve">Approuvé</option>
              <option value="rejete">Rejeté</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les types</option>
              <option value="avis">Avis</option>
              <option value="commentaire">Commentaire</option>
              <option value="signalement">Signalement</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes priorités</option>
              <option value="haute">Haute</option>
              <option value="moyenne">Moyenne</option>
              <option value="basse">Basse</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des contenus */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contenu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cible
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priorité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContenus.map((contenu) => (
                <tr key={contenu.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {contenu.contenu.substring(0, 100)}...
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {contenu.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          {contenu.auteur}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {contenu.roleAuteur}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getTypeIcon(contenu.typeContenu)}
                      <span className="ml-2 text-sm text-gray-900 dark:text-white">
                        {contenu.typeContenu}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {contenu.cible}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {contenu.typeCible}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(contenu.statut)}>
                      {getStatusIcon(contenu.statut)}
                      <span className="ml-1">{contenu.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getPriorityBadge(contenu.priorite)}>
                      {contenu.priorite}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(contenu, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {contenu.statut === 'en-attente' && (
                        <>
                          <button
                            onClick={() => handleAction(contenu, 'approve')}
                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            title="Approuver"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAction(contenu, 'reject')}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            title="Rejeter"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleAction(contenu, 'delete')}
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

  const renderSignalements = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Signalements des visiteurs
        </h3>
        <div className="space-y-4">
          {mockSignalements.map((signalement) => (
            <div
              key={signalement.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <FlagIcon className="h-5 w-5 text-orange-500" />
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {signalement.type}
                    </h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      signalement.statut === 'en-cours'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {signalement.statut}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {signalement.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>Cible: {signalement.cible}</span>
                    <span>Date: {new Date(signalement.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    Examiner
                  </Button>
                  <Button variant="primary" size="sm">
                    Traiter
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal || !selectedContent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails du contenu
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Auteur
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedContent.auteur}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedContent.roleAuteur}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Type de contenu
                      </label>
                      <div className="flex items-center">
                        {getTypeIcon(selectedContent.typeContenu)}
                        <span className="ml-2 text-gray-900 dark:text-white">{selectedContent.typeContenu}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contenu complet
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-900 dark:text-white">{selectedContent.contenu}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cible
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedContent.cible}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedContent.typeCible}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Statut
                      </label>
                      <span className={getStatusBadge(selectedContent.statut)}>
                        {getStatusIcon(selectedContent.statut)}
                        <span className="ml-1">{selectedContent.statut}</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date de publication
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedContent.datePublication).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Priorité
                      </label>
                      <span className={getPriorityBadge(selectedContent.priorite)}>
                        {selectedContent.priorite}
                      </span>
                    </div>
                  </div>

                  {selectedContent.motifRejet && (
                    <div>
                      <label className="block text-sm font-medium text-red-700 dark:text-red-400">
                        Motif de rejet
                      </label>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-red-700 dark:text-red-400">{selectedContent.motifRejet}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {modalType === 'approve' && (
              <>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                  Approbation du contenu
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Êtes-vous sûr de vouloir approuver ce contenu de "{selectedContent.auteur}" ?
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-700 dark:text-green-400">
                      Le contenu sera visible sur la plateforme après approbation.
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === 'reject' && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Rejet du contenu
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Contenu de "{selectedContent.auteur}"
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Motif du rejet *
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                    placeholder="Expliquez pourquoi ce contenu est rejeté..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      L'auteur sera automatiquement notifié du rejet avec le motif fourni.
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === 'delete' && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Suppression définitive
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      Cette action est irréversible. Le contenu sera définitivement supprimé.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </Button>
              {modalType !== 'view' && (
                <Button
                  variant={modalType === 'delete' ? 'danger' : modalType === 'approve' ? 'secondary' : 'danger'}
                  onClick={confirmAction}
                  disabled={modalType === 'reject' && !rejectReason.trim()}
                >
                  {modalType === 'approve' ? 'Approuver' : modalType === 'reject' ? 'Rejeter' : 'Supprimer'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'contenus', name: 'Contenus à modérer', icon: ShieldCheckIcon },
    { id: 'signalements', name: 'Signalements', icon: FlagIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Modération
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Contrôle et validation des contenus utilisateurs
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + 
                "ID,Auteur,Type,Contenu,Statut,Date,Priorite\n" +
                contenus.map(c => `${c.id},${c.auteur},${c.typeContenu},"${c.contenu.substring(0,50)}...",${c.statut},${c.datePublication},${c.priorite}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "moderation_export.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
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
      {activeTab === 'contenus' && renderContenus()}
      {activeTab === 'signalements' && renderSignalements()}

      {/* Journal d'activités */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Journal de modération récent
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Avis de "Jean Rakoto" approuvé par Modérateur Sophie
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 1 heure
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Commentaire rejeté - Propos inappropriés
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 3 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Signalement traité - Boutique vérifiée conforme
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 5 heures
              </p>
            </div>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};