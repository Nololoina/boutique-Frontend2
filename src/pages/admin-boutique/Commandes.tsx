import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PrinterIcon,
  TruckIcon,
  CheckIcon,
  XMarkIcon,
  DocumentArrowDownIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CreditCardIcon,
  CalendarIcon,
  UserIcon,
  TagIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';

interface Commande {
  id: string;
  numeroCommande: string;
  client: {
    nom: string;
    prenom: string;
    telephone: string;
    email: string;
    adresse: string;
    ville: string;
    codePostal: string;
  };
  produits: {
    id: string;
    nom: string;
    variante?: string;
    quantite: number;
    prixUnitaire: number;
    image: string;
  }[];
  montantTotal: number;
  montantRemise: number;
  fraisLivraison: number;
  statut: 'en-attente-paiement' | 'paiement-recu' | 'en-preparation' | 'expedie' | 'livre' | 'annule' | 'rembourse';
  methodePaiement: 'mobile-money' | 'especes-livraison' | 'virement';
  statutPaiement: 'en-attente' | 'reussi' | 'echoue' | 'rembourse';
  methodeLivraison: 'domicile' | 'point-relais' | 'retrait-boutique';
  dateCommande: string;
  dateExpedition?: string;
  dateLivraison?: string;
  numeroSuivi?: string;
  codePromo?: string;
  notesClient?: string;
  historique: {
    action: string;
    date: string;
    utilisateur: string;
    commentaire?: string;
  }[];
}

const mockCommandes: Commande[] = [
  {
    id: 'CMD001',
    numeroCommande: 'CMD-2024-001',
    client: {
      nom: 'Rakoto',
      prenom: 'Jean',
      telephone: '+261 32 12 345 67',
      email: 'jean.rakoto@email.mg',
      adresse: '123 Rue de la Paix',
      ville: 'Antananarivo',
      codePostal: '101'
    },
    produits: [
      {
        id: 'P001',
        nom: 'Smartphone XYZ',
        variante: 'Noir - 128GB',
        quantite: 1,
        prixUnitaire: 1500000,
        image: 'smartphone.jpg'
      },
      {
        id: 'P002',
        nom: 'Étui de protection',
        quantite: 1,
        prixUnitaire: 25000,
        image: 'etui.jpg'
      }
    ],
    montantTotal: 1525000,
    montantRemise: 0,
    fraisLivraison: 5000,
    statut: 'en-preparation',
    methodePaiement: 'mobile-money',
    statutPaiement: 'reussi',
    methodeLivraison: 'domicile',
    dateCommande: '2024-12-20',
    codePromo: 'NOEL2024',
    notesClient: 'Livraison urgente si possible',
    historique: [
      {
        action: 'Commande créée',
        date: '2024-12-20 10:30',
        utilisateur: 'Système'
      },
      {
        action: 'Paiement confirmé',
        date: '2024-12-20 10:35',
        utilisateur: 'Mobile Money'
      },
      {
        action: 'Commande en préparation',
        date: '2024-12-20 11:00',
        utilisateur: 'Admin Boutique'
      }
    ]
  },
  {
    id: 'CMD002',
    numeroCommande: 'CMD-2024-002',
    client: {
      nom: 'Andry',
      prenom: 'Marie',
      telephone: '+261 33 98 765 43',
      email: 'marie.andry@email.mg',
      adresse: '456 Avenue de l\'Indépendance',
      ville: 'Fianarantsoa',
      codePostal: '301'
    },
    produits: [
      {
        id: 'P003',
        nom: 'Robe élégante',
        variante: 'Rouge - Taille M',
        quantite: 2,
        prixUnitaire: 85000,
        image: 'robe.jpg'
      }
    ],
    montantTotal: 170000,
    montantRemise: 17000,
    fraisLivraison: 8000,
    statut: 'expedie',
    methodePaiement: 'especes-livraison',
    statutPaiement: 'en-attente',
    methodeLivraison: 'domicile',
    dateCommande: '2024-12-19',
    dateExpedition: '2024-12-20',
    numeroSuivi: 'TRK123456789',
    codePromo: 'REDUCTION10',
    historique: [
      {
        action: 'Commande créée',
        date: '2024-12-19 14:20',
        utilisateur: 'Système'
      },
      {
        action: 'Commande confirmée',
        date: '2024-12-19 15:00',
        utilisateur: 'Admin Boutique'
      },
      {
        action: 'Commande expédiée',
        date: '2024-12-20 09:30',
        utilisateur: 'Admin Boutique',
        commentaire: 'Expédié via ColisPoste'
      }
    ]
  },
  {
    id: 'CMD003',
    numeroCommande: 'CMD-2024-003',
    client: {
      nom: 'Rabe',
      prenom: 'Paul',
      telephone: '+261 34 55 666 77',
      email: 'paul.rabe@email.mg',
      adresse: '789 Boulevard Ratsimilaho',
      ville: 'Toamasina',
      codePostal: '501'
    },
    produits: [
      {
        id: 'P004',
        nom: 'Café premium',
        quantite: 5,
        prixUnitaire: 25000,
        image: 'cafe.jpg'
      }
    ],
    montantTotal: 125000,
    montantRemise: 0,
    fraisLivraison: 12000,
    statut: 'livre',
    methodePaiement: 'mobile-money',
    statutPaiement: 'reussi',
    methodeLivraison: 'point-relais',
    dateCommande: '2024-12-18',
    dateExpedition: '2024-12-19',
    dateLivraison: '2024-12-20',
    numeroSuivi: 'TRK987654321',
    historique: [
      {
        action: 'Commande créée',
        date: '2024-12-18 16:45',
        utilisateur: 'Système'
      },
      {
        action: 'Paiement confirmé',
        date: '2024-12-18 16:50',
        utilisateur: 'Mobile Money'
      },
      {
        action: 'Commande expédiée',
        date: '2024-12-19 08:00',
        utilisateur: 'Admin Boutique'
      },
      {
        action: 'Commande livrée',
        date: '2024-12-20 14:30',
        utilisateur: 'Transporteur'
      }
    ]
  }
];

export const Commandes: React.FC = () => {
  const [commandes, setCommandes] = useState<Commande[]>(mockCommandes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [periodFilter, setPeriodFilter] = useState<string>('tous');
  const [paymentFilter, setPaymentFilter] = useState<string>('tous');
  const [selectedCommande, setSelectedCommande] = useState<Commande | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'update-status' | 'message' | 'print'>('view');
  const [newStatus, setNewStatus] = useState<string>('');
  const [message, setMessage] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = commande.numeroCommande.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${commande.client.prenom} ${commande.client.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commande.client.telephone.includes(searchTerm);
    const matchesStatus = statusFilter === 'tous' || commande.statut === statusFilter;
    const matchesPayment = paymentFilter === 'tous' || commande.methodePaiement === paymentFilter;
    
    let matchesPeriod = true;
    if (periodFilter !== 'tous') {
      const commandeDate = new Date(commande.dateCommande);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - commandeDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (periodFilter) {
        case 'today':
          matchesPeriod = diffDays <= 1;
          break;
        case 'week':
          matchesPeriod = diffDays <= 7;
          break;
        case 'month':
          matchesPeriod = diffDays <= 30;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesPayment && matchesPeriod;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'en-attente-paiement':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'paiement-recu':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'en-preparation':
        return `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200`;
      case 'expedie':
        return `${baseClasses} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200`;
      case 'livre':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'annule':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'rembourse':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'en-attente-paiement':
        return <ClockIcon className="h-4 w-4" />;
      case 'paiement-recu':
        return <CreditCardIcon className="h-4 w-4" />;
      case 'en-preparation':
        return <ArrowPathIcon className="h-4 w-4" />;
      case 'expedie':
        return <TruckIcon className="h-4 w-4" />;
      case 'livre':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'annule':
        return <XCircleIcon className="h-4 w-4" />;
      case 'rembourse':
        return <ArrowPathIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getPaymentBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'reussi':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'en-attente':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'echoue':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'rembourse':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return baseClasses;
    }
  };

  const handleAction = (commande: Commande, action: typeof modalType) => {
    setSelectedCommande(commande);
    setModalType(action);
    if (action === 'update-status') {
      setNewStatus(commande.statut);
      setTrackingNumber(commande.numeroSuivi || '');
    }
    if (action === 'message') {
      setMessage('');
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedCommande) return;

    switch (modalType) {
      case 'update-status':
        setCommandes(prev => prev.map(c => 
          c.id === selectedCommande.id ? {
            ...c,
            statut: newStatus as any,
            numeroSuivi: trackingNumber || c.numeroSuivi,
            dateExpedition: newStatus === 'expedie' && !c.dateExpedition ? new Date().toISOString().split('T')[0] : c.dateExpedition,
            dateLivraison: newStatus === 'livre' && !c.dateLivraison ? new Date().toISOString().split('T')[0] : c.dateLivraison,
            historique: [
              ...c.historique,
              {
                action: `Statut mis à jour: ${newStatus}`,
                date: new Date().toLocaleString('fr-FR'),
                utilisateur: 'Admin Boutique',
                commentaire: trackingNumber ? `Numéro de suivi: ${trackingNumber}` : undefined
              }
            ]
          } : c
        ));
        break;
      case 'message':
        // Simulation d'envoi de message
        alert(`Message envoyé à ${selectedCommande.client.prenom} ${selectedCommande.client.nom}`);
        break;
      case 'print':
        // Simulation d'impression
        alert(`Facture imprimée pour la commande ${selectedCommande.numeroCommande}`);
        break;
    }
    setShowModal(false);
    setSelectedCommande(null);
  };

  const stats = {
    total: commandes.length,
    enAttentePaiement: commandes.filter(c => c.statut === 'en-attente-paiement').length,
    enPreparation: commandes.filter(c => c.statut === 'en-preparation').length,
    expedie: commandes.filter(c => c.statut === 'expedie').length,
    livre: commandes.filter(c => c.statut === 'livre').length,
    annule: commandes.filter(c => c.statut === 'annule').length,
    chiffreAffaires: commandes.filter(c => c.statutPaiement === 'reussi').reduce((sum, c) => sum + c.montantTotal, 0)
  };

  const renderModal = () => {
    if (!showModal || !selectedCommande) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails de la commande {selectedCommande.numeroCommande}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informations client */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Informations client
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedCommande.client.prenom} {selectedCommande.client.nom}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedCommande.client.telephone}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedCommande.client.email}
                          </span>
                        </div>
                        <div className="flex items-start">
                          <MapPinIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedCommande.client.adresse}<br />
                            {selectedCommande.client.ville} {selectedCommande.client.codePostal}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Statuts */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Statuts
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Commande:</span>
                          <span className={getStatusBadge(selectedCommande.statut)}>
                            {getStatusIcon(selectedCommande.statut)}
                            <span className="ml-1">{selectedCommande.statut}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Paiement:</span>
                          <span className={getPaymentBadge(selectedCommande.statutPaiement)}>
                            {selectedCommande.statutPaiement}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Informations livraison */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Livraison
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Méthode:</span>
                          <span className="text-sm text-gray-900 dark:text-white">{selectedCommande.methodeLivraison}</span>
                        </div>
                        {selectedCommande.numeroSuivi && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Suivi:</span>
                            <span className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                              {selectedCommande.numeroSuivi}
                            </span>
                          </div>
                        )}
                        {selectedCommande.dateExpedition && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Expédition:</span>
                            <span className="text-sm text-gray-900 dark:text-white">
                              {new Date(selectedCommande.dateExpedition).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Produits et totaux */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Produits commandés
                      </h4>
                      <div className="space-y-3">
                        {selectedCommande.produits.map((produit, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-500">IMG</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {produit.nom}
                              </p>
                              {produit.variante && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {produit.variante}
                                </p>
                              )}
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                Qté: {produit.quantite} × {formatMGA(produit.prixUnitaire)}
                              </p>
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatMGA(produit.quantite * produit.prixUnitaire)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Récapitulatif financier */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Récapitulatif
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Sous-total:</span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {formatMGA(selectedCommande.montantTotal - selectedCommande.fraisLivraison + selectedCommande.montantRemise)}
                          </span>
                        </div>
                        {selectedCommande.montantRemise > 0 && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Remise:</span>
                            <span className="text-sm text-green-600 dark:text-green-400">
                              -{formatMGA(selectedCommande.montantRemise)}
                            </span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Livraison:</span>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {formatMGA(selectedCommande.fraisLivraison)}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Total:</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {formatMGA(selectedCommande.montantTotal)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notes client */}
                    {selectedCommande.notesClient && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Notes du client
                        </h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            {selectedCommande.notesClient}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Historique */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Historique de la commande
                  </h4>
                  <div className="space-y-3">
                    {selectedCommande.historique.map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {event.action}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {event.date} par {event.utilisateur}
                          </p>
                          {event.commentaire && (
                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                              {event.commentaire}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {modalType === 'update-status' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Mettre à jour le statut
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nouveau statut
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="en-attente-paiement">En attente de paiement</option>
                      <option value="paiement-recu">Paiement reçu</option>
                      <option value="en-preparation">En préparation</option>
                      <option value="expedie">Expédiée</option>
                      <option value="livre">Livrée</option>
                      <option value="annule">Annulée</option>
                      <option value="rembourse">Remboursée</option>
                    </select>
                  </div>
                  {(newStatus === 'expedie' || selectedCommande.numeroSuivi) && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Numéro de suivi
                      </label>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="TRK123456789"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {modalType === 'message' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Envoyer un message à {selectedCommande.client.prenom} {selectedCommande.client.nom}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder="Votre message au client..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Le message sera envoyé par email à {selectedCommande.client.email}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                {modalType === 'view' ? 'Fermer' : 'Annuler'}
              </Button>
              {modalType === 'view' && (
                <>
                  <Button variant="outline" onClick={() => setModalType('message')}>
                    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" onClick={() => setModalType('print')}>
                    <PrinterIcon className="h-4 w-4 mr-2" />
                    Imprimer
                  </Button>
                  <Button variant="primary" onClick={() => setModalType('update-status')}>
                    Mettre à jour
                  </Button>
                </>
              )}
              {modalType !== 'view' && (
                <Button variant="primary" onClick={confirmAction}>
                  {modalType === 'update-status' ? 'Mettre à jour' : 'Envoyer'}
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
            Gestion des Commandes
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Suivez et traitez toutes vos commandes
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Total
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                En attente
              </p>
              <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.enAttentePaiement}
              </p>
            </div>
            <ClockIcon className="h-6 w-6 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Préparation
              </p>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {stats.enPreparation}
              </p>
            </div>
            <ArrowPathIcon className="h-6 w-6 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Expédiées
              </p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {stats.expedie}
              </p>
            </div>
            <TruckIcon className="h-6 w-6 text-indigo-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Livrées
              </p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">
                {stats.livre}
              </p>
            </div>
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Annulées
              </p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">
                {stats.annule}
              </p>
            </div>
            <XCircleIcon className="h-6 w-6 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                CA Total
              </p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {formatMGA(stats.chiffreAffaires)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-6 w-6 text-emerald-500" />
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
                placeholder="Rechercher par numéro, client ou téléphone..."
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
              <option value="en-attente-paiement">En attente paiement</option>
              <option value="paiement-recu">Paiement reçu</option>
              <option value="en-preparation">En préparation</option>
              <option value="expedie">Expédiée</option>
              <option value="livre">Livrée</option>
              <option value="annule">Annulée</option>
            </select>
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes les périodes</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Tous les paiements</option>
              <option value="mobile-money">Mobile Money</option>
              <option value="especes-livraison">Espèces livraison</option>
              <option value="virement">Virement</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Paiement
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
              {filteredCommandes.map((commande) => (
                <tr key={commande.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {commande.numeroCommande}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {commande.produits.length} article(s)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {commande.client.prenom} {commande.client.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {commande.client.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatMGA(commande.montantTotal)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {commande.methodePaiement}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(commande.statut)}>
                      {getStatusIcon(commande.statut)}
                      <span className="ml-1">{commande.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getPaymentBadge(commande.statutPaiement)}>
                      {commande.statutPaiement}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(commande, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(commande, 'update-status')}
                        className="text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        title="Mettre à jour"
                      >
                        <ArrowPathIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(commande, 'message')}
                        className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                        title="Message client"
                      >
                        <ChatBubbleLeftRightIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleAction(commande, 'print')}
                        className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                        title="Imprimer"
                      >
                        <PrinterIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commandes urgentes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Commandes nécessitant une attention
          </h2>
        </div>
        <div className="space-y-3">
          {commandes.filter(c => c.statut === 'en-attente-paiement' || c.statut === 'en-preparation').slice(0, 3).map((commande) => (
            <div key={commande.id} className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {commande.numeroCommande} - {commande.client.prenom} {commande.client.nom}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {commande.statut === 'en-attente-paiement' ? 'En attente de paiement' : 'En préparation depuis 2h'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => handleAction(commande, 'view')}>
                Traiter
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Suivi des livraisons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Suivi des livraisons en cours
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commandes.filter(c => c.statut === 'expedie').map((commande) => (
            <div key={commande.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {commande.numeroCommande}
                </span>
                <span className={getStatusBadge(commande.statut)}>
                  {commande.statut}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {commande.client.prenom} {commande.client.nom}
              </p>
              {commande.numeroSuivi && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                  <p className="text-xs text-blue-600 dark:text-blue-400">Suivi:</p>
                  <p className="text-sm font-mono text-blue-700 dark:text-blue-300">
                    {commande.numeroSuivi}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {renderModal()}
    </div>
  );
};