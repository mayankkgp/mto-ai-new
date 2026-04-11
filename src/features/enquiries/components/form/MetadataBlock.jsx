import React from 'react';
import { format, parse, isValid } from 'date-fns';
import { Label } from '@/components/ui/label.jsx';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx';
import { cn } from '@/lib/utils.js';

const MetadataBlock = ({ formData, setFormData, isReadOnly }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const dateValue = formData.leadDate 
    ? parse(formData.leadDate, "dd-MM-yyyy", new Date()) 
    : null;

  const handleDateSelect = (date) => {
    if (date) {
      handleChange('leadDate', format(date, "dd-MM-yyyy"));
    }
  };

  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Type *
        </Label>
        <ToggleGroup 
          type="single" 
          value={formData.type} 
          onValueChange={(val) => val && handleChange('type', val)}
          disabled={isReadOnly}
          className="flex w-full h-[26px] gap-0 space-x-0 p-0.5 border border-gray-200 rounded bg-white focus-within:border-[#1E40AF]"
        >
          <ToggleGroupItem 
            value="MTO" 
            variant="mto"
            size="micro"
            className="flex-1"
          >
            MTO
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="Ready" 
            variant="mto"
            size="micro"
            className="flex-1"
          >
            Ready
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="mto-input"
              size="micro"
              disabled={isReadOnly}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.leadDate && "text-gray-500"
              )}
            >
              {formData.leadDate || "Select date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={isValid(dateValue) ? dateValue : undefined}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Channel
        </Label>
        <Select 
          value={formData.channel} 
          onValueChange={(val) => handleChange('channel', val)}
          disabled={isReadOnly}
        >
          <SelectTrigger size="micro" className="w-full tracking-tight">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={1}>
            <SelectItem value="Direct" className="text-[11px]">Direct</SelectItem>
            <SelectItem value="Website" className="text-[11px]">Website</SelectItem>
            <SelectItem value="WhatsApp" className="text-[11px]">WhatsApp</SelectItem>
            <SelectItem value="LinkedIn" className="text-[11px]">LinkedIn</SelectItem>
            <SelectItem value="Event" className="text-[11px]">Event</SelectItem>
            <SelectItem value="Others" className="text-[11px]">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MetadataBlock;
