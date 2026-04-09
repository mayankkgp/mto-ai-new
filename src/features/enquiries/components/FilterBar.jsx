import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, User, Layers, X, Check, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { useEnquiryContext } from '@/contexts/EnquiryContext.jsx';
import { mockUsers } from '@/mockData.js';
import { cn } from '@/lib/utils.js';

/**
 * Advanced Filter Menu Component
 * Accordion-style list matching legacy UI
 */
const AdvancedFilterMenu = ({ enquiries }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  
  const uniqueCities = useMemo(() => {
    const cities = enquiries.map(e => e.customer?.city).filter(Boolean);
    return [...new Set(cities)];
  }, [enquiries]);

  const supplyUsers = useMemo(() => {
    return mockUsers.filter(u => u.department === 'Supply' || u.department === 'Admin');
  }, []);

  const channels = ['Direct', 'Website', 'WhatsApp', 'LinkedIn', 'Event', 'Others'];

  const categories = [
    { id: 'channel', label: 'Channel', options: channels },
    { id: 'supply', label: 'Supply', options: supplyUsers.map(u => u.name) },
    { id: 'city', label: 'City', options: uniqueCities },
    { id: 'leadDate', label: 'Lead Date', isDate: true },
    { id: 'revDue', label: 'Rev Due', isDate: true },
    { id: 'supDue', label: 'Sup Due', isDate: true },
    { id: 'expectedValue', label: 'Expected Value', isRange: true },
    { id: 'source', label: 'Source', isInput: true },
  ];

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-1 w-64 max-h-[80vh] overflow-y-auto no-scrollbar">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Advanced Filters</span>
        <button className="text-[10px] text-primary font-bold hover:underline">Clear</button>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="border-b border-gray-50 last:border-0">
          <button
            onClick={() => toggleCategory(cat.id)}
            className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium">{cat.label}</span>
            {expandedCategory === cat.id ? (
              <ChevronDown className="h-3 w-3 text-gray-400" />
            ) : (
              <ChevronRight className="h-3 w-3 text-gray-400" />
            )}
          </button>

          {expandedCategory === cat.id && (
            <div className="bg-gray-50/50 py-1 px-3 space-y-1">
              {cat.options && cat.options.map((opt) => (
                <div 
                  key={opt} 
                  className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white cursor-pointer group"
                >
                  <span className="text-xs text-gray-600">{opt}</span>
                  {/* Mock selection state */}
                  <div className="h-4 w-4 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
              
              {cat.isDate && (
                <div className="flex flex-col gap-2 py-2">
                  <input type="date" className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" placeholder="Start" />
                  <input type="date" className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" placeholder="End" />
                </div>
              )}

              {cat.isRange && (
                <div className="flex gap-2 py-2">
                  <input type="number" className="w-1/2 px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" placeholder="Min" />
                  <input type="number" className="w-1/2 px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" placeholder="Max" />
                </div>
              )}

              {cat.isInput && (
                <div className="py-2">
                  <input type="text" className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-primary" placeholder="Type source..." />
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const FilterBar = ({ isCompact }) => {
  const { enquiries } = useEnquiryContext();
  const [search, setSearch] = useState('');
  
  // Mock active filters state
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    revRole: [],
    advanced: false
  });

  const revUsers = useMemo(() => {
    return mockUsers.filter(u => u.department === 'Revenue' || u.department === 'Admin');
  }, []);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const next = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const isTypeActive = activeFilters.type.length > 0;
  const isRevActive = activeFilters.revRole.length > 0;

  return (
    <div className="bg-white border-b border-gray-200 px-2 min-[height:801px]:px-4 py-1 min-[height:801px]:py-1.5 flex items-center gap-3 shrink-0 h-[40px] min-[height:801px]:h-[48px] relative z-40">
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries..." 
            className="w-full pl-9 pr-8 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          {search.length > 0 && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200/50 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Type Filter */}
        {!isCompact && (
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors",
                isTypeActive 
                  ? "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              )}>
                <Layers className="h-3.5 w-3.5" />
                <span>Type</span>
                <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-1 bg-white border border-gray-200 rounded-lg shadow-xl" align="end">
              {['MTO', 'Ready'].map(type => (
                <button 
                  key={type}
                  onClick={() => toggleFilter('type', type)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <span>{type}</span>
                  {activeFilters.type.includes(type) && <Check className="h-3 w-3 text-primary" />}
                </button>
              ))}
            </PopoverContent>
          </Popover>
        )}

        {/* Rev Role Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <button className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors",
              isRevActive 
                ? "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]" 
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}>
              <User className="h-3.5 w-3.5" />
              {!isCompact && <span>Rev Role</span>}
              <ChevronDown className="h-3 w-3 opacity-50 ml-0.5" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-1 bg-white border border-gray-200 rounded-lg shadow-xl" align="end">
            <div className="max-h-60 overflow-y-auto no-scrollbar">
              {revUsers.map(user => (
                <button 
                  key={user.id}
                  onClick={() => toggleFilter('revRole', user.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded transition-colors"
                >
                  <span>{user.name}</span>
                  {activeFilters.revRole.includes(user.id) && <Check className="h-3 w-3 text-primary" />}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Advanced Filter Group */}
        <div className={cn(
          "flex items-center rounded transition-colors overflow-hidden", 
          activeFilters.advanced 
            ? "bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]" 
            : "bg-gray-100 text-gray-700"
        )}>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold hover:bg-black/5 transition-colors shrink-0">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {!isCompact && <span>Filters</span>}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-transparent border-none shadow-none" align="end">
              <AdvancedFilterMenu enquiries={enquiries} />
            </PopoverContent>
          </Popover>
          
          {activeFilters.advanced && (
            <button 
              onClick={() => setActiveFilters(prev => ({ ...prev, advanced: false }))}
              className="px-2 py-1.5 border-l border-[#E5E7EB] hover:bg-black/5 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
