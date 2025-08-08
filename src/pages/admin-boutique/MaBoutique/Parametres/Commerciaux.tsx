import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button';
import {
  CurrencyDollarIcon,
  PercentBadgeIcon,
  TruckIcon,
  CreditCardIcon,
  TagIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  TrashIcon,
  DocumentTextIcon,
  ShoppingCartIcon,
  GiftIcon,
  BanknotesIcon,
  CalculatorIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';
import { formatMGA } from '../../../../utils/formatMoney';

interface ParametresCommerciaux {
  // Commissions et frais
  commissions: {
    tauxCommissionVente: number; // pourcentage
    fraisFixeParVente: number;
    fraisListingProduit: number;
    fraisPromotionProduit: number;
  };
  
  // Paiements et facturation
  paiements: {
    delaiPaiementClient: number; // en jours
    methodesAcceptees: string[];
    paiementMinimum: number;
    fraisTransactionMobileMoney: number;
    fraisVirement: number;
  };
  
  // Livraison
  livraison: {
    fraisLivraisonDefaut: number;
    livraisonGratuiteSeuil: number;
    delaiLivraisonStandard: number;
    fraisLivraisonExpress: number;
    assuranceObligatoire: boolean;
    emballageInclus: boolean;
  };
  
  // Taxes et réglementations
  taxes: {
    tvaApplicable: boolean;
    tauxTVA: number;
    numeroTVA: string;
    taxeLocale: boolean;
    tauxTaxeLocale: number;
  };
  
  // Politiques commerciales
  politiques: {
    retourAutorise: boolean;
    delaiRetour: number; // en jours
    fraisRetour: 'client' | 'boutique' | 'gratuit';
    echangeAutorise: boolean;
    remboursementAutorise: boolean;
    garantieStandard: number; // en mois
  };
  
  // Gestion des stocks
  stock: {
    alerteStockFaible: number;
    reservationProduit: boolean;
    dureeReservation: number; // en heures
    venteSansStock: boolean;
    precommande: boolean;
  };
  
  // Promotions et réductions
  promotions: {
    codePromoAutorise: boolean;
    reductionMaximum: number; // pourcentage
    cumulPromotions: boolean;
    loyaltyProgram: boolean;
    pointsParAchat: number; // points par 1000 MGA
  };
  
  // Unités et mesures
  unites: {
    unitePoidsDefaut: 'kg' | 'g' | 'tonne';
    uniteLongueurDefaut: 'cm' | 'm' | 'mm';
    uniteVolumeDefaut: 'l' | 'ml' | 'm3';
    deviseAffichage: 'MGA' | 'EUR' | 'USD';
  };
}

interface RegleCommerciale {
  id: string;
  nom: string;
  description: string;
  type: 'reduction' | 'frais' | 'condition';
  valeur: number;
  unite: 'pourcentage' | 'fixe' | 'jours';
  actif: boolean;
  conditions?: string;
}

export const Commerciaux: React.FC = () => {
  const [settings, setSettings] = useState<ParametresCommerciaux>({
    commissions: {
      tauxCommissionVente: 5,
      fraisFixeParVente: 500,
      fraisListingProduit: 0,
      fraisPromotionProduit: 2000
    },
    paiements: {
      delaiPaiementClient: 7,
      methodesAcceptees: ['mobile-money', 'virement', 'cash-delivery'],
      paiementMinimum: 1000,
      fraisTransactionMobileMoney: 2,
      fraisVirement: 1000
    },
    livraison: {
      fraisLivraisonDefaut: 5000,
      livraisonGratuiteSeuil: 50000,
      delaiLivraisonStandard: 3,
      fraisLivraisonExpress: 10000,
      assuranceObligatoire: false,
      emballageInclus: true
    },
    taxes: {
      tvaApplicable: true,
      tauxTVA: 20,
      numeroTVA: 'MG123456789',
      taxeLocale: false,
      tauxTaxeLocale: 0
    },
    politiques: {
      retourAutorise: true,
      delaiRetour: 14,
      fraisRetour: 'client',
      echangeAutorise: true,
      remboursementAutorise: true,
      garantieStandard: 12
    },
    stock: {
      alerteStockFaible: 5,
      reservationProduit: true,
      dureeReservation: 24,
      venteSansStock: false,
      precommande: true
    },
    promotions: {
      codePromoAutorise: true,
      reductionMaximum: 50,
      cumulPromotions: false,
      loyaltyProgram: true,
      pointsParAchat: 10
    },
    unites: {
      unitePoidsDefaut: 'kg',
      uniteLongueurDefaut: 'cm',
      uniteVolumeDefaut: 'l',
      deviseAffichage: 'MGA'
    }
  });

  const [reglesPersonnalisees, setReglesPersonnalisees] = useState<RegleCommerciale[]>([
    {
      id: 'R001',
      nom: 'Réduction fidélité',
      description: 'Réduction pour les clients fidèles (>5 commandes)',
      type: 'reduction',
      valeur: 10,
      unite: 'pourcentage',
      actif: true,
      conditions: 'Minimum 5 commandes précédentes'
    },
    {
      id: 'R002',
      nom: 'Frais emballage cadeau',
      description: 'Frais supplémentaires pour emballage cadeau',
      type: 'frais',
      valeur: 2000,
      unite: 'fixe',
      actif: false
    }
  ]);

  const [activeTab, setActiveTab] = useState('commissions');
  const [isLoading, setIsLoading] = useState(false);
  const [newRule, setNewRule] = useState({
    nom: '',
    description: '',
    type: 'reduction' as const,
    valeur: 0,
    unite: 'pourcentage' as const,
    conditions: ''
  });
  const [showAddRule, setShowAddRule] = useState(false);

  const methodesDisponibles = [
    { id: 'mobile-money', nom: 'Mobile Money', icon: '📱' },
    { id: 'virement', nom: 'Virement bancaire', icon: '🏦' },
    { id: 'cash-delivery', nom: 'Paiement à la livraison', icon: '🚚' },
    { id: 'carte-credit', nom: 'Carte de crédit', icon: '💳' },
    { id: 'paypal', nom: 'PayPal', icon: '💰' }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres commerciaux sauvegardés avec succès !');
  };

  const handleToggle = (section: keyof ParametresCommerciaux, field: string) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: !prev[section][field as keyof any]
      }
    }));
  };

  const handleInputChange = (section: keyof ParametresCommerciaux, field: string, value: string | number) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const toggleMethodePaiement = (methode: string) => {
    setSettings(prev => ({
      ...prev,
      paiements: {
        ...prev.paiements,
        methodesAcceptees: prev.paiements.methodesAcceptees.includes(methode)
          ? prev.paiements.methodesAcceptees.filter(m => m !== methode)
          : [...prev.paiements.methodesAcceptees, methode]
      }
    }));
  };

  const addReglePersonnalisee = () => {
    if (!newRule.nom || !newRule.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const regle: RegleCommerciale = {
      id: `R${String(reglesPersonnalisees.length + 1).padStart(3, '0')}`,
      nom: newRule.nom,
      description: newRule.description,
      type: newRule.type,
      valeur: newRule.valeur,
      unite: newRule.unite,
      actif: true,
      conditions: newRule.conditions
    };

    setReglesPersonnalisees(prev => [...prev, regle]);
    setNewRule({
      nom: '',
      description: '',
      type: 'reduction',
      valeur: 0,
      unite: 'pourcentage',
      conditions: ''
    });
    setShowAddRule(false);
  };

  const toggleRegle = (regleId: string) => {
    setReglesPersonnalisees(prev => prev.map(r => 
      r.id === regleId ? { ...r, actif: !r.actif } : r
    ));
  };

  const removeRegle = (regleId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette règle ?')) {
      setReglesPersonnalisees(prev => prev.filter(r => r.id !== regleId));
    }
  };

  const renderCommissionsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commissions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PercentBadgeIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Commissions et frais
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Taux de commission sur ventes (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={settings.commissions.tauxCommissionVente}
                onChange={(e) => handleInputChange('commissions', 'tauxCommissionVente', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Commission prélevée par la plateforme sur chaque vente
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frais fixe par vente (MGA)
              </label>
              <input
                type="number"
                value={settings.commissions.fraisFixeParVente}
                onChange={(e) => handleInputChange('commissions', 'fraisFixeParVente', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frais de listing produit (MGA)
              </label>
              <input
                type="number"
                value={settings.commissions.fraisListingProduit}
                onChange={(e) => handleInputChange('commissions', 'fraisListingProduit', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Frais pour publier un nouveau produit (0 = gratuit)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Frais promotion produit (MGA)
              </label>
              <input
                type="number"
                value={settings.commissions.fraisPromotionProduit}
                onChange={(e) => handleInputChange('commissions', 'fraisPromotionProduit', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Frais pour mettre un produit en promotion
              </p>
            </div>
          </div>
        </div>

        {/* Paiements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CreditCardIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paramètres de paiement
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Délai de paiement client (jours)
              </label>
              <input
                type="number"
                value={settings.paiements.delaiPaiementClient}
                onChange={(e) => handleInputChange('paiements', 'delaiPaiementClient', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Montant minimum de commande (MGA)
              </label>
              <input
                type="number"
                value={settings.paiements.paiementMinimum}
                onChange={(e) => handleInputChange('paiements', 'paiementMinimum', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Méthodes de paiement acceptées
              </label>
              <div className="space-y-2">
                {methodesDisponibles.map(methode => (
                  <div key={methode.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{methode.icon}</span>
                      <label className="text-sm text-gray-700 dark:text-gray-300">
                        {methode.nom}
                      </label>
                    </div>
                    <button
                      onClick={() => toggleMethodePaiement(methode.id)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                        settings.paiements.methodesAcceptees.includes(methode.id) ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                          settings.paiements.methodesAcceptees.includes(methode.id) ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frais Mobile Money (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.paiements.fraisTransactionMobileMoney}
                  onChange={(e) => handleInputChange('paiements', 'fraisTransactionMobileMoney', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frais virement (MGA)
                </label>
                <input
                  type="number"
                  value={settings.paiements.fraisVirement}
                  onChange={(e) => handleInputChange('paiements', 'fraisVirement', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulateur de commission */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <CalculatorIcon className="h-5 w-5 text-purple-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Simulateur de commission
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prix de vente (MGA)
            </label>
            <input
              type="number"
              defaultValue={100000}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              onChange={(e) => {
                const prix = parseInt(e.target.value) || 0;
                const commission = (prix * settings.commissions.tauxCommissionVente / 100) + settings.commissions.fraisFixeParVente;
                const net = prix - commission;
                
                // Mise à jour de l'affichage (simulation)
                const commissionEl = document.getElementById('commission-calc');
                const netEl = document.getElementById('net-calc');
                if (commissionEl) commissionEl.textContent = formatMGA(commission);
                if (netEl) netEl.textContent = formatMGA(net);
              }}
            />
          </div>

          <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Commission prélevée</p>
            <p id="commission-calc" className="text-xl font-bold text-red-600 dark:text-red-400">
              {formatMGA((100000 * settings.commissions.tauxCommissionVente / 100) + settings.commissions.fraisFixeParVente)}
            </p>
          </div>

          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">Revenus nets</p>
            <p id="net-calc" className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatMGA(100000 - ((100000 * settings.commissions.tauxCommissionVente / 100) + settings.commissions.fraisFixeParVente))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaxesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TVA */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BanknotesIcon className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              TVA et taxes
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  TVA applicable
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Appliquer la TVA sur les ventes
                </p>
              </div>
              <button
                onClick={() => handleToggle('taxes', 'tvaApplicable')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.taxes.tvaApplicable ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.taxes.tvaApplicable ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.taxes.tvaApplicable && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Taux de TVA (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={settings.taxes.tauxTVA}
                    onChange={(e) => handleInputChange('taxes', 'tauxTVA', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Numéro de TVA
                  </label>
                  <input
                    type="text"
                    value={settings.taxes.numeroTVA}
                    onChange={(e) => handleInputChange('taxes', 'numeroTVA', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Taxe locale
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Taxe municipale ou régionale
                </p>
              </div>
              <button
                onClick={() => handleToggle('taxes', 'taxeLocale')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.taxes.taxeLocale ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.taxes.taxeLocale ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.taxes.taxeLocale && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Taux de taxe locale (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={settings.taxes.tauxTaxeLocale}
                  onChange={(e) => handleInputChange('taxes', 'tauxTaxeLocale', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Politiques commerciales */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DocumentTextIcon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Politiques commerciales
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Retours autorisés
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre aux clients de retourner les produits
                </p>
              </div>
              <button
                onClick={() => handleToggle('politiques', 'retourAutorise')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.politiques.retourAutorise ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.politiques.retourAutorise ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.politiques.retourAutorise && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Délai de retour (jours)
                  </label>
                  <input
                    type="number"
                    value={settings.politiques.delaiRetour}
                    onChange={(e) => handleInputChange('politiques', 'delaiRetour', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Frais de retour
                  </label>
                  <select
                    value={settings.politiques.fraisRetour}
                    onChange={(e) => handleInputChange('politiques', 'fraisRetour', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="client">À la charge du client</option>
                    <option value="boutique">À la charge de la boutique</option>
                    <option value="gratuit">Gratuit</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Échanges autorisés
              </label>
              <button
                onClick={() => handleToggle('politiques', 'echangeAutorise')}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  settings.politiques.echangeAutorise ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    settings.politiques.echangeAutorise ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Remboursements autorisés
              </label>
              <button
                onClick={() => handleToggle('politiques', 'remboursementAutorise')}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  settings.politiques.remboursementAutorise ? 'bg-orange-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                    settings.politiques.remboursementAutorise ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Garantie standard (mois)
              </label>
              <input
                type="number"
                value={settings.politiques.garantieStandard}
                onChange={(e) => handleInputChange('politiques', 'garantieStandard', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStockTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gestion des stocks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ShoppingCartIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Gestion des stocks
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seuil d'alerte stock faible
              </label>
              <input
                type="number"
                value={settings.stock.alerteStockFaible}
                onChange={(e) => handleInputChange('stock', 'alerteStockFaible', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Réservation de produits
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Réserver temporairement les produits dans le panier
                </p>
              </div>
              <button
                onClick={() => handleToggle('stock', 'reservationProduit')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.stock.reservationProduit ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.stock.reservationProduit ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.stock.reservationProduit && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Durée de réservation (heures)
                </label>
                <input
                  type="number"
                  value={settings.stock.dureeReservation}
                  onChange={(e) => handleInputChange('stock', 'dureeReservation', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Vente sans stock
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Autoriser les commandes même en rupture
                </p>
              </div>
              <button
                onClick={() => handleToggle('stock', 'venteSansStock')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.stock.venteSansStock ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.stock.venteSansStock ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Précommandes
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre les précommandes de produits
                </p>
              </div>
              <button
                onClick={() => handleToggle('stock', 'precommande')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.stock.precommande ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.stock.precommande ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Unités et mesures */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <ScaleIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Unités et mesures
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unité de poids par défaut
              </label>
              <select
                value={settings.unites.unitePoidsDefaut}
                onChange={(e) => handleInputChange('unites', 'unitePoidsDefaut', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="kg">Kilogramme (kg)</option>
                <option value="g">Gramme (g)</option>
                <option value="tonne">Tonne (t)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unité de longueur par défaut
              </label>
              <select
                value={settings.unites.uniteLongueurDefaut}
                onChange={(e) => handleInputChange('unites', 'uniteLongueurDefaut', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="cm">Centimètre (cm)</option>
                <option value="m">Mètre (m)</option>
                <option value="mm">Millimètre (mm)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Unité de volume par défaut
              </label>
              <select
                value={settings.unites.uniteVolumeDefaut}
                onChange={(e) => handleInputChange('unites', 'uniteVolumeDefaut', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="l">Litre (l)</option>
                <option value="ml">Millilitre (ml)</option>
                <option value="m3">Mètre cube (m³)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Devise d'affichage
              </label>
              <select
                value={settings.unites.deviseAffichage}
                onChange={(e) => handleInputChange('unites', 'deviseAffichage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="MGA">Ariary Malgache (MGA)</option>
                <option value="EUR">Euro (EUR)</option>
                <option value="USD">Dollar US (USD)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPromotionsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Promotions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TagIcon className="h-5 w-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Promotions et réductions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Codes promo autorisés
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre l'utilisation de codes promotionnels
                </p>
              </div>
              <button
                onClick={() => handleToggle('promotions', 'codePromoAutorise')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.promotions.codePromoAutorise ? 'bg-pink-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.promotions.codePromoAutorise ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Réduction maximum autorisée (%)
              </label>
              <input
                type="number"
                max="100"
                value={settings.promotions.reductionMaximum}
                onChange={(e) => handleInputChange('promotions', 'reductionMaximum', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cumul de promotions
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Permettre le cumul de plusieurs promotions
                </p>
              </div>
              <button
                onClick={() => handleToggle('promotions', 'cumulPromotions')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.promotions.cumulPromotions ? 'bg-pink-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.promotions.cumulPromotions ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Programme de fidélité
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Système de points de fidélité
                </p>
              </div>
              <button
                onClick={() => handleToggle('promotions', 'loyaltyProgram')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.promotions.loyaltyProgram ? 'bg-pink-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.promotions.loyaltyProgram ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.promotions.loyaltyProgram && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Points par tranche de 1000 MGA
                </label>
                <input
                  type="number"
                  value={settings.promotions.pointsParAchat}
                  onChange={(e) => handleInputChange('promotions', 'pointsParAchat', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* Règles personnalisées */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <GiftIcon className="h-5 w-5 text-orange-500" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Règles commerciales personnalisées
              </h2>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAddRule(true)}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>

          <div className="space-y-3">
            {reglesPersonnalisees.map((regle) => (
              <div key={regle.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {regle.nom}
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        regle.type === 'reduction' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : regle.type === 'frais'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {regle.type}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        regle.actif 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {regle.actif ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {regle.description}
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {regle.valeur}{regle.unite === 'pourcentage' ? '%' : regle.unite === 'fixe' ? ' MGA' : ' jours'}
                    </p>
                    {regle.conditions && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Conditions: {regle.conditions}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleRegle(regle.id)}
                      className={`p-2 rounded ${regle.actif 
                        ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                        : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                      }`}
                      title={regle.actif ? 'Désactiver' : 'Activer'}
                    >
                      {regle.actif ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => removeRegle(regle.id)}
                      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      title="Supprimer"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showAddRule && (
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Nouvelle règle commerciale
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Nom de la règle"
                  value={newRule.nom}
                  onChange={(e) => setNewRule(prev => ({ ...prev, nom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <textarea
                  placeholder="Description de la règle"
                  value={newRule.description}
                  onChange={(e) => setNewRule(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-3 gap-2">
                  <select
                    value={newRule.type}
                    onChange={(e) => setNewRule(prev => ({ ...prev, type: e.target.value as any }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="reduction">Réduction</option>
                    <option value="frais">Frais</option>
                    <option value="condition">Condition</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Valeur"
                    value={newRule.valeur}
                    onChange={(e) => setNewRule(prev => ({ ...prev, valeur: parseInt(e.target.value) }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <select
                    value={newRule.unite}
                    onChange={(e) => setNewRule(prev => ({ ...prev, unite: e.target.value as any }))}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="pourcentage">%</option>
                    <option value="fixe">MGA</option>
                    <option value="jours">Jours</option>
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="Conditions (optionnel)"
                  value={newRule.conditions}
                  onChange={(e) => setNewRule(prev => ({ ...prev, conditions: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex space-x-2">
                  <Button variant="primary" size="sm" onClick={addReglePersonnalisee}>
                    Ajouter
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowAddRule(false)}>
                    Annuler
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'commissions', name: 'Commissions & Paiements', icon: CurrencyDollarIcon },
    { id: 'taxes', name: 'Taxes & Politiques', icon: BanknotesIcon },
    { id: 'stock', name: 'Stock & Unités', icon: ShoppingCartIcon },
    { id: 'promotions', name: 'Promotions & Règles', icon: TagIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres Commerciaux
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configurez les aspects commerciaux et financiers de votre boutique
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
      {activeTab === 'commissions' && renderCommissionsTab()}
      {activeTab === 'taxes' && renderTaxesTab()}
      {activeTab === 'stock' && renderStockTab()}
      {activeTab === 'promotions' && renderPromotionsTab()}

      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">
          Réinitialiser
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          isLoading={isLoading}
        >
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  );
};