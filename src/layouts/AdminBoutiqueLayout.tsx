import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/common/Sidebar';
import { Button } from '../components/common/Button';
import { Chatbot } from '../components/chatbot/Chatbot';
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ShoppingBagIcon,
  LifebuoyIcon,
  BuildingStorefrontIcon,
  TruckIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UsersIcon,
  CogIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon,
  MegaphoneIcon,
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  BanknotesIcon
} from '@heroicons/react/24/outline';

const sidebarItems = [
  {
    name: 'Tableau de bord',
    href: '/admin-boutique/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Produits',
    href: '/admin-boutique/produits',
    icon: CubeIcon
  },
  {
    name: 'Promotions',
    href: '/admin-boutique/promotions',
    icon: TagIcon
  },
  {
    name: 'Commandes',
    href: '/admin-boutique/commandes',
    icon: ShoppingBagIcon
  },
  {
    name: 'Support',
    href: '/admin-boutique/support',
    icon: LifebuoyIcon
  },
  {
    name: 'Ma Boutique',
    href: '/admin-boutique/ma-boutique/publicite',
    icon: BuildingStorefrontIcon,
    children: [
      {
        name: 'Publicité',
        href: '/admin-boutique/ma-boutique/publicite',
        icon: MegaphoneIcon
      },
      {
        name: 'Livraison',
        href: '/admin-boutique/ma-boutique/livraison',
        icon: TruckIcon
      },
      {
        name: 'Paiement',
        href: '/admin-boutique/ma-boutique/paiement',
        icon: CreditCardIcon
      },
      {
        name: 'CRM',
        href: '/admin-boutique/ma-boutique/crm',
        icon: UserGroupIcon
      },
      {
        name: 'Contenu',
        href: '/admin-boutique/ma-boutique/contenu',
        icon: DocumentTextIcon
      },
      {
        name: 'Vendeurs',
        href: '/admin-boutique/ma-boutique/vendeurs',
        icon: UsersIcon
      },
      {
        name: 'Paramètres',
        href: '/admin-boutique/ma-boutique/parametres/general',
        icon: CogIcon,
        children: [
          {
            name: 'Général',
            href: '/admin-boutique/ma-boutique/parametres/general',
            icon: CogIcon
          },
          {
            name: 'Notifications',
            href: '/admin-boutique/ma-boutique/parametres/notifications',
            icon: BellIcon
          },
          {
            name: 'Sécurité',
            href: '/admin-boutique/ma-boutique/parametres/securite',
            icon: ShieldCheckIcon
          },
          {
            name: 'Apparence',
            href: '/admin-boutique/ma-boutique/parametres/apparence',
            icon: PaintBrushIcon
          },
          {
            name: 'Commerciaux',
            href: '/admin-boutique/ma-boutique/parametres/commerciaux',
            icon: BanknotesIcon
          }
        ]
      }
    ]
  }
];

export const AdminBoutiqueLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        <Sidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden"
                >
                  <Bars3Icon className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Administration Boutique
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gérez votre boutique en ligne
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? (
                    <SunIcon className="h-5 w-5" />
                  ) : (
                    <MoonIcon className="h-5 w-5" />
                  )}
                </Button>

                <div className="flex items-center space-x-3">
                  {user?.avatar && (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Admin Boutique
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      
      {/* Chatbot pour l'espace boutique */}
      <Chatbot context="boutique" />
    </div>
  );
};