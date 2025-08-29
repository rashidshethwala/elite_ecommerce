import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AuthState, User } from '../types';

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
    const users = getUsers();

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      console.log("User found:", user.id);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGIN_FAILURE' });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    dispatch({ type: 'REGISTER_START' });

    await new Promise(resolve => setTimeout(resolve, 800));

    const user: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    const users = getUsers();
    const exists = users.some(u => u.email === user.email);
    if (exists) {
      dispatch({ type: 'REGISTER_FAILURE' });
      throw new Error('Email already registered');
    }

    users.push(user);
    saveUsers(users);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'REGISTER_SUCCESS', payload: user });
  };
  const updateUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'UPDATE_USER', payload: user });

    // also update users[] in localStorage so changes persist across logins
    const users = getUsers();
    const updatedUsers = users.map(u => (u.id === user.id ? user : u));
    saveUsers(updatedUsers);
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
// Helpers to manage a simple users store in localStorage
function getUsers(): User[] {
  return JSON.parse(localStorage.getItem('users') || '[]') as User[];
}

function saveUsers(users: User[]): void {
  localStorage.setItem('users', JSON.stringify(users));
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};