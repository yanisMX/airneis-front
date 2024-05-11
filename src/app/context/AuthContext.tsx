"use client";
import React, { createContext, useState, ReactNode } from 'react';
import { UserDataSignIn } from '../interfaces/interfaces';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface RootLayoutProps {
    children: ReactNode;
  }


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<RootLayoutProps>  = ({ children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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
