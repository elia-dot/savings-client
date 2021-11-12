import React from 'react';
import { StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from './src/context/authContext';
import { Router } from './src/components/Router';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar />
        <Router />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
