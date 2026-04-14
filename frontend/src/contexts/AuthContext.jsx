import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000';
axios.defaults.baseURL = API_BASE;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/auth/me')
        .then(response => setUser(response.data))
        .catch(() => {
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/auth/token', new URLSearchParams({
        username,
        password,
      }));
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      const userResponse = await axios.get('/auth/me');
      setUser(userResponse.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.detail || 'Unable to login. Please try again.',
      };
    }
  };

  const register = async (email, username, password) => {
    try {
      await axios.post('/auth/register', { email, username, password });
      return login(username, password);
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.detail || 'Registration failed. Please try again.',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};