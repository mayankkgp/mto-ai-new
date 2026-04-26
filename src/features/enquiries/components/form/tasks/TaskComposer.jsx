import React from 'react';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { CornerDownLeft } from 'lucide-react';
import FormField from '@/components/ui/form-field.jsx';

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
    <div className="p-1.5 min-[height:801px]:p-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-1.5">
        {isCreating ? (
          <>
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

            <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-end">
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

              <div className="min-w-0">
                <Button 
                  size="icon" 
                  onClick={handleAddTask}
                  disabled={isReadOnly || !newAction.text.trim()}
                  className="h-[26px] w-full p-0 rounded"
                >
                  <CornerDownLeft size={14} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
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

            <div className="grid grid-cols-[auto_auto_1fr_auto] gap-1.5 items-end">
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

              <Button 
                size="icon" 
                onClick={handleAddTask}
                disabled={isReadOnly || !newAction.text.trim()}
                className="h-[26px] w-[26px] p-0 rounded"
              >
                <CornerDownLeft size={14} />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskComposer;