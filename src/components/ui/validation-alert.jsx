import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogAction, 
  AlertDialogOverlay, 
  AlertDialogPortal 
} from '@/components/ui/alert-dialog.jsx';
import { AlertTriangle } from 'lucide-react';

const ValidationAlert = ({ isOpen, onClose, errors }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogPortal>
        <AlertDialogOverlay className="z-[100] bg-black/50 backdrop-blur-sm" />
        <AlertDialogContent className="sm:max-w-md p-6 text-center bg-white rounded-xl shadow-2xl border-0">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-100 text-amber-600">
            <AlertTriangle size={24} />
          </div>
          
          <AlertDialogHeader className="space-y-0">
            <AlertDialogTitle className="text-lg font-bold text-gray-900 flex justify-center mb-2">
              Validation Error
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-500 mb-6">
              Please fix the following issues before saving:
            </AlertDialogDescription>
          </AlertDialogHeader>

          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs text-left">
              <div className="flex flex-wrap gap-2">
                {errors.map((error, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-[10px] font-bold rounded border uppercase tracking-tight bg-red-50 text-red-600 border-red-100"
                  >
                    {error}
                  </span>
                ))}
              </div>
            </div>
          )}

          <AlertDialogFooter className="flex sm:flex-row sm:justify-center gap-3 w-full sm:space-x-0">
            <AlertDialogAction 
              onClick={onClose}
              variant="default"
              className="flex-1 text-white text-sm font-bold rounded-lg"
            >
              Fix Errors
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
};

export default ValidationAlert;
