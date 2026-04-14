import React, { useState } from 'react';
import { X, Save, CheckCircle2, Ban, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { getUserInitials } from '@/utils/formatters.js';
import { cn } from '@/lib/utils.js';
import SystemModal from '@/components/ui/system-modal.jsx';
import ValidationAlert from '@/components/ui/validation-alert.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';

/**
 * DetailHeader Component
 * The top sticky bar for the Enquiry Detail Pane.
 * Implements Identity Group, Status Badge, and Action Group.
 */
const DetailHeader = ({ enquiry, onClose, onSave, onConvert, onDrop, onReopen }) => {
  const [isDropModalOpen, setIsDropModalOpen] = useState(false);
  const [dropReason, setDropReason] = useState("");
  const [isValidationAlertOpen, setIsValidationAlertOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [pendingAction, setPendingAction] = useState(null);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isReopenModalOpen, setIsReopenModalOpen] = useState(false);

  const runValidation = () => {
    const errors = [];
    if (!enquiry.customer?.name || enquiry.customer.name.trim() === "") {
      errors.push("Customer Name");
    }
    if (!enquiry.customer?.poc || enquiry.customer.poc.trim() === "") {
      errors.push("POC Name");
    }
    if (!enquiry.customer?.city || enquiry.customer.city.trim() === "") {
      errors.push("City");
    }
    if (!enquiry.customer?.contact || enquiry.customer.contact.trim() === "") {
      errors.push("Contact");
    }
    if (!enquiry.leadOverview || enquiry.leadOverview.trim() === "") {
      errors.push("Lead Overview");
    }
    if (!enquiry.type || enquiry.type.trim() === "") {
      errors.push("Enquiry Type");
    }
    if (!enquiry.roles?.revenue || enquiry.roles.revenue.length === 0) {
      errors.push("Revenue Role");
    }
    return errors;
  };

  const handleSaveClick = () => {
    const errors = runValidation();
    
    if (errors.length > 0) {
      setPendingAction('save');
      setValidationErrors(errors);
      setIsValidationAlertOpen(true);
    } else {
      onSave();
    }
  };

  const handleCloseClick = () => {
    const errors = runValidation();

    if (errors.length > 0) {
      setPendingAction('close');
      setValidationErrors(errors);
      setIsValidationAlertOpen(true);
    } else {
      onClose();
    }
  };

  const handleConvertClick = () => {
    const errors = runValidation();
    if (errors.length > 0) {
      setPendingAction('convert');
      setValidationErrors(errors);
      setIsValidationAlertOpen(true);
    } else {
      setIsConvertModalOpen(true);
    }
  };

  if (!enquiry) return null;

  const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id) || []);
  const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id) || []);

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      case 'Converted':
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
      case 'Dropped':
        return 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <header className="bg-gray-50 border-b border-gray-200 flex items-center justify-between shrink-0 sticky top-0 z-50 h-header-fluid px-nav-fluid py-nav-fluid">
      {/* 1. Left Group (Identity, Status & Avatars) */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-tight">
          {enquiry.id}
        </h2>
        
        <Badge className={cn(
          "px-2 py-0.5 rounded text-[10px] font-bold uppercase border shadow-none",
          getStatusClasses(enquiry.status)
        )}>
          {enquiry.status}
        </Badge>

        <div className="hidden sm:flex items-center gap-2 border-l border-gray-300 pl-3 shrink-0">
          {/* Revenue Avatars */}
          <div className="flex gap-1">
            {revInitials?.map((initials, idx) => (
              <div 
                key={`rev-${idx}`}
                className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center text-[9px] font-bold z-10 relative"
              >
                {initials}
              </div>
            ))}
          </div>

          <div className="w-px h-4 bg-[#E5E7EB] mx-1" />

          {/* Supply Avatars */}
          <div className="flex gap-1">
            {supInitials?.map((initials, idx) => (
              <div 
                key={`sup-${idx}`}
                className="w-5 h-5 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center text-[9px] font-bold z-10 relative"
              >
                {initials}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Right Group (Actions) */}
      <div className="flex items-center gap-2">
        {(enquiry.status === 'Converted' || enquiry.status === 'Dropped') ? (
          <Button 
            onClick={() => setIsReopenModalOpen(true)}
            className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white border-none"
          >
            <RotateCcw size={14} />
            <span>RE-OPEN</span>
          </Button>
        ) : (
          <>
            {enquiry.status === 'Active' && (
              <>
                <Button 
                  onClick={handleConvertClick}
                  className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-[#111827] hover:bg-[#111827]/90 text-white border-none"
                >
                  <CheckCircle2 size={14} />
                  <span>CONVERT</span>
                </Button>

                <Button 
                  onClick={() => setIsDropModalOpen(true)}
                  variant="ghost"
                  className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border-none"
                >
                  <Ban size={14} />
                  <span>DROP</span>
                </Button>
              </>
            )}

            <div className="w-px h-6 bg-gray-200 mx-1" />

            <Button 
              onClick={handleSaveClick}
              className="px-3 py-1.5 h-auto text-[11px] font-bold rounded flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white border-none"
            >
              <Save size={14} />
              <span>SAVE</span>
            </Button>
          </>
        )}

        <Button 
          onClick={handleCloseClick}
          variant="ghost"
          size="icon"
          className="p-1.5 h-auto w-auto rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
        >
          <X size={18} />
        </Button>

        <SystemModal
          isOpen={isDropModalOpen}
          onClose={() => {
            setIsDropModalOpen(false);
            setDropReason("");
          }}
          title="Drop Enquiry"
          variant="danger"
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsDropModalOpen(false);
                  setDropReason("");
                }}
                className="text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  console.log("Drop reason:", dropReason);
                  onDrop(dropReason);
                  setIsDropModalOpen(false);
                  setDropReason("");
                }}
                disabled={!dropReason.trim()}
                className="text-xs font-bold rounded-lg"
              >
                Drop Enquiry
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-xs text-gray-600 font-medium">
              Dropping an enquiry is a permanent action. Please provide a reason below.
            </p>
            <Textarea
              value={dropReason}
              onChange={(e) => setDropReason(e.target.value)}
              className="w-full min-h-[80px] bg-gray-50 border-gray-200 rounded-lg text-xs resize-none focus-visible:ring-1 focus-visible:ring-primary"
              placeholder="Enter reason for dropping..."
            />
          </div>
        </SystemModal>

        <ValidationAlert
          isOpen={isValidationAlertOpen}
          onClose={() => setIsValidationAlertOpen(false)}
          errors={validationErrors}
          showDiscardOption={pendingAction === 'close'}
          onDiscard={() => { setIsValidationAlertOpen(false); onClose(); }}
        />

        <SystemModal
          isOpen={isConvertModalOpen}
          onClose={() => setIsConvertModalOpen(false)}
          title="Convert Enquiry"
          variant="default"
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => setIsConvertModalOpen(false)}
                className="text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsConvertModalOpen(false);
                  onConvert();
                }}
                className="text-xs font-bold rounded-lg bg-primary hover:bg-primary/90 text-white"
              >
                Convert
              </Button>
            </>
          }
        >
          <p className="text-xs text-gray-600 font-medium">
            Are you sure you want to convert this enquiry? This action will mark the enquiry as converted and cannot be undone.
          </p>
        </SystemModal>

        <SystemModal
          isOpen={isReopenModalOpen}
          onClose={() => setIsReopenModalOpen(false)}
          title="Re-open Enquiry"
          variant="default"
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => setIsReopenModalOpen(false)}
                className="text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsReopenModalOpen(false);
                  onReopen();
                }}
                className="text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Confirm Re-open
              </Button>
            </>
          }
        >
          <p className="text-xs text-gray-600 font-medium">
            Are you sure you want to re-open this item? This will restore all editing capabilities and move it back to the active list.
          </p>
        </SystemModal>
      </div>
    </header>
  );
};

export default DetailHeader;
