import React from 'react';
import SystemPopup from '@/components/ui/system-popup.jsx';
import { RotateCcw } from 'lucide-react';

/**
 * ReopenEnquiryModal component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {function} props.onConfirm
 * @param {boolean} props.isProcessing
 */
const ReopenEnquiryModal = ({ isOpen, onClose, onConfirm, isProcessing }) => {
  return (
    <SystemPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Re-open Enquiry"
      variant="secondary"
      actionLabel="Confirm Re-open"
      actionIcon={<RotateCcw size={14} />}
      onAction={onConfirm}
      isProcessing={isProcessing}
    >
      <p className="text-xs text-gray-600 font-medium">
        Are you sure you want to re-open this item? This will restore all editing capabilities and move it back to the active list.
      </p>
    </SystemPopup>
  );
};

export default ReopenEnquiryModal;
