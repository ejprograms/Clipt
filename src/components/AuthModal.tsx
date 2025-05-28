
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup, login, getValidationErrors, isUsernameTaken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    if (isSignup) {
      if (isUsernameTaken(username)) {
        setErrors(['Username is already taken']);
        setIsLoading(false);
        return;
      }
      
      const validationErrors = getValidationErrors(username, password);
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }
      
      const success = await signup(username, password);
      if (success) {
        onClose();
        setUsername('');
        setPassword('');
      }
    } else {
      const success = await login(username, password);
      if (success) {
        onClose();
        setUsername('');
        setPassword('');
      } else {
        setErrors(['Invalid username or password']);
      }
    }
    
    setIsLoading(false);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    if (isSignup) {
      const newErrors = errors.filter(error => !error.includes('Username'));
      if (value.length >= 5 && !isUsernameTaken(value)) {
        setErrors(newErrors);
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (isSignup) {
      const validationErrors = getValidationErrors(username, value);
      const usernameErrors = errors.filter(error => error.includes('Username'));
      setErrors([...usernameErrors, ...validationErrors]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="gradient-white border-white/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl font-semibold">
            {isSignup ? 'Create Account' : 'Log In'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              placeholder="Enter password"
              required
            />
          </div>
          
          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, index) => (
                <p key={index} className="text-red-300 text-sm">{error}</p>
              ))}
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full gradient-white text-white font-semibold hover:bg-white/20 transition-all duration-300"
          >
            {isLoading ? 'Processing...' : (isSignup ? 'Create Account' : 'Log In')}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setErrors([]);
                setUsername('');
                setPassword('');
              }}
              className="text-white/80 hover:text-white underline text-sm"
            >
              {isSignup ? 'Already have an account? Log in' : 'Need an account? Sign up'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
