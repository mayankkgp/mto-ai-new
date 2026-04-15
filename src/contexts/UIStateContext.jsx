import React, { createContext, useContext, useState } from 'react';

const UIStateContext = createContext(null);

export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (!context) throw new Error('useUIState must be used within UIStateProvider');
  return context;
};

export const UIStateProvider = ({ children }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [statusTab, setStatusTab] = useState('Active');

  const startCreating = () => setIsCreating(true);
  const stopCreating = () => setIsCreating(false);

  const value = {
    isCreating,
    setIsCreating,
    isGlobalLoading,
    setIsGlobalLoading,
    isActionLoading,
    setIsActionLoading,
    uploadProgress,
    setUploadProgress,
    statusTab,
    setStatusTab,
    startCreating,
    stopCreating
  };

  return (
    <UIStateContext.Provider value={value}>
      {children}
    </UIStateContext.Provider>
  );
};
