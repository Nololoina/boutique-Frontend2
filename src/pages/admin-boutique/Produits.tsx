import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  DocumentArrowDownIcon,
  CubeIcon,
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';

interface Produit {
  id: string;
  nom: string;
  sku: string;
  categorie: string;
  prix: number;
  prixPromo?: number;
  stock: number;
  stockSeuil: number;
  statut: 'brouillon' | 'en-ligne' | 'rupture' | 'archive';
  vues: number;
  commandes: number;
  dateCreation: string;
  derniereModification: string;
  images: string[];
  variantes?: {
    nom: string;
    options: string[];
    prix?: number;
    stock?: number;
  }[];
}

const mockProduits: Produit[] = [
  {
    id: 'P001',
    nom: 'Smartphone dernière génération',
    sku: 'SMART-001',
    categorie: 'Électronique',
    prix: 1500000,
    prixPromo: 1200000,
    stock: 25,
    stockSeuil: 5,
    statut: 'en-ligne',
    vues: 1250,
    commandes: 45,
    dateCreation: '2024-11-15',
    derniereModification: '2024-12-18',
    images: ['image1.jpg', 'image2.jpg'],
    variantes: [
      { nom: 'Couleur', options: ['Noir', 'Blanc', 'Bleu'] },
      { nom: 'Stockage', options: ['64GB', '128GB', '256GB'] }
    ]
  },
  {
    id: 'P002',
    nom: 'Robe élégante',
    sku: 'ROBE-001',
    categorie: 'Mode',
    prix: 85000,
    stock: 0,
    stockSeuil: 3,
    statut: 'rupture',
    vues: 890,
    commandes: 32,
    dateCreation: '2024-10-20',
    derniereModification: '2024-12-15',
    images: ['robe1.jpg'],
    variantes: [
      { nom: 'Taille', options: ['S', 'M', 'L', 'XL'] },
      { nom: 'Couleur', options: ['Rouge', 'Noir', 'Bleu'] }
    ]
  },
  {
    id: 'P003',
    nom: 'Café premium',
    sku: 'CAFE-001',
    categorie: 'Alimentation',
    prix: 25000,
    stock: 150,
    stockSeuil: 20,
    statut: 'en-ligne',
    vues: 567,
    commandes: 28,
    dateCreation: '2024-09-10',
    derniereModification: '2024-12-10',
    images: ['cafe1.jpg']
  },
  {
    id: 'P004',
    nom: 'Nouveau produit test',
    sku: 'TEST-001',
    categorie: 'Divers',
    prix: 50000,
    stock: 10,
    stockSeuil: 2,
    statut: 'brouillon',
    vues: 0,
    commandes: 0,
    dateCreation: '2024-12-20',
    derniereModification: '2024-12-20',
    images: []
  }
];

export const Produits: React.FC = () => {
  const [produits, setProduits] = useState<Produit[]>(mockProduits);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [categoryFilter, setCategoryFilter] = useState<string>('tous');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'bulk'>('view');
  const [selectedProduct, setSelectedProduct] = useState<Produit | null>(null);

  const filteredProduits = produits.filter(produit => {
    const matchesSearch = produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         produit.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || produit.statut === statusFilter;
    const matchesCategory = categoryFilter === 'tous' || produit.categorie === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'en-ligne':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'brouillon':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      case 'rupture':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'archive':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'en-ligne':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'brouillon':
        return <ClockIcon className="h-4 w-4" />;
      case 'rupture':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'archive':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (produit: Produit, action: typeof modalType) => {
    setSelectedProduct(produit);
    setModalType(action);
    setShowModal(true);
  };

  const handleBulkAction = (action: string) => {
    if (selectedProducts.length === 0) {
      alert('Veuillez sélectionner au moins un produit');
      return;
    }
    
    switch (action) {
      case 'activate':
        setProduits(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, statut: 'en-ligne' as const } : p
        ));
        break;
      case 'deactivate':
        setProduits(prev => prev.map(p => 
          selectedProducts.includes(p.id) ? { ...p, statut: 'archive' as const } : p
        ));
        break;
      case 'delete':
        if (confirm(`Supprimer ${selectedProducts.length} produit(s) sélectionné(s) ?`)) {
          setProduits(prev => prev.filter(p => !selectedProducts.includes(p.id)));
        }
        break;
    }
    setSelectedProducts([]);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const stats = {
    total: produits.length,
    enLigne: produits.filter(p => p.statut === 'en-ligne').length,
    brouillon: produits.filter(p => p.statut === 'brouillon').length,
    rupture: produits.filter(p => p.statut === 'rupture').length,
    faibleStock: produits.filter(p => p.stock <= p.stockSeuil && p.statut === 'en-ligne').length
  };

  const categories = [...new Set(produits.map(p => p.categorie))];

  const renderModal = () => {
    if (!showModal || !selectedProduct) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails du produit
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Nom du produit
                        </label>
                        <p className="text-gray-900 dark:text-white">{selectedProduct.nom}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            SKU
                          </label>
                          <p className="text-gray-900 dark:text-white">{selectedProduct.sku}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Catégorie
                          </label>
                          <p className="text-gray-900 dark:text-white">{selectedProduct.categorie}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Prix
                          </label>
                          <p className="text-gray-900 dark:text-white">{formatMGA(selectedProduct.prix)}</p>
                          {selectedProduct.prixPromo && (
                            <p className="text-sm text-green-600 dark:text-green-400">
                              Promo: {formatMGA(selectedProduct.prixPromo)}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Stock
                          </label>
                          <p className={`text-gray-900 dark:text-white ${
                            selectedProduct.stock <= selectedProduct.stockSeuil ? 'text-red-600 dark:text-red-400' : ''
                          }`}>
                            {selectedProduct.stock} unités
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Seuil d'alerte: {selectedProduct.stockSeuil}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Statut
                        </label>
                        <span className={getStatusBadge(selectedProduct.statut)}>
                          {getStatusIcon(selectedProduct.statut)}
                          <span className="ml-1">{selectedProduct.statut}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Performance
                        </label>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {selectedProduct.vues}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Vues</div>
                          </div>
                          <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                              {selectedProduct.commandes}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Commandes</div>
                          </div>
                        </div>
                      </div>
                      {selectedProduct.variantes && selectedProduct.variantes.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Variantes
                          </label>
                          <div className="space-y-2 mt-2">
                            {selectedProduct.variantes.map((variante, index) => (
                              <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {variante.nom}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {variante.options.join(', ')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Images
                        </label>
                        <div className="flex space-x-2 mt-2">
                          {selectedProduct.images.length > 0 ? (
                            selectedProduct.images.map((image, index) => (
                              <div key={index} className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <PhotoIcon className="h-8 w-8 text-gray-400" />
                              </div>
                            ))
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <PhotoIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Fermer
              </Button>
              {modalType === 'view' && (
                <Button variant="primary" onClick={() => setModalType('edit')}>
                  Modifier
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
            Gestion des Produits
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez votre catalogue de produits
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button variant="outline" size="sm">
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="primary" size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Nouveau produit
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total produits
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <CubeIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                En ligne
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.enLigne}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Brouillons
              </p>
              <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {stats.brouillon}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-gray-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Rupture stock
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.rupture}
              </p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Stock faible
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.faibleStock}
              </p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-orange-500" />
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
                placeholder="Rechercher par nom ou SKU..."
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
              <option value="en-ligne">En ligne</option>
              <option value="brouillon">Brouillon</option>
              <option value="rupture">Rupture</option>
              <option value="archive">Archivé</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes catégories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
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
          </div>
        </div>

        {/* Actions en masse */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedProducts.length} produit(s) sélectionné(s)
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('activate')}>
                  Activer
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleBulkAction('deactivate')}>
                  Désactiver
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleBulkAction('delete')}>
                  Supprimer
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liste des produits */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts(filteredProduits.map(p => p.id));
                      } else {
                        setSelectedProducts([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
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
              {filteredProduits.map((produit) => (
                <tr key={produit.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(produit.id)}
                      onChange={() => toggleProductSelection(produit.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <PhotoIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {produit.nom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          SKU: {produit.sku} • {produit.categorie}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatMGA(produit.prix)}
                    </div>
                    {produit.prixPromo && (
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Promo: {formatMGA(produit.prixPromo)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm ${
                      produit.stock <= produit.stockSeuil 
                        ? 'text-red-600 dark:text-red-400 font-medium' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {produit.stock} unités
                    </div>
                    {produit.stock <= produit.stockSeuil && (
                      <div className="text-xs text-red-500 dark:text-red-400">
                        Stock faible
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(produit.statut)}>
                      {getStatusIcon(produit.statut)}
                      <span className="ml-1">{produit.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {produit.vues} vues
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {produit.commandes} commandes
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(produit, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(produit, 'edit')}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(produit, 'delete')}
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

      {/* Historique des mouvements de stock */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Mouvements de stock récents
        </h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Réassort Smartphone XYZ: +50 unités
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 2 heures par Admin Boutique
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Vente Robe élégante: -3 unités (Commande CMD-002)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Il y a 5 heures
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                Nouveau produit Café premium ajouté
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