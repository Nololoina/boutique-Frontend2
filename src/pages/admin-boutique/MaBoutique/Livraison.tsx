import React, { useState } from 'react';
import {
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CogIcon,
  DocumentTextIcon,
  PhoneIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Button } from '../../../components/common/Button';
import { formatMGA } from '../../../utils/formatMoney';

interface ZoneLivraison {
  id: string;
  nom: string;
  description: string;
  villes: string[];
  tarifFixe: number;
  tarifParKg?: number;
  delaiMin: number;
  delaiMax: number;
  actif: boolean;
  conditions?: string;
}

interface Transporteur {
  id: string;
  nom: string;
  contact: {
    telephone: string;
    email: string;
    adresse: string;
  };
  services: string[];
  zones: string[];
  tarifs: {
    base: number;
    parKg: number;
  };
  actif: boolean;
  notes?: string;
}

interface ParametreLivraison {
  livraisonGratuiteSeuil: number;
  delaiPreparation: number;
  livraisonDomicile: boolean;
  livraisonPointRelais: boolean;
  retraitBoutique: boolean;
  emballageGratuit: boolean;
  assuranceObligatoire: boolean;
  suiviColis: boolean;
  signatureRequise: boolean;
  creneauxHoraires: boolean;
  livraisonWeekend: boolean;
  livraisonExpresse: boolean;
  messagePersonnalise: string;
}

const mockZones: ZoneLivraison[] = [
  {
    id: 'ZONE001',
    nom: 'Antananarivo Centre',
    description: 'Centre-ville et quartiers proches',
    villes: ['Antananarivo', 'Ivato', 'Ambohidratrimo'],
    tarifFixe: 5000,
    delaiMin: 1,
    delaiMax: 2,
    actif: true,
    conditions: 'Livraison en 24-48h pour les commandes passées avant 15h'
  },
  {
    id: 'ZONE002',
    nom: 'Périphérie Antananarivo',
    description: 'Banlieues et communes périphériques',
    villes: ['Antsirabe', 'Ambatondrazaka', 'Moramanga'],
    tarifFixe: 8000,
    tarifParKg: 1000,
    delaiMin: 2,
    delaiMax: 4,
    actif: true
  },
  {
    id: 'ZONE003',
    nom: 'Provinces',
    description: 'Autres villes de Madagascar',
    villes: ['Fianarantsoa', 'Toamasina', 'Mahajanga', 'Toliara', 'Antsiranana'],
    tarifFixe: 15000,
    tarifParKg: 2000,
    delaiMin: 5,
    delaiMax: 10,
    actif: true,
    conditions: 'Délais variables selon la destination finale'
  }
];

const mockTransporteurs: Transporteur[] = [
  {
    id: 'TRANS001',
    nom: 'ColisPoste Madagascar',
    contact: {
      telephone: '+261 20 22 123 45',
      email: 'contact@colisposte.mg',
      adresse: 'Rue de la Poste, Antananarivo'
    },
    services: ['Livraison standard', 'Livraison express', 'Suivi colis'],
    zones: ['ZONE001', 'ZONE002', 'ZONE003'],
    tarifs: {
      base: 5000,
      parKg: 1000
    },
    actif: true,
    notes: 'Partenaire principal, très fiable'
  },
  {
    id: 'TRANS002',
    nom: 'Express Delivery MG',
    contact: {
      telephone: '+261 32 98 765 43',
      email: 'info@expressdelivery.mg',
      adresse: 'Avenue de l\'Indépendance, Antananarivo'
    },
    services: ['Livraison express', 'Livraison weekend'],
    zones: ['ZONE001', 'ZONE002'],
    tarifs: {
      base: 8000,
      parKg: 1500
    },
    actif: true
  }
];

const mockParametres: ParametreLivraison = {
  livraisonGratuiteSeuil: 50000,
  delaiPreparation: 24,
  livraisonDomicile: true,
  livraisonPointRelais: true,
  retraitBoutique: true,
  emballageGratuit: true,
  assuranceObligatoire: false,
  suiviColis: true,
  signatureRequise: false,
  creneauxHoraires: true,
  livraisonWeekend: false,
  livraisonExpresse: true,
  messagePersonnalise: 'Merci pour votre commande ! Nous préparons votre colis avec soin.'
};

export const Livraison: React.FC = () => {
  const [activeTab, setActiveTab] = useState('zones');
  const [zones, setZones] = useState<ZoneLivraison[]>(mockZones);
  const [transporteurs, setTransporteurs] = useState<Transporteur[]>(mockTransporteurs);
  const [parametres, setParametres] = useState<ParametreLivraison>(mockParametres);
  const [selectedZone, setSelectedZone] = useState<ZoneLivraison | null>(null);
  const [selectedTransporteur, setSelectedTransporteur] = useState<Transporteur | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'delete' | 'create'>('view');
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    villes: '',
    tarifFixe: 0,
    tarifParKg: 0,
    delaiMin: 1,
    delaiMax: 3,
    conditions: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleZoneAction = (zone: ZoneLivraison | null, action: typeof modalType) => {
    setSelectedZone(zone);
    setModalType(action);
    if (action === 'create') {
      setFormData({
        nom: '',
        description: '',
        villes: '',
        tarifFixe: 0,
        tarifParKg: 0,
        delaiMin: 1,
        delaiMax: 3,
        conditions: ''
      });
    } else if (action === 'edit' && zone) {
      setFormData({
        nom: zone.nom,
        description: zone.description,
        villes: zone.villes.join(', '),
        tarifFixe: zone.tarifFixe,
        tarifParKg: zone.tarifParKg || 0,
        delaiMin: zone.delaiMin,
        delaiMax: zone.delaiMax,
        conditions: zone.conditions || ''
      });
    }
    setShowModal(true);
  };

  const confirmZoneAction = () => {
    switch (modalType) {
      case 'create':
        const newZone: ZoneLivraison = {
          id: `ZONE${String(zones.length + 1).padStart(3, '0')}`,
          nom: formData.nom,
          description: formData.description,
          villes: formData.villes.split(',').map(v => v.trim()),
          tarifFixe: formData.tarifFixe,
          tarifParKg: formData.tarifParKg > 0 ? formData.tarifParKg : undefined,
          delaiMin: formData.delaiMin,
          delaiMax: formData.delaiMax,
          actif: true,
          conditions: formData.conditions
        };
        setZones(prev => [...prev, newZone]);
        break;
      case 'edit':
        if (selectedZone) {
          setZones(prev => prev.map(z => 
            z.id === selectedZone.id ? {
              ...z,
              nom: formData.nom,
              description: formData.description,
              villes: formData.villes.split(',').map(v => v.trim()),
              tarifFixe: formData.tarifFixe,
              tarifParKg: formData.tarifParKg > 0 ? formData.tarifParKg : undefined,
              delaiMin: formData.delaiMin,
              delaiMax: formData.delaiMax,
              conditions: formData.conditions
            } : z
          ));
        }
        break;
      case 'delete':
        if (selectedZone) {
          setZones(prev => prev.filter(z => z.id !== selectedZone.id));
        }
        break;
    }
    setShowModal(false);
    setSelectedZone(null);
  };

  const toggleZoneStatus = (zoneId: string) => {
    setZones(prev => prev.map(z => 
      z.id === zoneId ? { ...z, actif: !z.actif } : z
    ));
  };

  const toggleTransporteurStatus = (transporteurId: string) => {
    setTransporteurs(prev => prev.map(t => 
      t.id === transporteurId ? { ...t, actif: !t.actif } : t
    ));
  };

  const handleParametreChange = (field: string, value: boolean | number | string) => {
    setParametres(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveParametres = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres de livraison sauvegardés avec succès !');
  };

  const renderZones = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Zones de livraison
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Configurez vos zones et tarifs de livraison
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={() => handleZoneAction(null, 'create')}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouvelle zone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {zones.map((zone) => (
          <div key={zone.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {zone.nom}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {zone.description}
                </p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                zone.actif 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {zone.actif ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tarif fixe:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatMGA(zone.tarifFixe)}
                </span>
              </div>
              {zone.tarifParKg && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Par kg:</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatMGA(zone.tarifParKg)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Délai:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {zone.delaiMin}-{zone.delaiMax} jours
                </span>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Villes:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {zone.villes.slice(0, 3).map((ville, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {ville}
                    </span>
                  ))}
                  {zone.villes.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{zone.villes.length - 3} autres
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleZoneAction(zone, 'edit')}>
                <PencilIcon className="h-4 w-4 mr-1" />
                Modifier
              </Button>
              <button
                onClick={() => toggleZoneStatus(zone.id)}
                className={`p-2 rounded ${zone.actif 
                  ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                  : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                }`}
                title={zone.actif ? 'Désactiver' : 'Activer'}
              >
                {zone.actif ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
              </button>
              <button
                onClick={() => handleZoneAction(zone, 'delete')}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                title="Supprimer"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransporteurs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Transporteurs partenaires
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gérez vos partenaires de livraison
          </p>
        </div>
        <Button variant="primary" size="sm">
          <PlusIcon className="h-4 w-4 mr-2" />
          Nouveau transporteur
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Transporteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Services
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tarifs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {transporteurs.map((transporteur) => (
                <tr key={transporteur.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <TruckIcon className="h-8 w-8 text-blue-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {transporteur.nom}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {transporteur.zones.length} zone(s) couverte(s)
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {transporteur.contact.telephone}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {transporteur.contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {transporteur.services.slice(0, 2).map((service, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {service}
                        </span>
                      ))}
                      {transporteur.services.length > 2 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{transporteur.services.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      Base: {formatMGA(transporteur.tarifs.base)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      /kg: {formatMGA(transporteur.tarifs.parKg)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transporteur.actif 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {transporteur.actif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Modifier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => toggleTransporteurStatus(transporteur.id)}
                        className={`${transporteur.actif 
                          ? 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300' 
                          : 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300'
                        }`}
                        title={transporteur.actif ? 'Désactiver' : 'Activer'}
                      >
                        {transporteur.actif ? <XCircleIcon className="h-4 w-4" /> : <CheckCircleIcon className="h-4 w-4" />}
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

  const renderParametres = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paramètres généraux */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <CogIcon className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Paramètres généraux
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seuil livraison gratuite (MGA)
              </label>
              <input
                type="number"
                value={parametres.livraisonGratuiteSeuil}
                onChange={(e) => handleParametreChange('livraisonGratuiteSeuil', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Délai de préparation (heures)
              </label>
              <input
                type="number"
                value={parametres.delaiPreparation}
                onChange={(e) => handleParametreChange('delaiPreparation', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message personnalisé
              </label>
              <textarea
                value={parametres.messagePersonnalise}
                onChange={(e) => handleParametreChange('messagePersonnalise', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Options de livraison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TruckIcon className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Options de livraison
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Livraison à domicile
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Livraison directe chez le client
                </p>
              </div>
              <button
                onClick={() => handleParametreChange('livraisonDomicile', !parametres.livraisonDomicile)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  parametres.livraisonDomicile ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    parametres.livraisonDomicile ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Point relais
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Retrait en point relais
                </p>
              </div>
              <button
                onClick={() => handleParametreChange('livraisonPointRelais', !parametres.livraisonPointRelais)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  parametres.livraisonPointRelais ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    parametres.livraisonPointRelais ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Retrait en boutique
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Retrait directement en boutique
                </p>
              </div>
              <button
                onClick={() => handleParametreChange('retraitBoutique', !parametres.retraitBoutique)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  parametres.retraitBoutique ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    parametres.retraitBoutique ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Livraison express
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Option livraison rapide
                </p>
              </div>
              <button
                onClick={() => handleParametreChange('livraisonExpresse', !parametres.livraisonExpresse)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  parametres.livraisonExpresse ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    parametres.livraisonExpresse ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Livraison weekend
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Livraison samedi et dimanche
                </p>
              </div>
              <button
                onClick={() => handleParametreChange('livraisonWeekend', !parametres.livraisonWeekend)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  parametres.livraisonWeekend ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    parametres.livraisonWeekend ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Suivi de colis
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Numéro de suivi automatique
                </p>
              </div>
              <button
                onClick={() => handleParametreChange('suiviColis', !parametres.suiviColis)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  parametres.suiviColis ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    parametres.suiviColis ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={handleSaveParametres}
          isLoading={isLoading}
        >
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {(modalType === 'create' || modalType === 'edit') && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modalType === 'create' ? 'Créer une zone de livraison' : 'Modifier la zone'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nom de la zone *
                    </label>
                    <input
                      type="text"
                      value={formData.nom}
                      onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Villes (séparées par des virgules) *
                    </label>
                    <input
                      type="text"
                      value={formData.villes}
                      onChange={(e) => setFormData(prev => ({ ...prev, villes: e.target.value }))}
                      placeholder="Antananarivo, Ivato, Ambohidratrimo"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tarif fixe (MGA) *
                      </label>
                      <input
                        type="number"
                        value={formData.tarifFixe}
                        onChange={(e) => setFormData(prev => ({ ...prev, tarifFixe: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tarif par kg (optionnel)
                      </label>
                      <input
                        type="number"
                        value={formData.tarifParKg}
                        onChange={(e) => setFormData(prev => ({ ...prev, tarifParKg: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Délai minimum (jours)
                      </label>
                      <input
                        type="number"
                        value={formData.delaiMin}
                        onChange={(e) => setFormData(prev => ({ ...prev, delaiMin: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Délai maximum (jours)
                      </label>
                      <input
                        type="number"
                        value={formData.delaiMax}
                        onChange={(e) => setFormData(prev => ({ ...prev, delaiMax: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Conditions particulières
                    </label>
                    <textarea
                      value={formData.conditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, conditions: e.target.value }))}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </>
            )}

            {modalType === 'delete' && selectedZone && (
              <>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                  Supprimer la zone de livraison
                </h3>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 dark:text-red-400">
                      Cette action supprimera définitivement la zone "{selectedZone.nom}" et tous ses paramètres.
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              {modalType !== 'view' && (
                <Button
                  variant={modalType === 'delete' ? 'danger' : 'primary'}
                  onClick={confirmZoneAction}
                >
                  {modalType === 'create' ? 'Créer' : modalType === 'edit' ? 'Sauvegarder' : 'Supprimer'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'zones', name: 'Zones de livraison', icon: MapPinIcon },
    { id: 'transporteurs', name: 'Transporteurs', icon: TruckIcon },
    { id: 'parametres', name: 'Paramètres', icon: CogIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Gestion des Livraisons
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configurez vos zones, transporteurs et options de livraison
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
      {activeTab === 'zones' && renderZones()}
      {activeTab === 'transporteurs' && renderTransporteurs()}
      {activeTab === 'parametres' && renderParametres()}

      {renderModal()}
    </div>
  );
};