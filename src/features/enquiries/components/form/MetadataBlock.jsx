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
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Type
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
            className="h-full px-2 text-[10px] font-bold uppercase tracking-wide rounded-sm transition-all data-[state=on]:bg-[#1E40AF] data-[state=on]:text-white data-[state=on]:shadow-sm data-[state=off]:text-gray-500 hover:data-[state=off]:bg-gray-100 flex-1"
          >
            MTO
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="Ready" 
            className="h-full px-2 text-[10px] font-bold uppercase tracking-wide rounded-sm transition-all data-[state=on]:bg-[#1E40AF] data-[state=on]:text-white data-[state=on]:shadow-sm data-[state=off]:text-gray-500 hover:data-[state=off]:bg-gray-100 flex-1"
          >
            Ready
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Date
        </Label>
        <Input 
          type="date"
          className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus:border-primary focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed tracking-tight [&::-webkit-calendar-picker-indicator]:hidden"
          value={formData.leadDate || ''}
          onChange={(e) => handleChange('leadDate', e.target.value)}
          disabled={isReadOnly}
        />
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Channel
        </Label>
        <Select 
          value={formData.channel} 
          onValueChange={(val) => handleChange('channel', val)}
          disabled={isReadOnly}
        >
          <SelectTrigger className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus:border-primary focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed tracking-tight">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Direct" className="text-[11px]">Direct</SelectItem>
            <SelectItem value="Referral" className="text-[11px]">Referral</SelectItem>
            <SelectItem value="Web" className="text-[11px]">Web</SelectItem>
            <SelectItem value="Agent" className="text-[11px]">Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MetadataBlock;
