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
      <div className="flex flex-col gap-0.5">
        <Label variant="micro">
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
              variant="flat"
              size="micro"
              className={cn(
                "w-full h-[26px]",
                errors.type && "border-red-500 divide-red-200"
              )}
            >
              <ToggleGroupItem 
                value="MTO" 
                className="flex-1"
              >
                MTO
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="Ready" 
                className="flex-1"
              >
                Ready
              </ToggleGroupItem>
            </ToggleGroup>
          )}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label variant="micro">
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
              className="w-[96px] text-gray-500 date-micro"
              {...field}
            />
          )}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label variant="micro">
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
