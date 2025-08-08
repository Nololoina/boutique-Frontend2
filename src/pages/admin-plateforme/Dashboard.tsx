import React, { useState } from 'react';
import {
  ShoppingBagIcon,
  BuildingStorefrontIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  EyeIcon,

  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  DocumentArrowDownIcon,
  PlusIcon,
  BellIcon,
  CalendarIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';
import { useNavigate } from 'react-router-dom';

import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

export const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const navigate = useNavigate();

  // Données simulées
  const kpiData = {
    totalBoutiques: 247,
    boutiquesActives: 189,
    nouvellesBoutiques: 12,
    boutiquesEnAttente: 8,
    totalUtilisateurs: 15420,
    nouveauxUtilisateurs: 234,
    totalCommandes: 8567,
    commandesAujourdhui: 45,
    chiffreAffaires: 125000000,
    croissanceCA: 15.2,
    ticketsSupport: 23,
    ticketsOuverts: 8,
    publicitesPendantes: 5,
    contenusAModerer: 12
  };

  const boutiquesRecentes = [
    {
      id: 'B001',
      nom: 'Épicerie Bio Tana',
      responsable: 'Jean Rakoto',
      statut: 'en-attente',
      dateInscription: '2024-12-20',
      categorie: 'Alimentation'
    },
    {
      id: 'B002',
      nom: 'Mode & Style',
      responsable: 'Marie Andry',
      statut: 'active',
      dateInscription: '2024-12-19',
      categorie: 'Mode'
    },
    {
      id: 'B003',
      nom: 'Tech Solutions',
      responsable: 'Paul Rabe',
      statut: 'en-attente',
      dateInscription: '2024-12-18',
      categorie: 'Électronique'
    }
  ];

  const alertes = [
    {
      id: 1,
      type: 'boutique',
      message: '8 boutiques en attente de validation',
      priority: 'high',
      action: () => navigate('/admin-plateforme/gestion-boutiques'),
      time: '5 min'
    },
    {
      id: 2,
      type: 'support',
      message: '12 tickets support non traités',
      priority: 'medium',
      action: () => navigate('/admin-plateforme/support'),
      time: '15 min'
    },
    {
      id: 3,
      type: 'moderation',
      message: '5 contenus à modérer',
      priority: 'medium',
      action: () => navigate('/admin-plateforme/moderation'),
      time: '30 min'
    },
    {
      id: 4,
      type: 'publicite',
      message: '3 publicités en attente de validation',
      priority: 'low',
      action: () => navigate('/admin-plateforme/publicites'),
      time: '1h'
    }
  ];

  const activitesRecentes = [
    {
      id: 1,
      action: 'Boutique "Épicerie Bio Tana" validée',
      utilisateur: 'Admin Paul',
      date: '2024-12-20 14:30',
      type: 'validation'
    },
    {
      id: 2,
      action: 'Utilisateur support "Marie Rabe" ajouté',
      utilisateur: 'Admin Principal',
      date: '2024-12-20 13:15',
      type: 'user'
    },
    {
      id: 3,
      action: 'Publicité "Promo Noël" approuvée',
      utilisateur: 'Admin Sophie',
      date: '2024-12-20 12:45',
      type: 'publicite'
    },
    {
      id: 4,
      action: 'Contenu signalé modéré',
      utilisateur: 'Modérateur Paul',
      date: '2024-12-20 11:20',
      type: 'moderation'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'en-attente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'inactive': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return badges[status as keyof typeof badges] || badges['en-attente'];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'en-attente':
        return <ClockIcon className="h-4 w-4" />;
      case 'inactive':
        return <XCircleIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low':
        return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      default:
        return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const handleExportData = (type: string) => {
    let csvContent = '';
    let filename = '';
    
    switch (type) {
      case 'boutiques':
        csvContent = "data:text/csv;charset=utf-8," + 
          "ID,Nom,Responsable,Statut,Date Inscription,Categorie\n" +
          boutiquesRecentes.map(b => `${b.id},${b.nom},${b.responsable},${b.statut},${b.dateInscription},${b.categorie}`).join("\n");
        filename = 'boutiques_dashboard.csv';
        break;
      case 'activites':
        csvContent = "data:text/csv;charset=utf-8," + 
          "Action,Utilisateur,Date,Type\n" +
          activitesRecentes.map(a => `"${a.action}",${a.utilisateur},${a.date},${a.type}`).join("\n");
        filename = 'activites_dashboard.csv';
        break;
      case 'kpi':
        csvContent = "data:text/csv;charset=utf-8," + 
          "Indicateur,Valeur\n" +
          `Total Boutiques,${kpiData.totalBoutiques}\n` +
          `Boutiques Actives,${kpiData.boutiquesActives}\n` +
          `Total Utilisateurs,${kpiData.totalUtilisateurs}\n` +
          `Total Commandes,${kpiData.totalCommandes}\n` +
          `Chiffre d'Affaires,${kpiData.chiffreAffaires}`;
        filename = 'kpi_dashboard.csv';
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
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'nouvelle-boutique':
        navigate('/admin-plateforme/gestion-boutiques');
        setTimeout(() => {
          alert('Ouverture du formulaire de création de boutique');
        }, 100);
        break;
      case 'nouveau-utilisateur':
        navigate('/admin-plateforme/gestion-utilisateurs');
        setTimeout(() => {
          alert('Ouverture du formulaire d\'ajout d\'utilisateur');
        }, 100);
        break;
      case 'moderation':
        navigate('/admin-plateforme/moderation');
        break;
      case 'support':
        navigate('/admin-plateforme/support');
        break;
      default:
        break;
    }
  };

  const handleBoutiqueAction = (boutiqueId: string, action: string) => {
    switch (action) {
      case 'valider':
        alert(`Boutique ${boutiqueId} validée avec succès !`);
        // Mise à jour du statut
        break;
      case 'voir':
        navigate(`/admin-plateforme/gestion-boutiques`);
        setTimeout(() => {
          alert(`Ouverture des détails de la boutique ${boutiqueId}`);
        }, 100);
        break;
      case 'contacter':
        alert(`Ouverture de la conversation avec la boutique ${boutiqueId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header avec sélecteur de période */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tableau de bord Plateforme
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vue d'ensemble de votre plateforme e-commerce
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleExportData('kpi')}
          >
            <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
            Exporter KPI
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Boutiques
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.totalBoutiques}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +{kpiData.nouvellesBoutiques} ce mois
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <BuildingStorefrontIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Utilisateurs
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.totalUtilisateurs.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +{kpiData.nouveauxUtilisateurs} cette semaine
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Commandes
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.totalCommandes.toLocaleString()}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                +{kpiData.commandesAujourdhui} aujourd'hui
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Chiffre d'affaires
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatMGA(kpiData.chiffreAffaires)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <ArrowTrendingUpIcon className="h-4 w-4 mr-1" />
                +{kpiData.croissanceCA}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Alertes et notifications */}
      {alertes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Alertes & Notifications
            </h2>
            <BellIcon className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            {alertes.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(alert.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Il y a {alert.time}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={alert.action}
                  >
                    Traiter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphiques */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Évolution des inscriptions (30 jours)
            </h2>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { date: '15/12', boutiques: 2, utilisateurs: 45 },
              { date: '16/12', boutiques: 1, utilisateurs: 38 },
              { date: '17/12', boutiques: 3, utilisateurs: 52 },
              { date: '18/12', boutiques: 2, utilisateurs: 41 },
              { date: '19/12', boutiques: 4, utilisateurs: 67 },
              { date: '20/12', boutiques: 3, utilisateurs: 58 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="boutiques" stroke="#3B82F6" strokeWidth={2} name="Boutiques" />
              <Line type="monotone" dataKey="utilisateurs" stroke="#10B981" strokeWidth={2} name="Utilisateurs" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Actions rapides */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="primary" 
              size="sm" 
              className="flex items-center justify-center"
              onClick={() => handleQuickAction('nouvelle-boutique')}
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Nouvelle boutique
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              className="flex items-center justify-center"
              onClick={() => handleQuickAction('nouveau-utilisateur')}
            >
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Nouvel utilisateur
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center justify-center"
              onClick={() => handleQuickAction('moderation')}
            >
              <ShieldCheckIcon className="h-4 w-4 mr-2" />
              Modération
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center justify-center"
              onClick={() => handleQuickAction('support')}
            >
              <LifebuoyIcon className="h-4 w-4 mr-2" />
              Support
            </Button>
          </div>
        </div>
      </div>

      {/* Boutiques récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Boutiques récentes
            </h2>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleExportData('boutiques')}
              >
                <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/admin-plateforme/gestion-boutiques')}
              >
                Voir toutes
              </Button>
            </div>
          </div>
        </div>
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
                  Statut
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
              {boutiquesRecentes.map((boutique) => (
                <tr key={boutique.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {boutique.nom}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {boutique.categorie}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {boutique.responsable}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(boutique.statut)}`}>
                      {getStatusIcon(boutique.statut)}
                      <span className="ml-1">{boutique.statut}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(boutique.dateInscription).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleBoutiqueAction(boutique.id, 'voir')}
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        Voir
                      </Button>
                      {boutique.statut === 'en-attente' && (
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => handleBoutiqueAction(boutique.id, 'valider')}
                        >
                          Valider
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statistiques détaillées */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Statistiques détaillées
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => alert('Ouverture du rapport détaillé des statistiques')}
            >
              Rapport complet
            </Button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <BuildingStorefrontIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Boutiques actives
                </span>
              </div>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {kpiData.boutiquesActives}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <ClockIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  En attente validation
                </span>
              </div>
              <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {kpiData.boutiquesEnAttente}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <LifebuoyIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Tickets support ouverts
                </span>
              </div>
              <span className="text-lg font-bold text-red-600 dark:text-red-400">
                {kpiData.ticketsOuverts}
              </span>
            </div>
          </div>
        </div>

        {/* Activités récentes */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Activités récentes
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExportData('activites')}
            >
              <DocumentArrowDownIcon className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
          <div className="space-y-4">
            {activitesRecentes.map((activite) => (
              <div key={activite.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activite.type === 'validation' ? 'bg-green-500' :
                  activite.type === 'user' ? 'bg-blue-500' :
                  activite.type === 'publicite' ? 'bg-purple-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activite.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activite.date} par {activite.utilisateur}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => alert('Ouverture du journal complet des activités')}
            >
              Voir toutes les activités
            </Button>
          </div>
        </div>
      </div>

      {/* Tâches en attente */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Tâches nécessitant une attention
          </h2>
          <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
            onClick={() => navigate('/admin-plateforme/gestion-boutiques')}
          >
            <div className="flex items-center justify-between mb-2">
              <BuildingStorefrontIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {kpiData.boutiquesEnAttente}
              </span>
            </div>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Boutiques à valider
            </p>
          </div>

          <div 
            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            onClick={() => navigate('/admin-plateforme/support')}
          >
            <div className="flex items-center justify-between mb-2">
              <LifebuoyIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                {kpiData.ticketsOuverts}
              </span>
            </div>
            <p className="text-sm font-medium text-red-800 dark:text-red-200">
              Tickets support
            </p>
          </div>

          <div 
            className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            onClick={() => navigate('/admin-plateforme/publicites')}
          >
            <div className="flex items-center justify-between mb-2">
              <MegaphoneIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {kpiData.publicitesPendantes}
              </span>
            </div>
            <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Publicités en attente
            </p>
          </div>

          <div 
            className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            onClick={() => navigate('/admin-plateforme/moderation')}
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldCheckIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {kpiData.contenusAModerer}
              </span>
            </div>
            <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
              Contenus à modérer
            </p>
          </div>
        </div>
      </div>

      {/* Performance système */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Performance de la plateforme
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin-plateforme/parametres/maintenance')}
          >
            Paramètres système
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">99.8%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Disponibilité</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2s</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Temps de réponse</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">45GB</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Stockage utilisé</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">15j</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};