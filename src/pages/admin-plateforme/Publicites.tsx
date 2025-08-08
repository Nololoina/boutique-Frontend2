import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  TrashIcon,
  DocumentArrowDownIcon,
  MegaphoneIcon,
  CalendarIcon,
  BuildingStorefrontIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';

interface Publicite {
  id: string;
  titre: string;
  boutique: string;
  type: 'banniere' | 'texte' | 'carrousel' | 'video';
  statut: 'en-attente' | 'validee' | 'rejetee' | 'expiree';
  dateSubmission: string;
  dateValidation?: string;
  dateExpiration: string;
  description: string;
  contenu: string;
  duree: number; // en jours
  motifRejet?: string;
}

const mockPublicites: Publicite[] = [
  {
    id: 'PUB001',
    titre: 'Promotion Électronique - 50% de réduction',
    boutique: 'Tech Plus',
    type: 'banniere',
    statut: 'en-attente',
    dateSubmission: '2024-12-20',
    dateExpiration: '2024-12-30',
    description: 'Grande promotion sur tous les produits électroniques',
    contenu: 'Bannière promotionnelle avec réduction de 50%',
    duree: 10
  },
  {
    id: 'PUB002',
    titre: 'Collection Mode Été 2025',
    boutique: 'Fashion Style',
    type: 'carrousel',
    statut: 'validee',
    dateSubmission: '2024-12-18',
    dateValidation: '2024-12-19',
    dateExpiration: '2025-01-15',
    description: 'Nouvelle collection mode pour l\'été',
    contenu: 'Carrousel avec 5 images de la nouvelle collection',
    duree: 28
  },
  {
    id: 'PUB003',
    titre: 'Produits Bio - Épicerie Moderne',
    boutique: 'Épicerie Moderne',
    type: 'texte',
    statut: 'rejetee',
    dateSubmission: '2024-12-15',
    dateExpiration: '2024-12-25',
    description: 'Promotion sur les produits biologiques',
    contenu: 'Texte promotionnel pour produits bio',
    duree: 10,
    motifRejet: 'Contenu non conforme aux standards publicitaires'
  },
  {
    id: 'PUB004',
    titre: 'Déco Maison - Soldes d\'hiver',
    boutique: 'Maison & Jardin',
    type: 'video',
    statut: 'expiree',
    dateSubmission: '2024-11-20',
    dateValidation: '2024-11-21',
    dateExpiration: '2024-12-15',
    description: 'Soldes d\'hiver sur la décoration',
    contenu: 'Vidéo promotionnelle de 30 secondes',
    duree: 25
  }
];

export const Publicites: React.FC = () => {
  const [publicites, setPublicites] = useState<Publicite[]>(mockPublicites);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [typeFilter, setTypeFilter] = useState<string>('tous');
  const [selectedPub, setSelectedPub] = useState<Publicite | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'validate' | 'reject' | 'delete'>('view');
  const [rejectReason, setRejectReason] = useState('');

  const filteredPublicites = publicites.filter(pub => {
    const matchesSearch = pub.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pub.boutique.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || pub.statut === statusFilter;
    const matchesType = typeFilter === 'tous' || pub.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'validee':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejetee':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'expiree':
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
      case 'en-attente':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'validee':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'rejetee':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'expiree':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      case 'en-attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      default:
        return baseClasses;
    }
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (type) {
      case 'banniere':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'carrousel':
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
      case 'texte':
        return `${baseClasses} bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200`;
      case 'video':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
      default:
        return baseClasses;
    }
  };

  const handleAction = (pub: Publicite, action: typeof modalType) => {
    setSelectedPub(pub);
    setModalType(action);
    setShowModal(true);
    if (action === 'reject') {
      setRejectReason('');
    }
  };

  const confirmAction = () => {
    if (!selectedPub) return;

    switch (modalType) {
      case 'validate':
        setPublicites(prev => prev.map(p => 
          p.id === selectedPub.id ? { 
            ...p, 
            statut: 'validee' as const,
            dateValidation: new Date().toISOString().split('T')[0]
          } : p
        ));
        break;
      case 'reject':
        setPublicites(prev => prev.map(p => 
          p.id === selectedPub.id ? { 
            ...p, 
            statut: 'rejetee' as const,
            motifRejet: rejectReason
          } : p
        ));
        break;
      case 'delete':
        setPublicites(prev => prev.filter(p => p.id !== selectedPub.id));
        break;
    }
    setShowModal(false);
    setSelectedPub(null);
  };

  const stats = {
    total: publicites.length,
    enAttente: publicites.filter(p => p.statut === 'en-attente').length,
    validees: publicites.filter(p => p.statut === 'validee').length,
    rejetees: publicites.filter(p => p.statut === 'rejetee').length,
    expirees: publicites.filter(p => p.statut === 'expiree').length
  };

  const renderModal = () => {
    if (!showModal || !selectedPub) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails de la publicité
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Titre
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPub.titre}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Boutique émettrice
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPub.boutique}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Type de publicité
                      </label>
                      <span className={getTypeBadge(selectedPub.type)}>
                        {selectedPub.type}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Statut
                      </label>
                      <span className={getStatusBadge(selectedPub.statut)}>
                        {getStatusIcon(selectedPub.statut)}
                        <span className="ml-1">{selectedPub.statut}</span>
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedPub.description}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contenu
                    </label>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-900 dark:text-white">{selectedPub.contenu}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date de soumission
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedPub.dateSubmission).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Date d'expiration
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedPub.dateExpiration).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Durée souhaitée
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedPub.duree} jours</p>
                    </div>
                  </div>

                  {selectedPub.motifRejet && (
                    <div>
                      <label className="block text-sm font-medium text-red-700 dark:text-red-400">
                        Motif de rejet
                      </label>
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                        <p className="text-red-700 dark:text-red-400">{selectedPub.motifRejet}</p>
                      </div>
                    </div>
                  )}

                  {/* Prévisualisation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Prévisualisation
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                      <MegaphoneIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Prévisualisation de la publicité "{selectedPub.type}"
                      </p>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Mode simulation d'affichage sur la plateforme
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'validate' && (
              <>
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4">
                  Validation de la publicité
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Êtes-vous sûr de vouloir valider la publicité "{selectedPub.titre}" de la boutique "{selectedPub.boutique}" ?
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p className="text-green-700 dark:text-green-400">
                      La publicité sera immédiatement diffusée sur la plateforme après validation.
                    </p>
                  </div>
                </div>
              </>
            )}

            {modalType === 'reject' && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Rejet de la publicité
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Publicité : "{selectedPub.titre}" de "{selectedPub.boutique}"
                </p>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Motif du rejet *
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                    placeholder="Expliquez pourquoi cette publicité est rejetée..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-4">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      La boutique sera automatiquement notifiée du rejet avec le motif fourni.
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
                      Cette action est irréversible. La publicité "{selectedPub.titre}" sera définitivement supprimée.
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
                  variant={modalType === 'delete' ? 'danger' : modalType === 'validate' ? 'secondary' : 'danger'}
                  onClick={confirmAction}
                  disabled={modalType === 'reject' && !rejectReason.trim()}
                >
                  {modalType === 'validate' ? 'Valider' : modalType === 'reject' ? 'Rejeter' : 'Supprimer'}
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
            Publicité Globale
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestion des publicités proposées par les boutiques
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + 
                "ID,Titre,Boutique,Type,Statut,Date Soumission,Date Expiration\n" +
                publicites.map(p => `${p.id},${p.titre},${p.boutique},${p.type},${p.statut},${p.dateSubmission},${p.dateExpiration}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "publicites_export.csv");
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

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total publicités
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <MegaphoneIcon className="h-8 w-8 text-blue-500" />
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
                Validées
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.validees}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rejetées
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.rejetees}
              </p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Expirées
              </p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {stats.expirees}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-gray-500" />
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
                placeholder="Rechercher par titre ou boutique..."
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
              <option value="validee">Validée</option>
              <option value="rejetee">Rejetée</option>
              <option value="expiree">Expirée</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les types</option>
              <option value="banniere">Bannière</option>
              <option value="carrousel">Carrousel</option>
              <option value="texte">Texte</option>
              <option value="video">Vidéo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des publicités */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Publicité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Boutique
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPublicites.map((pub) => (
                <tr key={pub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {pub.titre}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {pub.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <BuildingStorefrontIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 dark:text-white">
                        {pub.boutique}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getTypeBadge(pub.type)}>
                      {pub.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(pub.statut)}>
                      {getStatusIcon(pub.statut)}
                      <span className="ml-1">{pub.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      Soumis: {new Date(pub.dateSubmission).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Expire: {new Date(pub.dateExpiration).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(pub, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {pub.statut === 'en-attente' && (
                        <>
                          <button
                            onClick={() => handleAction(pub, 'validate')}
                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            title="Valider"
                          >
                            <CheckIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAction(pub, 'reject')}
                            className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            title="Rejeter"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleAction(pub, 'delete')}
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
                Publicité "Collection Mode Été 2025" validée par Admin Paul
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 2 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Publicité "Produits Bio" rejetée - Contenu non conforme
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 5 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Publicité "Déco Maison" expirée automatiquement
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hier à 23:59
              </p>
            </div>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};