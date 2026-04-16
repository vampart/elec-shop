import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/auth';
import { registerUser, getUserProfile } from '../services/api';

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
      const cognitoUser = await authService.getCurrentUser();
      if (cognitoUser) {
        try {
          const dbProfile = await getUserProfile();
          setUser({ ...cognitoUser, ...dbProfile });
        } catch {
          setUser(cognitoUser);
        }
      } else {
        setUser(null);
      }
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

  const saveUserToDb = async (email, name) => {
    try {
      const cognitoUser = await authService.getCurrentUser();
      const cognitoSub = cognitoUser?.sub || cognitoUser?.username;
      await registerUser({ email, name, cognitoSub });
    } catch (err) {
      if (!err.message?.includes('already exists')) {
        console.error('Failed to save user to DB:', err);
      }
    }
  };

  const logout = () => {
    authService.signOut();
    setUser(null);
  };

  const demoLogin = (email, name) => {
    setUser({ email, name, username: email, demo: true });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, confirmRegistration, saveUserToDb, logout, demoLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
