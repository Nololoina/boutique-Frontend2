import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulation d'une authentification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Comptes demo
    if (email === 'admin@plateforme.mg' && password === 'admin123') {
      const adminUser: User = {
        id: '1',
        name: 'Admin Plateforme',
        email: 'admin@plateforme.mg',
        role: 'admin-plateforme',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    
    if (email === 'boutique@demo.mg' && password === 'boutique123') {
      const boutiqueUser: User = {
        id: '2',
        name: 'Admin Boutique Demo',
        email: 'boutique@demo.mg',
        role: 'admin-boutique',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      };
      setUser(boutiqueUser);
      localStorage.setItem('user', JSON.stringify(boutiqueUser));
      return true;
    }
    
    return false;
  };

  const createDemoAccount = async (type: 'admin-plateforme' | 'admin-boutique'): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (type === 'admin-plateforme') {
      const adminUser: User = {
        id: '1',
        name: 'Admin Plateforme Demo',
        email: 'admin@plateforme.mg',
        role: 'admin-plateforme',
        avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    }
    
    if (type === 'admin-boutique') {
      const boutiqueUser: User = {
        id: '2',
        name: 'Admin Boutique Demo',
        email: 'boutique@demo.mg',
        role: 'admin-boutique',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      };
      setUser(boutiqueUser);
      localStorage.setItem('user', JSON.stringify(boutiqueUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Redirection vers la page d'accueil publique
    window.location.href = '/';
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, createDemoAccount, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext }