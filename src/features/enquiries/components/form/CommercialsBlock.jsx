import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
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

const CommercialsBlock = ({ isReadOnly }) => {
  const { watch, setValue, control } = useFormContext();
  
  const orderValue = watch('commercials.orderValue') || 0;
  const probability = watch('commercials.probability') || 50;
  const expectedValue = Math.round(orderValue * (probability / 100));

  const [displayValue, setDisplayValue] = React.useState(
    formatIndianCurrency(orderValue)
  );

  React.useEffect(() => {
    setDisplayValue(formatIndianCurrency(orderValue));
  }, [orderValue]);

  const handleOrderValueChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = parseInt(rawValue, 10) || 0;
    setValue('commercials.orderValue', numericValue);
    setValue('commercials.expectedValue', Math.round(numericValue * (probability / 100)));
  };

  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Order Value (₹)
        </Label>
        <div className="relative">
          <Input 
            size="micro"
            className="w-full font-bold tracking-tight"
            value={displayValue}
            onChange={handleOrderValueChange}
            disabled={isReadOnly}
          />
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Prob (%)
        </Label>
        <Controller
          name="commercials.probability"
          control={control}
          render={({ field }) => (
            <Select 
              value={String(field.value || 50)} 
              onValueChange={(val) => {
                const prob = parseInt(val, 10);
                field.onChange(prob);
                setValue('commercials.expectedValue', Math.round(orderValue * (prob / 100)));
              }}
              disabled={isReadOnly}
            >
              <SelectTrigger size="micro" className="w-full tracking-tight">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={1}>
                {[10, 30, 50, 70, 90].map(p => (
                  <SelectItem key={p} value={String(p)} className="text-[11px]">{p}%</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Expected Value
        </Label>
        <div className="w-full px-1.5 h-[26px] flex items-center justify-end tracking-tight bg-gray-50 border border-gray-200 text-gray-800 rounded text-[11px] font-bold text-right">
          ₹ {formatIndianCurrency(expectedValue)}
        </div>
      </div>
    </div>
  );
};

export default CommercialsBlock;
