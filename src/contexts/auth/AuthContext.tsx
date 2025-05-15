
import React, { createContext, useContext } from 'react';
import { useAuthProvider } from './useAuthProvider';
import { signIn, signUp, signOut, signInWithGoogle } from './authMethods';
import type { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session, user, loading, isNewUser, setIsNewUser } = useAuthProvider();

  const handleSignIn = async (email: string, password: string) => {
    const result = await signIn(email, password);
    // For sign in, this is definitely not a new user
    setIsNewUser(false);
    return result;
  };

  const handleSignUp = async (email: string, password: string) => {
    const result = await signUp(email, password);
    // For sign up, this is definitely a new user
    if (!result.error && result.data?.user) {
      setIsNewUser(true);
    }
    return result;
  };

  const value: AuthContextType = {
    session,
    user,
    loading,
    isNewUser,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
