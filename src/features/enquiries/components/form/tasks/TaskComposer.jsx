import React from 'react';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { CornerDownLeft } from 'lucide-react';

const TaskComposer = ({ isCreating, isReadOnly, setFormData }) => {
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
    e.target.style.height = (e.target.scrollHeight + 2) + 'px';
    setNewAction({ ...newAction, [field]: e.target.value });
  };

  const handleAddTask = () => {
    if (!newAction.text.trim()) return;

    const task = {
      id: Math.random().toString(36).substr(2, 9),
      actionText: newAction.text,
      remark: newAction.remark,
      dueDate: newAction.dueDate,
      isCompleted: false,
      createdAt: new Date().toISOString()
    };

    setFormData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [newAction.type]: [...prev.tasks[newAction.type], task]
      }
    }));

    setNewAction({
      ...newAction,
      text: '',
      remark: ''
    });

    if (actionRef.current) actionRef.current.style.height = 'auto';
    if (remarkRef.current) remarkRef.current.style.height = 'auto';
  };

  return (
    <div className="p-3 bg-white border-b border-gray-200 shadow-sm">
      {isCreating ? (
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-0.5">
            <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Action Item *</Label>
            <Textarea 
              ref={actionRef}
              rows={1}
              placeholder="What needs to be done?"
              value={newAction.text}
              onChange={(e) => handleTextareaChange(e, 'text')}
              className="min-h-[26px] max-h-[120px] text-[11px] tracking-tight font-bold text-gray-800 px-1 py-1 resize-none overflow-y-auto rounded focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary outline-none border-gray-200 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={isReadOnly}
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Remark</Label>
            <Textarea 
              ref={remarkRef}
              rows={1}
              placeholder="Add a remark (optional)"
              value={newAction.remark}
              onChange={(e) => handleTextareaChange(e, 'remark')}
              className="min-h-[26px] max-h-[80px] text-[11px] tracking-tight italic text-gray-500 placeholder:not-italic placeholder:text-gray-400 px-1 py-1 resize-none overflow-y-auto rounded focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary outline-none border-gray-200 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={isReadOnly}
            />
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] gap-1.5 items-end">
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Type *</Label>
              <ToggleGroup 
                type="single" 
                value={newAction.type} 
                onValueChange={(val) => val && setNewAction({ ...newAction, type: val })}
                className="h-[26px] min-h-[26px] border border-gray-200 rounded p-0.5 bg-gray-50 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={isReadOnly}
              >
                <ToggleGroupItem value="revenue" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Rev</ToggleGroupItem>
                <ToggleGroupItem value="supply" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Sup</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Due Date *</Label>
              <Input 
                type="date"
                size="micro"
                value={newAction.dueDate}
                onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                className="h-[26px] min-h-[26px] text-[11px] tracking-tight text-gray-800 px-1 py-1 rounded focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary outline-none border-gray-200 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={isReadOnly}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-transparent uppercase tracking-normal mb-0.5 select-none">Action</Label>
              <Button 
                size="sm" 
                onClick={handleAddTask}
                disabled={isReadOnly || !newAction.text.trim()}
                className="h-[26px] w-[26px] min-h-[26px] p-0 bg-primary text-white hover:bg-primary/90 rounded"
              >
                <CornerDownLeft size={14} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-col gap-0.5">
            <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Action Item *</Label>
            <Textarea 
              ref={actionRef}
              rows={1}
              placeholder="What needs to be done?"
              value={newAction.text}
              onChange={(e) => handleTextareaChange(e, 'text')}
              className="min-h-[26px] max-h-[120px] text-[11px] tracking-tight font-bold text-gray-800 px-1 py-1 resize-none overflow-y-auto rounded focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary outline-none border-gray-200 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
              disabled={isReadOnly}
            />
          </div>
          <div className="grid grid-cols-[auto_auto_1fr_auto] gap-1.5 items-end">
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Type *</Label>
              <ToggleGroup 
                type="single" 
                value={newAction.type} 
                onValueChange={(val) => val && setNewAction({ ...newAction, type: val })}
                className="h-[26px] min-h-[26px] border border-gray-200 rounded p-0.5 bg-gray-50 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={isReadOnly}
              >
                <ToggleGroupItem value="revenue" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Rev</ToggleGroupItem>
                <ToggleGroupItem value="supply" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Sup</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Due Date *</Label>
              <Input 
                type="date"
                size="micro"
                value={newAction.dueDate}
                onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                className="h-[26px] min-h-[26px] w-28 text-[11px] tracking-tight text-gray-800 px-1 py-1 rounded focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary outline-none border-gray-200 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={isReadOnly}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-gray-500 uppercase tracking-normal mb-0.5">Remark</Label>
              <Textarea 
                ref={remarkRef}
                rows={1}
                placeholder="Add a remark (optional)"
                value={newAction.remark}
                onChange={(e) => handleTextareaChange(e, 'remark')}
                className="min-h-[26px] max-h-[80px] text-[11px] tracking-tight italic text-gray-500 placeholder:not-italic placeholder:text-gray-400 px-1 py-1 resize-none overflow-y-auto rounded focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary outline-none border-gray-200 disabled:opacity-100 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                disabled={isReadOnly}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <Label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-transparent uppercase tracking-normal mb-0.5 select-none">Action</Label>
              <Button 
                size="sm" 
                onClick={handleAddTask}
                disabled={isReadOnly || !newAction.text.trim()}
                className="h-[26px] w-[26px] min-h-[26px] p-0 bg-primary text-white hover:bg-primary/90 rounded"
              >
                <CornerDownLeft size={14} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskComposer;
