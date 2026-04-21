import React from 'react';
import CustomerBlock from './CustomerBlock.jsx';
import LeadBlock from './LeadBlock.jsx';
import MetadataBlock from './MetadataBlock.jsx';
import AttachmentTray from './AttachmentTray.jsx';
import CommercialsBlock from './CommercialsBlock.jsx';
import RolesBlock from './RolesBlock.jsx';

const ContextColumn = ({ isCreating, isReadOnly }) => {
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
