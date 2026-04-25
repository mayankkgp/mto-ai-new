import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { Input } from '@/components/ui/input.jsx';
import FormField from '@/components/ui/form-field.jsx';
import { cn } from '@/lib/utils.js';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CustomerBlock = ({ isCreating, isReadOnly }) => {
  const { register, setValue, watch } = useFormContext();
  const { customers } = useReferenceData();
  const [isExpanded, setIsExpanded] = React.useState(isCreating);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  const customerName = watch('customer.name') || '';

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerName.toLowerCase())
  );

  return (
    <div ref={containerRef}>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-normal">
            Customer Identification
          </span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        <div className="relative w-full">
          <FormField name="customer.name" label="Customer Name" isRequired>
            <Input 
              size="micro"
              className="font-semibold"
              {...(() => {
                const { onChange, ...rest } = register('customer.name');
                return {
                  ...rest,
                  onChange: (e) => {
                    onChange(e);
                    handleCustomerNameChange(e.target.value);
                  }
                };
              })()}
              onFocus={() => setIsOpen(true)}
              disabled={isReadOnly}
            />
          </FormField>
          
          {isOpen && filteredCustomers.length > 0 && (
            <div className="absolute z-50 w-full bg-popover border rounded-md shadow-md max-h-48 overflow-y-auto mt-1">
              {filteredCustomers.map(customer => (
                <div
                  key={customer.id}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setValue('customer.name', customer.name);
                    setValue('customer.poc', customer.poc);
                    setValue('customer.city', customer.city);
                    setValue('customer.contact', customer.contact);
                    setIsOpen(false);
                  }}
                  className="px-2 py-1.5 text-[11px] cursor-pointer hover:bg-accent"
                >
                  {customer.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
                    {...register('customer.poc')}
                    disabled={isReadOnly}
                  />
                </FormField>
              </div>
              <FormField name="customer.city" label="City" isRequired>
                <Input 
                  size="micro"
                  {...register('customer.city')}
                  disabled={isReadOnly}
                />
              </FormField>
              <FormField name="customer.contact" label="Contact" isRequired>
                <Input 
                  size="micro"
                  {...register('customer.contact')}
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
