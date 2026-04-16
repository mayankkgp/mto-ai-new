import React, { createContext, useContext, useState } from 'react';
import { ENQUIRY_STATUS } from '@/constants/enquiryConstants.js';

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
  const [statusTab, setStatusTab] = useState(ENQUIRY_STATUS.ACTIVE);
  const [activeModule, setActiveModule] = useState('enquiries');
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isCompact, setIsCompact] = useState(false);

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
    activeModule,
    setActiveModule,
    isCollapsed,
    setIsCollapsed,
    isCompact,
    setIsCompact,
    startCreating,
    stopCreating
  };

  return (
    <UIStateContext.Provider value={value}>
      {children}
    </UIStateContext.Provider>
  );
};
