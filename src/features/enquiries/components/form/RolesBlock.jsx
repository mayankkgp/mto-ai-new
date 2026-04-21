import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import MultiSelect from '@/components/ui/multi-select.jsx';

const RolesBlock = ({ isReadOnly }) => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const { users } = useReferenceData();
  
  const revenueRoles = watch('roles.revenue') || [];
  const supplyRoles = watch('roles.supply') || [];

  const toggleUser = (role, user) => {
    const currentUsers = role === 'revenue' ? revenueRoles : supplyRoles;
    const exists = currentUsers.some(u => u.id === user.id);
    
    const newUsers = exists 
      ? currentUsers.filter(u => u.id !== user.id)
      : [...currentUsers, user];
      
    setValue(`roles.${role}`, newUsers, { shouldValidate: true });
  };

  return (
    <div className="grid grid-cols-2 gap-1.5">
      <MultiSelect 
        label="Revenue Role *" 
        selectedUsers={revenueRoles} 
        onToggle={(user) => toggleUser('revenue', user)}
        isReadOnly={isReadOnly}
        hasError={!!errors.roles?.revenue}
        users={users}
      />
      <MultiSelect 
        label="Supply Role" 
        selectedUsers={supplyRoles} 
        onToggle={(user) => toggleUser('supply', user)}
        isReadOnly={isReadOnly}
        users={users}
      />
    </div>
  );
};

export default RolesBlock;
