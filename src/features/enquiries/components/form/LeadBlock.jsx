import React, { useRef } from 'react';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';

const LeadBlock = ({ formData, setFormData, isReadOnly }) => {
  const overviewRef = useRef(null);
  const detailsRef = useRef(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Overview *
        </Label>
        <textarea
          ref={overviewRef}
          rows={1}
          onInput={handleInput}
          className={cn(
            "w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus-visible:ring-0 focus-visible:border-[#1E40AF] focus-visible:border disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-500 placeholder:text-gray-400 placeholder:font-normal resize-none max-h-[80px] overflow-y-auto",
            !formData.leadOverview && "border-red-500 bg-red-50"
          )}
          value={formData.leadOverview || ''}
          onChange={(e) => handleChange('leadOverview', e.target.value)}
          disabled={isReadOnly}
          placeholder="Brief overview of the lead..."
        />
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Details
        </Label>
        <textarea
          ref={detailsRef}
          rows={1}
          onInput={handleInput}
          className="w-full px-1 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 rounded text-[11px] outline-none focus-visible:ring-0 focus-visible:border-[#1E40AF] focus-visible:border disabled:bg-gray-50 disabled:opacity-100 disabled:text-gray-500 placeholder:text-gray-400 placeholder:font-normal resize-none max-h-[80px] overflow-y-auto"
          value={formData.leadDetails || ''}
          onChange={(e) => handleChange('leadDetails', e.target.value)}
          disabled={isReadOnly}
          placeholder="Detailed requirements, specifications, etc..."
        />
      </div>
    </div>
  );
};

export default LeadBlock;
