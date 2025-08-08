import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/common/Sidebar';
import { Button } from '../components/common/Button';
import {
  HomeIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  CogIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const sidebarItems = [
  {
    name: 'Tableau de bord',
    href: '/admin-plateforme/dashboard',
    icon: HomeIcon
  },
  {
    name: 'Gestion boutiques',
    href: '/admin-plateforme/gestion-boutiques',
    icon: BuildingStorefrontIcon
  },
  {
    name: 'Gestion utilisateurs',
    href: '/admin-plateforme/gestion-utilisateurs',
    icon: UserGroupIcon
  },
  {
    name: 'Publicités',
    href: '/admin-plateforme/publicites',
    icon: MegaphoneIcon
  },
  {
    name: 'Modération',
    href: '/admin-plateforme/moderation',
    icon: ShieldCheckIcon
  },
  {
    name: 'Support',
    href: '/admin-plateforme/support',
    icon: LifebuoyIcon
  },
  {
    name: 'Paramètres',
    href: '/admin-plateforme/parametres/general',
    icon: CogIcon,
    children: [
      {
        name: 'Général',
        href: '/admin-plateforme/parametres/general',
        icon: CogIcon
      },
      {
        name: 'Boutiques',
        href: '/admin-plateforme/parametres/boutiques',
        icon: BuildingStorefrontIcon
      },
      {
        name: 'Notifications',
        href: '/admin-plateforme/parametres/notifications',
        icon: MegaphoneIcon
      },
      {
        name: 'Sécurité',
        href: '/admin-plateforme/parametres/securite',
        icon: ShieldCheckIcon
      },
      {
        name: 'Maintenance',
        href: '/admin-plateforme/parametres/maintenance',
        icon: CogIcon
      }
    ]
  }
];

export const AdminPlateformeLayout: React.FC = () => {
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
                    Administration Plateforme
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Gérez votre plateforme e-commerce
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
                      Admin Plateforme
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
    </div>
  );
};