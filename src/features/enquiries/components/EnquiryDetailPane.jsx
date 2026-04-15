import React from 'react';
import { motion } from 'motion/react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEnquiryList } from '@/contexts/EnquiryListContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { enquirySchema } from '../schema.js';
import DetailHeader from './DetailHeader.jsx';
import ContextColumn from './form/ContextColumn.jsx';
import ActionColumn from './form/ActionColumn.jsx';

/**
 * EnquiryDetailPane Component
 * The overarching container for the right-hand view when an enquiry is selected.
 * Implements Phase 3A: Shell & Header with Framer Motion animations.
 */
const EnquiryDetailPane = ({ activeEnquiryId, isCreating, onClose }) => {
  const { enquiries } = useEnquiryList();
  const { updateStatus, saveEnquiryDetails } = useEnquiryDetail();
  const { setStatusTab } = useUIState();

  // Find the active enquiry matching activeEnquiryId
  const activeEnquiry = enquiries.find(e => e.id === activeEnquiryId);

  const methods = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      id: "NEW ENQUIRY",
      status: "DRAFT",
      customer: { name: '', city: '', poc: '', contact: '' },
      leadOverview: '',
      leadDetails: '',
      type: 'MTO',
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
  React.useEffect(() => {
    if (isCreating) {
      reset({
        id: "NEW ENQUIRY",
        status: "DRAFT",
        customer: { name: '', city: '', poc: '', contact: '' },
        leadOverview: '',
        leadDetails: '',
        type: 'MTO',
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

  // Render Condition: If not creating AND (no activeEnquiryId OR no activeEnquiry found), return null
  if (!isCreating && (!activeEnquiryId || !activeEnquiry)) {
    return null;
  }

  const isReadOnly = formData.status === 'Converted' || formData.status === 'Dropped';

  const handleSave = async (data) => {
    await saveEnquiryDetails(data);
  };

  const handleConvert = async () => {
    const data = getValues();
    await saveEnquiryDetails(data, false);
    if (activeEnquiryId) {
      updateStatus('Converted');
      setStatusTab('Converted');
    }
  };

  const handleDrop = async (reason) => {
    const data = getValues();
    await saveEnquiryDetails(data, false);
    if (activeEnquiryId) {
      updateStatus('Dropped', reason);
      setStatusTab('Dropped');
      reset({
        ...formData,
        status: 'Dropped',
        dropReason: reason
      });
    }
  };

  const handleReopen = () => {
    if (activeEnquiryId) {
      updateStatus('Active');
      setStatusTab('Active');
    }
  };

  return (
    <FormProvider {...methods}>
      <motion.div 
        layout
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="flex-1 h-full overflow-hidden flex flex-col bg-white shadow-[-4px_0_15px_rgba(0,0,0,0.05)] z-20"
      >
        {/* Detail Header */}
        <DetailHeader 
          enquiry={formData} 
          onClose={onClose}
          onSave={methods.handleSubmit(handleSave)}
          onConvert={handleConvert}
          onDrop={handleDrop}
          onReopen={handleReopen}
        />

        {/* Split-Pane Container */}
        <motion.div layout className="flex-1 overflow-hidden flex">
          {/* 1. Left Pane (Form & Overview) */}
          <motion.div 
            layout 
            animate={{ width: isCreating ? "70%" : "35%" }}
            className="@container overflow-y-auto no-scrollbar bg-white min-w-[300px] p-1.5 min-[height:801px]:p-3"
          >
            <ContextColumn 
              isCreating={isCreating} 
              isReadOnly={isReadOnly} 
            />
          </motion.div>

          {/* 2. Right Pane (Action Items & Workspace) */}
          <motion.div 
            layout 
            animate={{ width: isCreating ? "30%" : "65%" }}
            className="flex flex-col bg-gray-50/50 overflow-hidden border-l border-gray-100"
          >
            <ActionColumn 
              isCreating={isCreating} 
              isReadOnly={isReadOnly} 
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </FormProvider>
  );
};

export default EnquiryDetailPane;
