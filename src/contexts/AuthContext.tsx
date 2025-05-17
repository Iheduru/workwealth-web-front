
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'agent' | 'admin';
  isKycVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithOtp: (phone: string, otp: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing auth on mount
    const token = localStorage.getItem('ww-auth-token');
    const userRole = localStorage.getItem('ww-user-role');
    
    if (token) {
      // Mock user data - in a real app, you'd fetch this from an API
      setUser({
        id: 'user-123',
        name: 'Ade Dayo',
        email: 'ade@example.com',
        role: (userRole as 'user' | 'agent' | 'admin') || 'user',
        isKycVerified: localStorage.getItem('ww-kyc-verified') === 'true'
      });
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth token
      localStorage.setItem('ww-auth-token', 'mock-token-xyz');
      localStorage.setItem('ww-user-role', 'user');
      
      // Set user
      setUser({
        id: 'user-123',
        name: 'Ade Dayo',
        email: email,
        role: 'user',
        isKycVerified: false
      });
      
      toast({
        title: "Login successful!",
        description: "Welcome back to WorkWealth."
      });
      
      navigate('/kyc');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOtp = async (phone: string, otp: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth token
      localStorage.setItem('ww-auth-token', 'mock-token-xyz');
      localStorage.setItem('ww-user-role', 'user');
      
      // Set user
      setUser({
        id: 'user-123',
        name: 'Ade Dayo',
        email: `user-${phone}@example.com`,
        role: 'user',
        isKycVerified: false
      });
      
      toast({
        title: "Login successful!",
        description: "Welcome back to WorkWealth."
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your OTP and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store auth token
      localStorage.setItem('ww-auth-token', 'mock-token-xyz');
      localStorage.setItem('ww-user-role', 'user');
      
      // Set user
      setUser({
        id: 'user-123',
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: 'user',
        isKycVerified: false
      });
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created."
      });
      
      navigate('/kyc');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "Please check your information and try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    // Clear auth token and user data
    localStorage.removeItem('ww-auth-token');
    localStorage.removeItem('ww-user-role');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    
    navigate('/login');
  };

  const checkAuth = (): boolean => {
    return localStorage.getItem('ww-auth-token') !== null;
  };

  const updateUser = (userData: Partial<User>): void => {
    if (user) {
      setUser({ ...user, ...userData });
      
      // If KYC status is updated, store it in localStorage
      if (userData.isKycVerified !== undefined) {
        localStorage.setItem('ww-kyc-verified', userData.isKycVerified.toString());
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithOtp,
        register,
        logout,
        checkAuth,
        updateUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
