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
          className="w-full"
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
        <Input 
          type="date"
          size="micro"
          className="w-full tracking-tight"
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
