import React from 'react';
import CustomerBlock from './CustomerBlock.jsx';
import LeadBlock from './LeadBlock.jsx';
import MetadataBlock from './MetadataBlock.jsx';
import AttachmentTray from './AttachmentTray.jsx';
import CommercialsBlock from './CommercialsBlock.jsx';
import RolesBlock from './RolesBlock.jsx';

const ContextColumn = ({ formData, setFormData, isCreating, isReadOnly }) => {
  return (
    <div className="flex flex-col gap-1.5 min-[height:801px]:gap-3">
      <CustomerBlock 
        formData={formData} 
        setFormData={setFormData} 
        isCreating={isCreating} 
        isReadOnly={isReadOnly} 
      />
      
      <LeadBlock 
        formData={formData} 
        setFormData={setFormData} 
        isCreating={isCreating} 
        isReadOnly={isReadOnly} 
      />
      
      <MetadataBlock 
        formData={formData} 
        setFormData={setFormData} 
        isReadOnly={isReadOnly} 
      />
      
      <AttachmentTray 
        formData={formData} 
        setFormData={setFormData} 
        isReadOnly={isReadOnly} 
      />
      
      <CommercialsBlock 
        formData={formData} 
        setFormData={setFormData} 
        isReadOnly={isReadOnly} 
      />
      
      <RolesBlock 
        formData={formData} 
        setFormData={setFormData} 
        isReadOnly={isReadOnly} 
      />
    </div>
  );
};

export default ContextColumn;
