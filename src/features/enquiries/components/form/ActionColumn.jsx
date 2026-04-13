import React from 'react';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { cn } from '@/lib/utils.js';
import { Plus, Trash2 } from 'lucide-react';

const ActionColumn = ({ formData, setFormData, isCreating, isReadOnly }) => {
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
        "group p-2 bg-white border border-gray-100 rounded shadow-sm transition-all hover:border-primary/20",
        task.isCompleted && "opacity-60"
      )}>
        <div className="flex items-start gap-2">
          <Checkbox 
            checked={task.isCompleted}
            onCheckedChange={() => toggleTaskStatus(type, task.id)}
            className="rounded-full mt-1"
            disabled={isReadOnly}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <Input 
                type="date"
                size="micro"
                value={task.dueDate}
                onChange={(e) => updateTask(type, task.id, { dueDate: e.target.value })}
                className="w-fit h-5 text-[9px] p-1 border-none bg-gray-50 font-medium"
                disabled={isReadOnly}
              />
              {!isReadOnly && (
                <button 
                  onClick={() => deleteTask(type, task.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>

            {isEditing && editingTask.field === 'text' ? (
              <Textarea 
                autoFocus
                value={editingTask.value}
                onChange={(e) => setEditingTask({ ...editingTask, value: e.target.value })}
                onBlur={() => {
                  updateTask(type, task.id, { text: editingTask.value });
                  setEditingTask(null);
                }}
                className="text-xs p-1 min-h-[40px] leading-tight"
              />
            ) : (
              <p 
                onClick={() => !isReadOnly && setEditingTask({ id: task.id, field: 'text', value: task.text })}
                className={cn(
                  "text-[11px] font-medium leading-tight cursor-pointer",
                  task.isCompleted && "line-through text-gray-400"
                )}
              >
                {task.text}
              </p>
            )}

            {task.remark || (isEditing && editingTask.field === 'remark') ? (
              <div className="mt-1">
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
                    className="text-[10px] p-1 min-h-[30px] leading-tight text-gray-500"
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
                className="mt-1 text-[9px] text-primary/60 hover:text-primary font-medium"
              >
                + Add Remark
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Task Composer */}
      <div className="p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <Label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">New Action Item</Label>
        </div>

        {isCreating ? (
          /* Narrow View (Stack) */
          <div className="space-y-2">
            <Textarea 
              placeholder="What needs to be done?"
              value={newAction.text}
              onChange={(e) => setNewAction({ ...newAction, text: e.target.value })}
              className="min-h-[60px] text-xs resize-none"
              disabled={isReadOnly}
            />
            <Textarea 
              placeholder="Add a remark (optional)"
              value={newAction.remark}
              onChange={(e) => setNewAction({ ...newAction, remark: e.target.value })}
              className="min-h-[40px] text-[11px] resize-none text-gray-500"
              disabled={isReadOnly}
            />
            <div className="grid grid-cols-[auto_1fr_auto] gap-2 items-center">
              <ToggleGroup 
                type="single" 
                value={newAction.type} 
                onValueChange={(val) => val && setNewAction({ ...newAction, type: val })}
                className="h-7 border border-gray-200 rounded p-0.5 bg-gray-50"
                disabled={isReadOnly}
              >
                <ToggleGroupItem value="revenue" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Rev</ToggleGroupItem>
                <ToggleGroupItem value="supply" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Sup</ToggleGroupItem>
              </ToggleGroup>
              <Input 
                type="date"
                size="micro"
                value={newAction.dueDate}
                onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                className="h-7 text-[10px]"
                disabled={isReadOnly}
              />
              <Button 
                size="sm" 
                onClick={handleAddTask}
                disabled={isReadOnly || !newAction.text.trim()}
                className="h-7 px-3 bg-primary text-white hover:bg-primary/90"
              >
                <Plus size={14} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
        ) : (
          /* Wide View (Compressed) */
          <div className="space-y-2">
            <Textarea 
              placeholder="What needs to be done?"
              value={newAction.text}
              onChange={(e) => setNewAction({ ...newAction, text: e.target.value })}
              className="min-h-[50px] text-xs resize-none"
              disabled={isReadOnly}
            />
            <div className="grid grid-cols-[auto_auto_1fr_auto] gap-2 items-center">
              <ToggleGroup 
                type="single" 
                value={newAction.type} 
                onValueChange={(val) => val && setNewAction({ ...newAction, type: val })}
                className="h-7 border border-gray-200 rounded p-0.5 bg-gray-50"
                disabled={isReadOnly}
              >
                <ToggleGroupItem value="revenue" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Rev</ToggleGroupItem>
                <ToggleGroupItem value="supply" className="text-[9px] px-2 h-full uppercase font-bold data-[state=on]:bg-white data-[state=on]:shadow-sm">Sup</ToggleGroupItem>
              </ToggleGroup>
              <Input 
                type="date"
                size="micro"
                value={newAction.dueDate}
                onChange={(e) => setNewAction({ ...newAction, dueDate: e.target.value })}
                className="h-7 w-28 text-[10px]"
                disabled={isReadOnly}
              />
              <Input 
                placeholder="Add a remark (optional)"
                value={newAction.remark}
                onChange={(e) => setNewAction({ ...newAction, remark: e.target.value })}
                className="h-7 text-[11px] text-gray-500"
                disabled={isReadOnly}
              />
              <Button 
                size="sm" 
                onClick={handleAddTask}
                disabled={isReadOnly || !newAction.text.trim()}
                className="h-7 px-4 bg-primary text-white hover:bg-primary/90"
              >
                <Plus size={14} className="mr-1" />
                Add Task
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Task Boards */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-3">
        <div className={cn(
          "grid gap-4 h-full",
          isCreating ? "grid-cols-1" : "grid-cols-2"
        )}>
          {/* Revenue Board */}
          <div className={cn(
            "flex flex-col gap-2",
            !isCreating && "pr-2 border-r border-gray-100"
          )}>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue Tasks</Label>
              <span className="ml-auto text-[10px] font-bold text-gray-300">{formData.tasks.revenue.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {formData.tasks.revenue.length === 0 ? (
                <div className="py-8 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center text-gray-300">
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
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Supply Tasks</Label>
              <span className="ml-auto text-[10px] font-bold text-gray-300">{formData.tasks.supply.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {formData.tasks.supply.length === 0 ? (
                <div className="py-8 border border-dashed border-gray-200 rounded flex flex-col items-center justify-center text-gray-300">
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
