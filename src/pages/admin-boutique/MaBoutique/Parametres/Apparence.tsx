import React, { useState } from 'react';
import { Button } from '../../../../components/common/Button';
import {
  PaintBrushIcon,
  PhotoIcon,
  SwatchIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  Squares2X2Icon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon
  
} from '@heroicons/react/24/outline';

interface ThemeSettings {
  // Thème général
  themeActuel: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  couleurAccent: string;
  
  // Typographie
  policePrincipale: string;
  policeSecondaire: string;
  tailleTexte: 'petit' | 'normal' | 'grand';
  
  // Layout et disposition
  layoutType: 'classique' | 'moderne' | 'minimaliste' | 'magazine';
  largeurContenu: 'etroit' | 'normal' | 'large';
  espacementElements: 'compact' | 'normal' | 'aere';
  
  // Images et médias
  logo: string;
  favicon: string;
  imageBanniere: string;
  imageDefautProduit: string;
  
  // Personnalisation avancée
  cssPersonnalise: string;
  animationsActivees: boolean;
  effetsHover: boolean;
  transitionsLentes: boolean;
  
  // Responsive
  affichageMobile: {
    menuHamburger: boolean;
    imagesProduitCarrees: boolean;
    texteReduit: boolean;
  };
  
  // Éléments d'interface
  afficherNombreProduits: boolean;
  afficherNotesClients: boolean;
  afficherBadgeNouveau: boolean;
  afficherBadgePromotion: boolean;
  afficherStockDisponible: boolean;
  
  // Footer personnalisé
  footerPersonnalise: {
    actif: boolean;
    texte: string;
    couleurFond: string;
    liens: { nom: string; url: string }[];
  };
}

interface ThemePredefini {
  id: string;
  nom: string;
  description: string;
  couleurPrimaire: string;
  couleurSecondaire: string;
  apercu: string;
  populaire?: boolean;
}

export const Apparence: React.FC = () => {
  const [settings, setSettings] = useState<ThemeSettings>({
    themeActuel: 'moderne',
    couleurPrimaire: '#3B82F6',
    couleurSecondaire: '#10B981',
    couleurAccent: '#F59E0B',
    policePrincipale: 'Inter',
    policeSecondaire: 'Roboto',
    tailleTexte: 'normal',
    layoutType: 'moderne',
    largeurContenu: 'normal',
    espacementElements: 'normal',
    logo: '',
    favicon: '',
    imageBanniere: '',
    imageDefautProduit: '',
    cssPersonnalise: '',
    animationsActivees: true,
    effetsHover: true,
    transitionsLentes: false,
    affichageMobile: {
      menuHamburger: true,
      imagesProduitCarrees: true,
      texteReduit: false
    },
    afficherNombreProduits: true,
    afficherNotesClients: true,
    afficherBadgeNouveau: true,
    afficherBadgePromotion: true,
    afficherStockDisponible: true,
    footerPersonnalise: {
      actif: false,
      texte: '© 2025 Ma Boutique. Tous droits réservés.',
      couleurFond: '#1F2937',
      liens: [
        { nom: 'Conditions de vente', url: '/conditions' },
        { nom: 'Contact', url: '/contact' }
      ]
    }
  });

  const [activeTab, setActiveTab] = useState('themes');
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const themesPredefinis: ThemePredefini[] = [
    {
      id: 'classique',
      nom: 'Classique',
      description: 'Design traditionnel et professionnel',
      couleurPrimaire: '#1F2937',
      couleurSecondaire: '#6B7280',
      apercu: 'Sobre et élégant',
      populaire: false
    },
    {
      id: 'moderne',
      nom: 'Moderne',
      description: 'Design contemporain et dynamique',
      couleurPrimaire: '#3B82F6',
      couleurSecondaire: '#10B981',
      apercu: 'Coloré et attractif',
      populaire: true
    },
    {
      id: 'minimaliste',
      nom: 'Minimaliste',
      description: 'Design épuré et simple',
      couleurPrimaire: '#000000',
      couleurSecondaire: '#FFFFFF',
      apercu: 'Épuré et clean',
      populaire: false
    },
    {
      id: 'magazine',
      nom: 'Magazine',
      description: 'Style magazine avec beaucoup de visuels',
      couleurPrimaire: '#DC2626',
      couleurSecondaire: '#F59E0B',
      apercu: 'Riche en images',
      populaire: true
    },
    {
      id: 'nature',
      nom: 'Nature',
      description: 'Couleurs naturelles et organiques',
      couleurPrimaire: '#059669',
      couleurSecondaire: '#92400E',
      apercu: 'Tons naturels',
      populaire: false
    },
    {
      id: 'luxe',
      nom: 'Luxe',
      description: 'Design haut de gamme et sophistiqué',
      couleurPrimaire: '#7C2D12',
      couleurSecondaire: '#FCD34D',
      apercu: 'Élégant et raffiné',
      populaire: false
    }
  ];

  const policesDisponibles = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Poppins',
    'Montserrat',
    'Lato',
    'Source Sans Pro',
    'Nunito'
  ];

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert('Paramètres d\'apparence sauvegardés avec succès !');
  };

  const handleThemeChange = (theme: ThemePredefini) => {
    setSettings(prev => ({
      ...prev,
      themeActuel: theme.id,
      couleurPrimaire: theme.couleurPrimaire,
      couleurSecondaire: theme.couleurSecondaire,
      layoutType: theme.id as any
    }));
  };

  const handleToggle = (field: keyof ThemeSettings) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleMobileToggle = (field: keyof typeof settings.affichageMobile) => {
    setSettings(prev => ({
      ...prev,
      affichageMobile: {
        ...prev.affichageMobile,
        [field]: !prev.affichageMobile[field]
      }
    }));
  };

  const handleFooterToggle = (field: keyof typeof settings.footerPersonnalise) => {
    if (typeof settings.footerPersonnalise[field] === 'boolean') {
      setSettings(prev => ({
        ...prev,
        footerPersonnalise: {
          ...prev.footerPersonnalise,
          [field]: !prev.footerPersonnalise[field]
        }
      }));
    }
  };

  const addFooterLink = () => {
    setSettings(prev => ({
      ...prev,
      footerPersonnalise: {
        ...prev.footerPersonnalise,
        liens: [...prev.footerPersonnalise.liens, { nom: '', url: '' }]
      }
    }));
  };

  const updateFooterLink = (index: number, field: 'nom' | 'url', value: string) => {
    setSettings(prev => ({
      ...prev,
      footerPersonnalise: {
        ...prev.footerPersonnalise,
        liens: prev.footerPersonnalise.liens.map((link, i) => 
          i === index ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const removeFooterLink = (index: number) => {
    setSettings(prev => ({
      ...prev,
      footerPersonnalise: {
        ...prev.footerPersonnalise,
        liens: prev.footerPersonnalise.liens.filter((_, i) => i !== index)
      }
    }));
  };

  const renderThemesTab = () => (
    <div className="space-y-6">
      {/* Thèmes prédéfinis */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SwatchIcon className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Thèmes prédéfinis
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themesPredefinis.map((theme) => (
            <div
              key={theme.id}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                settings.themeActuel === theme.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              onClick={() => handleThemeChange(theme)}
            >
              {theme.populaire && (
                <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
                  Populaire
                </span>
              )}
              
              <div className="flex items-center space-x-3 mb-3">
                <div className="flex space-x-1">
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.couleurPrimaire }}
                  ></div>
                  <div 
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: theme.couleurSecondaire }}
                  ></div>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {theme.nom}
                </h3>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {theme.description}
              </p>
              
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {theme.apercu}
              </p>
              
              {settings.themeActuel === theme.id && (
                <div className="absolute inset-0 bg-blue-500 bg-opacity-10 rounded-lg flex items-center justify-center">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-medium">
                    Sélectionné
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Couleurs personnalisées */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SwatchIcon className="h-5 w-5 text-purple-500" />

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Couleurs personnalisées
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Couleur primaire
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={settings.couleurPrimaire}
                onChange={(e) => setSettings(prev => ({ ...prev, couleurPrimaire: e.target.value }))}
                className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.couleurPrimaire}
                onChange={(e) => setSettings(prev => ({ ...prev, couleurPrimaire: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Couleur secondaire
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={settings.couleurSecondaire}
                onChange={(e) => setSettings(prev => ({ ...prev, couleurSecondaire: e.target.value }))}
                className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.couleurSecondaire}
                onChange={(e) => setSettings(prev => ({ ...prev, couleurSecondaire: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Couleur d'accent
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={settings.couleurAccent}
                onChange={(e) => setSettings(prev => ({ ...prev, couleurAccent: e.target.value }))}
                className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
              />
              <input
                type="text"
                value={settings.couleurAccent}
                onChange={(e) => setSettings(prev => ({ ...prev, couleurAccent: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTypographieTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Polices */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DocumentTextIcon className="h-5 w-5 text-indigo-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Typographie
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Police principale
              </label>
              <select
                value={settings.policePrincipale}
                onChange={(e) => setSettings(prev => ({ ...prev, policePrincipale: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {policesDisponibles.map(police => (
                  <option key={police} value={police} style={{ fontFamily: police }}>
                    {police}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Police secondaire
              </label>
              <select
                value={settings.policeSecondaire}
                onChange={(e) => setSettings(prev => ({ ...prev, policeSecondaire: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {policesDisponibles.map(police => (
                  <option key={police} value={police} style={{ fontFamily: police }}>
                    {police}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Taille du texte
              </label>
              <div className="flex space-x-2">
                {['petit', 'normal', 'grand'].map(taille => (
                  <button
                    key={taille}
                    onClick={() => setSettings(prev => ({ ...prev, tailleTexte: taille as any }))}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      settings.tailleTexte === taille
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {taille.charAt(0).toUpperCase() + taille.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Aperçu typographie */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Aperçu de la typographie
              </h4>
              <div 
                style={{ 
                  fontFamily: settings.policePrincipale,
                  fontSize: settings.tailleTexte === 'petit' ? '14px' : settings.tailleTexte === 'grand' ? '18px' : '16px'
                }}
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Titre principal
                </h3>
                <h4 
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2"
                  style={{ fontFamily: settings.policeSecondaire }}
                >
                  Sous-titre
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Ceci est un exemple de texte avec la police sélectionnée. 
                  Vous pouvez voir comment elle s'affichera sur votre boutique.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Layout et disposition */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Squares2X2Icon className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Layout et disposition
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type de layout
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['classique', 'moderne', 'minimaliste', 'magazine'].map(layout => (
                  <button
                    key={layout}
                    onClick={() => setSettings(prev => ({ ...prev, layoutType: layout as any }))}
                    className={`p-3 rounded-lg text-sm transition-colors ${
                      settings.layoutType === layout
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {layout.charAt(0).toUpperCase() + layout.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Largeur du contenu
              </label>
              <div className="flex space-x-2">
                {['etroit', 'normal', 'large'].map(largeur => (
                  <button
                    key={largeur}
                    onClick={() => setSettings(prev => ({ ...prev, largeurContenu: largeur as any }))}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      settings.largeurContenu === largeur
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {largeur.charAt(0).toUpperCase() + largeur.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Espacement des éléments
              </label>
              <div className="flex space-x-2">
                {['compact', 'normal', 'aere'].map(espacement => (
                  <button
                    key={espacement}
                    onClick={() => setSettings(prev => ({ ...prev, espacementElements: espacement as any }))}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      settings.espacementElements === espacement
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {espacement.charAt(0).toUpperCase() + espacement.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImagesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Images principales */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <PhotoIcon className="h-5 w-5 text-emerald-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Images principales
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Logo de la boutique
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm">
                    <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                    Téléverser un logo
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format recommandé: PNG, 200x200px max
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Favicon
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                  <PhotoIcon className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm">
                    <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                    Téléverser un favicon
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format: ICO ou PNG, 32x32px
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image de bannière
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-24 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm">
                    <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                    Téléverser une bannière
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format recommandé: JPG/PNG, 1200x400px
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image par défaut des produits
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <Button variant="outline" size="sm">
                    <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                    Téléverser une image
                  </Button>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Utilisée quand un produit n'a pas d'image
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Effets et animations */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <SparklesIcon className="h-5 w-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Effets et animations
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Animations activées
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Animations de transition et d'apparition
                </p>
              </div>
              <button
                onClick={() => handleToggle('animationsActivees')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.animationsActivees ? 'bg-pink-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.animationsActivees ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Effets de survol
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Effets au passage de la souris
                </p>
              </div>
              <button
                onClick={() => handleToggle('effetsHover')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.effetsHover ? 'bg-pink-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.effetsHover ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Transitions lentes
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Transitions plus douces et lentes
                </p>
              </div>
              <button
                onClick={() => handleToggle('transitionsLentes')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.transitionsLentes ? 'bg-pink-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.transitionsLentes ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonnalisationTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Éléments d'interface */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Éléments d'interface
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { key: 'afficherNombreProduits', label: 'Afficher le nombre de produits' },
              { key: 'afficherNotesClients', label: 'Afficher les notes clients' },
              { key: 'afficherBadgeNouveau', label: 'Badge "Nouveau"' },
              { key: 'afficherBadgePromotion', label: 'Badge "Promotion"' },
              { key: 'afficherStockDisponible', label: 'Stock disponible' }
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm text-gray-700 dark:text-gray-300">
                  {label}
                </label>
                <button
                  onClick={() => handleToggle(key as keyof ThemeSettings)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    settings[key as keyof ThemeSettings] ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      settings[key as keyof ThemeSettings] ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Affichage mobile */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <DevicePhoneMobileIcon className="h-5 w-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Affichage mobile
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(settings.affichageMobile).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    {key === 'menuHamburger' && 'Menu hamburger'}
                    {key === 'imagesProduitCarrees' && 'Images produit carrées'}
                    {key === 'texteReduit' && 'Texte réduit'}
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {key === 'menuHamburger' && 'Menu déroulant sur mobile'}
                    {key === 'imagesProduitCarrees' && 'Format carré pour les images'}
                    {key === 'texteReduit' && 'Descriptions plus courtes'}
                  </p>
                </div>
                <button
                  onClick={() => handleMobileToggle(key as keyof typeof settings.affichageMobile)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    value ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer personnalisé */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <DocumentTextIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Footer personnalisé
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Activer le footer personnalisé
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Remplacer le footer par défaut
              </p>
            </div>
            <button
              onClick={() => handleFooterToggle('actif')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.footerPersonnalise.actif ? 'bg-gray-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.footerPersonnalise.actif ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.footerPersonnalise.actif && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Texte du footer
                </label>
                <textarea
                  value={settings.footerPersonnalise.texte}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    footerPersonnalise: { ...prev.footerPersonnalise, texte: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Couleur de fond
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={settings.footerPersonnalise.couleurFond}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      footerPersonnalise: { ...prev.footerPersonnalise, couleurFond: e.target.value }
                    }))}
                    className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={settings.footerPersonnalise.couleurFond}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      footerPersonnalise: { ...prev.footerPersonnalise, couleurFond: e.target.value }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Liens du footer
                  </label>
                  <Button variant="outline" size="sm" onClick={addFooterLink}>
                    Ajouter un lien
                  </Button>
                </div>
                <div className="space-y-2">
                  {settings.footerPersonnalise.liens.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Nom du lien"
                        value={link.nom}
                        onChange={(e) => updateFooterLink(index, 'nom', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => updateFooterLink(index, 'url', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFooterLink(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Supprimer
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CSS personnalisé */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <DocumentTextIcon className="h-5 w-5 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            CSS personnalisé (Avancé)
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Attention : Le CSS personnalisé peut affecter l'apparence de votre boutique. 
                Utilisez cette fonctionnalité uniquement si vous maîtrisez le CSS.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Code CSS personnalisé
            </label>
            <textarea
              value={settings.cssPersonnalise}
              onChange={(e) => setSettings(prev => ({ ...prev, cssPersonnalise: e.target.value }))}
              rows={8}
              placeholder="/* Votre CSS personnalisé ici */
.ma-boutique-custom {
  /* Vos styles */
}"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => (
    <div className="space-y-6">
      {/* Contrôles de prévisualisation */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Aperçu de votre boutique
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded ${previewMode === 'desktop' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <ComputerDesktopIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded ${previewMode === 'mobile' 
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <DevicePhoneMobileIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Aperçu simulé */}
        <div className={`border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 ${
          previewMode === 'mobile' ? 'max-w-sm mx-auto' : ''
        }`}>
          <div 
            className="space-y-4"
            style={{ 
              fontFamily: settings.policePrincipale,
              fontSize: settings.tailleTexte === 'petit' ? '14px' : settings.tailleTexte === 'grand' ? '18px' : '16px'
            }}
          >
            {/* Header simulé */}
            <div 
              className="p-4 rounded-lg text-white"
              style={{ backgroundColor: settings.couleurPrimaire }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-5 w-5" />
                </div>
                <h1 className="text-xl font-bold">Ma Boutique</h1>
              </div>
            </div>

            {/* Produit simulé */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <PhotoIcon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Produit exemple
                  </h3>
                  {settings.afficherBadgeNouveau && (
                    <span 
                      className="inline-block px-2 py-1 text-xs rounded text-white mr-2"
                      style={{ backgroundColor: settings.couleurAccent }}
                    >
                      Nouveau
                    </span>
                  )}
                  {settings.afficherNotesClients && (
                    <div className="flex items-center space-x-1 mt-1">
                      <span className="text-yellow-400">★★★★☆</span>
                      <span className="text-sm text-gray-500">(4.2)</span>
                    </div>
                  )}
                  <p 
                    className="text-lg font-bold mt-2"
                    style={{ color: settings.couleurSecondaire }}
                  >
                    25 000 MGA
                  </p>
                  {settings.afficherStockDisponible && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      12 en stock
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer simulé */}
            {settings.footerPersonnalise.actif && (
              <div 
                className="p-4 rounded-lg text-white text-center"
                style={{ backgroundColor: settings.footerPersonnalise.couleurFond }}
              >
                <p className="text-sm">{settings.footerPersonnalise.texte}</p>
                <div className="flex justify-center space-x-4 mt-2">
                  {settings.footerPersonnalise.liens.slice(0, 2).map((link, index) => (
                    <span key={index} className="text-xs underline">
                      {link.nom || 'Lien'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Button variant="primary" size="sm">
            <EyeIcon className="h-4 w-4 mr-2" />
            Prévisualiser en plein écran
          </Button>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'themes', name: 'Thèmes & Couleurs', icon: SwatchIcon },
    { id: 'typographie', name: 'Typographie & Layout', icon: DocumentTextIcon },
    { id: 'personnalisation', name: 'Personnalisation', icon: AdjustmentsHorizontalIcon },
    { id: 'preview', name: 'Aperçu', icon: EyeIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Paramètres d'Apparence
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Personnalisez l'apparence de votre boutique
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
      {activeTab === 'themes' && renderThemesTab()}
      {activeTab === 'typographie' && renderTypographieTab()}
      {activeTab === 'personnalisation' && renderPersonnalisationTab()}
      {activeTab === 'preview' && renderPreview()}

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
          Sauvegarder l'apparence
        </Button>
      </div>
    </div>
  );
};