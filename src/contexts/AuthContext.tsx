
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication - would be replaced with real auth in production
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Mock login - would be an API call in production
      if (email && password) {
        // For demo purposes, we'll create a mock user
        const mockUser = {
          id: '123',
          name: email.split('@')[0],
          email,
          role: localStorage.getItem('lastRole') as UserRole || 'buyer',
          avatar: '',
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${mockUser.name}!`,
        });
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Mock registration - would be an API call in production
      if (name && email && password && role) {
        // For demo purposes, we'll create a mock user
        const mockUser = {
          id: Math.random().toString(36).substring(2, 9),
          name,
          email,
          role,
          avatar: '',
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('lastRole', role);
        
        toast({
          title: 'Registration Successful',
          description: `Welcome to Homestead Haven, ${name}!`,
        });
      }
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Failed to create account',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
