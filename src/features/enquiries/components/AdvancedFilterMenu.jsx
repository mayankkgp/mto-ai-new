import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
import { mockUsers } from '@/mockData.js';

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

export default AdvancedFilterMenu;
