import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Combobox } from '@/components/ui/combobox.jsx';
import FormField from '@/components/ui/form-field.jsx';
import { cn } from '@/lib/utils.js';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CustomerBlock = ({ isCreating, isReadOnly }) => {
  const { setValue, watch } = useFormContext();
  const { customers } = useReferenceData();
  const [isExpanded, setIsExpanded] = React.useState(isCreating);

  const customerName = watch('customer.name') || '';

  const handleCustomerNameChange = (value) => {
    setValue('customer.name', value);
    const matchedCustomer = customers.find(
      c => c.name.toLowerCase() === value.toLowerCase()
    );

    if (matchedCustomer) {
      setValue('customer.poc', matchedCustomer.poc);
      setValue('customer.city', matchedCustomer.city);
      setValue('customer.contact', matchedCustomer.contact);
    } else {
      setValue('customer.poc', ''); // Clear POC for new free-text entries
    }
  };

  const handleCustomerSelect = (customer) => {
    setValue('customer.name', customer.name);
    setValue('customer.poc', customer.poc);
    setValue('customer.city', customer.city);
    setValue('customer.contact', customer.contact);
  };

  return (
    <div>
      <FormField 
        name="customer.name" 
        label="Customer Name" 
        isRequired 
        action={
          <button 
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-primary transition-colors pr-1"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        }
      >
        <Combobox
          value={customerName}
          onChange={handleCustomerNameChange}
          onSelect={handleCustomerSelect}
          options={customers}
          disabled={isReadOnly}
        />
      </FormField>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={cn(
              "grid gap-1.5 mt-1.5",
              isCreating ? "grid-cols-2 @[500px]:grid-cols-3" : "grid-cols-1 @[500px]:grid-cols-2"
            )}>
              <div className={cn(isCreating ? "" : "col-span-2")}>
                <FormField name="customer.poc" label="POC Name" isRequired>
                  <Input 
                    size="micro"
                    value={watch('customer.poc') || ''}
                    onChange={(e) => setValue('customer.poc', e.target.value)}
                    disabled={isReadOnly}
                  />
                </FormField>
              </div>
              <FormField name="customer.city" label="City" isRequired>
                <Input 
                  size="micro"
                  value={watch('customer.city') || ''}
                  onChange={(e) => setValue('customer.city', e.target.value)}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField name="customer.contact" label="Contact" isRequired>
                <Input 
                  size="micro"
                  value={watch('customer.contact') || ''}
                  onChange={(e) => setValue('customer.contact', e.target.value)}
                  disabled={isReadOnly}
                />
              </FormField>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerBlock;
