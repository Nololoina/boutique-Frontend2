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
  BuildingStorefrontIcon,
  UserIcon,
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';

interface Boutique {
  id: string;
  nom: string;
  responsable: string;
  email: string;
  telephone: string;
  dateInscription: string;
  statut: 'actif' | 'inactif' | 'en-attente';
  adminReferent: string;
  categorie: string;
  description: string;
  derniereActivite: string;
}

const mockBoutiques: Boutique[] = [
  {
    id: 'B001',
    nom: 'Épicerie Moderne',
    responsable: 'Jean Rakoto',
    email: 'jean@epicerie-moderne.mg',
    telephone: '+261 32 12 345 67',
    dateInscription: '2024-01-15',
    statut: 'actif',
    adminReferent: 'Admin Paul',
    categorie: 'Alimentation',
    description: 'Épicerie de quartier avec produits frais',
    derniereActivite: '2024-12-20'
  },
  {
    id: 'B002',
    nom: 'Fashion Style',
    responsable: 'Marie Andry',
    email: 'marie@fashion-style.mg',
    telephone: '+261 33 98 765 43',
    dateInscription: '2024-02-20',
    statut: 'en-attente',
    adminReferent: 'Admin Sophie',
    categorie: 'Mode',
    description: 'Boutique de mode tendance',
    derniereActivite: '2024-12-19'
  },
  {
    id: 'B003',
    nom: 'Tech Plus',
    responsable: 'Paul Rabe',
    email: 'paul@tech-plus.mg',
    telephone: '+261 34 55 666 77',
    dateInscription: '2024-03-10',
    statut: 'inactif',
    adminReferent: 'Admin Marie',
    categorie: 'Électronique',
    description: 'Matériel informatique et électronique',
    derniereActivite: '2024-12-18'
  }
];

export const GestionBoutiques: React.FC = () => {
  const [boutiques, setBoutiques] = useState<Boutique[]>(mockBoutiques);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [selectedBoutique, setSelectedBoutique] = useState<Boutique | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'activate' | 'deactivate'>('view');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBoutiques = boutiques.filter(boutique => {
    const matchesSearch = boutique.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         boutique.responsable.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         boutique.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || boutique.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'inactif':
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
      case 'actif':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'inactif':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'en-attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      default:
        return baseClasses;
    }
  };

  const handleAction = (boutique: Boutique, action: 'view' | 'edit' | 'delete' | 'activate' | 'deactivate') => {
    setSelectedBoutique(boutique);
    setModalType(action);
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedBoutique) return;

    switch (modalType) {
      case 'activate':
        setBoutiques(prev => prev.map(b => 
          b.id === selectedBoutique.id ? { ...b, statut: 'actif' as const } : b
        ));
        break;
      case 'deactivate':
        setBoutiques(prev => prev.map(b => 
          b.id === selectedBoutique.id ? { ...b, statut: 'inactif' as const } : b
        ));
        break;
      case 'delete':
        setBoutiques(prev => prev.filter(b => b.id !== selectedBoutique.id));
        break;
    }
    setShowModal(false);
    setSelectedBoutique(null);
  };

  const stats = {
    total: boutiques.length,
    actives: boutiques.filter(b => b.statut === 'actif').length,
    enAttente: boutiques.filter(b => b.statut === 'en-attente').length,
    inactives: boutiques.filter(b => b.statut === 'inactif').length
  };

  const renderModal = () => {
    if (!showModal || !selectedBoutique) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails de la boutique
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nom de la boutique
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedBoutique.nom}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Responsable
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedBoutique.responsable}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedBoutique.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Téléphone
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedBoutique.telephone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <p className="text-gray-900 dark:text-white">{selectedBoutique.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Statut
                      </label>
                      <span className={getStatusBadge(selectedBoutique.statut)}>
                        {selectedBoutique.statut}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Admin référent
                      </label>
                      <p className="text-gray-900 dark:text-white">{selectedBoutique.adminReferent}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {(modalType === 'activate' || modalType === 'deactivate') && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Confirmation
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Êtes-vous sûr de vouloir {modalType === 'activate' ? 'activer' : 'désactiver'} la boutique "{selectedBoutique.nom}" ?
                </p>
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
                      Cette action est irréversible. La boutique "{selectedBoutique.nom}" sera définitivement supprimée.
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
                  Confirmer
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
            Gestion des Boutiques
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez toutes les boutiques de la plateforme
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + 
                "ID,Nom,Responsable,Email,Telephone,Statut,Date Inscription\n" +
                boutiques.map(b => `${b.id},${b.nom},${b.responsable},${b.email},${b.telephone},${b.statut},${b.dateInscription}`).join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "boutiques_export.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => alert('Ouverture du formulaire de création de boutique')}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Nouvelle boutique
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total boutiques
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <BuildingStorefrontIcon className="h-8 w-8 text-blue-500" />
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
                Inactives
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.inactives}
              </p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-500" />
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
                placeholder="Rechercher par nom, responsable ou email..."
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
              <option value="actif">Actif</option>
              <option value="en-attente">En attente</option>
              <option value="inactif">Inactif</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
        </div>
      </div>

      {/* Tableau des boutiques */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Boutique
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Responsable
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Admin référent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBoutiques.map((boutique) => (
                <tr key={boutique.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {boutique.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {boutique.id}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {boutique.responsable}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Inscrit le {new Date(boutique.dateInscription).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {boutique.email}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {boutique.telephone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(boutique.statut)}>
                      {getStatusIcon(boutique.statut)}
                      <span className="ml-1">{boutique.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {boutique.adminReferent}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(boutique, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(boutique, 'edit')}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(boutique, boutique.statut === 'actif' ? 'deactivate' : 'activate')}
                        className={`${boutique.statut === 'actif' 
                          ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                          : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={boutique.statut === 'actif' ? 'Désactiver' : 'Activer'}
                      >
                        <PowerIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(boutique, 'delete')}
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
                Boutique "Épicerie Moderne" activée par Admin Paul
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 2 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Nouvelle boutique "Fashion Style" en attente de validation
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 5 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Boutique "Tech Plus" désactivée par Admin Marie
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Hier à 14:30
              </p>
            </div>
          </div>
        </div>
      </div>

      {renderModal()}
    </div>
  );
};