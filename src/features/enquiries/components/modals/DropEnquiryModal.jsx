import React, { useState, useEffect } from 'react';
import SystemPopup from '@/components/ui/system-popup.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Ban } from 'lucide-react';

/**
 * DropEnquiryModal component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {function} props.onConfirm - Receives the reason string
 * @param {boolean} props.isProcessing
 */
const DropEnquiryModal = ({ isOpen, onClose, onConfirm, isProcessing }) => {
  const [reason, setReason] = useState("");

  // Reset reason when modal closes
  useEffect(() => {
    if (!isOpen) {
      setReason("");
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason.trim());
    }
  };

  return (
    <SystemPopup
      isOpen={isOpen}
      onClose={onClose}
      title="Drop Enquiry"
      variant="destructive"
      actionLabel="Drop Enquiry"
      actionIcon={<Ban size={14} />}
      onAction={handleConfirm}
      isProcessing={isProcessing}
      isActionDisabled={!reason.trim()}
    >
      <div className="space-y-4">
        <p className="text-xs text-gray-600 font-medium">
          Dropping an enquiry is a permanent action. Please provide a reason below.
        </p>
        <Textarea
          placeholder="Enter reason for dropping..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full min-h-[80px] bg-gray-50 border-gray-200 rounded-lg text-xs resize-none focus:border-[#1E40AF]"
          disabled={isProcessing}
        />
      </div>
    </SystemPopup>
  );
};

export default DropEnquiryModal;
