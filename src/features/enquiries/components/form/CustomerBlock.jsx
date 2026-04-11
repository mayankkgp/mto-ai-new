import React from 'react';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_CUSTOMERS } from '@/mockData.js';

const CustomerBlock = ({ formData, setFormData, isCreating, isReadOnly }) => {
  const [isExpanded, setIsExpanded] = React.useState(isCreating);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-0">
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
            "w-full",
            !formData.customer.name && "border-red-500 bg-red-50"
          )}
          value={formData.customer.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          disabled={isReadOnly}
          list="customers"
        />
        <datalist id="customers">
          {MOCK_CUSTOMERS.map(c => (
            <option key={c.id} value={c.name} />
          ))}
        </datalist>
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
