'use client';
import React, { createContext, useEffect, useState } from 'react';
import {
  AuthContextType,
  RootLayoutProps,
  UserData,
  UserFetch,
} from '@/app/interfaces/interfaces';
import { setCookie, getCookie } from '../utils/cookiesUtils';
import { clearLoginStatus } from '../utils/userUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<RootLayoutProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const API_FOR_USER = 'https://c1bb0d8a5f1d.airneis.net/api/user';

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await fetch(API_FOR_USER, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData: UserFetch = await response.json();
      if (userData.success) {
        setUser({ ...userData.user, accessToken });
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setCookie('session', 'active', 7);
    fetchUserInfo(getCookie('accessToken') ?? '');
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    clearLoginStatus()
    setUser(null);
  };

  // Vérifie si l'utilisateur est déjà connecté en utilisant le localStorage
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      const accessToken = getCookie('accessToken') ?? '';
      // Si un token d'accès est présent, on tente de récupérer les informations utilisateur
      if (accessToken) {
        fetchUserInfo(accessToken);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
