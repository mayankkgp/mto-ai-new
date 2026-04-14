import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../mocks/mockApi.js';

const ReferenceDataContext = createContext(null);

export const useReferenceData = () => {
  const context = useContext(ReferenceDataContext);
  if (!context) throw new Error('useReferenceData must be used within ReferenceDataProvider');
  return context;
};

export const ReferenceDataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isReferenceLoading, setIsReferenceLoading] = useState(true);

  useEffect(() => {
    const fetchAllReferenceData = async () => {
      setIsReferenceLoading(true);
      try {
        const [usersData, channelsData, customersData] = await Promise.all([
          api.fetchUsers(),
          api.fetchChannels(),
          api.fetchCustomers()
        ]);
        setUsers(usersData);
        setChannels(channelsData);
        setCustomers(customersData);
      } catch (error) {
        console.error("Failed to fetch reference data:", error);
      } finally {
        setIsReferenceLoading(false);
      }
    };

    fetchAllReferenceData();
  }, []);

  const value = {
    users,
    channels,
    customers,
    isReferenceLoading
  };

  return (
    <ReferenceDataContext.Provider value={value}>
      {children}
    </ReferenceDataContext.Provider>
  );
};
