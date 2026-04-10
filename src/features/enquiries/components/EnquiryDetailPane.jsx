import React from 'react';
import { motion } from 'motion/react';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import DetailHeader from './DetailHeader.jsx';

/**
 * EnquiryDetailPane Component
 * The overarching container for the right-hand view when an enquiry is selected.
 * Implements Phase 3A: Shell & Header with Framer Motion animations.
 */
const EnquiryDetailPane = ({ activeEnquiryId, isCreating, onClose }) => {
  const { enquiries, updateStatus } = useEnquiryContext();

  // Find the active enquiry matching activeEnquiryId
  const activeEnquiry = enquiries.find(e => e.id === activeEnquiryId);

  // Render Condition: If not creating AND (no activeEnquiryId OR no activeEnquiry found), return null
  if (!isCreating && (!activeEnquiryId || !activeEnquiry)) {
    return null;
  }

  const handleSave = () => {
    // Placeholder for now, will be implemented with form logic later
    console.log('Saving enquiry:', activeEnquiryId || 'NEW');
  };

  const handleConvert = () => {
    if (activeEnquiryId) updateStatus('Converted');
  };

  const handleDrop = () => {
    // In a real app, this might open a reason modal
    if (activeEnquiryId) updateStatus('Dropped', 'Lost to competitor');
  };

  return (
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
        enquiry={isCreating ? { 
          id: "NEW ENQUIRY", 
          status: "DRAFT",
          roles: {
            revenue: [{ id: 'u1', name: 'Mayank Kumar' }]
          }
        } : activeEnquiry} 
        onClose={onClose}
        onSave={handleSave}
        onConvert={handleConvert}
        onDrop={handleDrop}
      />

      {/* Split-Pane Container */}
      <motion.div layout className="flex-1 overflow-hidden flex">
        {/* 1. Left Pane (Form & Overview) */}
        <motion.div 
          layout 
          animate={{ width: isCreating ? "70%" : "35%" }}
          className="@container overflow-y-auto no-scrollbar bg-white min-w-[300px] p-1.5 min-[height:801px]:p-3"
        >
          <div className="text-sm text-gray-500 italic">Context Pane Placeholder</div>
        </motion.div>

        {/* 2. Right Pane (Action Items & Workspace) */}
        <motion.div 
          layout 
          animate={{ width: isCreating ? "30%" : "65%" }}
          className="flex flex-col bg-gray-50/50 overflow-hidden border-l border-gray-100"
        >
          <div className="p-4 text-sm text-gray-500 italic">Action Pane Placeholder</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnquiryDetailPane;
