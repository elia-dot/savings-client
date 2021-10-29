import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const baseUrl = 'https://goals-65106.herokuapp.com';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const config = {
    'Content-Type': 'application/json',
  };

  const signup = async (data) => {
    try {
      const res = await axios.post(`${baseUrl}/users/signup`, data, config);
      return res;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        console.log(error);
      }
    }
  }

  const login = async (data) => {    
    try {
      const res = await axios.post(`${baseUrl}/users/login`, data, config);
      return res;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else {
        console.log(error);
      }
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsAuth(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUser = async () => {
    setTimeout(async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        if (savedToken !== null) {
          setToken(savedToken);
          setIsAuth(true);
        }
      } catch (error) {
        console.log('error reading async storage', error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const value = { login, signup, logOut, loading, isAuth, setIsAuth, token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
