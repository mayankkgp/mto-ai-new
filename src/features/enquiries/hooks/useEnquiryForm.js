import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, CheckCircle2, Ban, RotateCcw } from 'lucide-react';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useModals } from '@/contexts/ModalContext.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { triggerValidationToast } from '@/utils/validation.js';
import { ENQUIRY_STATUS, ENQUIRY_TYPE } from '@/constants/enquiryConstants.js';
import { getUserInitials } from '@/utils/formatters.js';
import { enquirySchema } from '../schema.js';

/**
 * useEnquiryForm Hook
 * Extracts complex logic from EnquiryDetailPane for better maintainability.
 */
export const useEnquiryForm = (activeEnquiryId, isCreating, onClose) => {
  const { enquiries } = useEnquiryList();
  const { updateStatus, saveEnquiryDetails } = useEnquiryDetail();
  const { isActionLoading, setStatusTab } = useUIState();
  const { openModal, closeModal } = useModals();
  const { users } = useReferenceData();
  const [activeLoading, setActiveLoading] = useState(null);

  // Find the active enquiry matching activeEnquiryId
  const activeEnquiry = enquiries.find(e => e.id === activeEnquiryId);

  // Reset activeLoading when global loading finishes
  useEffect(() => {
    if (!isActionLoading) {
      setActiveLoading(null);
    }
  }, [isActionLoading]);

  const methods = useForm({
    resolver: zodResolver(enquirySchema),
    mode: 'onChange',
    defaultValues: {
      id: "NEW ENQUIRY",
      status: ENQUIRY_STATUS.DRAFT,
      customer: { name: '', city: '', poc: '', contact: '' },
      leadOverview: '',
      leadDetails: '',
      type: ENQUIRY_TYPE.MTO,
      leadDate: new Date().toISOString().split('T')[0],
      channel: 'Direct',
      commercials: { orderValue: 0, probability: 50, expectedValue: 0 },
      roles: { 
        revenue: [{ id: 'u1', name: 'Mayank Kumar' }], 
        supply: [] 
      },
      attachments: [],
      tasks: { revenue: [], supply: [] }
    }
  });

  const { reset, watch, getValues } = methods;
  const formData = watch();

  // Initialize form when activeEnquiry or isCreating changes
  useEffect(() => {
    if (isCreating) {
      reset({
        id: "NEW ENQUIRY",
        status: ENQUIRY_STATUS.DRAFT,
        customer: { name: '', city: '', poc: '', contact: '' },
        leadOverview: '',
        leadDetails: '',
        type: ENQUIRY_TYPE.MTO,
        leadDate: new Date().toISOString().split('T')[0],
        channel: 'Direct',
        commercials: { orderValue: 0, probability: 50, expectedValue: 0 },
        roles: { 
          revenue: [{ id: 'u1', name: 'Mayank Kumar' }], 
          supply: [] 
        },
        attachments: [],
        tasks: { revenue: [], supply: [] }
      });
    } else if (activeEnquiry) {
      reset({ 
        ...activeEnquiry,
        tasks: activeEnquiry.tasks || { revenue: [], supply: [] }
      });
    }
  }, [activeEnquiry, isCreating, reset]);

  const isReadOnly = formData.status === ENQUIRY_STATUS.CONVERTED || formData.status === ENQUIRY_STATUS.DROPPED;

  const handleSave = async (data) => {
    await saveEnquiryDetails(data);
  };

  const handleConvert = async () => {
    const data = getValues();
    await saveEnquiryDetails(data, false);
    if (activeEnquiryId) {
      updateStatus(ENQUIRY_STATUS.CONVERTED);
      setStatusTab(ENQUIRY_STATUS.CONVERTED);
    }
  };

  const handleDrop = async (reason) => {
    const data = getValues();
    await saveEnquiryDetails(data, false);
    if (activeEnquiryId) {
      updateStatus(ENQUIRY_STATUS.DROPPED, reason);
      setStatusTab(ENQUIRY_STATUS.DROPPED);
      reset({
        ...formData,
        status: ENQUIRY_STATUS.DROPPED,
        dropReason: reason
      });
    }
  };

  const handleReopen = () => {
    if (activeEnquiryId) {
      updateStatus(ENQUIRY_STATUS.ACTIVE);
      setStatusTab(ENQUIRY_STATUS.ACTIVE);
    }
  };

  const getErrorFields = (errors) => {
    const fields = [];
    if (errors.customer?.name) fields.push("Customer Name");
    if (errors.customer?.poc) fields.push("POC Name");
    if (errors.customer?.city) fields.push("City");
    if (errors.customer?.contact) fields.push("Contact");
    if (errors.leadOverview) fields.push("Lead Overview");
    if (errors.type) fields.push("Enquiry Type");
    if (errors.roles?.revenue) fields.push("Revenue Role");
    if (errors.roles?.supply) fields.push("Supply Role");
    if (errors.commercials) fields.push("Commercials (Numerical Values)");
    if (errors.leadDate) fields.push("Lead Date");
    if (errors.channel) fields.push("Channel");
    return fields;
  };

  const onValidationFailed = (errors) => {
    const fields = getErrorFields(errors);
    if (fields.length === 0 && Object.keys(errors).length > 0) {
      const unmappedKeys = Object.keys(errors);
      fields.push(...unmappedKeys.map(k => `Field: ${k}`));
    }

    triggerValidationToast(fields);
  };

  const handleSaveClick = methods.handleSubmit(async (data) => {
    setActiveLoading('save');
    await handleSave(data);
  }, onValidationFailed);

  const handleConvertClick = methods.handleSubmit(() => {
    openModal('CONVERT_ENQUIRY', { 
      onConfirm: async () => { 
        setActiveLoading('convert');
        await handleConvert(); 
        closeModal(); 
      } 
    });
  }, onValidationFailed);

  const handleDropClick = methods.handleSubmit(() => {
    openModal('DROP_ENQUIRY', { 
      onConfirm: async (reason) => { 
        setActiveLoading('drop');
        await handleDrop(reason); 
        closeModal(); 
      } 
    });
  }, onValidationFailed);

  const handleReopenClick = () => {
    openModal('REOPEN_ENQUIRY', { 
      onConfirm: () => { 
        setActiveLoading('reopen');
        handleReopen(); 
        closeModal(); 
      } 
    });
  };

  // Construct Header Actions
  const actions = [];
  if (formData.status === ENQUIRY_STATUS.CONVERTED || formData.status === ENQUIRY_STATUS.DROPPED) {
    actions.push({
      id: 'reopen',
      label: 'RE-OPEN',
      icon: RotateCcw,
      variant: 'secondary',
      onClick: handleReopenClick,
      isLoading: isActionLoading && activeLoading === 'reopen',
      loadingText: 'RE-OPENING...'
    });
  } else {
    if (formData.status === ENQUIRY_STATUS.ACTIVE) {
      actions.push({
        id: 'convert',
        label: 'CONVERT',
        icon: CheckCircle2,
        variant: 'secondary',
        onClick: handleConvertClick,
        isLoading: isActionLoading && activeLoading === 'convert',
        loadingText: 'CONVERTING...'
      });
      actions.push({
        id: 'drop',
        label: 'DROP',
        icon: Ban,
        variant: 'destructive',
        onClick: handleDropClick,
        isLoading: isActionLoading && activeLoading === 'drop',
        loadingText: 'DROPPING...'
      });
    }
    
    actions.push({ type: 'separator' });
    
    actions.push({
      id: 'save',
      label: 'SAVE',
      icon: Save,
      onClick: handleSaveClick,
      isLoading: isActionLoading && activeLoading === 'save',
      loadingText: 'SAVING...'
    });
  }

  const revInitials = getUserInitials(formData.roles?.revenue?.map(r => r.id) || [], users);
  const supInitials = getUserInitials(formData.roles?.supply?.map(r => r.id) || [], users);

  const getStatusClasses = (status) => {
    switch (status) {
      case ENQUIRY_STATUS.ACTIVE:
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      case ENQUIRY_STATUS.CONVERTED:
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
      case ENQUIRY_STATUS.DROPPED:
        return 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return { 
    methods, 
    formData, 
    activeLoading, 
    actions, 
    revInitials, 
    supInitials, 
    getStatusClasses,
    activeEnquiry,
    isReadOnly 
  };
};
