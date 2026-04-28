import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import MultiSelect from '@/components/ui/multi-select.jsx';
import FormField from '@/components/ui/form-field.jsx';
import { UserPlus } from 'lucide-react';

/**
 * RolesBlock Component
 * Handles selection of Revenue and Supply users for the enquiry.
 */
const RolesBlock = ({ isReadOnly }) => {
  const { watch, setValue } = useFormContext();
  const { users } = useReferenceData();
  
  const revenueRoles = watch('roles.revenue') || [];
  const supplyRoles = watch('roles.supply') || [];

  // Format options for MultiSelect
  const revOptions = useMemo(() => 
    users.filter(u => u.department === 'Revenue' || u.department === 'Admin')
         .map(u => ({ label: u.name, value: u.id })),
  [users]);

  const supOptions = useMemo(() => 
    users.filter(u => u.department === 'Supply' || u.department === 'Admin')
         .map(u => ({ label: u.name, value: u.id })),
  [users]);

  const toggleUser = (role, userId) => {
    const currentUsers = role === 'revenue' ? revenueRoles : supplyRoles;
    const exists = currentUsers.some(u => u.id === userId);
    
    if (exists) {
      const newUsers = currentUsers.filter(u => u.id !== userId);
      setValue(`roles.${role}`, newUsers, { shouldValidate: true });
    } else {
      const user = users.find(u => u.id === userId);
      if (user) {
        const newUsers = [...currentUsers, { id: user.id, name: user.name }];
        setValue(`roles.${role}`, newUsers, { shouldValidate: true });
      }
    }
  };

  return (
    <div className="grid grid-cols-2 gap-1.5">
      <FormField name="roles.revenue" label="Revenue Role" isRequired>
        <MultiSelect 
          options={revOptions}
          selectedValues={revenueRoles.map(u => u.id)} 
          onChange={(val) => toggleUser('revenue', val)}
          isReadOnly={isReadOnly}
          icon={UserPlus}
          placeholder="Search user..."
        />
      </FormField>

      <FormField name="roles.supply" label="Supply Role">
        <MultiSelect 
          options={supOptions}
          selectedValues={supplyRoles.map(u => u.id)} 
          onChange={(val) => toggleUser('supply', val)}
          isReadOnly={isReadOnly}
          icon={UserPlus}
          placeholder="Search user..."
        />
      </FormField>
    </div>
  );
};

export default RolesBlock;
