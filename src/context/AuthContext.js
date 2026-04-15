import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkUser = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const login = async (email, password) => {
    const tokens = await authService.signIn(email, password);
    await checkUser();
    return tokens;
  };

  const register = async (email, password, name) => {
    return authService.signUp(email, password, name);
  };

  const confirmRegistration = async (email, code) => {
    return authService.confirmSignUp(email, code);
  };

  const logout = () => {
    authService.signOut();
    setUser(null);
  };

  // Demo login for development without Cognito
  const demoLogin = (email, name) => {
    setUser({ email, name, username: email, demo: true });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, confirmRegistration, logout, demoLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
