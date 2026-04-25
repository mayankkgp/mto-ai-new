import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { Plus } from 'lucide-react';
import FormField from '@/components/ui/form-field.jsx';

/**
 * TaskComposer Component
 * Inline form to quickly add a new task.
 */
const TaskComposer = ({ onAdd }) => {
  const [newAction, setNewAction] = useState({
    text: '',
    type: 'Update',
    dueDate: new Date().toISOString().split('T')[0],
    remark: ''
  });

  const handleAddTask = () => {
    if (!newAction.text) return;
    
    // Pass the new task to the parent
    onAdd(newAction);
    
    // Reset local state
    setNewAction({
      text: '',
      type: 'Update',
      dueDate: new Date().toISOString().split('T')[0],
      remark: ''
    });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2.5 space-y-2.5">
      <div className="grid grid-cols-1 gap-2.5">
        <FormField label="Action Item" isRequired>
          <Textarea 
            size="micro"
            placeholder="Write the next action step..."
            value={newAction.text}
            onChange={(e) => setNewAction({ ...newAction, text: e.target.value })}
            className="min-h-[38px] bg-white border-gray-200"
          />
        </FormField>
        
        <FormField label="Remark">
          <Textarea 
            size="micro"
            placeholder="Add secondary notes or context..."
            value={newAction.remark}
            onChange={(e) => setNewAction({ ...newAction, remark: e.target.value })}
            className="min-h-[38px] bg-white border-gray-200"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-[1fr,auto,auto] items-end gap-2">
        <FormField label="Type">
          <ToggleGroup 
            type="single" 
            size="micro"
            value={newAction.type}
            onValueChange={(val) => val && setNewAction({ ...newAction, type: val })}
            className="justify-start bg-white border border-gray-200 rounded p-0.5 w-fit"
          >
            <ToggleGroupItem value="Update" className="px-3 py-1 h-6 text-[10px] font-bold uppercase rounded data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900 border-none shadow-none">
              Update
            </ToggleGroupItem>
            <ToggleGroupItem value="Call" className="px-3 py-1 h-6 text-[10px] font-bold uppercase rounded data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900 border-none shadow-none">
              Call
            </ToggleGroupItem>
            <ToggleGroupItem value="Meeting" className="px-3 py-1 h-6 text-[10px] font-bold uppercase rounded data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900 border-none shadow-none">
              Meeting
            </ToggleGroupItem>
          </ToggleGroup>
        </FormField>

        <FormField label="Due Date" isRequired>
          <Input 
            type="date"
            size="micro"
            value={newAction.dueDate}
            onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
            className="w-[96px] bg-white border-gray-200 date-micro"
          />
        </FormField>
        
        <Button 
          size="micro"
          onClick={handleAddTask}
          disabled={!newAction.text}
          className="h-8 pr-3 pl-2.5 gap-1 shadow-none border-gray-200"
        >
          <Plus size={14} />
          <span>ADD TASK</span>
        </Button>
      </div>
    </div>
  );
};

export default TaskComposer;
