import React from 'react';
import { Label } from '@/components/ui/label.jsx';
import { Input } from '@/components/ui/input.jsx';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select.jsx';

/**
 * Formats a number in the Indian numbering system (e.g., 1,00,000)
 */
const formatIndianCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '';
  const x = num.toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
};

const CommercialsBlock = ({ formData, setFormData, isReadOnly }) => {
  const [displayValue, setDisplayValue] = React.useState(
    formatIndianCurrency(formData.commercials?.orderValue || 0)
  );

  React.useEffect(() => {
    setDisplayValue(formatIndianCurrency(formData.commercials?.orderValue || 0));
  }, [formData.commercials?.orderValue]);

  const handleOrderValueChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = parseInt(rawValue, 10) || 0;
    
    setFormData(prev => {
      const newOrderValue = numericValue;
      const probability = prev.commercials?.probability || 0;
      const newExpectedValue = Math.round(newOrderValue * (probability / 100));
      
      return {
        ...prev,
        commercials: {
          ...prev.commercials,
          orderValue: newOrderValue,
          expectedValue: newExpectedValue
        }
      };
    });
  };

  const handleProbabilityChange = (val) => {
    const probability = parseInt(val, 10);
    setFormData(prev => {
      const orderValue = prev.commercials?.orderValue || 0;
      const newExpectedValue = Math.round(orderValue * (probability / 100));
      
      return {
        ...prev,
        commercials: {
          ...prev.commercials,
          probability: probability,
          expectedValue: newExpectedValue
        }
      };
    });
  };

  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Order Value
        </Label>
        <div className="relative">
          <Input 
            className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus:border-primary focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed tracking-tight font-bold"
            value={displayValue}
            onChange={handleOrderValueChange}
            disabled={isReadOnly}
          />
        </div>
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Prob. (%)
        </Label>
        <Select 
          value={String(formData.commercials?.probability || 50)} 
          onValueChange={handleProbabilityChange}
          disabled={isReadOnly}
        >
          <SelectTrigger className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus:border-primary focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed tracking-tight">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 30, 50, 70, 90].map(p => (
              <SelectItem key={p} value={String(p)} className="text-[11px]">{p}%</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Exp. Value
        </Label>
        <div className="w-full px-1 h-[26px] flex items-center justify-end tracking-tight bg-gray-50 border border-gray-200 text-gray-800 rounded text-[11px] font-bold text-right">
          {formatIndianCurrency(formData.commercials?.expectedValue || 0)}
        </div>
      </div>
    </div>
  );
};

export default CommercialsBlock;
