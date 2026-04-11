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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';

const MetadataBlock = ({ formData, setFormData, isReadOnly }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
          className="flex h-[26px] items-center justify-center rounded bg-white p-0.5 border border-gray-200 transition-colors focus-within:border-primary focus-within:ring-0"
        >
          <ToggleGroupItem 
            value="MTO" 
            className="h-full px-2 text-[10px] font-bold uppercase tracking-wide rounded-sm transition-all data-[state=on]:bg-[#1E40AF] data-[state=on]:text-white data-[state=on]:shadow-sm data-[state=off]:text-gray-500 hover:data-[state=off]:bg-gray-200 border-gray-200 flex-1"
          >
            MTO
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="Ready" 
            className="h-full px-2 text-[10px] font-bold uppercase tracking-wide rounded-sm transition-all data-[state=on]:bg-[#1E40AF] data-[state=on]:text-white data-[state=on]:shadow-sm data-[state=off]:text-gray-500 hover:data-[state=off]:bg-gray-200 border-gray-200 flex-1"
          >
            Ready
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Date
        </Label>
        <Input 
          type="date"
          className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus-visible:ring-0 focus-visible:border-[#1E40AF] focus-visible:border disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-500 placeholder:text-gray-400 placeholder:font-normal tracking-tight"
          value={formData.leadDate || ''}
          onChange={(e) => handleChange('leadDate', e.target.value)}
          disabled={isReadOnly}
        />
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
          <SelectTrigger className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus-visible:ring-0 focus-visible:border-[#1E40AF] focus-visible:border disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-500 placeholder:text-gray-400 placeholder:font-normal tracking-tight">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent position="popper" sideOffset={0}>
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
