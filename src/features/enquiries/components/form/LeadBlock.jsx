import React, { useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label.jsx';
import { cn } from '@/lib/utils.js';

const LeadBlock = ({ isReadOnly }) => {
  const { register, watch, formState: { errors } } = useFormContext();
  const overviewRef = useRef(null);
  const detailsRef = useRef(null);

  const leadOverview = watch('leadOverview') || '';
  const leadDetails = watch('leadDetails') || '';

  useEffect(() => {
    if (overviewRef.current) {
      overviewRef.current.style.height = 'auto';
      overviewRef.current.style.height = overviewRef.current.scrollHeight + 'px';
    }
  }, [leadOverview]);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.style.height = 'auto';
      detailsRef.current.style.height = detailsRef.current.scrollHeight + 'px';
    }
  }, [leadDetails]);

  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const { ref: overviewRegisterRef, ...overviewRegisterRest } = register('leadOverview');
  const { ref: detailsRegisterRef, ...detailsRegisterRest } = register('leadDetails');

  return (
    <div className="space-y-1.5">
      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Overview *
        </Label>
        <textarea
          {...(() => {
            const { onChange, ...rest } = overviewRegisterRest;
            return {
              ...rest,
              onChange: (e) => {
                onChange(e);
                handleInput(e);
              }
            };
          })()}
          ref={(el) => {
            overviewRef.current = el;
            overviewRegisterRef(el);
          }}
          rows={1}
          className={cn(
            "w-full px-1.5 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 focus:border-[#1E40AF] rounded text-[11px] leading-tight outline-none focus:ring-0 resize-none max-h-[80px] overflow-y-auto placeholder:text-gray-400 placeholder:font-normal",
            errors.leadOverview && "border-red-500 bg-red-50"
          )}
          disabled={isReadOnly}
          placeholder="Brief overview of the lead..."
        />
      </div>

      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Details
        </Label>
        <textarea
          {...(() => {
            const { onChange, ...rest } = detailsRegisterRest;
            return {
              ...rest,
              onChange: (e) => {
                onChange(e);
                handleInput(e);
              }
            };
          })()}
          ref={(el) => {
            detailsRef.current = el;
            detailsRegisterRef(el);
          }}
          rows={1}
          className="w-full px-1.5 py-1 h-[26px] min-h-[26px] bg-white border border-gray-200 focus:border-[#1E40AF] rounded text-[11px] leading-tight outline-none focus:ring-0 resize-none max-h-[80px] overflow-y-auto placeholder:text-gray-400 placeholder:font-normal"
          disabled={isReadOnly}
          placeholder="Detailed requirements, specifications, etc..."
        />
      </div>
    </div>
  );
};

export default LeadBlock;
