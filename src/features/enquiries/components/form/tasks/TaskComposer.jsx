import React from 'react';
import { useEnquiryDetail } from '@/contexts/EnquiryDetailContext.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { CornerDownLeft } from 'lucide-react';

const TaskComposer = ({ isCreating, isReadOnly }) => {
  const { addNewTask } = useEnquiryDetail();
  const actionRef = React.useRef(null);
  const remarkRef = React.useRef(null);

  const [newAction, setNewAction] = React.useState({
    text: '',
    remark: '',
    type: 'revenue',
    dueDate: new Date().toISOString().split('T')[0]
  });

  if (isReadOnly) {
    return null;
  }

  const handleTextareaChange = (e, field) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    setNewAction({ ...newAction, [field]: e.target.value });
  };

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

    if (actionRef.current) actionRef.current.style.height = 'auto';
    if (remarkRef.current) remarkRef.current.style.height = 'auto';
  };

  return (
    <div className="p-1.5 min-[height:801px]:p-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-1.5">
        {isCreating ? (
          <>
            <div className="flex flex-col gap-0.5">
              <Label variant="micro">Action Item *</Label>
              <Textarea 
                ref={actionRef}
                rows={1}
                size="micro"
                placeholder="What needs to be done?"
                value={newAction.text}
                onChange={(e) => handleTextareaChange(e, 'text')}
                className="w-full font-semibold"
                disabled={isReadOnly}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label variant="micro">Remark</Label>
              <Textarea 
                ref={remarkRef}
                rows={1}
                size="micro"
                placeholder="Add a remark (optional)"
                value={newAction.remark}
                onChange={(e) => handleTextareaChange(e, 'remark')}
                className="w-full"
                disabled={isReadOnly}
              />
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-end">
              <div className="flex flex-col gap-0.5 min-w-0">
                <Label variant="micro">Type *</Label>
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
                  className="w-full h-[26px] min-w-[60px]"
                >
                  <ToggleGroupItem value="revenue" className="flex-1">Rev</ToggleGroupItem>
                  <ToggleGroupItem value="supply" className="flex-1">Sup</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex flex-col gap-0.5">
                <Label variant="micro">Due Date *</Label>
                <Input 
                  type="date"
                  size="micro"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                  className="w-[96px] text-gray-500 date-micro"
                  disabled={isReadOnly}
                />
              </div>
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
            <div className="flex flex-col gap-0.5">
              <Label variant="micro">Action Item *</Label>
              <Textarea 
                ref={actionRef}
                rows={1}
                size="micro"
                placeholder="What needs to be done?"
                value={newAction.text}
                onChange={(e) => handleTextareaChange(e, 'text')}
                className="w-full font-semibold"
                disabled={isReadOnly}
              />
            </div>
            <div className="grid grid-cols-[auto_auto_1fr_auto] gap-1.5 items-end">
              <div className="flex flex-col gap-0.5">
                <Label variant="micro">Type *</Label>
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
                  className="w-full h-[26px] min-w-[60px]"
                >
                  <ToggleGroupItem value="revenue" className="flex-1">Rev</ToggleGroupItem>
                  <ToggleGroupItem value="supply" className="flex-1">Sup</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className="flex flex-col gap-0.5">
                <Label variant="micro">Due Date *</Label>
                <Input 
                  type="date"
                  size="micro"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                  className="w-[96px] text-gray-500 date-micro"
                  disabled={isReadOnly}
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <Label variant="micro">Remark</Label>
                <Textarea 
                  ref={remarkRef}
                  rows={1}
                  size="micro"
                  placeholder="Add a remark (optional)"
                  value={newAction.remark}
                  onChange={(e) => handleTextareaChange(e, 'remark')}
                  className="w-full"
                  disabled={isReadOnly}
                />
              </div>
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
