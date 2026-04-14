import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog.jsx';
import { cn } from '@/lib/utils.js';

const SystemModal = ({ 
  isOpen, 
  onClose, 
  title, 
  variant = 'info', 
  children, 
  footer 
}) => {
  const isDanger = variant === 'danger';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0 gap-0">
        <DialogHeader className={cn(
          "p-4 border-b border-gray-100 flex flex-row items-center gap-3 space-y-0",
          isDanger ? "bg-red-50" : "bg-blue-50"
        )}>
          <DialogTitle className={cn(
            "text-base font-bold",
            isDanger ? "text-red-900" : "text-blue-900"
          )}>
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {children}
        </div>

        <DialogFooter className="p-4 bg-gray-50 sm:justify-end gap-2 border-t border-gray-100">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SystemModal;
