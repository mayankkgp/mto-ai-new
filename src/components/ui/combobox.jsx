import React from 'react';
import { Input } from './input.jsx';
import { cn } from '@/lib/utils.js';

/**
 * Combobox Component
 * A reusable autocomplete input component.
 */
export function Combobox({ 
  value, 
  onChange, 
  onSelect, 
  options = [], 
  placeholder, 
  disabled,
  className,
  ...props 
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = React.useMemo(() => {
    const query = (value || '').toLowerCase();
    return options.filter(option => 
      option.name.toLowerCase().includes(query)
    );
  }, [options, value]);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        size="micro"
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("font-semibold", className)}
        {...props}
      />
      
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full bg-popover border rounded-md shadow-md max-h-48 overflow-y-auto mt-1">
          {filteredOptions.map((option, index) => (
            <div
              key={option.id || index}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onSelect?.(option);
                setIsOpen(false);
              }}
              className="px-2 py-1.5 text-[11px] cursor-pointer hover:bg-accent"
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
