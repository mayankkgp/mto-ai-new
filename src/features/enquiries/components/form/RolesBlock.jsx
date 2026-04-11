import React from 'react';
import { Label } from '@/components/ui/label.jsx';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
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

const MOCK_USERS = [
  { id: 'u1', name: 'Mayank Kumar' },
  { id: 'u2', name: 'Rahul Sharma' },
  { id: 'u3', name: 'Priya Singh' },
  { id: 'u4', name: 'Amit Patel' },
  { id: 'u5', name: 'Sneha Reddy' }
];

const UserSelector = ({ label, selectedUsers, onToggle, isReadOnly }) => {
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
            className={cn(
              "w-full cursor-pointer focus:outline-none group flex flex-wrap items-center gap-1 p-[2px] bg-white border border-gray-200 rounded min-h-[26px] transition-colors hover:border-primary/40 text-left",
              isReadOnly && "bg-gray-50 cursor-not-allowed"
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
                  {MOCK_USERS.map((user) => {
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

const RolesBlock = ({ formData, setFormData, isReadOnly }) => {
  const toggleUser = (role, user) => {
    setFormData(prev => {
      const currentUsers = prev.roles?.[role] || [];
      const exists = currentUsers.some(u => u.id === user.id);
      
      const newUsers = exists 
        ? currentUsers.filter(u => u.id !== user.id)
        : [...currentUsers, user];
        
      return {
        ...prev,
        roles: {
          ...prev.roles,
          [role]: newUsers
        }
      };
    });
  };

  return (
    <div className="grid grid-cols-2 gap-1.5">
      <UserSelector 
        label="Revenue Role *" 
        selectedUsers={formData.roles?.revenue} 
        onToggle={(user) => toggleUser('revenue', user)}
        isReadOnly={isReadOnly}
      />
      <UserSelector 
        label="Supply Role" 
        selectedUsers={formData.roles?.supply} 
        onToggle={(user) => toggleUser('supply', user)}
        isReadOnly={isReadOnly}
      />
    </div>
  );
};

export default RolesBlock;
