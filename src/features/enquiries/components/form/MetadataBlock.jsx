import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { Label } from '@/components/ui/label.jsx';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { Input } from '@/components/ui/input.jsx';
import { cn } from '@/lib/utils.js';

const MetadataBlock = ({ isReadOnly }) => {
  const { control, formState: { errors } } = useFormContext();
  const { channels } = useReferenceData();

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-start">
      <div className="space-y-0.5">
        <Label variant="micro" className="mb-0.5">
          Type *
        </Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <ToggleGroup 
              type="single" 
              value={field.value} 
              onValueChange={(val) => val && field.onChange(val)}
              disabled={isReadOnly}
              size="micro"
              className={cn(
                "flex w-full h-[26px] gap-0 space-x-0 p-0.5 border border-gray-200 rounded bg-white focus-within:border-[#1E40AF]",
                errors.type && "border-red-500 bg-red-50"
              )}
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
          )}
        />
      </div>

      <div className="space-y-0.5">
        <Label variant="micro" className="mb-0.5">
          Lead Date
        </Label>
        <Controller
          name="leadDate"
          control={control}
          render={({ field }) => (
            <Input
              type="date"
              size="micro"
              disabled={isReadOnly}
              className="w-full text-gray-500"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label variant="micro" className="mb-0.5">
          Channel
        </Label>
        <Controller
          name="channel"
          control={control}
          render={({ field }) => (
            <Select 
              value={field.value} 
              onValueChange={field.onChange}
              disabled={isReadOnly}
            >
              <SelectTrigger size="micro" className="w-full tracking-tight">
                <SelectValue placeholder="Select channel" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={1}>
                {channels.map(channel => (
                  <SelectItem key={channel} value={channel} className="text-[11px]">
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

export default MetadataBlock;
