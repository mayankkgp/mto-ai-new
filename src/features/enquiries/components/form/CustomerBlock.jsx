import React from 'react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_CUSTOMERS } from '@/mockData.js';

const CustomerBlock = ({ formData, setFormData, isCreating, isReadOnly }) => {
  const [isExpanded, setIsExpanded] = React.useState(isCreating);
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  const handleCustomerNameChange = (value) => {
    const matchedCustomer = MOCK_CUSTOMERS.find(
      c => c.name.toLowerCase() === value.toLowerCase()
    );

    if (matchedCustomer) {
      setFormData(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          ...matchedCustomer
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        customer: {
          ...prev.customer,
          name: value,
          poc: '' // Clear POC for new free-text entries
        }
      }));
    }
  };

  const filteredCustomers = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes((formData.customer.name || '').toLowerCase())
  );

  return (
    <div className="space-y-0" ref={containerRef}>
      <div className="flex items-center justify-between mb-0.5 h-[18px]">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Customer Name *
        </Label>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-primary transition-colors"
        >
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <div className="relative w-full">
        <Input 
          size="micro"
          className={cn(
            "w-full font-semibold",
            !formData.customer.name && "border-red-500 bg-red-50"
          )}
          value={formData.customer.name || ''}
          onChange={(e) => handleCustomerNameChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          disabled={isReadOnly}
        />
        
        {isOpen && filteredCustomers.length > 0 && (
          <div className="absolute z-50 w-full bg-popover border rounded-md shadow-md max-h-48 overflow-y-auto">
            {filteredCustomers.map(customer => (
              <div
                key={customer.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    customer: {
                      ...prev.customer,
                      ...customer
                    }
                  }));
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
                <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">
                  POC Name *
                </Label>
                <Input 
                  size="micro"
                  className="w-full"
                  value={formData.customer.poc || ''}
                  onChange={(e) => handleChange('poc', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">
                  City *
                </Label>
                <Input 
                  size="micro"
                  className="w-full"
                  value={formData.customer.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
              <div>
                <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">
                  Contact *
                </Label>
                <Input 
                  size="micro"
                  className="w-full"
                  value={formData.customer.contact || ''}
                  onChange={(e) => handleChange('contact', e.target.value)}
                  disabled={isReadOnly}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerBlock;
