import React from 'react';
import { motion } from 'motion/react';
import { FormProvider } from 'react-hook-form';
import { paneVariants } from '@/components/ui/pane.jsx';
import { cn } from '@/lib/utils.js';
import { useEnquiryForm } from '../hooks/useEnquiryForm.js';
import DetailHeader from './DetailHeader.jsx';
import ContextColumn from './form/ContextColumn.jsx';
import ActionColumn from './form/ActionColumn.jsx';

/**
 * EnquiryDetailPane Component
 * The overarching container for the right-hand view when an enquiry is selected.
 * Implements Phase 3A: Shell & Header with Framer Motion animations.
 */
const EnquiryDetailPane = ({ activeEnquiryId, isCreating, onClose }) => {
  const { 
    methods, 
    formData, 
    activeLoading, 
    actions, 
    revInitials, 
    supInitials, 
    getStatusClasses,
    activeEnquiry,
    isReadOnly
  } = useEnquiryForm(activeEnquiryId, isCreating, onClose);

  // Render Condition: If not creating AND (no activeEnquiryId OR no activeEnquiry found), return null
  if (!isCreating && (!activeEnquiryId || !activeEnquiry)) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <motion.div 
        layout
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(paneVariants({ variant: 'details-pane-split' }), "flex-1 h-full overflow-hidden flex flex-col shadow-[-4px_0_15px_rgba(0,0,0,0.05)] z-20")}
      >
        {/* Detail Header */}
        <DetailHeader 
          title={formData.id}
          badges={[{ label: formData.status, className: getStatusClasses(formData.status) }]}
          avatarGroups={[
            { initials: revInitials },
            { initials: supInitials }
          ]}
          actions={actions}
          onClose={onClose}
        />

        {/* Split-Pane Container */}
        <motion.div layout className="flex-1 overflow-hidden flex">
          {/* 1. Left Pane (Form & Overview) */}
          <motion.div 
            layout 
            animate={{ width: isCreating ? "70%" : "35%" }}
            className="@container overflow-y-auto no-scrollbar bg-white min-w-[300px] p-1.5"
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
            className="@container flex flex-col bg-gray-50/50 overflow-hidden border-l border-gray-100"
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
