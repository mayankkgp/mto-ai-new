import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command.jsx';
import { UserPlus, X } from 'lucide-react';
import { cn } from '@/lib/utils.js';
import { Label } from '@/components/ui/label.jsx';

const MultiSelect = ({ label, selectedUsers, onToggle, isReadOnly, hasError, users }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-0.5">
      {label && <Label variant="micro">{label}</Label>}
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button 
            type="button"
            disabled={isReadOnly}
            className={cn(
              "flex flex-wrap items-center gap-1 min-h-[26px] p-[2px] w-full bg-white border border-gray-200 rounded text-left focus-within:border-[#1E40AF]",
              isReadOnly 
                ? "bg-gray-50 cursor-not-allowed" 
                : "cursor-pointer hover:border-primary/40",
              hasError && "border-red-500 bg-red-50"
            )}
          >
            {selectedUsers?.map(user => (
              <div 
                key={user.id}
                className="flex items-center gap-1 px-1 py-0.5 text-[9px] font-bold text-gray-600 bg-gray-100 border border-gray-200 rounded"
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
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-white border border-gray-200 rounded shadow-xl overflow-hidden flex flex-col" align="start">
            <Command className="bg-transparent">
              <CommandInput 
                size="micro-search"
                placeholder="Search user..." 
              />
              <CommandList className="max-h-[160px] overflow-y-auto no-scrollbar">
                <CommandEmpty className="px-2 py-3 text-center text-[10px] text-gray-400 italic">No user found.</CommandEmpty>
                <CommandGroup className="p-0">
                  {users.map((user) => {
                    const isSelected = selectedUsers?.some(u => u.id === user.id);
                    return (
                      <CommandItem
                        key={user.id}
                        variant="micro-dropdown-items"
                        onSelect={() => onToggle(user)}
                        className="aria-selected:bg-gray-50 px-2"
                        data-checked={isSelected}
                      >
                        <span className={cn("truncate", isSelected && "text-primary font-bold")}>
                          {user.name}
                        </span>
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

export default MultiSelect;
