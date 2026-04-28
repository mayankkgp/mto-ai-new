import React, { useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
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
      <div className="flex flex-col gap-0.5">
        <Label variant="micro">
          Lead Overview *
        </Label>
        <Textarea
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
          size="micro"
          className={cn(
            "w-full",
            errors.leadOverview && "border-red-500 bg-red-50"
          )}
          disabled={isReadOnly}
          placeholder="Brief overview of the lead..."
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label variant="micro">
          Lead Details
        </Label>
        <Textarea
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
          size="micro"
          className="w-full"
          disabled={isReadOnly}
          placeholder="Detailed requirements, specifications, etc..."
        />
      </div>
    </div>
  );
};

export default LeadBlock;
