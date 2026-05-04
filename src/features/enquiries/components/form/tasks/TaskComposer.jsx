import React from 'react';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { CornerDownLeft } from 'lucide-react';
import FormField from '@/components/ui/form-field.jsx';
import { cn } from '@/lib/utils.js';

const TaskComposer = ({ isCreating, isReadOnly }) => {
  const { addNewTask } = useEnquiryDetail();

  const [newAction, setNewAction] = React.useState({
    text: '',
    remark: '',
    type: 'revenue',
    dueDate: new Date().toISOString().split('T')[0]
  });

  if (isReadOnly) {
    return null;
  }

  const handleAddTask = async () => {
    if (!newAction.text.trim()) return;

    await addNewTask({
      actionText: newAction.text,
      remark: newAction.remark,
      dueDate: newAction.dueDate,
      assignedTo: newAction.type === 'revenue' ? 'u_001' : 's_001'
    });

    setNewAction({
      ...newAction,
      text: '',
      remark: ''
    });
  };

  return (
    <div className="p-1.5 bg-white border-b border-gray-200 shadow-sm @container">
      <div className={cn(
        "grid gap-1.5 items-end",
        isCreating 
          ? "grid-cols-[1fr_auto] @[210px]:grid-cols-[1fr_auto_auto]" 
          : "grid-cols-[1fr_auto_auto] @[430px]:grid-cols-[auto_auto_1fr_auto]"
      )}>
        {/* Row 1: Action Item (Full Width) */}
        <div className="col-span-full">
          <FormField label="Action Item" isRequired>
            <Textarea 
              rows={1}
              size="micro"
              placeholder="What needs to be done?"
              value={newAction.text}
              onChange={(e) => setNewAction({ ...newAction, text: e.target.value })}
              className="font-semibold"
              disabled={isReadOnly}
            />
          </FormField>
        </div>

        {/* Remark Field - Responsive based on mode/width */}
        <div className={cn(
          "col-span-full",
          !isCreating && "@[430px]:col-span-1 @[430px]:order-3"
        )}>
          <FormField label="Remark">
            <Textarea 
              rows={1}
              size="micro"
              placeholder="Add a remark (optional)"
              value={newAction.remark}
              onChange={(e) => setNewAction({ ...newAction, remark: e.target.value })}
              disabled={isReadOnly}
            />
          </FormField>
        </div>

        {/* Type Selection */}
        <div className={cn(
          "col-span-1",
          !isCreating && "@[430px]:order-1"
        )}>
          <FormField label="Type" isRequired>
            <ToggleGroup 
              type="single" 
              value={newAction.type} 
              onValueChange={(val) => {
                if (!val) return;
                const stringVal = Array.isArray(val) ? val[0] : (typeof val === 'object' && val.target ? val.target.value : val);
                if (stringVal) setNewAction({ ...newAction, type: stringVal });
              }}
              variant="flat"
              size="micro"
              disabled={isReadOnly}
              className="min-w-[60px]"
            >
              <ToggleGroupItem value="revenue" className="flex-1">Rev</ToggleGroupItem>
              <ToggleGroupItem value="supply" className="flex-1">Sup</ToggleGroupItem>
            </ToggleGroup>
          </FormField>
        </div>
        
        {/* Due Date Input */}
        <div className={cn(
          "col-span-1",
          !isCreating && "@[430px]:order-2"
        )}>
          <FormField label="Due Date" isRequired>
            <Input 
              type="date"
              size="micro"
              value={newAction.dueDate}
              onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
              className="w-[96px] date-micro"
              disabled={isReadOnly}
            />
          </FormField>
        </div>

        {/* Submit Action */}
        <div className={cn(
          isCreating ? "col-span-full @[210px]:col-span-1" : "col-span-1",
          !isCreating && "@[430px]:order-4"
        )}>
          <Button 
            size="icon" 
            onClick={handleAddTask}
            disabled={isReadOnly || !newAction.text.trim()}
            className={cn(
              "h-[26px] p-0 rounded",
              isCreating ? "w-full @[210px]:w-[26px]" : "w-[26px]"
            )}
          >
            <CornerDownLeft size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskComposer;