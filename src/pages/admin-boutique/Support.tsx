import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PaperClipIcon,
  UserIcon,
  CalendarIcon,
  TagIcon,
  EyeIcon,
  ArrowUturnLeftIcon,
  PlusIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';

interface TicketSupport {
  id: string;
  numeroTicket: string;
  client: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
  };
  sujet: string;
  message: string;
  statut: 'ouvert' | 'en-cours' | 'resolu' | 'ferme';
  priorite: 'basse' | 'moyenne' | 'haute' | 'urgente';
  categorie: 'commande' | 'livraison' | 'paiement' | 'produit' | 'technique' | 'autre';
  dateCreation: string;
  derniereReponse?: string;
  referenceCommande?: string;
  piecesJointes: string[];
  conversation: {
    id: string;
    auteur: 'client' | 'boutique';
    message: string;
    date: string;
    lu: boolean;
  }[];
}

const mockTickets: TicketSupport[] = [
  {
    id: 'TKT001',
    numeroTicket: 'TKT-2024-001',
    client: {
      nom: 'Rakoto',
      prenom: 'Jean',
      email: 'jean.rakoto@email.mg',
      telephone: '+261 32 12 345 67'
    },
    sujet: 'Problème avec ma commande',
    message: 'Bonjour, je n\'ai pas reçu ma commande CMD-2024-001 alors qu\'elle était prévue hier. Pouvez-vous me donner des nouvelles ?',
    statut: 'ouvert',
    priorite: 'moyenne',
    categorie: 'livraison',
    dateCreation: '2024-12-20',
    referenceCommande: 'CMD-2024-001',
    piecesJointes: [],
    conversation: [
      {
        id: '1',
        auteur: 'client',
        message: 'Bonjour, je n\'ai pas reçu ma commande CMD-2024-001 alors qu\'elle était prévue hier. Pouvez-vous me donner des nouvelles ?',
        date: '2024-12-20 10:30',
        lu: true
      }
    ]
  },
  {
    id: 'TKT002',
    numeroTicket: 'TKT-2024-002',
    client: {
      nom: 'Andry',
      prenom: 'Marie',
      email: 'marie.andry@email.mg'
    },
    sujet: 'Demande de remboursement',
    message: 'Le produit reçu ne correspond pas à la description. Je souhaite un remboursement.',
    statut: 'en-cours',
    priorite: 'haute',
    categorie: 'produit',
    dateCreation: '2024-12-19',
    derniereReponse: '2024-12-19',
    referenceCommande: 'CMD-2024-002',
    piecesJointes: ['photo_produit.jpg'],
    conversation: [
      {
        id: '1',
        auteur: 'client',
        message: 'Le produit reçu ne correspond pas à la description. Je souhaite un remboursement.',
        date: '2024-12-19 14:20',
        lu: true
      },
      {
        id: '2',
        auteur: 'boutique',
        message: 'Bonjour Marie, nous sommes désolés pour ce désagrément. Pouvez-vous nous envoyer une photo du produit reçu ?',
        date: '2024-12-19 15:30',
        lu: true
      },
      {
        id: '3',
        auteur: 'client',
        message: 'Voici la photo du produit. Comme vous pouvez voir, la couleur ne correspond pas.',
        date: '2024-12-19 16:45',
        lu: false
      }
    ]
  },
  {
    id: 'TKT003',
    numeroTicket: 'TKT-2024-003',
    client: {
      nom: 'Rabe',
      prenom: 'Paul',
      email: 'paul.rabe@email.mg',
      telephone: '+261 34 55 666 77'
    },
    sujet: 'Question sur les frais de livraison',
    message: 'Bonjour, j\'aimerais savoir si vous livrez à Mahajanga et quels sont les frais ?',
    statut: 'resolu',
    priorite: 'basse',
    categorie: 'livraison',
    dateCreation: '2024-12-18',
    derniereReponse: '2024-12-18',
    piecesJointes: [],
    conversation: [
      {
        id: '1',
        auteur: 'client',
        message: 'Bonjour, j\'aimerais savoir si vous livrez à Mahajanga et quels sont les frais ?',
        date: '2024-12-18 09:15',
        lu: true
      },
      {
        id: '2',
        auteur: 'boutique',
        message: 'Bonjour Paul, oui nous livrons à Mahajanga. Les frais sont de 15 000 Ar pour un délai de 3-5 jours ouvrés.',
        date: '2024-12-18 10:30',
        lu: true
      },
      {
        id: '3',
        auteur: 'client',
        message: 'Parfait, merci pour l\'information !',
        date: '2024-12-18 11:00',
        lu: true
      }
    ]
  }
];

const faqItems = [
  {
    categorie: 'Livraison',
    questions: [
      {
        question: 'Quels sont les délais de livraison ?',
        reponse: 'Les délais varient selon votre localisation : 1-3 jours pour Antananarivo, 3-7 jours pour les autres villes.'
      },
      {
        question: 'Livrez-vous dans toute l\'île ?',
        reponse: 'Oui, nous livrons dans toutes les grandes villes de Madagascar via nos partenaires transporteurs.'
      }
    ]
  },
  {
    categorie: 'Paiement',
    questions: [
      {
        question: 'Quels modes de paiement acceptez-vous ?',
        reponse: 'Nous acceptons Mobile Money (Airtel, Orange, MVola) et le paiement en espèces à la livraison.'
      },
      {
        question: 'Le paiement est-il sécurisé ?',
        reponse: 'Oui, tous nos paiements sont sécurisés et nous ne stockons aucune information bancaire.'
      }
    ]
  },
  {
    categorie: 'Commandes',
    questions: [
      {
        question: 'Comment suivre ma commande ?',
        reponse: 'Vous recevrez un numéro de suivi par email dès l\'expédition de votre commande.'
      },
      {
        question: 'Puis-je modifier ma commande ?',
        reponse: 'Les modifications sont possibles dans les 2h suivant la commande, avant la préparation.'
      }
    ]
  }
];

export const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState<TicketSupport[]>(mockTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [priorityFilter, setPriorityFilter] = useState<string>('tous');
  const [categoryFilter, setCategoryFilter] = useState<string>('tous');
  const [selectedTicket, setSelectedTicket] = useState<TicketSupport | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'respond' | 'close'>('view');
  const [responseMessage, setResponseMessage] = useState('');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.numeroTicket.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${ticket.client.prenom} ${ticket.client.nom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.sujet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'tous' || ticket.statut === statusFilter;
    const matchesPriority = priorityFilter === 'tous' || ticket.priorite === priorityFilter;
    const matchesCategory = categoryFilter === 'tous' || ticket.categorie === categoryFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  const getStatusBadge = (statut: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (statut) {
      case 'ouvert':
        return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
      case 'en-cours':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'resolu':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      case 'ferme':
        return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
      default:
        return baseClasses;
    }
  };

  const getPriorityBadge = (priorite: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (priorite) {
      case 'urgente':
        return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200`;
      case 'haute':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
      case 'moyenne':
        return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
      case 'basse':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'ouvert':
        return <ClockIcon className="h-4 w-4" />;
      case 'en-cours':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'resolu':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'ferme':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleAction = (ticket: TicketSupport, action: typeof modalType) => {
    setSelectedTicket(ticket);
    setModalType(action);
    if (action === 'respond') {
      setResponseMessage('');
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedTicket) return;

    switch (modalType) {
      case 'respond':
        if (responseMessage.trim()) {
          const newConversation = {
            id: Date.now().toString(),
            auteur: 'boutique' as const,
            message: responseMessage,
            date: new Date().toLocaleString('fr-FR'),
            lu: true
          };
          
          setTickets(prev => prev.map(t => 
            t.id === selectedTicket.id ? {
              ...t,
              statut: 'en-cours' as const,
              derniereReponse: new Date().toISOString().split('T')[0],
              conversation: [...t.conversation, newConversation]
            } : t
          ));
          
          alert(`Réponse envoyée à ${selectedTicket.client.email}`);
        }
        break;
      case 'close':
        setTickets(prev => prev.map(t => 
          t.id === selectedTicket.id ? { ...t, statut: 'resolu' as const } : t
        ));
        break;
    }
    setShowModal(false);
    setSelectedTicket(null);
  };

  const stats = {
    total: tickets.length,
    ouverts: tickets.filter(t => t.statut === 'ouvert').length,
    enCours: tickets.filter(t => t.statut === 'en-cours').length,
    resolus: tickets.filter(t => t.statut === 'resolu').length,
    urgents: tickets.filter(t => t.priorite === 'urgente' || t.priorite === 'haute').length
  };

  const renderTickets = () => (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total tickets
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ouverts
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.ouverts}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                En cours
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {stats.enCours}
              </p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Résolus
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.resolus}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Urgents
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.urgents}
              </p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
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
                placeholder="Rechercher par numéro, client ou sujet..."
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
              <option value="ouvert">Ouvert</option>
              <option value="en-cours">En cours</option>
              <option value="resolu">Résolu</option>
              <option value="ferme">Fermé</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes priorités</option>
              <option value="urgente">Urgente</option>
              <option value="haute">Haute</option>
              <option value="moyenne">Moyenne</option>
              <option value="basse">Basse</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="tous">Toutes catégories</option>
              <option value="commande">Commande</option>
              <option value="livraison">Livraison</option>
              <option value="paiement">Paiement</option>
              <option value="produit">Produit</option>
              <option value="technique">Technique</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des tickets */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ticket
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Sujet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priorité
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
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {ticket.numeroTicket}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {ticket.referenceCommande && `Commande: ${ticket.referenceCommande}`}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {ticket.client.prenom} {ticket.client.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {ticket.client.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white line-clamp-2">
                      {ticket.sujet}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {ticket.categorie}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(ticket.statut)}>
                      {getStatusIcon(ticket.statut)}
                      <span className="ml-1">{ticket.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={getPriorityBadge(ticket.priorite)}>
                      {ticket.priorite}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(ticket.dateCreation).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAction(ticket, 'view')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir détails"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {ticket.statut !== 'resolu' && ticket.statut !== 'ferme' && (
                        <button
                          onClick={() => handleAction(ticket, 'respond')}
                          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                          title="Répondre"
                        >
                          <ArrowUturnLeftIcon className="h-4 w-4" />
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

  const renderFAQ = () => (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Foire Aux Questions
          </h2>
          <Button variant="outline" size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            Ajouter une question
          </Button>
        </div>

        <div className="space-y-6">
          {faqItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <TagIcon className="h-5 w-5 mr-2 text-blue-500" />
                {section.categorie}
              </h3>
              <div className="space-y-3">
                {section.questions.map((item, itemIndex) => (
                  <div key={itemIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        {item.question}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.reponse}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal || !selectedTicket) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {modalType === 'view' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedTicket.numeroTicket}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className={getStatusBadge(selectedTicket.statut)}>
                      {selectedTicket.statut}
                    </span>
                    <span className={getPriorityBadge(selectedTicket.priorite)}>
                      {selectedTicket.priorite}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Informations ticket */}
                  <div className="lg:col-span-1 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Informations client
                      </h4>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                        <div className="flex items-center">
                          <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedTicket.client.prenom} {selectedTicket.client.nom}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {selectedTicket.client.email}
                          </span>
                        </div>
                        {selectedTicket.client.telephone && (
                          <div className="flex items-center">
                            <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900 dark:text-white">
                              {selectedTicket.client.telephone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Détails du ticket
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Catégorie:</span>
                          <span className="text-gray-900 dark:text-white">{selectedTicket.categorie}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Créé le:</span>
                          <span className="text-gray-900 dark:text-white">
                            {new Date(selectedTicket.dateCreation).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        {selectedTicket.referenceCommande && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Commande:</span>
                            <span className="text-blue-600 dark:text-blue-400">
                              {selectedTicket.referenceCommande}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {selectedTicket.piecesJointes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Pièces jointes
                        </h4>
                        <div className="space-y-1">
                          {selectedTicket.piecesJointes.map((fichier, index) => (
                            <div key={index} className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                              <PaperClipIcon className="h-4 w-4 mr-1" />
                              {fichier}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conversation */}
                  <div className="lg:col-span-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Conversation
                    </h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedTicket.conversation.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.auteur === 'boutique' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-3 rounded-lg ${
                            message.auteur === 'boutique'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.auteur === 'boutique' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {message.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {modalType === 'respond' && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Répondre à {selectedTicket.client.prenom} {selectedTicket.client.nom}
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Sujet:</strong> {selectedTicket.sujet}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Votre réponse
                    </label>
                    <textarea
                      value={responseMessage}
                      onChange={(e) => setResponseMessage(e.target.value)}
                      rows={6}
                      placeholder="Tapez votre réponse..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      La réponse sera envoyée par email à {selectedTicket.client.email}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                {modalType === 'view' ? 'Fermer' : 'Annuler'}
              </Button>
              {modalType === 'view' && selectedTicket.statut !== 'resolu' && (
                <>
                  <Button variant="outline" onClick={() => setModalType('respond')}>
                    Répondre
                  </Button>
                  <Button variant="secondary" onClick={() => handleAction(selectedTicket, 'close')}>
                    Marquer résolu
                  </Button>
                </>
              )}
              {modalType === 'respond' && (
                <Button
                  variant="primary"
                  onClick={confirmAction}
                  disabled={!responseMessage.trim()}
                >
                  Envoyer la réponse
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'tickets', name: 'Tickets Support', icon: ChatBubbleLeftRightIcon },
    { id: 'faq', name: 'FAQ Publique', icon: DocumentTextIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Support Client
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez les demandes et questions de vos clients
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
      {activeTab === 'tickets' && renderTickets()}
      {activeTab === 'faq' && renderFAQ()}

      {renderModal()}
    </div>
  );
};