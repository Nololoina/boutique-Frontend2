import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { AdminPlateformeLayout } from '../layouts/AdminPlateformeLayout';
import { AdminBoutiqueLayout } from '../layouts/AdminBoutiqueLayout';
import { PrivateRoute } from './PrivateRoute';
import { RoleRoute } from './RoleRoute';

// Pages publiques
import { Accueil } from '../pages/public/Accueil';
import { Connexion } from '../pages/public/Connexion';
import { Inscription } from '../pages/public/Inscription';
import { Partenariat } from '../pages/public/Partenariat';
import { Produits } from '../pages/public/Produits';
import { ProduitDetail } from '../pages/public/ProduitDetail';
import { BoutiqueDetail } from '../pages/public/BoutiqueDetail';
import { BoutiquesList } from '../pages/public/BoutiquesList';

// Pages admin plateforme
import { Dashboard as DashboardPlateforme } from '../pages/admin-plateforme/Dashboard';
import { Support as SupportPlateforme } from '../pages/admin-plateforme/Support';
import { GestionBoutiques } from '../pages/admin-plateforme/GestionBoutiques';
import { GestionUtilisateurs } from '../pages/admin-plateforme/GestionUtilisateurs';
import { Publicites as PublicitesPlateforme } from '../pages/admin-plateforme/Publicites';
import { Moderation } from '../pages/admin-plateforme/Moderation';
import { General as GeneralPlateforme } from '../pages/admin-plateforme/Parametres/General';
import { Boutiques as BoutiquesPlateforme } from '../pages/admin-plateforme/Parametres/Boutiques';
import { Notifications as NotificationsPlateforme } from '../pages/admin-plateforme/Parametres/Notifications';
import { Securite as SecuritePlateforme } from '../pages/admin-plateforme/Parametres/Securite';
import { Maintenance } from '../pages/admin-plateforme/Parametres/Maintenance';

// Pages admin boutique
import { Dashboard as DashboardBoutique } from '../pages/admin-boutique/Dashboard';
import { Produits as ProduitsBoutique } from '../pages/admin-boutique/Produits';
import { Promotions } from '../pages/admin-boutique/Promotions';
import { Commandes } from '../pages/admin-boutique/Commandes';
import { Support as SupportBoutique } from '../pages/admin-boutique/Support';
import { Publicite } from '../pages/admin-boutique/MaBoutique/Publicite';
import { Livraison } from '../pages/admin-boutique/MaBoutique/Livraison';
import { Paiement } from '../pages/admin-boutique/MaBoutique/Paiement';
import { CRM } from '../pages/admin-boutique/MaBoutique/CRM';
import { Contenu } from '../pages/admin-boutique/MaBoutique/Contenu';
import { Vendeurs } from '../pages/admin-boutique/MaBoutique/Vendeurs';
import { General as GeneralBoutique } from '../pages/admin-boutique/MaBoutique/Parametres/General';
import { Notifications as NotificationsBoutique } from '../pages/admin-boutique/MaBoutique/Parametres/Notifications';
import { Securite as SecuriteBoutique } from '../pages/admin-boutique/MaBoutique/Parametres/Securite';
import { Apparence } from '../pages/admin-boutique/MaBoutique/Parametres/Apparence';
import { Commerciaux } from '../pages/admin-boutique/MaBoutique/Parametres/Commerciaux';

const router = createBrowserRouter([
  // Routes publiques
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Accueil />
      },
      {
        path: 'connexion',
        element: <Connexion />
      },
      {
        path: 'inscription',
        element: <Inscription />
      },
      {
        path: 'partenariat',
        element: <Partenariat />
      },
      {
        path: 'produits',
        element: <Produits />
      },
      {
        path: 'boutiques',
        element: <BoutiquesList />
      },
      {
        path: 'produit/:id',
        element: <ProduitDetail />
      },
      {
        path: 'boutique/:id',
        element: <BoutiqueDetail />
      }
    ]
  },

  // Routes Admin Plateforme
  {
    path: '/admin-plateforme',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin-plateforme']}>
          <AdminPlateformeLayout />
        </RoleRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPlateforme />
      },
      {
        path: 'gestion-boutiques',
        element: <GestionBoutiques />
      },
      {
        path: 'gestion-utilisateurs',
        element: <GestionUtilisateurs />
      },
      {
        path: 'publicites',
        element: <PublicitesPlateforme />
      },
      {
        path: 'moderation',
        element: <Moderation />
      },
      {
        path: 'support',
        element: <SupportPlateforme />
      },
      {
        path: 'parametres/general',
        element: <GeneralPlateforme />
      },
      {
        path: 'parametres/boutiques',
        element: <BoutiquesPlateforme />
      },
      {
        path: 'parametres/notifications',
        element: <NotificationsPlateforme />
      },
      {
        path: 'parametres/securite',
        element: <SecuritePlateforme />
      },
      {
        path: 'parametres/maintenance',
        element: <Maintenance />
      }
    ]
  },

  // Routes Admin Boutique
  {
    path: '/admin-boutique',
    element: (
      <PrivateRoute>
        <RoleRoute allowedRoles={['admin-boutique']}>
          <AdminBoutiqueLayout />
        </RoleRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardBoutique />
      },
      {
        path: 'produits',
        element: <ProduitsBoutique />
      },
      {
        path: 'promotions',
        element: <Promotions />
      },
      {
        path: 'commandes',
        element: <Commandes />
      },
      {
        path: 'support',
        element: <SupportBoutique />
      },
      {
        path: 'ma-boutique/publicite',
        element: <Publicite />
      },
      {
        path: 'ma-boutique/livraison',
        element: <Livraison />
      },
      {
        path: 'ma-boutique/paiement',
        element: <Paiement />
      },
      {
        path: 'ma-boutique/crm',
        element: <CRM />
      },
      {
        path: 'ma-boutique/contenu',
        element: <Contenu />
      },
      {
        path: 'ma-boutique/vendeurs',
        element: <Vendeurs />
      },
      {
        path: 'ma-boutique/parametres/general',
        element: <GeneralBoutique />
      },
      {
        path: 'ma-boutique/parametres/notifications',
        element: <NotificationsBoutique />
      },
      {
        path: 'ma-boutique/parametres/securite',
        element: <SecuriteBoutique />
      },
      {
        path: 'ma-boutique/parametres/apparence',
        element: <Apparence />
      },
      {
        path: 'ma-boutique/parametres/commerciaux',
        element: <Commerciaux />
      }
    ]
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};