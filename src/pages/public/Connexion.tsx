import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/common/Button';
import { EyeIcon, EyeSlashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export const Connexion: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCreatingDemo, setIsCreatingDemo] = useState<string | null>(null);
  
  const { login, createDemoAccount } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDemoAccount = async (type: 'admin-plateforme' | 'admin-boutique') => {
    setIsCreatingDemo(type);
    try {
      const success = await createDemoAccount(type);
      if (success) {
        if (type === 'admin-plateforme') {
          navigate('/admin-plateforme/dashboard');
        } else {
          navigate('/admin-boutique/dashboard');
        }
      }
    } catch (error) {
      console.error('Erreur lors de la création du compte demo:', error);
    } finally {
      setIsCreatingDemo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Se connecter
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Accédez à votre espace personnel
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@plateforme.fr"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 transform transition-transform active:scale-95"
            >
              Se connecter
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
              Comptes de démonstration
            </p>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => handleCreateDemoAccount('admin-plateforme')}
                isLoading={isCreatingDemo === 'admin-plateforme'}
                className="w-full bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-900/30"
              >
                Admin Plateforme
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => handleCreateDemoAccount('admin-boutique')}
                isLoading={isCreatingDemo === 'admin-boutique'}
                className="w-full bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-400 dark:hover:bg-sky-900/30"
              >
                Admin Boutique
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              to="/"
              className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Retour à l'accueil
            </Link>
            <Link
              to="/inscription"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Pas encore de compte ?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};