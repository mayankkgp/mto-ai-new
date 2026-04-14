import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog.jsx';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils.js';

const ValidationAlert = ({ isOpen, onClose, errors, onDiscard, showDiscardOption }) => {
  const hasUnsubmittedTask = errors.includes("Unsubmitted Task");

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md p-6 text-center bg-white rounded-xl shadow-2xl border-0">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100 text-red-600">
          <AlertCircle size={24} />
        </div>
          
        <AlertDialogHeader className="space-y-0">
          <AlertDialogTitle className="text-lg font-bold text-gray-900 flex justify-center mb-2">
            Missing Required Fields
          </AlertDialogTitle>
        </AlertDialogHeader>

        {hasUnsubmittedTask && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs text-left">
            <p className="font-bold mb-1">⚠️ Unsubmitted Task</p>
            <p>You need to submit or clear the task in the right pane.</p>
          </div>
        )}

        <div className="mb-6">
          <AlertDialogDescription className="text-sm text-gray-500 mb-2">
            Please fill in all mandatory fields before saving or navigating:
          </AlertDialogDescription>

          <div className="flex flex-wrap gap-2 justify-center">
            {errors.map((error, index) => (
              <span 
                key={index} 
                className={cn(
                  "px-2 py-1 text-[10px] font-bold rounded border uppercase tracking-tight",
                  error === "Unsubmitted Task" 
                    ? "bg-amber-50 text-amber-600 border-amber-100"
                    : "bg-red-50 text-red-600 border-red-100"
                )}
              >
                {error}
              </span>
            ))}
          </div>
        </div>

        <AlertDialogFooter className="flex sm:flex-row sm:justify-center gap-3 w-full sm:space-x-0">
          {showDiscardOption && (
            <AlertDialogCancel 
              onClick={onDiscard}
              className="flex-1 mt-0 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg border-0"
            >
              Discard Changes
            </AlertDialogCancel>
          )}
          <AlertDialogAction 
            onClick={onClose}
            variant="default"
            className={cn(
              "text-white text-sm font-bold rounded-lg",
              showDiscardOption ? "flex-1" : "w-full"
            )}
          >
            Fix Errors
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ValidationAlert;
