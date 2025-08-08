export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  token?: string;
  message?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Comptes demo
    if (credentials.email === 'admin@plateforme.mg' && credentials.password === 'admin123') {
      return {
        success: true,
        user: {
          id: '1',
          name: 'Admin Plateforme',
          email: 'admin@plateforme.mg',
          role: 'admin-plateforme',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        token: 'mock-jwt-token-admin-plateforme'
      };
    }
    
    if (credentials.email === 'boutique@demo.mg' && credentials.password === 'boutique123') {
      return {
        success: true,
        user: {
          id: '2',
          name: 'Admin Boutique Demo',
          email: 'boutique@demo.mg',
          role: 'admin-boutique',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        },
        token: 'mock-jwt-token-admin-boutique'
      };
    }
    
    return {
      success: false,
      message: 'Identifiants incorrects'
    };
  },

  async logout(): Promise<void> {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  async refreshToken(): Promise<boolean> {
    // Simulation d'un refresh token
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};