import React, { useRef, useEffect } from 'react';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';

const LeadBlock = ({ formData, setFormData, isReadOnly }) => {
  const overviewRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (overviewRef.current) {
      overviewRef.current.style.height = 'auto';
      overviewRef.current.style.height = overviewRef.current.scrollHeight + 'px';
    }
    if (detailsRef.current) {
      detailsRef.current.style.height = 'auto';
      detailsRef.current.style.height = detailsRef.current.scrollHeight + 'px';
    }
  }, [formData.leadOverview, formData.leadDetails]);

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
    <div className="space-y-1.5">
      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Overview *
        </Label>
        <textarea
          ref={overviewRef}
          rows={1}
          onInput={handleInput}
          className={cn(
            "w-full px-1.5 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 focus:border-[#1E40AF] rounded text-[11px] leading-tight outline-none focus:ring-0 resize-none max-h-[80px] overflow-y-auto placeholder:text-gray-400 placeholder:font-normal",
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
          className="w-full px-1.5 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 focus:border-[#1E40AF] rounded text-[11px] leading-tight outline-none focus:ring-0 resize-none max-h-[80px] overflow-y-auto placeholder:text-gray-400 placeholder:font-normal"
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
