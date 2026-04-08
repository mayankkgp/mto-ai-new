import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../mockApi';

const EnquiryContext = createContext(null);

export const useEnquiryContext = () => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiryContext must be used within an EnquiryProvider');
  }
  return context;
};

export const EnquiryProvider = ({ children }) => {
  const [enquiries, setEnquiries] = useState([]);
  const [activeEnquiryId, setActiveEnquiryId] = useState(null);
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load initial enquiries
  const loadEnquiries = useCallback(async () => {
    setIsGlobalLoading(true);
    try {
      const data = await api.fetchEnquiries();
      setEnquiries(data);
    } catch (error) {
      console.error('Failed to fetch enquiries:', error);
      // In a real app, trigger a toast here
    } finally {
      setIsGlobalLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEnquiries();
  }, [loadEnquiries]);

  // Sync activeEnquiry when activeEnquiryId or enquiries change
  useEffect(() => {
    if (activeEnquiryId) {
      const found = enquiries.find(e => e.id === activeEnquiryId);
      setActiveEnquiry(found ? JSON.parse(JSON.stringify(found)) : null);
    } else {
      setActiveEnquiry(null);
    }
  }, [activeEnquiryId, enquiries]);

  const selectEnquiry = (id) => {
    setActiveEnquiryId(id);
  };

  const saveEnquiryDetails = async (formData) => {
    setIsActionLoading(true);
    try {
      const saved = await api.saveEnquiry(formData);
      setEnquiries(prev => {
        const index = prev.findIndex(e => e.id === saved.id);
        if (index !== -1) {
          const newList = [...prev];
          newList[index] = JSON.parse(JSON.stringify(saved));
          return newList;
        }
        return [...prev, JSON.parse(JSON.stringify(saved))];
      });
      return saved;
    } catch (error) {
      console.error('Failed to save enquiry:', error);
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const updateStatus = async (newStatus, dropReason = null) => {
    if (!activeEnquiryId) return;
    setIsActionLoading(true);
    try {
      const updated = await api.changeEnquiryStatus(activeEnquiryId, newStatus, dropReason);
      setEnquiries(prev => {
        return prev.map(e => {
          if (e.id === activeEnquiryId) {
            return { ...e, status: updated.status, dropReason: updated.dropReason };
          }
          return e;
        });
      });
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    if (!activeEnquiryId) return;
    setUploadProgress(0);
    try {
      const fileData = await api.uploadAttachment(file, (progress) => {
        setUploadProgress(progress);
      });
      
      setEnquiries(prev => {
        return prev.map(e => {
          if (e.id === activeEnquiryId) {
            const updatedEnquiry = JSON.parse(JSON.stringify(e));
            updatedEnquiry.files = [...(updatedEnquiry.files || []), fileData];
            return updatedEnquiry;
          }
          return e;
        });
      });
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setUploadProgress(0);
    }
  };

  const handleFileDelete = async (fileId) => {
    if (!activeEnquiryId) return;
    setIsActionLoading(true);
    try {
      await api.deleteAttachment(fileId);
      setEnquiries(prev => {
        return prev.map(e => {
          if (e.id === activeEnquiryId) {
            const updatedEnquiry = JSON.parse(JSON.stringify(e));
            updatedEnquiry.files = updatedEnquiry.files.filter(f => f.id !== fileId);
            return updatedEnquiry;
          }
          return e;
        });
      });
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const addNewTask = async (taskData) => {
    if (!activeEnquiryId) return;
    setIsActionLoading(true);
    try {
      const newTask = await api.createTask(activeEnquiryId, taskData);
      setEnquiries(prev => {
        return prev.map(e => {
          if (e.id === activeEnquiryId) {
            const updatedEnquiry = JSON.parse(JSON.stringify(e));
            const dept = newTask.id.includes('rev') ? 'revenue' : 'supply';
            if (!updatedEnquiry.tasks) updatedEnquiry.tasks = { revenue: [], supply: [] };
            updatedEnquiry.tasks[dept] = [...(updatedEnquiry.tasks[dept] || []), newTask];
            return updatedEnquiry;
          }
          return e;
        });
      });
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId, isCompleted) => {
    if (!activeEnquiryId) return;
    // We don't necessarily want a global action loading for a simple toggle
    try {
      await api.updateTaskStatus(taskId, isCompleted);
      setEnquiries(prev => {
        return prev.map(e => {
          if (e.id === activeEnquiryId) {
            const updatedEnquiry = JSON.parse(JSON.stringify(e));
            ['revenue', 'supply'].forEach(dept => {
              if (updatedEnquiry.tasks && updatedEnquiry.tasks[dept]) {
                updatedEnquiry.tasks[dept] = updatedEnquiry.tasks[dept].map(t => {
                  if (t.id === taskId) return { ...t, isCompleted };
                  return t;
                });
              }
            });
            return updatedEnquiry;
          }
          return e;
        });
      });
    } catch (error) {
      console.error('Failed to update task:', error);
      throw error;
    }
  };

  const value = {
    enquiries,
    activeEnquiry,
    activeEnquiryId,
    isGlobalLoading,
    isActionLoading,
    uploadProgress,
    loadEnquiries,
    selectEnquiry,
    saveEnquiryDetails,
    updateStatus,
    handleFileUpload,
    handleFileDelete,
    addNewTask,
    toggleTaskCompletion
  };

  return (
    <EnquiryContext.Provider value={value}>
      {children}
    </EnquiryContext.Provider>
  );
};
