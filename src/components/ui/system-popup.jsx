import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog.jsx';
import { Button } from '@/components/ui/button.jsx';
import { cn } from '@/lib/utils.js';

/**
 * SystemPopup component
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {function} props.onClose
 * @param {string} props.title
 * @param {'primary' | 'secondary' | 'destructive'} props.variant
 * @param {string} props.actionLabel
 * @param {function} props.onAction
 * @param {boolean} props.isProcessing
 * @param {React.ReactNode} props.children
 */
const SystemPopup = ({
  isOpen,
  onClose,
  title,
  variant = 'primary',
  actionLabel,
  onAction,
  isProcessing = false,
  isActionDisabled = false,
  children
}) => {
  // Variant configurations
  const variantMap = {
    primary: {
      headerBg: "bg-primary/10",
      titleColor: "text-primary",
      actionVariant: "default"
    },
    secondary: {
      headerBg: "bg-secondary/50",
      titleColor: "text-secondary-foreground",
      actionVariant: "secondary"
    },
    destructive: {
      headerBg: "bg-destructive/10",
      titleColor: "text-destructive",
      actionVariant: "destructive"
    }
  };

  const config = variantMap[variant] || variantMap.primary;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="sm:max-w-md p-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0 gap-0"
        showCloseButton={false}
      >
        <DialogHeader className={cn(
          "p-4 border-b border-gray-100 flex flex-row items-center gap-3 space-y-0",
          config.headerBg
        )}>
          <DialogTitle className={cn("text-base font-bold", config.titleColor)}>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {children}
        </div>

        <DialogFooter className="p-4 bg-gray-50 items-center sm:justify-end gap-2 border-t border-gray-100">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            disabled={isProcessing}
            className="text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-lg h-9 px-4"
          >
            Cancel
          </Button>
          <Button 
            variant={config.actionVariant} 
            onClick={onAction} 
            disabled={isProcessing || isActionDisabled}
            className="text-xs font-bold rounded-lg h-9 px-4"
          >
            {isProcessing ? "Processing..." : actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SystemPopup;
