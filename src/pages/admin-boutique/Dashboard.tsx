import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import {
  ShoppingBagIcon,
  CubeIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  EyeIcon,
  HeartIcon,
  PlusIcon,
  TagIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MapPinIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../components/common/Button';
import { formatMGA } from '../../utils/formatMoney';

// Données pour les graphiques
const ventesData = [
  { date: '15/12', ventes: 125000, commandes: 8 },
  { date: '16/12', ventes: 89000, commandes: 6 },
  { date: '17/12', ventes: 156000, commandes: 12 },
  { date: '18/12', ventes: 203000, commandes: 15 },
  { date: '19/12', ventes: 178000, commandes: 11 },
  { date: '20/12', ventes: 245000, commandes: 18 }
];

const categoriesData = [
  { nom: 'Électronique', valeur: 45, couleur: '#3B82F6' },
  { nom: 'Mode', valeur: 30, couleur: '#10B981' },
  { nom: 'Alimentation', valeur: 15, couleur: '#F59E0B' },
  { nom: 'Maison', valeur: 10, couleur: '#8B5CF6' }
];

const visitesData = [
  { heure: '00h', visites: 12 },
  { heure: '04h', visites: 8 },
  { heure: '08h', visites: 45 },
  { heure: '12h', visites: 78 },
  { heure: '16h', visites: 92 },
  { heure: '20h', visites: 56 }
];

export const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [dashboardLayout, setDashboardLayout] = useState([
    'kpi', 'charts', 'orders', 'alerts', 'products', 'payments'
  ]);

  // Données simulées
  const kpiData = {
    totalSales: 2450000,
    totalOrders: 156,
    newVisitors: 89,
    followers: 234,
    revenue: 1890000,
    lowStock: 12,
    conversionRate: 3.2
  };

  const ordersData = [
    {
      id: 'CMD-001',
      client: 'Jean Rakoto',
      phone: '+261 32 12 345 67',
      status: 'en-attente',
      amount: 125000,
      date: '2024-12-20',
      items: 3
    },
    {
      id: 'CMD-002',
      client: 'Marie Andry',
      phone: '+261 33 98 765 43',
      status: 'expedie',
      amount: 89000,
      date: '2024-12-19',
      items: 2
    },
    {
      id: 'CMD-003',
      client: 'Paul Rabe',
      phone: '+261 34 55 666 77',
      status: 'livre',
      amount: 156000,
      date: '2024-12-18',
      items: 1
    }
  ];

  const topProducts = [
    {
      id: 'P001',
      name: 'Smartphone XYZ',
      views: 1250,
      orders: 45,
      revenue: 675000,
      trend: 'up'
    },
    {
      id: 'P002',
      name: 'Robe élégante',
      views: 890,
      orders: 32,
      revenue: 320000,
      trend: 'up'
    },
    {
      id: 'P003',
      name: 'Café premium',
      views: 567,
      orders: 28,
      revenue: 140000,
      trend: 'down'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'stock',
      message: '12 produits en rupture de stock',
      priority: 'high',
      time: '5 min'
    },
    {
      id: 2,
      type: 'order',
      message: '8 commandes en attente de traitement',
      priority: 'medium',
      time: '15 min'
    },
    {
      id: 3,
      type: 'promotion',
      message: 'Promotion "Été 2024" expire dans 2 jours',
      priority: 'low',
      time: '1h'
    }
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      'en-attente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'expedie': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'livre': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'annule': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return badges[status as keyof typeof badges] || badges['en-attente'];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en-attente':
        return <ClockIcon className="h-4 w-4" />;
      case 'expedie':
        return <TruckIcon className="h-4 w-4" />;
      case 'livre':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'annule':
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

  return (
    <div className="space-y-6">
      {/* Header avec sélecteur de période */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tableau de bord
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Vue d'ensemble de votre boutique
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
          <Button variant="outline" size="sm">
            Personnaliser
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Ventes totales
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatMGA(kpiData.totalSales)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +12% vs mois dernier
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
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
                {kpiData.totalOrders}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                +8 cette semaine
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Nouveaux visiteurs
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.newVisitors}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Taux conversion: {kpiData.conversionRate}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Abonnés boutique
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {kpiData.followers}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                +15 cette semaine
              </p>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Alertes et notifications */}
      {alerts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Alertes & Notifications
            </h2>
            <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
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
                  <Button variant="outline" size="sm">
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
              Évolution des ventes (30 jours)
            </h2>
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={ventesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'ventes' ? formatMGA(value as number) : value,
                name === 'ventes' ? 'Ventes' : 'Commandes'
              ]} />
              <Area type="monotone" dataKey="ventes" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
              <Line type="monotone" dataKey="commandes" stroke="#10B981" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top produits */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top produits
            </h2>
            <CubeIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {product.views} vues • {product.orders} commandes
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {formatMGA(product.revenue)}
                  </span>
                  {product.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            Voir tous les produits
          </Button>
        </div>
      </div>

      {/* Graphiques supplémentaires */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition par catégorie */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Ventes par catégorie
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoriesData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="valeur"
                label={({ nom, valeur }) => `${nom}: ${valeur}%`}
              >
                {categoriesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.couleur} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Visites par heure */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Visites par tranche horaire
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={visitesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="heure" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visites" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dernières commandes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dernières commandes
            </h2>
            <Button variant="outline" size="sm">
              Voir toutes les commandes
            </Button>
          </div>
        </div>
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
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Montant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {ordersData.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.id}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.items} article(s) • {new Date(order.date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {order.client}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {formatMGA(order.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm">
                      Voir / Traiter
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paiements récents */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paiements récents
            </h2>
            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Solde disponible
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {formatMGA(kpiData.revenue)}
                </p>
              </div>
              <Button variant="primary" size="sm">
                Retirer
              </Button>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>Prochain transfert: 25 décembre 2024</p>
              <p>Mode: Mobile Money</p>
            </div>
          </div>
        </div>

        {/* Raccourcis rapides */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Actions rapides
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="primary" size="sm" className="flex items-center justify-center">
              <PlusIcon className="h-4 w-4 mr-2" />
              Ajouter produit
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center justify-center">
              <TagIcon className="h-4 w-4 mr-2" />
              Créer promo
            </Button>
            <Button variant="outline" size="sm" className="flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button variant="outline" size="sm" className="flex items-center justify-center">
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              Campagne
            </Button>
          </div>
        </div>
      </div>

      {/* Activité des vendeurs (si multi-vendeurs) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Activité des vendeurs
          </h2>
          <Button variant="outline" size="sm">
            Gérer les vendeurs
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Vendeurs actifs</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">89</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Ventes ce mois</div>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">4.8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</div>
          </div>
        </div>
      </div>

      {/* Suivi des livraisons */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Suivi des livraisons
          </h2>
          <TruckIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">En préparation</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">8</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Expédiées</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-xl font-bold text-green-600 dark:text-green-400">45</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Livrées</div>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-xl font-bold text-red-600 dark:text-red-400">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Problèmes</div>
          </div>
        </div>
      </div>
    </div>
  );
};