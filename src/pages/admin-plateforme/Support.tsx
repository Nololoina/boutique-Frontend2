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
  FunnelIcon,
  DocumentArrowDownIcon,
  ChartBarIcon,
  LifebuoyIcon,
  BellIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

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
    auteur: 'client' | 'plateforme';
    message: string;
    date: string;
    lu: boolean;
  }[];
}

interface ChatLive {
  id: string;
  visiteur: {
    nom?: string;
    email?: string;
    ip: string;
    localisation: string;
  };
  statut: 'en-attente' | 'en-cours' | 'termine';
  dateDebut: string;
  duree?: number;
  agent?: string;
  satisfaction?: number;
  messages: {
    id: string;
    auteur: 'visiteur' | 'agent';
    message: string;
    date: string;
  }[];
}

interface FAQ {
  id: string;
  question: string;
  reponse: string;
  categorie: string;
  vues: number;
  utile: number;
  pasUtile: number;
  dateCreation: string;
  derniereModification: string;
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
        auteur: 'plateforme',
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
        auteur: 'plateforme',
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

const mockChatsLive: ChatLive[] = [
  {
    id: 'CHAT001',
    visiteur: {
      nom: 'Visiteur anonyme',
      ip: '192.168.1.100',
      localisation: 'Antananarivo, Madagascar'
    },
    statut: 'en-cours',
    dateDebut: '2024-12-20 16:30',
    agent: 'Agent Sophie',
    messages: [
      {
        id: '1',
        auteur: 'visiteur',
        message: 'Bonjour, j\'ai une question sur les délais de livraison',
        date: '2024-12-20 16:30'
      },
      {
        id: '2',
        auteur: 'agent',
        message: 'Bonjour ! Je serais ravi de vous aider. Pour quelle destination souhaitez-vous connaître les délais ?',
        date: '2024-12-20 16:31'
      }
    ]
  },
  {
    id: 'CHAT002',
    visiteur: {
      email: 'client@email.mg',
      ip: '192.168.1.101',
      localisation: 'Fianarantsoa, Madagascar'
    },
    statut: 'en-attente',
    dateDebut: '2024-12-20 16:45',
    messages: [
      {
        id: '1',
        auteur: 'visiteur',
        message: 'Salut, je cherche des informations sur les modes de paiement',
        date: '2024-12-20 16:45'
      }
    ]
  }
];

const mockFAQ: FAQ[] = [
  {
    id: 'FAQ001',
    question: 'Comment passer une commande sans créer de compte ?',
    reponse: 'C\'est très simple ! Parcourez nos produits, ajoutez-les au panier, puis renseignez vos informations de livraison lors de la finalisation. Aucun compte n\'est requis.',
    categorie: 'Commandes',
    vues: 1250,
    utile: 1180,
    pasUtile: 70,
    dateCreation: '2024-11-01',
    derniereModification: '2024-12-15'
  },
  {
    id: 'FAQ002',
    question: 'Quels sont les modes de paiement acceptés ?',
    reponse: 'Nous acceptons Mobile Money (Orange Money, Airtel Money, MVola) et le paiement en espèces à la livraison.',
    categorie: 'Paiement',
    vues: 890,
    utile: 845,
    pasUtile: 45,
    dateCreation: '2024-11-05',
    derniereModification: '2024-12-10'
  },
  {
    id: 'FAQ003',
    question: 'Dans quelles régions livrez-vous ?',
    reponse: 'Nous livrons dans toute l\'île de Madagascar. Les délais varient : 1-3 jours pour Antananarivo, 3-7 jours pour les autres grandes villes.',
    categorie: 'Livraison',
    vues: 567,
    utile: 520,
    pasUtile: 47,
    dateCreation: '2024-11-10',
    derniereModification: '2024-12-05'
  }
];

// Données pour les graphiques
const ticketsParJour = [
  { date: '15/12', nouveaux: 12, resolus: 8, enCours: 4 },
  { date: '16/12', nouveaux: 15, resolus: 10, enCours: 9 },
  { date: '17/12', nouveaux: 8, resolus: 12, enCours: 5 },
  { date: '18/12', nouveaux: 18, resolus: 15, enCours: 8 },
  { date: '19/12', nouveaux: 22, resolus: 18, enCours: 12 },
  { date: '20/12', nouveaux: 25, resolus: 20, enCours: 17 }
];

const satisfactionData = [
  { nom: 'Très satisfait', valeur: 65, couleur: '#10B981' },
  { nom: 'Satisfait', valeur: 25, couleur: '#3B82F6' },
  { nom: 'Neutre', valeur: 7, couleur: '#F59E0B' },
  { nom: 'Insatisfait', valeur: 3, couleur: '#EF4444' }
];

const tempsReponseData = [
  { periode: 'Lun', temps: 15 },
  { periode: 'Mar', temps: 12 },
  { periode: 'Mer', temps: 18 },
  { periode: 'Jeu', temps: 8 },
  { periode: 'Ven', temps: 22 },
  { periode: 'Sam', temps: 25 },
  { periode: 'Dim', temps: 30 }
];

export const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tickets');
  const [tickets, setTickets] = useState<TicketSupport[]>(mockTickets);
  const [chatsLive, setChatsLive] = useState<ChatLive[]>(mockChatsLive);
  const [faq, setFAQ] = useState<FAQ[]>(mockFAQ);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('tous');
  const [priorityFilter, setPriorityFilter] = useState<string>('tous');
  const [categoryFilter, setCategoryFilter] = useState<string>('tous');
  const [selectedTicket, setSelectedTicket] = useState<TicketSupport | null>(null);
  const [selectedChat, setSelectedChat] = useState<ChatLive | null>(null);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQ | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'respond' | 'close' | 'edit-faq' | 'add-faq' | 'chat-view'>('view');
  const [responseMessage, setResponseMessage] = useState('');
  const [faqForm, setFaqForm] = useState({
    question: '',
    reponse: '',
    categorie: 'Commandes'
  });

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
      case 'en-attente':
        return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200`;
      case 'termine':
        return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
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
      case 'en-attente':
        return <ClockIcon className="h-4 w-4" />;
      case 'en-cours':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'resolu':
      case 'termine':
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

  const handleChatAction = (chat: ChatLive) => {
    setSelectedChat(chat);
    setModalType('chat-view');
    setShowModal(true);
  };

  const handleFAQAction = (faqItem: FAQ | null, action: 'edit-faq' | 'add-faq') => {
    setSelectedFAQ(faqItem);
    setModalType(action);
    if (action === 'edit-faq' && faqItem) {
      setFaqForm({
        question: faqItem.question,
        reponse: faqItem.reponse,
        categorie: faqItem.categorie
      });
    } else if (action === 'add-faq') {
      setFaqForm({
        question: '',
        reponse: '',
        categorie: 'Commandes'
      });
    }
    setShowModal(true);
  };

  const confirmAction = () => {
    if (!selectedTicket && modalType !== 'add-faq') return;

    switch (modalType) {
      case 'respond':
        if (responseMessage.trim() && selectedTicket) {
          const newConversation = {
            id: Date.now().toString(),
            auteur: 'plateforme' as const,
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
        if (selectedTicket) {
          setTickets(prev => prev.map(t => 
            t.id === selectedTicket.id ? { ...t, statut: 'resolu' as const } : t
          ));
          alert('Ticket marqué comme résolu');
        }
        break;
      case 'add-faq':
        if (faqForm.question && faqForm.reponse) {
          const newFAQ: FAQ = {
            id: `FAQ${String(faq.length + 1).padStart(3, '0')}`,
            question: faqForm.question,
            reponse: faqForm.reponse,
            categorie: faqForm.categorie,
            vues: 0,
            utile: 0,
            pasUtile: 0,
            dateCreation: new Date().toISOString().split('T')[0],
            derniereModification: new Date().toISOString().split('T')[0]
          };
          setFAQ(prev => [...prev, newFAQ]);
          alert('Question FAQ ajoutée avec succès !');
        }
        break;
      case 'edit-faq':
        if (selectedFAQ && faqForm.question && faqForm.reponse) {
          setFAQ(prev => prev.map(f => 
            f.id === selectedFAQ.id ? {
              ...f,
              question: faqForm.question,
              reponse: faqForm.reponse,
              categorie: faqForm.categorie,
              derniereModification: new Date().toISOString().split('T')[0]
            } : f
          ));
          alert('Question FAQ modifiée avec succès !');
        }
        break;
    }
    setShowModal(false);
    setSelectedTicket(null);
    setSelectedFAQ(null);
  };

  const handleExportCSV = (type: string) => {
    let csvContent = '';
    let filename = '';
    
    switch (type) {
      case 'tickets':
        csvContent = "data:text/csv;charset=utf-8," + 
          "Numero,Client,Email,Sujet,Statut,Priorite,Categorie,Date\n" +
          tickets.map(t => `${t.numeroTicket},"${t.client.prenom} ${t.client.nom}",${t.client.email},"${t.sujet}",${t.statut},${t.priorite},${t.categorie},${t.dateCreation}`).join("\n");
        filename = 'tickets_support.csv';
        break;
      case 'faq':
        csvContent = "data:text/csv;charset=utf-8," + 
          "Question,Reponse,Categorie,Vues,Utile,Date\n" +
          faq.map(f => `"${f.question}","${f.reponse}",${f.categorie},${f.vues},${f.utile},${f.dateCreation}`).join("\n");
        filename = 'faq_export.csv';
        break;
      case 'chats':
        csvContent = "data:text/csv;charset=utf-8," + 
          "ID,Visiteur,Email,Statut,Agent,Date,Duree\n" +
          chatsLive.map(c => `${c.id},"${c.visiteur.nom || 'Anonyme'}",${c.visiteur.email || 'N/A'},${c.statut},${c.agent || 'N/A'},${c.dateDebut},${c.duree || 0}`).join("\n");
        filename = 'chats_live.csv';
        break;
      default:
        return;
    }
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert(`Export ${type} téléchargé avec succès !`);
  };

  const handleStartChat = (chatId: string) => {
    setChatsLive(prev => prev.map(c => 
      c.id === chatId ? { 
        ...c, 
        statut: 'en-cours' as const,
        agent: 'Agent Admin'
      } : c
    ));
    alert('Chat pris en charge ! Vous pouvez maintenant répondre au visiteur.');
  };

  const handleEndChat = (chatId: string) => {
    setChatsLive(prev => prev.map(c => 
      c.id === chatId ? { 
        ...c, 
        statut: 'termine' as const,
        duree: Math.floor(Math.random() * 30) + 5
      } : c
    ));
    alert('Chat terminé avec succès !');
  };

  const handleDeleteFAQ = (faqId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette question FAQ ?')) {
      setFAQ(prev => prev.filter(f => f.id !== faqId));
      alert('Question FAQ supprimée avec succès !');
    }
  };

  const stats = {
    total: tickets.length,
    ouverts: tickets.filter(t => t.statut === 'ouvert').length,
    enCours: tickets.filter(t => t.statut === 'en-cours').length,
    resolus: tickets.filter(t => t.statut === 'resolu').length,
    urgents: tickets.filter(t => t.priorite === 'urgente' || t.priorite === 'haute').length,
    chatsActifs: chatsLive.filter(c => c.statut === 'en-cours').length,
    chatsEnAttente: chatsLive.filter(c => c.statut === 'en-attente').length,
    tempsReponseMoyen: 18 // minutes
  };

  const renderTickets = () => (
    <div className="space-y-6">
      {/* Statistiques avec graphiques */}
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
                Temps réponse
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {'< 2min'}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Évolution des tickets (7 jours)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={ticketsParJour}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="nouveaux" stroke="#3B82F6" strokeWidth={2} name="Nouveaux" />
              <Line type="monotone" dataKey="resolus" stroke="#10B981" strokeWidth={2} name="Résolus" />
              <Line type="monotone" dataKey="enCours" stroke="#F59E0B" strokeWidth={2} name="En cours" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Temps de réponse moyen (par jour)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tempsReponseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periode" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} min`, 'Temps de réponse']} />
              <Bar dataKey="temps" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
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
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportCSV('tickets')}
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Exporter
            </Button>
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
                      {ticket.statut !== 'resolu' && (
                        <button
                          onClick={() => handleAction(ticket, 'close')}
                          className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                          title="Marquer résolu"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
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

  const renderChatsLive = () => (
    <div className="space-y-6">
      {/* Statistiques chat */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Chats actifs
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.chatsActifs}
              </p>
            </div>
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                En attente
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.chatsEnAttente}
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Temps réponse
              </p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.tempsReponseMoyen}min
              </p>
            </div>
            <ClockIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Satisfaction
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                4.8/5
              </p>
            </div>
            <StarIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Graphique satisfaction */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Satisfaction client
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={satisfactionData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="valeur"
              label={({ nom, valeur }) => `${nom}: ${valeur}%`}
            >
              {satisfactionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.couleur} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Liste des chats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Chats en direct
            </h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportCSV('chats')}
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Visiteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Début
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {chatsLive.map((chat) => (
                <tr key={chat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {chat.visiteur.nom || 'Visiteur anonyme'}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {chat.visiteur.email || chat.visiteur.ip}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {chat.visiteur.localisation}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(chat.statut)}>
                      {getStatusIcon(chat.statut)}
                      <span className="ml-1">{chat.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {chat.agent || 'Non assigné'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {chat.dateDebut}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleChatAction(chat)}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Voir conversation"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      {chat.statut === 'en-attente' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleStartChat(chat.id)}
                        >
                          Prendre en charge
                        </Button>
                      )}
                      {chat.statut === 'en-cours' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEndChat(chat.id)}
                        >
                          Terminer
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

  const renderFAQ = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Foire Aux Questions
        </h3>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExportCSV('faq')}
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => handleFAQAction(null, 'add-faq')}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Ajouter une question
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vues
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Utilité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {faq.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                      {item.question}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {item.categorie}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {item.vues}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {Math.round((item.utile / (item.utile + item.pasUtile)) * 100)}% utile
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.utile} / {item.utile + item.pasUtile} votes
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleFAQAction(item, 'edit-faq')}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Modifier"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFAQ(item.id)}
                        className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        title="Supprimer"
                      >
                        <XCircleIcon className="h-4 w-4" />
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

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique temps de réponse */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Temps de réponse par jour
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tempsReponseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="periode" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} min`, 'Temps moyen']} />
              <Bar dataKey="temps" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Répartition par catégorie */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tickets par catégorie
          </h3>
          <div className="space-y-3">
            {['commande', 'livraison', 'paiement', 'produit', 'technique'].map(cat => {
              const count = tickets.filter(t => t.categorie === cat).length;
              const percentage = Math.round((count / tickets.length) * 100);
              return (
                <div key={cat} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{cat}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white w-12">
                      {count}
                    </span>
                  </div>
                </div>
              );
            })}
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
            {modalType === 'view' && selectedTicket && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Détails du ticket {selectedTicket.numeroTicket}
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
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
                          <span className="text-gray-600 dark:text-gray-400">Priorité:</span>
                          <span className={getPriorityBadge(selectedTicket.priorite)}>
                            {selectedTicket.priorite}
                          </span>
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
                              <button 
                                onClick={() => alert(`Téléchargement de ${fichier}`)}
                                className="hover:underline"
                              >
                                {fichier}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                      Conversation
                    </h4>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedTicket.conversation.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.auteur === 'plateforme' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] p-3 rounded-lg ${
                            message.auteur === 'plateforme'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className={`text-xs mt-1 ${
                              message.auteur === 'plateforme' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
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

            {modalType === 'respond' && selectedTicket && (
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

            {(modalType === 'add-faq' || modalType === 'edit-faq') && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modalType === 'add-faq' ? 'Ajouter une question FAQ' : 'Modifier la question FAQ'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Question *
                    </label>
                    <input
                      type="text"
                      value={faqForm.question}
                      onChange={(e) => setFaqForm(prev => ({ ...prev, question: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Réponse *
                    </label>
                    <textarea
                      value={faqForm.reponse}
                      onChange={(e) => setFaqForm(prev => ({ ...prev, reponse: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={faqForm.categorie}
                      onChange={(e) => setFaqForm(prev => ({ ...prev, categorie: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="Commandes">Commandes</option>
                      <option value="Paiement">Paiement</option>
                      <option value="Livraison">Livraison</option>
                      <option value="Produits">Produits</option>
                      <option value="Technique">Technique</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {modalType === 'chat-view' && selectedChat && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Conversation chat en direct
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Visiteur:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedChat.visiteur.nom || 'Anonyme'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Localisation:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedChat.visiteur.localisation}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Statut:</span>
                        <span className={getStatusBadge(selectedChat.statut)}>
                          {selectedChat.statut}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Agent:</span>
                        <span className="ml-2 text-gray-900 dark:text-white">
                          {selectedChat.agent || 'Non assigné'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.auteur === 'agent' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.auteur === 'agent'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <p className={`text-xs mt-1 ${
                            message.auteur === 'agent' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {message.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                {modalType === 'view' || modalType === 'chat-view' ? 'Fermer' : 'Annuler'}
              </Button>
              {modalType === 'view' && selectedTicket && selectedTicket.statut !== 'resolu' && (
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
              {(modalType === 'add-faq' || modalType === 'edit-faq') && (
                <Button
                  variant="primary"
                  onClick={confirmAction}
                  disabled={!faqForm.question || !faqForm.reponse}
                >
                  {modalType === 'add-faq' ? 'Ajouter' : 'Sauvegarder'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'tickets', name: 'Tickets Support', icon: LifebuoyIcon },
    { id: 'chat-live', name: 'Chat en Direct', icon: ChatBubbleLeftRightIcon },
    { id: 'faq', name: 'FAQ Publique', icon: DocumentTextIcon },
    { id: 'analytics', name: 'Analytics', icon: ChartBarIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Support Client
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gérez le support client de la plateforme
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
      {activeTab === 'chat-live' && renderChatsLive()}
      {activeTab === 'faq' && renderFAQ()}
      {activeTab === 'analytics' && renderAnalytics()}

      {renderModal()}
    </div>
  );
};