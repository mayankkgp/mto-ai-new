import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Check, 
  Filter, 
  Truck, 
  Calendar, 
  CheckCircle2, 
  IndianRupee, 
  Search,
  X
} from 'lucide-react';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { cn } from '@/lib/utils.js';

/**
 * Advanced Filter Menu Component
 * Accordion-style list matching legacy UI
 */
const AdvancedFilterMenu = ({ enquiries, activeFilters, setActiveFilters, clearAllFilters }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const { users, channels: referenceChannels } = useReferenceData();
  
  const uniqueCities = useMemo(() => {
    const cities = enquiries.map(e => e.customer?.city).filter(Boolean);
    return [...new Set(cities)];
  }, [enquiries]);

  const supplyUsers = useMemo(() => {
    return users.filter(u => u.department === 'Supply' || u.department === 'Admin');
  }, [users]);

  const categories = [
    { id: 'channel', label: 'Channel', icon: Filter, options: referenceChannels },
    { id: 'supply', label: 'Supply', icon: Truck, options: supplyUsers.map(u => u.name) },
    { id: 'city', label: 'City', icon: Filter, options: uniqueCities },
    { id: 'leadDate', label: 'Lead Date', icon: Calendar, isDate: true, startKey: 'leadDateStart', endKey: 'leadDateEnd' },
    { id: 'revDue', label: 'Rev Due', icon: CheckCircle2, isDate: true, startKey: 'revDueStart', endKey: 'revDueEnd' },
    { id: 'supDue', label: 'Sup Due', icon: Truck, isDate: true, startKey: 'supDueStart', endKey: 'supDueEnd' },
    { id: 'expectedValue', label: 'Expected Value', icon: IndianRupee, isRange: true, minKey: 'minExpValue', maxKey: 'maxExpValue' },
    { id: 'source', label: 'Source', icon: Search, isInput: true, key: 'source' },
  ];

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const updateFilter = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value, advanced: true }));
  };

  const toggleArrayFilter = (key, value) => {
    setActiveFilters(prev => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: next, advanced: true };
    });
  };

  const removeFilter = (key, value = null) => {
    setActiveFilters(prev => {
      let nextValue;
      if (Array.isArray(prev[key])) {
        nextValue = prev[key].filter(v => v !== value);
      } else {
        nextValue = '';
      }
      return { ...prev, [key]: nextValue };
    });
  };

  const activePills = useMemo(() => {
    const pills = [];
    if (activeFilters.channel) pills.push({ key: 'channel', label: `Channel: ${activeFilters.channel}` });
    activeFilters.supply?.forEach(s => pills.push({ key: 'supply', value: s, label: `Supply: ${s}` }));
    if (activeFilters.city) pills.push({ key: 'city', label: `City: ${activeFilters.city}` });
    if (activeFilters.leadDateStart) pills.push({ key: 'leadDateStart', label: `Lead Start: ${activeFilters.leadDateStart}` });
    if (activeFilters.leadDateEnd) pills.push({ key: 'leadDateEnd', label: `Lead End: ${activeFilters.leadDateEnd}` });
    if (activeFilters.revDueStart) pills.push({ key: 'revDueStart', label: `Rev Start: ${activeFilters.revDueStart}` });
    if (activeFilters.revDueEnd) pills.push({ key: 'revDueEnd', label: `Rev End: ${activeFilters.revDueEnd}` });
    if (activeFilters.supDueStart) pills.push({ key: 'supDueStart', label: `Sup Start: ${activeFilters.supDueStart}` });
    if (activeFilters.supDueEnd) pills.push({ key: 'supDueEnd', label: `Sup End: ${activeFilters.supDueEnd}` });
    if (activeFilters.minExpValue) pills.push({ key: 'minExpValue', label: `Min: ₹${activeFilters.minExpValue}` });
    if (activeFilters.maxExpValue) pills.push({ key: 'maxExpValue', label: `Max: ₹${activeFilters.maxExpValue}` });
    if (activeFilters.source) pills.push({ key: 'source', label: `Source: ${activeFilters.source}` });
    return pills;
  }, [activeFilters]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-xl py-1 w-64 max-h-[80vh] overflow-y-auto no-scrollbar">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Advanced Filters</span>
        <button onClick={clearAllFilters} className="text-[10px] text-primary font-bold hover:underline">Clear</button>
      </div>

      {activePills.length > 0 && (
        <div className="px-2 py-2 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-1">
          {activePills.map((pill, idx) => (
            <div key={idx} className="flex items-center gap-1 px-1.5 py-0.5 bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB] rounded text-[10px] font-bold">
              <span>{pill.label}</span>
              <button onClick={() => removeFilter(pill.key, pill.value)} className="hover:text-red-500">
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {categories.map((cat) => {
        const Icon = cat.icon;
        const isExpanded = expandedCategory === cat.id;
        
        return (
          <div key={cat.id} className="border-b border-gray-50 last:border-0">
            <button
              onClick={() => toggleCategory(cat.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 text-xs transition-colors",
                isExpanded ? "bg-primary/5 text-primary font-bold" : "text-gray-700 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon size={14} className={cn(isExpanded ? "text-primary" : "text-gray-400")} />
                <span>{cat.label}</span>
              </div>
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-400" />
              )}
            </button>

            {isExpanded && (
              <div className="bg-gray-50/50 py-1 px-3 space-y-1">
                {cat.options && cat.options.map((opt) => (
                  <div 
                    key={opt} 
                    onClick={() => cat.id === 'supply' ? toggleArrayFilter('supply', opt) : updateFilter(cat.id, opt)}
                    className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-white cursor-pointer group"
                  >
                    <span className="text-xs text-gray-600">{opt}</span>
                    <div className="h-4 w-4 flex items-center justify-center">
                      {(cat.id === 'supply' ? activeFilters.supply?.includes(opt) : activeFilters[cat.id] === opt) && (
                        <Check className="h-3 w-3 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
                
                {cat.isDate && (
                  <div className="flex flex-col gap-2 py-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Start Date</label>
                      <input 
                        type="date" 
                        value={activeFilters[cat.startKey]}
                        onChange={(e) => updateFilter(cat.startKey, e.target.value)}
                        className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">End Date</label>
                      <input 
                        type="date" 
                        value={activeFilters[cat.endKey]}
                        onChange={(e) => updateFilter(cat.endKey, e.target.value)}
                        className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" 
                      />
                    </div>
                  </div>
                )}

                {cat.isRange && (
                  <div className="flex gap-2 py-2">
                    <div className="flex flex-col gap-1 w-1/2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Min Value</label>
                      <input 
                        type="number" 
                        value={activeFilters[cat.minKey]}
                        onChange={(e) => updateFilter(cat.minKey, e.target.value)}
                        className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" 
                        placeholder="Min" 
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-1/2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Max Value</label>
                      <input 
                        type="number" 
                        value={activeFilters[cat.maxKey]}
                        onChange={(e) => updateFilter(cat.maxKey, e.target.value)}
                        className="w-full px-2 py-1 text-[10px] border border-gray-200 rounded focus:outline-none focus:border-primary" 
                        placeholder="Max" 
                      />
                    </div>
                  </div>
                )}

                {cat.isInput && (
                  <div className="py-2 flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase">Source</label>
                    <input 
                      type="text" 
                      value={activeFilters[cat.key]}
                      onChange={(e) => updateFilter(cat.key, e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:border-primary" 
                      placeholder="Type source..." 
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdvancedFilterMenu;
