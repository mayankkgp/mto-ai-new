import React, { useRef, useEffect, useState } from 'react';
import { format, isValid } from 'date-fns';
import { useFormContext, Controller } from 'react-hook-form';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
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
import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover.jsx';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command.jsx';
import { UserPlus, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils.js';

/**
 * Formats a number in the Indian numbering system (e.g., 1,00,000)
 */
const formatIndianCurrency = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '';
  const x = num.toString();
  let lastThree = x.substring(x.length - 3);
  const otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
};

/**
 * Sub-component: UserSelector
 */
const UserSelector = ({ label, selectedUsers, onToggle, isReadOnly, hasError, users }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-y-0.5">
      <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
        {label}
      </Label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button 
            type="button"
            disabled={isReadOnly}
            className={cn(
              "w-full focus:outline-none group flex flex-wrap items-center gap-1 p-[2px] bg-white border border-gray-200 rounded min-h-[26px] transition-colors text-left",
              isReadOnly 
                ? "bg-gray-50 cursor-not-allowed" 
                : "cursor-pointer hover:border-primary/40",
              hasError && "border-red-500 bg-red-50"
            )}
          >
            {selectedUsers?.map(user => (
              <div 
                key={user.id}
                className="px-1 py-0.5 rounded text-[9px] font-bold border bg-gray-100 text-gray-600 border-gray-200 flex items-center gap-1"
              >
                {user.name}
                {!isReadOnly && (
                  <X 
                    size={10} 
                    className="hover:text-red-500" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggle(user);
                    }}
                  />
                )}
              </div>
            ))}
            {!isReadOnly && (
              <div className="p-0.5 text-gray-400 hover:text-primary">
                <UserPlus size={12} />
              </div>
            )}
          </button>
        </PopoverTrigger>
        {!isReadOnly && (
          <PopoverContent className="w-auto min-w-[160px] p-0 py-1 bg-white border border-gray-200 rounded shadow-xl overflow-hidden flex flex-col" align="start">
            <Command className="bg-transparent p-0">
              <div className="px-2 py-1 border-b border-gray-50 mb-1">
                <CommandInput 
                  size="micro"
                  placeholder="Search user..." 
                  className="w-full px-1.5 bg-gray-50 border border-gray-100 rounded focus:border-[#1E40AF]"
                />
              </div>
              <CommandList className="max-h-[160px] overflow-y-auto no-scrollbar">
                <CommandEmpty className="px-2 py-3 text-center text-[10px] text-gray-400 italic">No user found.</CommandEmpty>
                <CommandGroup className="p-0">
                  {users.map((user) => {
                    const isSelected = selectedUsers?.some(u => u.id === user.id);
                    return (
                      <CommandItem
                        key={user.id}
                        size="micro"
                        onSelect={() => onToggle(user)}
                        className="flex items-center justify-between cursor-pointer aria-selected:bg-gray-50"
                      >
                        <span className={cn("truncate", isSelected && "text-primary font-bold")}>
                          {user.name}
                        </span>
                        {isSelected && <Check size={10} className="text-primary shrink-0" />}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

const OtherDetails = ({ isReadOnly }) => {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext();
  const { channels, users } = useReferenceData();

  // Lead Data Refs & Logic
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

  // Roles Logic
  const revenueRoles = watch('roles.revenue') || [];
  const supplyRoles = watch('roles.supply') || [];

  const toggleUser = (role, user) => {
    const currentUsers = role === 'revenue' ? revenueRoles : supplyRoles;
    const exists = currentUsers.some(u => u.id === user.id);
    
    const newUsers = exists 
      ? currentUsers.filter(u => u.id !== user.id)
      : [...currentUsers, user];
      
    setValue(`roles.${role}`, newUsers, { shouldValidate: true });
  };

  // Commercials Logic
  const orderValue = watch('commercials.orderValue') || 0;
  const probability = watch('commercials.probability') || 50;
  const expectedValue = Math.round(orderValue * (probability / 100));

  const [displayValue, setDisplayValue] = useState(
    formatIndianCurrency(orderValue)
  );

  useEffect(() => {
    setDisplayValue(formatIndianCurrency(orderValue));
  }, [orderValue]);

  const handleOrderValueChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numericValue = parseInt(rawValue, 10) || 0;
    setValue('commercials.orderValue', numericValue);
    setValue('commercials.expectedValue', Math.round(numericValue * (probability / 100)));
  };

  return (
    <div className="space-y-3">
      {/* 1. Metadata Block */}
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

      {/* 2. Lead Block */}
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

      {/* 3. Roles Block */}
      <div className="grid grid-cols-2 gap-1.5">
        <UserSelector 
          label="Revenue Role *" 
          selectedUsers={revenueRoles} 
          onToggle={(user) => toggleUser('revenue', user)}
          isReadOnly={isReadOnly}
          hasError={!!errors.roles?.revenue}
          users={users}
        />
        <UserSelector 
          label="Supply Role" 
          selectedUsers={supplyRoles} 
          onToggle={(user) => toggleUser('supply', user)}
          isReadOnly={isReadOnly}
          users={users}
        />
      </div>

      {/* 4. Commercials Block */}
      <div className="grid grid-cols-3 gap-1.5">
        <div className="space-y-0.5">
          <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
            Order Value (₹)
          </Label>
          <div className="relative">
            <Input 
              size="micro"
              className="w-full font-bold tracking-tight"
              value={displayValue}
              onChange={handleOrderValueChange}
              disabled={isReadOnly}
            />
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
            Prob (%)
          </Label>
          <Controller
            name="commercials.probability"
            control={control}
            render={({ field }) => (
              <Select 
                value={String(field.value || 50)} 
                onValueChange={(val) => {
                  const prob = parseInt(val, 10);
                  field.onChange(prob);
                  setValue('commercials.expectedValue', Math.round(orderValue * (prob / 100)));
                }}
                disabled={isReadOnly}
              >
                <SelectTrigger size="micro" className="w-full tracking-tight">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={1}>
                  {[10, 30, 50, 70, 90].map(p => (
                    <SelectItem key={p} value={String(p)} className="text-[11px]">{p}%</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-0.5">
          <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal">
            Expected Value
          </Label>
          <div className="w-full px-1.5 h-[26px] flex items-center justify-end tracking-tight bg-gray-50 border border-gray-200 text-gray-800 rounded text-[11px] font-bold text-right">
            ₹ {formatIndianCurrency(expectedValue)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherDetails;
