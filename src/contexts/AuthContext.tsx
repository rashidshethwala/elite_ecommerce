import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthState, User } from '../types';
import { authService, LoginData, RegisterData } from '../services/authService';

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE' }
  | { type: 'UPDATE_USER'; payload: User };   // ✅ new

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;   // ✅ new

}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return { ...state, isLoading: true };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('user'),
  isLoading: false,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const loginData: LoginData = { email, password };
      const response = await authService.login(loginData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw new Error(error.response?.data?.non_field_errors?.[0] || 'Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });

    try {
      const [firstName, ...lastNameParts] = name.split(' ');
      const lastName = lastNameParts.join(' ');
      
      const registerData: RegisterData = {
        email,
        username: email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: password,
      };
      
      const response = await authService.register(registerData);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.user });
    } catch (error: any) {
      dispatch({ type: 'REGISTER_FAILURE' });
      const errorMessage = error.response?.data?.email?.[0] || 
                          error.response?.data?.non_field_errors?.[0] || 
                          'Registration failed';
      throw new Error(errorMessage);
    }
  };
  
  const updateUser = (user: User) => {
    authService.updateProfile(user).then((updatedUser) => {
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    });
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
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