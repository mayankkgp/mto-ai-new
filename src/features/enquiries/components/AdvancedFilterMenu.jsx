import React, { useMemo } from 'react';
import { 
  Filter, 
  Truck, 
  Calendar, 
  CheckCircle2, 
  IndianRupee, 
  Search,
  X
} from 'lucide-react';
import { useReferenceData } from '@/contexts/ReferenceDataContext.jsx';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { AdvancedFilterMultipleSelect } from '@/components/ui/advanced-filter-multiple-select.jsx';

/**
 * Advanced Filter Menu Component
 */
const AdvancedFilterMenu = ({ enquiries, activeFilters, setActiveFilters, clearAllFilters }) => {
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
    <div className="w-full flex flex-col">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Advanced Filters</span>
        <button onClick={clearAllFilters} className="text-[10px] text-primary font-bold hover:underline">Clear</button>
      </div>

      {activePills.length > 0 && (
        <div className="px-2 py-2 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-1">
          {activePills.map((pill, idx) => (
            <Badge key={idx} variant="advanced-filter" className="flex items-center">
              <span>{pill.label}</span>
              <button onClick={() => removeFilter(pill.key, pill.value)} className="hover:text-red-500">
                <X size={10} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
        <Accordion type="single" collapsible>
          {categories.map((cat) => {
            const Icon = cat.icon;
            
            return (
              <AccordionItem key={cat.id} variant="advanced-filter">
                <AccordionTrigger variant="advanced-filter">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-gray-400" />
                    <span>{cat.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent variant="advanced-filter">
                  {cat.options && cat.options.map((opt) => (
                    <AdvancedFilterMultipleSelect 
                      key={opt} 
                      isSelected={cat.id === 'supply' ? activeFilters.supply?.includes(opt) : activeFilters[cat.id] === opt}
                      onClick={() => cat.id === 'supply' ? toggleArrayFilter('supply', opt) : updateFilter(cat.id, opt)}
                    >
                      <span className="text-xs text-gray-600">{opt}</span>
                    </AdvancedFilterMultipleSelect>
                  ))}
                  
                  {cat.isDate && (
                    <div className="flex flex-col gap-2 py-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Start Date</label>
                        <Input 
                          type="date" 
                          size="advanced-filter"
                          value={activeFilters[cat.startKey]}
                          onChange={(e) => updateFilter(cat.startKey, e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">End Date</label>
                        <Input 
                          type="date" 
                          size="advanced-filter"
                          value={activeFilters[cat.endKey]}
                          onChange={(e) => updateFilter(cat.endKey, e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {cat.isRange && (
                    <div className="flex gap-2 py-2">
                      <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Min Value</label>
                        <Input 
                          type="number" 
                          size="advanced-filter"
                          value={activeFilters[cat.minKey]}
                          onChange={(e) => updateFilter(cat.minKey, e.target.value)}
                          placeholder="Min" 
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Max Value</label>
                        <Input 
                          type="number" 
                          size="advanced-filter"
                          value={activeFilters[cat.maxKey]}
                          onChange={(e) => updateFilter(cat.maxKey, e.target.value)}
                          placeholder="Max" 
                        />
                      </div>
                    </div>
                  )}

                  {cat.isInput && (
                    <div className="py-2 flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">Source</label>
                      <Input 
                        type="text" 
                        size="advanced-filter"
                        value={activeFilters[cat.key]}
                        onChange={(e) => updateFilter(cat.key, e.target.value)}
                        placeholder="Type source..." 
                      />
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
};

export default AdvancedFilterMenu;
