import React, { createContext, useState, useContext } from 'react';

interface LoadingContextProps {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoadingContext must be used inside LoadingProvider');
  return ctx;
};
