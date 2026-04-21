import React from 'react';
import { format, isValid } from 'date-fns';
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
import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx';
import { cn } from '@/lib/utils.js';

const MetadataBlock = ({ isReadOnly }) => {
  const { control, formState: { errors } } = useFormContext();
  const { channels } = useReferenceData();

  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-start">
      <div className="space-y-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
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
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
          Lead Date
        </Label>
        <Controller
          name="leadDate"
          control={control}
          render={({ field }) => {
            const dateValue = field.value ? new Date(field.value) : null;
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="mto-input"
                    size="micro"
                    disabled={isReadOnly}
                    className={cn(
                      "w-fit justify-start text-left font-normal",
                      !field.value && "text-gray-500"
                    )}
                  >
                    {field.value ? format(dateValue, "dd/MM/yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" sideOffset={0}>
                  <Calendar
                    mode="single"
                    selected={isValid(dateValue) ? dateValue : undefined}
                    onSelect={(date) => date && field.onChange(format(date, "yyyy-MM-dd"))}
                    initialFocus
                    captionLayout="dropdown"
                    fromYear={2020}
                    toYear={2030}
                  />
                </PopoverContent>
              </Popover>
            );
          }}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
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
