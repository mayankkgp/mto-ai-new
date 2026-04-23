import React, { useState } from 'react';
import { X, Save, CheckCircle2, Ban, RotateCcw, Loader2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useModals } from '@/contexts/ModalContext.jsx';
import { ENQUIRY_STATUS } from '@/constants/enquiryConstants.js';
import { getUserInitials } from '@/utils/formatters.js';
import { cn } from '@/lib/utils.js';
import PaneHeader from '@/components/ui/pane-header.jsx';
import { toast } from 'sonner';

/**
 * DetailHeader Component
 * The top sticky bar for the Enquiry Detail Pane.
 * Implements Identity Group, Status Badge, and Action Group.
 */
const DetailHeader = ({ enquiry, onClose, onSave, onConvert, onDrop, onReopen }) => {
  const { users } = useReferenceData();
  const { isActionLoading } = useUIState();
  const { openModal, closeModal } = useModals();
  const [activeLoading, setActiveLoading] = useState(null);

  const { handleSubmit } = useFormContext();

  // Reset activeLoading when global loading finishes
  React.useEffect(() => {
    if (!isActionLoading) {
      setActiveLoading(null);
    }
  }, [isActionLoading]);

  const onValidationFailed = (errors) => {
    const fields = getErrorFields(errors);
    if (fields.length === 0 && Object.keys(errors).length > 0) {
      const unmappedKeys = Object.keys(errors);
      fields.push(...unmappedKeys.map(k => `Field: ${k}`));
    }

    toast.error("Validation Failed", { 
      id: 'validation-toast',
      description: "Missing fields: " + fields.join(", ") 
    });
  };

  const handleSaveClick = handleSubmit(() => {
    setActiveLoading('save');
    onSave();
  }, onValidationFailed);

  const handleCloseClick = () => {
    onClose();
  };

  const handleConvertClick = handleSubmit(() => {
    openModal('CONVERT_ENQUIRY', { 
      onConfirm: () => { 
        setActiveLoading('convert');
        onConvert(); 
        closeModal(); 
      } 
    });
  }, onValidationFailed);

  const handleDropClick = handleSubmit(() => {
    openModal('DROP_ENQUIRY', { 
      onConfirm: (reason) => { 
        setActiveLoading('drop');
        onDrop(reason); 
        closeModal(); 
      } 
    });
  }, onValidationFailed);

  if (!enquiry) return null;

  const revInitials = getUserInitials(enquiry.roles?.revenue?.map(r => r.id) || [], users);
  const supInitials = getUserInitials(enquiry.roles?.supply?.map(r => r.id) || [], users);

  const getStatusClasses = (status) => {
    switch (status) {
      case ENQUIRY_STATUS.ACTIVE:
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      case ENQUIRY_STATUS.CONVERTED:
        return 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]';
      case ENQUIRY_STATUS.DROPPED:
        return 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getErrorFields = (errors) => {
    const fields = [];
    if (errors.customer?.name) fields.push("Customer Name");
    if (errors.customer?.poc) fields.push("POC Name");
    if (errors.customer?.city) fields.push("City");
    if (errors.customer?.contact) fields.push("Contact");
    if (errors.leadOverview) fields.push("Lead Overview");
    if (errors.type) fields.push("Enquiry Type");
    if (errors.roles?.revenue) fields.push("Revenue Role");
    if (errors.roles?.supply) fields.push("Supply Role");
    if (errors.commercials) fields.push("Commercials (Numerical Values)");
    if (errors.leadDate) fields.push("Lead Date");
    if (errors.channel) fields.push("Channel");
    return fields;
  };

  return (
    <PaneHeader variant="detail-header-split" className="flex items-center justify-between sticky top-0 z-50">
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
        {(enquiry.status === ENQUIRY_STATUS.CONVERTED || enquiry.status === ENQUIRY_STATUS.DROPPED) ? (
          <Button 
            variant="secondary"
            onClick={() => openModal('REOPEN_ENQUIRY', { 
              onConfirm: () => { 
                setActiveLoading('reopen');
                onReopen(); 
                closeModal(); 
              } 
            })}
            disabled={isActionLoading}
            className="gap-1.5"
          >
            {isActionLoading && activeLoading === 'reopen' ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
            <span>{isActionLoading && activeLoading === 'reopen' ? 'RE-OPENING...' : 'RE-OPEN'}</span>
          </Button>
        ) : (
          <>
            {enquiry.status === ENQUIRY_STATUS.ACTIVE && (
              <>
                <Button 
                  variant="secondary"
                  onClick={handleConvertClick}
                  disabled={isActionLoading}
                  className="gap-1.5"
                >
                  {isActionLoading && activeLoading === 'convert' ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                  <span>{isActionLoading && activeLoading === 'convert' ? 'CONVERTING...' : 'CONVERT'}</span>
                </Button>

                <Button 
                  variant="destructive"
                  onClick={handleDropClick}
                  disabled={isActionLoading}
                  className="gap-1.5"
                >
                  {isActionLoading && activeLoading === 'drop' ? <Loader2 size={14} className="animate-spin" /> : <Ban size={14} />}
                  <span>{isActionLoading && activeLoading === 'drop' ? 'DROPPING...' : 'DROP'}</span>
                </Button>
              </>
            )}

            <div className="w-px h-6 bg-gray-200 mx-1" />

            <Button 
              onClick={handleSaveClick}
              disabled={isActionLoading}
              className="gap-1.5"
            >
              {isActionLoading && activeLoading === 'save' ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{isActionLoading && activeLoading === 'save' ? 'SAVING...' : 'SAVE'}</span>
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
      </div>
    </PaneHeader>
  );
};

export default DetailHeader;
