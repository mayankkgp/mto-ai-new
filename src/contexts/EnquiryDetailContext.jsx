import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import * as api from '../mocks/mockApi.js';
import { useUIState } from './UIStateContext.jsx';
import { useEnquiryList } from './EnquiryListContext.jsx';

const EnquiryDetailContext = createContext(null);

export const useEnquiryDetail = () => {
  const context = useContext(EnquiryDetailContext);
  if (!context) throw new Error('useEnquiryDetail must be used within EnquiryDetailProvider');
  return context;
};

export const EnquiryDetailProvider = ({ children }) => {
  const [activeEnquiryId, setActiveEnquiryId] = useState(null);
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  
  const { setIsCreating, setIsActionLoading, setUploadProgress } = useUIState();
  const { enquiries, setEnquiries } = useEnquiryList();

  // Sync activeEnquiry when activeEnquiryId or enquiries change
  useEffect(() => {
    if (activeEnquiryId) {
      const found = enquiries.find(e => e.id === activeEnquiryId);
      setActiveEnquiry(found ? { ...found } : null);
    } else {
      setActiveEnquiry(null);
    }
  }, [activeEnquiryId, enquiries]);

  const selectEnquiry = (id) => {
    setActiveEnquiryId(id);
    setIsCreating(false);
  };

  const closePane = () => {
    setActiveEnquiryId(null);
    setIsCreating(false);
  };

  const saveEnquiryDetails = async (formData, showToast = true) => {
    setIsActionLoading(true);
    try {
      const saved = await api.saveEnquiry(formData);
      setEnquiries(prev => {
        const index = prev.findIndex(e => e.id === saved.id);
        if (index !== -1) {
          const newList = [...prev];
          newList[index] = { ...saved };
          return newList;
        }
        return [...prev, { ...saved }];
      });
      if (showToast) {
        toast.success("Changes saved");
      }
      return saved;
    } catch (error) {
      toast.error("Failed to save enquiry", { description: error.message });
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
      toast.error("Failed to update status", { description: error.message });
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleFileUpload = async (file) => {
    setUploadProgress(0);
    try {
      const fileData = await api.uploadAttachment(file, (progress) => {
        setUploadProgress(progress);
      });
      fileData.url = URL.createObjectURL(file);
      
      if (activeEnquiryId) {
        setEnquiries(prev => {
          return prev.map(e => {
            if (e.id === activeEnquiryId) {
              const updatedEnquiry = { ...e };
              updatedEnquiry.attachments = [...(updatedEnquiry.attachments || []), fileData];
              return updatedEnquiry;
            }
            return e;
          });
        });
      }
      return fileData;
    } catch (error) {
      toast.error("Upload failed", { description: error.message });
      throw error;
    } finally {
      setUploadProgress(0);
    }
  };

  const handleFileDelete = async (fileId) => {
    setIsActionLoading(true);
    try {
      await api.deleteAttachment(fileId);
      if (activeEnquiryId) {
        setEnquiries(prev => {
          return prev.map(e => {
            if (e.id === activeEnquiryId) {
              const updatedEnquiry = { ...e };
              updatedEnquiry.attachments = (updatedEnquiry.attachments || []).filter(f => f.id !== fileId);
              return updatedEnquiry;
            }
            return e;
          });
        });
      }
      return true;
    } catch (error) {
      toast.error("Delete failed", { description: error.message });
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
            const updatedEnquiry = { ...e };
            const dept = newTask.id.includes('rev') ? 'revenue' : 'supply';
            if (!updatedEnquiry.tasks) updatedEnquiry.tasks = { revenue: [], supply: [] };
            updatedEnquiry.tasks[dept] = [...(updatedEnquiry.tasks[dept] || []), newTask];
            return updatedEnquiry;
          }
          return e;
        });
      });
    } catch (error) {
      toast.error("Failed to add task", { description: error.message });
      throw error;
    } finally {
      setIsActionLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId, isCompleted) => {
    if (!activeEnquiryId) return;
    try {
      await api.updateTaskStatus(taskId, isCompleted);
      setEnquiries(prev => {
        return prev.map(e => {
          if (e.id === activeEnquiryId) {
            const updatedEnquiry = { ...e };
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
      toast.error("Failed to update task", { description: error.message });
      throw error;
    }
  };

  const value = {
    activeEnquiry,
    activeEnquiryId,
    selectEnquiry,
    closePane,
    saveEnquiryDetails,
    updateStatus,
    handleFileUpload,
    handleFileDelete,
    addNewTask,
    toggleTaskCompletion
  };

  return (
    <EnquiryDetailContext.Provider value={value}>
      {children}
    </EnquiryDetailContext.Provider>
  );
};
