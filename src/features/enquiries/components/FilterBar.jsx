import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, User, Layers } from 'lucide-react';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import { mockUsers } from '@/mockData.js';
import { Checkbox } from '@/components/ui/checkbox.jsx';

/**
 * Advanced Filter Menu Component
 * Strictly implements the 8 filters in sequence:
 * 1. Channel
 * 2. Supply
 * 3. City
 * 4. Lead Date
 * 5. Rev Due
 * 6. Sup Due
 * 7. Expected Value
 * 8. Source
 */
const AdvancedFilterMenu = ({ enquiries }) => {
  const uniqueCities = useMemo(() => {
    const cities = enquiries.map(e => e.customer?.city).filter(Boolean);
    return [...new Set(cities)];
  }, [enquiries]);

  const supplyUsers = useMemo(() => {
    return mockUsers.filter(u => u.department === 'Supply' || u.department === 'Admin');
  }, []);

  const channels = ['Direct', 'Website', 'WhatsApp', 'LinkedIn', 'Event', 'Others'];

  return (
    <div className="w-80 p-4 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between border-b pb-2">
        <h3 className="font-semibold text-sm">Advanced Filters</h3>
        <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">Clear All</Button>
      </div>
      
      {/* 1. Channel */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Channel</label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {channels.map(channel => (
            <div key={channel} className="flex items-center space-x-2">
              <Checkbox id={`channel-${channel}`} />
              <label htmlFor={`channel-${channel}`} className="text-xs font-medium leading-none cursor-pointer">
                {channel}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Supply */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Supply</label>
        <div className="space-y-2 max-h-32 overflow-y-auto pr-2 no-scrollbar">
          {supplyUsers.map(user => (
            <div key={user.id} className="flex items-center space-x-2">
              <Checkbox id={`supply-${user.id}`} />
              <label htmlFor={`supply-${user.id}`} className="text-xs font-medium leading-none cursor-pointer">
                {user.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* 3. City */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">City</label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-32 overflow-y-auto pr-2 no-scrollbar">
          {uniqueCities.length > 0 ? uniqueCities.map(city => (
            <div key={city} className="flex items-center space-x-2">
              <Checkbox id={`city-${city}`} />
              <label htmlFor={`city-${city}`} className="text-xs font-medium leading-none cursor-pointer">
                {city}
              </label>
            </div>
          ) ) : (
            <span className="text-[10px] text-muted-foreground italic">No cities found</span>
          )}
        </div>
      </div>

      {/* 4. Lead Date */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Lead Date</label>
        <div className="flex gap-2">
          <Input type="date" className="h-8 text-[10px]" placeholder="Start" />
          <Input type="date" className="h-8 text-[10px]" placeholder="End" />
        </div>
      </div>

      {/* 5. Rev Due */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Rev Due</label>
        <div className="flex gap-2">
          <Input type="date" className="h-8 text-[10px]" placeholder="Start" />
          <Input type="date" className="h-8 text-[10px]" placeholder="End" />
        </div>
      </div>

      {/* 6. Sup Due */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Sup Due</label>
        <div className="flex gap-2">
          <Input type="date" className="h-8 text-[10px]" placeholder="Start" />
          <Input type="date" className="h-8 text-[10px]" placeholder="End" />
        </div>
      </div>

      {/* 7. Expected Value */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Expected Value</label>
        <div className="flex gap-2">
          <Input type="number" className="h-8 text-[10px]" placeholder="Min" />
          <Input type="number" className="h-8 text-[10px]" placeholder="Max" />
        </div>
      </div>

      {/* 8. Source */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Source</label>
        <Input type="text" className="h-8 text-xs" placeholder="Type source..." />
      </div>

      <div className="pt-2 border-t flex justify-end gap-2">
        <Button size="sm" className="text-xs h-8 w-full">Apply Filters</Button>
      </div>
    </div>
  );
};

const FilterBar = ({ isCompact }) => {
  const { enquiries } = useEnquiryContext();
  const [search, setSearch] = useState('');

  const revUsers = useMemo(() => {
    return mockUsers.filter(u => u.department === 'Revenue' || u.department === 'Admin');
  }, []);

  return (
    <div className="flex items-center justify-between h-filter-fluid px-nav-fluid border-b bg-muted/10">
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries..." 
            className="pl-9 h-8 bg-background text-xs"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        {/* Type Filter - Hide if isCompact */}
        {!isCompact && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
                <Layers className="h-3.5 w-3.5" />
                <span>Type</span>
                <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="end">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 p-1.5 hover:bg-accent rounded cursor-pointer">
                  <Checkbox id="type-mto" />
                  <label htmlFor="type-mto" className="text-xs font-medium cursor-pointer">MTO</label>
                </div>
                <div className="flex items-center space-x-2 p-1.5 hover:bg-accent rounded cursor-pointer">
                  <Checkbox id="type-ready" />
                  <label htmlFor="type-ready" className="text-xs font-medium cursor-pointer">Ready</label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Rev Role Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
              <User className="h-3.5 w-3.5" />
              {!isCompact && <span>Rev Role</span>}
              <ChevronDown className="h-3 w-3 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-2" align="end">
            <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
              {revUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-2 p-1.5 hover:bg-accent rounded cursor-pointer">
                  <Checkbox id={`rev-${user.id}`} />
                  <label htmlFor={`rev-${user.id}`} className="text-xs font-medium cursor-pointer">{user.name}</label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Advanced Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {!isCompact && <span>Filters</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <AdvancedFilterMenu enquiries={enquiries} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default FilterBar;
