import { useState, useMemo, useCallback } from 'react';

/**
 * Filter Evaluation Engine
 */
const evaluate = (item, activeFilters, config) => {
  for (const filter of config) {
    const { id, type, dataKey, evaluator } = filter;
    const value = activeFilters[id];

    // If no filter value is set, skip
    if (!value) continue;

    // Custom evaluator support
    if (evaluator) {
      if (!evaluator(item, value)) return false;
      continue;
    }

    // Default data extraction
    const itemValue = dataKey ? dataKey.split('.').reduce((obj, key) => obj?.[key], item) : item[id];

    switch (type) {
      case 'multi-select':
        if (Array.isArray(value) && value.length > 0) {
          if (Array.isArray(itemValue)) {
            // Check if any selected value exists in item's array
            const hasMatch = value.some(v => itemValue.includes(v));
            if (!hasMatch) return false;
          } else {
            // Check if item's value is in selected values
            if (!value.includes(itemValue)) return false;
          }
        }
        break;

      case 'single-select':
        if (value && itemValue !== value) return false;
        break;

      case 'date-range':
        if (value.start || value.end) {
          const date = itemValue ? new Date(itemValue).getTime() : null;
          if (!date) return false;
          if (value.start && date < new Date(value.start).getTime()) return false;
          if (value.end) {
            const endDate = new Date(value.end);
            endDate.setHours(23, 59, 59, 999);
            if (date > endDate.getTime()) return false;
          }
        }
        break;

      case 'number-range':
        if (value.min || value.max) {
          const num = parseFloat(itemValue) || 0;
          if (value.min && num < parseFloat(value.min)) return false;
          if (value.max && num > parseFloat(value.max)) return false;
        }
        break;

      case 'text-search':
        if (value && typeof itemValue === 'string') {
          if (!itemValue.toLowerCase().includes(value.toLowerCase())) return false;
        }
        break;

      default:
        break;
    }
  }
  return true;
};

/**
 * useGlobalFilter Hook
 */
export const useGlobalFilter = (config, data) => {
  // Generate initial state based on config
  const initialState = useMemo(() => {
    const state = {};
    config.forEach(filter => {
      switch (filter.type) {
        case 'multi-select':
          state[filter.id] = [];
          break;
        case 'date-range':
          state[filter.id] = { start: '', end: '' };
          break;
        case 'number-range':
          state[filter.id] = { min: '', max: '' };
          break;
        default:
          state[filter.id] = '';
          break;
      }
    });
    return state;
  }, [config]);

  const [activeFilters, setActiveFilters] = useState(initialState);

  const updateFilter = useCallback((id, value) => {
    setActiveFilters(prev => ({ ...prev, [id]: value }));
  }, []);

  const toggleArrayFilter = useCallback((id, value) => {
    setActiveFilters(prev => {
      const current = prev[id] || [];
      const next = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [id]: next };
    });
  }, []);

  const removeFilter = useCallback((id, value = null) => {
    setActiveFilters(prev => {
      const current = prev[id];
      let next;
      
      if (Array.isArray(current)) {
        next = value !== null ? current.filter(v => v !== value) : [];
      } else if (typeof current === 'object' && current !== null) {
        // Handle range objects (date/number)
        next = { ...current };
        if (value && next[value] !== undefined) {
          next[value] = '';
        } else {
          // If no specific part mentioned, clear all
          Object.keys(next).forEach(k => next[k] = '');
        }
      } else {
        next = '';
      }
      
      return { ...prev, [id]: next };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(initialState);
  }, [initialState]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    Object.entries(activeFilters).forEach(([, value]) => {
      if (!value) return;
      if (Array.isArray(value)) {
        if (value.length > 0) count++;
      } else if (typeof value === 'object') {
        if (value.start || value.end || value.min || value.max) count++;
      } else if (typeof value === 'string' && value !== '') {
        count++;
      }
    });
    return count;
  }, [activeFilters]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(item => evaluate(item, activeFilters, config));
  }, [data, activeFilters, config]);

  return {
    filteredData,
    activeFilterCount,
    activeFilters,
    updateFilter,
    toggleArrayFilter,
    removeFilter,
    clearFilters
  };
};
