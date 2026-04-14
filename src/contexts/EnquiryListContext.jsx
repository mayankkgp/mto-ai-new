import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import * as api from '../mockApi.js';
import { useUIState } from './UIStateContext.jsx';

const EnquiryListContext = createContext(null);

export const useEnquiryList = () => {
  const context = useContext(EnquiryListContext);
  if (!context) throw new Error('useEnquiryList must be used within EnquiryListProvider');
  return context;
};

export const EnquiryListProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState([]);
  const { setIsGlobalLoading } = useUIState();

  const loadEnquiries = useCallback(async () => {
    setIsGlobalLoading(true);
    try {
      const data = await api.fetchEnquiries();
      setEnquiries(data);
    } catch (error) {
      toast.error("Failed to load enquiries", { description: error.message });
    } finally {
      setIsGlobalLoading(false);
    }
  }, [setIsGlobalLoading]);

  const value = {
    enquiries,
    setEnquiries,
    loadEnquiries
  };

  return (
    <EnquiryListContext.Provider value={value}>
      {children}
    </EnquiryListContext.Provider>
  );
};
