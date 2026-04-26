import { useEffect } from 'react';
import { toast } from 'sonner';

const ValidationAlert = ({ isOpen, onClose, errors, onDiscard, showDiscardOption }) => {
  useEffect(() => {
    if (isOpen && errors && errors.length > 0) {
      const hasUnsubmittedTask = errors.includes("Unsubmitted Task");
      
      toast.error(hasUnsubmittedTask ? "Unsubmitted Task" : "Missing Required Fields", {
        description: errors.join(' • '),
        duration: 4000,
        action: showDiscardOption ? {
          label: 'Discard',
          onClick: onDiscard
        } : undefined
      });

      onClose();
    }
  }, [isOpen, errors, onClose, onDiscard, showDiscardOption]);

  return null;
};

export default ValidationAlert;
