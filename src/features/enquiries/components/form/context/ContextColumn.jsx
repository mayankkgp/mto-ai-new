import React from 'react';
import { useFormContext } from 'react-hook-form';
import CustomerBlock from './CustomerBlock.jsx';
import LeadBlock from './LeadBlock.jsx';
import MetadataBlock from './MetadataBlock.jsx';
import AttachmentTray from './AttachmentTray.jsx';
import CommercialsBlock from './CommercialsBlock.jsx';
import RolesBlock from './RolesBlock.jsx';
import { useUIState } from '@/contexts/UIStateContext.jsx';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';

const ContextColumn = ({ isCreating, isReadOnly }) => {
  const { watch, setValue, getValues } = useFormContext();
  const { uploadProgress } = useUIState();
  const { handleFileUpload, handleFileDelete } = useEnquiryDetail();

  const attachments = watch('attachments') || [];

  const onUploadAction = async (files) => {
    for (const file of files) {
      const uploadedFile = await handleFileUpload(file);
      if (uploadedFile) {
        const currentAttachments = getValues('attachments') || [];
        setValue('attachments', [...currentAttachments, uploadedFile], { shouldDirty: true });
      }
    }
  };

  const onDeleteAction = async (id) => {
    const success = await handleFileDelete(id);
    if (success) {
      const currentAttachments = getValues('attachments') || [];
      setValue('attachments', currentAttachments.filter(f => f.id !== id), { shouldDirty: true });
    }
  };

  return (
    <div className="flex flex-col gap-1.5 min-[height:801px]:gap-3">
      <CustomerBlock 
        isCreating={isCreating} 
        isReadOnly={isReadOnly} 
      />
      
      <LeadBlock 
        isCreating={isCreating} 
        isReadOnly={isReadOnly} 
      />
      
      <MetadataBlock 
        isReadOnly={isReadOnly} 
      />
      
      <AttachmentTray 
        files={attachments}
        onUploadAction={onUploadAction}
        onDeleteAction={onDeleteAction}
        uploadProgress={uploadProgress}
        isReadOnly={isReadOnly} 
      />
      
      <CommercialsBlock 
        isReadOnly={isReadOnly} 
      />
      
      <RolesBlock 
        isReadOnly={isReadOnly} 
      />
    </div>
  );
};

export default ContextColumn;
