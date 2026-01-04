'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { botbleAPI } from '@/services/api';

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip_code?: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  checkAuth: () => Promise<void>;
  updateUser: (data: { name: string; email: string; phone: string; avatar?: File | null }) => Promise<{ success: boolean; message?: string }>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone?: string;
  address?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      console.log('Auth: Starting checkAuth...');
      // Only check localStorage on client side
      if (typeof window === 'undefined') {
        console.log('Auth: Server side, skipping...');
        setIsLoading(false);
        return;
      }

      const token = localStorage.getItem('auth_token');
      console.log('Auth: Token found:', !!token);
      if (token) {
        botbleAPI.updateToken(token);
        console.log('Auth: Calling getUser...');
        const response = await botbleAPI.getUser();
        console.log('Auth: getUser response:', response);
        if (response.success && response.data) {
          console.log('Auth: Setting user and authenticated');
          setUser(response.data);
          setIsAuthenticated(true);
        } else {
          console.log('Auth: Token invalid, removing...');
          // Token is invalid, remove it
          localStorage.removeItem('auth_token');
          botbleAPI.updateToken(null);
        }
      } else {
        console.log('Auth: No token found');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      botbleAPI.updateToken(null);
    } finally {
      console.log('Auth: Setting loading to false');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await botbleAPI.login(email, password);
      
      if (response.success && response.data) {
        const user = response.data.user || response.data;
        const token = response.data.token;
        
        // Update the token in botbleAPI instance
        if (token) {
          botbleAPI.updateToken(token);
        }
        
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.message || 'Login failed. Please check your credentials.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await botbleAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      botbleAPI.updateToken(null);
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await botbleAPI.register(data);
      
      if (response.success && response.data) {
        const user = response.data.user || response.data;
        const token = response.data.token;
        
        // Update the token in botbleAPI instance
        if (token) {
          botbleAPI.updateToken(token);
        }
        
        setUser(user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (data: { name: string; email: string; phone: string; avatar?: File | null }): Promise<{ success: boolean; message?: string }> => {
    try {
      setIsLoading(true);
      const response = await botbleAPI.updateProfile(data);
      if (response.success && response.data) {
        setUser(response.data);
        return { success: true, message: 'Profile updated successfully.' };
      } else {
        return { success: false, message: response.message || 'Profile update failed.' };
      }
    } catch (error: any) {
      console.error('Update profile error:', error);
      return { success: false, message: error.message || 'Profile update failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    checkAuth,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 