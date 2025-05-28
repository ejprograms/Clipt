
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  history: ClipHistory[];
}

interface ClipHistory {
  id: string;
  videoTitle: string;
  videoId: string;
  startTime: number;
  endTime: number;
  format: 'mp4-video-audio' | 'mp4-video' | 'mp3-audio';
  date: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addToHistory: (clip: Omit<ClipHistory, 'id' | 'date'>) => void;
  getValidationErrors: (username: string, password: string) => string[];
  isUsernameTaken: (username: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<Record<string, { password: string; history: ClipHistory[] }>>({});

  useEffect(() => {
    const savedUsers = localStorage.getItem('clipt_users');
    const savedCurrentUser = localStorage.getItem('clipt_current_user');
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    if (savedCurrentUser) {
      const userData = JSON.parse(savedCurrentUser);
      setUser(userData);
    }
  }, []);

  const isUsernameTaken = (username: string): boolean => {
    return username.toLowerCase() in Object.keys(users).map(u => u.toLowerCase());
  };

  const getValidationErrors = (username: string, password: string): string[] => {
    const errors: string[] = [];
    
    if (username.length < 5) {
      errors.push('Username must be at least 5 characters long');
    }
    
    if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors;
  };

  const signup = async (username: string, password: string): Promise<boolean> => {
    if (isUsernameTaken(username)) {
      return false;
    }
    
    const errors = getValidationErrors(username, password);
    if (errors.length > 0) {
      return false;
    }
    
    const newUsers = {
      ...users,
      [username]: { password, history: [] }
    };
    
    setUsers(newUsers);
    localStorage.setItem('clipt_users', JSON.stringify(newUsers));
    
    const newUser = { username, history: [] };
    setUser(newUser);
    localStorage.setItem('clipt_current_user', JSON.stringify(newUser));
    
    return true;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const userData = users[username];
    if (userData && userData.password === password) {
      const loginUser = { username, history: userData.history };
      setUser(loginUser);
      localStorage.setItem('clipt_current_user', JSON.stringify(loginUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clipt_current_user');
  };

  const addToHistory = (clip: Omit<ClipHistory, 'id' | 'date'>) => {
    if (!user) return;
    
    const newClip: ClipHistory = {
      ...clip,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    const updatedHistory = [newClip, ...user.history];
    const updatedUser = { ...user, history: updatedHistory };
    
    setUser(updatedUser);
    localStorage.setItem('clipt_current_user', JSON.stringify(updatedUser));
    
    const updatedUsers = {
      ...users,
      [user.username]: {
        ...users[user.username],
        history: updatedHistory
      }
    };
    
    setUsers(updatedUsers);
    localStorage.setItem('clipt_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      addToHistory,
      getValidationErrors,
      isUsernameTaken
    }}>
      {children}
    </AuthContext.Provider>
  );
};
