
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ClipHistory {
  id: string;
  videoTitle: string;
  videoId: string;
  startTime: number;
  endTime: number;
  format: string;
  date: string;
}

interface User {
  username: string;
  email: string;
  history: ClipHistory[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (username: string, email: string) => Promise<boolean>;
  getValidationErrors: (username: string, email: string) => string[];
  isUsernameTaken: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate login validation
    if (username && password) {
      setIsAuthenticated(true);
      setUser({ 
        username, 
        email: 'demo@example.com',
        history: []
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const signup = async (username: string, email: string): Promise<boolean> => {
    // Simulate signup process
    if (username && email) {
      setIsAuthenticated(true);
      setUser({ username, email, history: [] });
      return true;
    }
    return false;
  };

  const getValidationErrors = (username: string, email: string): string[] => {
    const errors: string[] = [];
    if (!username) errors.push('Username is required');
    if (!email) errors.push('Email is required');
    if (email && !email.includes('@')) errors.push('Invalid email format');
    return errors;
  };

  const isUsernameTaken = (username: string): boolean => {
    // Simulate checking if username is taken
    const takenUsernames = ['admin', 'user', 'test'];
    return takenUsernames.includes(username.toLowerCase());
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user,
      login, 
      logout, 
      signup,
      getValidationErrors,
      isUsernameTaken
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
