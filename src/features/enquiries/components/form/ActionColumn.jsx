import React from 'react';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { cn } from '@/lib/utils.js';
import { Trash2, CornerDownLeft, CheckCircle2, Truck } from 'lucide-react';

const ActionColumn = ({ formData, setFormData, isCreating, isReadOnly }) => {
  const actionRef = React.useRef(null);
  const remarkRef = React.useRef(null);

  const [newAction, setNewAction] = React.useState({
    text: '',
    remark: '',
    type: 'revenue',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [editingTask, setEditingTask] = React.useState(null);

  const handleAddTask = () => {
    if (!newAction.text.trim()) return;

    const task = {
      id: Math.random().toString(36).substr(2, 9),
      text: newAction.text,
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

  const toggleTaskStatus = (type, taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [type]: prev.tasks[type].map(t => 
          t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
        )
      }
    }));
  };

  const updateTask = (type, taskId, updates) => {
    setFormData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [type]: prev.tasks[type].map(t => 
          t.id === taskId ? { ...t, ...updates } : t
        )
      }
    }));
  };

  const deleteTask = (type, taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [type]: prev.tasks[type].filter(t => t.id !== taskId)
      }
    }));
  };

  const TaskCard = ({ task, type }) => {
    const isEditing = editingTask?.id === task.id;

    return (
      <div className={cn(
        "group p-1.5 bg-white border-b border-gray-100 transition-all hover:bg-gray-50/50",
        task.isCompleted && "opacity-60"
      )}>
        <div className="flex items-start gap-1.5">
          <Checkbox 
            checked={task.isCompleted}
            onCheckedChange={() => toggleTaskStatus(type, task.id)}
            className="rounded-full mt-0.5 h-3.5 w-3.5"
            disabled={isReadOnly}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                {isEditing && editingTask.field === 'text' ? (
                  <Textarea 
                    autoFocus
                    value={editingTask.value}
                    onChange={(e) => setEditingTask({ ...editingTask, value: e.target.value })}
                    onBlur={() => {
                      updateTask(type, task.id, { text: editingTask.value });
                      setEditingTask(null);
                    }}
                    className="text-[11px] p-1 min-h-[26px] leading-tight rounded border-gray-200 focus-visible:ring-0"
                  />
                ) : (
                  <p 
                    onClick={() => !isReadOnly && setEditingTask({ id: task.id, field: 'text', value: task.text })}
                    className={cn(
                      "text-[11px] font-medium leading-tight cursor-pointer break-words",
                      task.isCompleted && "line-through text-gray-400"
                    )}
                  >
                    {task.text}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                <Input 
                  type="date"
                  size="micro"
                  value={task.dueDate}
                  onChange={(e) => updateTask(type, task.id, { dueDate: e.target.value })}
                  className="w-fit h-4 text-[8px] p-0 border-none bg-transparent font-medium text-gray-400 text-right"
                  disabled={isReadOnly}
                />
                {!isReadOnly && (
                  <button 
                    onClick={() => deleteTask(type, task.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity"
                  >
                    <Trash2 size={10} />
                  </button>
                )}
              </div>
            </div>

            {task.remark || (isEditing && editingTask.field === 'remark') ? (
              <div className="mt-0.5">
                {isEditing && editingTask.field === 'remark' ? (
                  <Textarea 
                    autoFocus
                    value={editingTask.value}
                    onChange={(e) => setEditingTask({ ...editingTask, value: e.target.value })}
                    onBlur={() => {
                      updateTask(type, task.id, { remark: editingTask.value });
                      setEditingTask(null);
                    }}
                    placeholder="Add remark..."
                    className="text-[10px] p-1 min-h-[20px] leading-tight text-gray-500 rounded border-gray-200 focus-visible:ring-0"
                  />
                ) : (
                  <p 
                    onClick={() => !isReadOnly && setEditingTask({ id: task.id, field: 'remark', value: task.remark })}
                    className="text-[10px] text-gray-500 leading-tight cursor-pointer italic"
                  >
                    {task.remark}
                  </p>
                )}
              </div>
            ) : !isReadOnly && (
              <button 
                onClick={() => setEditingTask({ id: task.id, field: 'remark', value: '' })}
                className="mt-0.5 text-[9px] text-primary/60 hover:text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                + Remark
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleTextareaChange = (e, field) => {
    e.target.style.height = 'auto';
    e.target.style.height = (e.target.scrollHeight + 2) + 'px';
    setNewAction({ ...newAction, [field]: e.target.value });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Task Composer */}
      <div className="p-3 bg-white border-b border-gray-200 shadow-sm">
        {isCreating ? (
          /* Narrow View (Stack) */
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
          /* Wide View (Compressed) */
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

      {/* Task Boards */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
        <div className={cn(
          "grid h-full",
          isCreating ? "grid-cols-1 gap-0" : "grid-cols-2 gap-0"
        )}>
          {/* Revenue Board */}
          <div className={cn(
            "flex flex-col h-full",
            !isCreating && "border-r border-gray-200"
          )}>
            <div className="px-3 py-1.5 bg-white border-b border-gray-200 flex items-center gap-2 shrink-0">
              <CheckCircle2 size={12} className="text-[#6B7280]" />
              <h3 className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">Revenue Tasks</h3>
              <span className="ml-auto text-[9px] font-bold text-gray-500 bg-white px-1.5 py-0.5 rounded-full border border-gray-200">
                {formData.tasks.revenue.length}
              </span>
            </div>
            <div className="flex flex-col">
              {formData.tasks.revenue.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center text-gray-300">
                  <p className="text-[10px] font-medium uppercase tracking-tighter">No Revenue Actions</p>
                </div>
              ) : (
                formData.tasks.revenue.map(task => (
                  <TaskCard key={task.id} task={task} type="revenue" />
                ))
              )}
            </div>
          </div>

          {/* Supply Board */}
          <div className="flex flex-col h-full">
            <div className="px-3 py-1.5 bg-white border-b border-gray-200 flex items-center gap-2 shrink-0">
              <Truck size={12} className="text-[#6B7280]" />
              <h3 className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">Supply Tasks</h3>
              <span className="ml-auto text-[9px] font-bold text-gray-500 bg-white px-1.5 py-0.5 rounded-full border border-gray-200">
                {formData.tasks.supply.length}
              </span>
            </div>
            <div className="flex flex-col">
              {formData.tasks.supply.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center text-gray-300">
                  <p className="text-[10px] font-medium uppercase tracking-tighter">No Supply Actions</p>
                </div>
              ) : (
                formData.tasks.supply.map(task => (
                  <TaskCard key={task.id} task={task} type="supply" />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionColumn;
