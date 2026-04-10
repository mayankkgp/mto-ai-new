import React from 'react';
import { motion } from 'motion/react';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import DetailHeader from './DetailHeader.jsx';
import ContextColumn from './form/ContextColumn.jsx';

/**
 * EnquiryDetailPane Component
 * The overarching container for the right-hand view when an enquiry is selected.
 * Implements Phase 3A: Shell & Header with Framer Motion animations.
 */
const EnquiryDetailPane = ({ activeEnquiryId, isCreating, onClose }) => {
  const { enquiries, updateStatus } = useEnquiryContext();

  // Find the active enquiry matching activeEnquiryId
  const activeEnquiry = enquiries.find(e => e.id === activeEnquiryId);

  // Form State
  const [formData, setFormData] = React.useState(null);

  // Initialize formData when activeEnquiry or isCreating changes
  React.useEffect(() => {
    if (isCreating) {
      setFormData({
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
        attachments: []
      });
    } else if (activeEnquiry) {
      setFormData({ ...activeEnquiry });
    } else {
      setFormData(null);
    }
  }, [activeEnquiry, isCreating]);

  // Render Condition: If not creating AND (no activeEnquiryId OR no activeEnquiry found), return null
  if (!isCreating && (!activeEnquiryId || !activeEnquiry)) {
    return null;
  }

  if (!formData) return null;

  const isReadOnly = formData.status === 'Converted' || formData.status === 'Dropped';

  const handleSave = () => {
    console.log('Saving enquiry data:', formData);
    // In a real app, this would call an API or context method
  };

  const handleConvert = () => {
    if (activeEnquiryId) updateStatus('Converted');
  };

  const handleDrop = () => {
    // In a real app, this might open a reason modal
    if (activeEnquiryId) updateStatus('Dropped', 'Lost to competitor');
  };

  const handleReopen = () => {
    if (activeEnquiryId) updateStatus('Active');
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
        enquiry={formData} 
        onClose={onClose}
        onSave={handleSave}
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
            formData={formData} 
            setFormData={setFormData} 
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
          <div className="p-4 text-sm text-gray-500 italic">Action Pane Placeholder</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EnquiryDetailPane;
