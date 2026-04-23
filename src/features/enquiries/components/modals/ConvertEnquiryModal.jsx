import React from 'react';
import SystemPopup from '@/components/ui/system-popup.jsx';
import { CheckCircle2 } from 'lucide-react';

/**
 * ConvertEnquiryModal component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {function} props.onConfirm
 * @param {boolean} props.isProcessing
 */
const ConvertEnquiryModal = ({ isOpen, onClose, onConfirm, isProcessing }) => {
  return (
    <SystemPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Convert Enquiry"
      variant="secondary"
      actionLabel="Convert"
      actionIcon={<CheckCircle2 size={14} />}
      onAction={onConfirm}
      isProcessing={isProcessing}
    >
      <p className="text-xs text-gray-600 font-medium">
        Are you sure you want to convert this enquiry? This action will mark the enquiry as converted and cannot be undone.
      </p>
    </SystemPopup>
  );
};

export default ConvertEnquiryModal;
