import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';

const LeadBlock = ({ formData, setFormData, isReadOnly }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Overview *
        </Label>
        <TextareaAutosize
          className={cn(
            "w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus:border-primary focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed resize-none max-h-[80px] overflow-y-auto",
            !formData.leadOverview && "border-red-500 bg-red-50"
          )}
          value={formData.leadOverview || ''}
          onChange={(e) => handleChange('leadOverview', e.target.value)}
          disabled={isReadOnly}
          placeholder="Brief summary of the lead..."
        />
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Details
        </Label>
        <TextareaAutosize
          className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus:border-primary focus:ring-0 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed resize-none max-h-[80px] overflow-y-auto"
          value={formData.leadDetails || ''}
          onChange={(e) => handleChange('leadDetails', e.target.value)}
          disabled={isReadOnly}
          placeholder="Detailed requirements and context..."
          minRows={2}
        />
      </div>
    </div>
  );
};

export default LeadBlock;
