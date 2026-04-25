import React, { useMemo } from 'react';
import { X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { AdvancedFilterMultipleSelect } from '@/components/ui/advanced-filter-multiple-select.jsx';

/**
 * Advanced Filter Menu Component
 * Dynamic, configuration-driven UI for advanced filtering.
 */
const AdvancedFilterMenu = ({ 
  config, 
  activeFilters, 
  updateFilter, 
  toggleArrayFilter, 
  removeFilter, 
  clearFilters 
}) => {
  
  const activePills = useMemo(() => {
    const pills = [];
    config.forEach(filter => {
      const value = activeFilters[filter.id];
      if (!value) return;

      if (Array.isArray(value)) {
        value.forEach(v => {
          pills.push({ id: filter.id, value: v, label: `${filter.label}: ${v}` });
        });
      } else if (typeof value === 'object') {
        if (filter.type === 'date-range') {
          if (value.start) pills.push({ id: filter.id, part: 'start', label: `${filter.label} Start: ${value.start}` });
          if (value.end) pills.push({ id: filter.id, part: 'end', label: `${filter.label} End: ${value.end}` });
        } else if (filter.type === 'number-range') {
          if (value.min) pills.push({ id: filter.id, part: 'min', label: `${filter.label} Min: ₹${value.min}` });
          if (value.max) pills.push({ id: filter.id, part: 'max', label: `${filter.label} Max: ₹${value.max}` });
        }
      } else if (value) {
        pills.push({ id: filter.id, label: `${filter.label}: ${value}` });
      }
    });
    return pills;
  }, [config, activeFilters]);

  const handleUpdate = (id, value) => {
    updateFilter(id, value);
  };

  const handleToggle = (id, value) => {
    toggleArrayFilter(id, value);
  };

  const handleRemove = (pill) => {
    removeFilter(pill.id, pill.value || pill.part);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Advanced Filters</span>
        <button onClick={clearFilters} className="text-[10px] text-primary font-bold hover:underline">Clear</button>
      </div>

      {activePills.length > 0 && (
        <div className="px-2 py-2 border-b border-gray-100 bg-gray-50/50 flex flex-wrap gap-1">
          {activePills.map((pill, idx) => (
            <Badge key={idx} variant="advanced-filter" className="flex items-center">
              <span>{pill.label}</span>
              <button onClick={() => handleRemove(pill)} className="hover:text-red-500">
                <X size={10} />
              </button>
            </Badge>
          ))}
        </div>
      )}

      <div className="max-h-[80vh] overflow-y-auto no-scrollbar">
        <Accordion type="single" collapsible>
          {config.map((filter) => {
            const Icon = filter.icon;
            const value = activeFilters[filter.id];
            
            return (
              <AccordionItem key={filter.id} variant="advanced-filter">
                <AccordionTrigger variant="advanced-filter">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-gray-400" />
                    <span>{filter.label}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent variant="advanced-filter">
                  {(filter.type === 'multi-select' || filter.type === 'single-select') && filter.options?.map((opt) => (
                    <AdvancedFilterMultipleSelect 
                      key={opt} 
                      isSelected={Array.isArray(value) ? value.includes(opt) : value === opt}
                      onClick={() => filter.type === 'multi-select' ? handleToggle(filter.id, opt) : handleUpdate(filter.id, opt)}
                    >
                      <span className="text-xs text-gray-600">{opt}</span>
                    </AdvancedFilterMultipleSelect>
                  ))}
                  
                  {filter.type === 'date-range' && (
                    <div className="flex flex-col gap-2 py-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Start Date</label>
                        <Input 
                          type="date" 
                          size="advanced-filter"
                          value={value.start}
                          onChange={(e) => handleUpdate(filter.id, { ...value, start: e.target.value })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">End Date</label>
                        <Input 
                          type="date" 
                          size="advanced-filter"
                          value={value.end}
                          onChange={(e) => handleUpdate(filter.id, { ...value, end: e.target.value })}
                        />
                      </div>
                    </div>
                  )}

                  {filter.type === 'number-range' && (
                    <div className="flex gap-2 py-2">
                      <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Min Value</label>
                        <Input 
                          type="number" 
                          size="advanced-filter"
                          value={value.min}
                          onChange={(e) => handleUpdate(filter.id, { ...value, min: e.target.value })}
                          placeholder="Min" 
                        />
                      </div>
                      <div className="flex flex-col gap-1 w-1/2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Max Value</label>
                        <Input 
                          type="number" 
                          size="advanced-filter"
                          value={value.max}
                          onChange={(e) => handleUpdate(filter.id, { ...value, max: e.target.value })}
                          placeholder="Max" 
                        />
                      </div>
                    </div>
                  )}

                  {filter.type === 'text-search' && (
                    <div className="py-2 flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase">{filter.label}</label>
                      <Input 
                        type="text" 
                        size="advanced-filter"
                        value={value}
                        onChange={(e) => handleUpdate(filter.id, e.target.value)}
                        placeholder={`Type ${filter.label.toLowerCase()}...`} 
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
