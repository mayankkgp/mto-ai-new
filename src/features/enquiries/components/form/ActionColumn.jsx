import React from 'react';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Label } from '@/components/ui/label.jsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.jsx';
import { cn } from '@/lib/utils.js';
import { CornerDownLeft, CheckCircle2, Truck, Circle } from 'lucide-react';

const TaskCard = ({ task, type, isReadOnly, toggleTaskStatus, updateTask, editingTask, setEditingTask }) => {
  const isEditing = editingTask?.id === task.id;

  return (
    <div className={cn("group p-1.5 rounded border transition-all", task.isCompleted ? "bg-gray-50 border-gray-100 opacity-60" : "bg-white border-gray-200 shadow-sm hover:border-primary/20")}>
      <div className="flex items-start gap-1.5">
        <button onClick={() => !isReadOnly && toggleTaskStatus(type, task.id)} disabled={isReadOnly} className="shrink-0 min-w-[24px] min-h-[24px] flex items-center justify-center rounded hover:bg-gray-100">
          {task.isCompleted ? <CheckCircle2 size={14} className="text-[#059669]" /> : <Circle size={14} className="text-gray-300 hover:text-[#1E40AF]/80" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <input 
            type="date"
            value={task.dueDate}
            onChange={(e) => updateTask(type, task.id, { dueDate: e.target.value })}
            className="relative float-right ml-2 mb-1 bg-transparent border-none outline-none focus:underline p-0 cursor-pointer text-[9px] font-bold text-gray-500 hover:underline w-[70px] text-right [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            disabled={isReadOnly}
          />

          {isEditing && editingTask.field === 'actionText' ? (
            <textarea 
              autoFocus
              rows={1}
              value={editingTask.value}
              onFocus={(e) => { 
                e.target.setSelectionRange(e.target.value.length, e.target.value.length); 
                e.target.style.height = 'auto'; 
                e.target.style.height = e.target.scrollHeight + 'px'; 
              }}
              onChange={(e) => { 
                setEditingTask({ ...editingTask, value: e.target.value }); 
                e.target.style.height = 'auto'; 
                e.target.style.height = e.target.scrollHeight + 'px'; 
              }}
              onBlur={() => {
                updateTask(type, task.id, { actionText: editingTask.value });
                setEditingTask(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && e.target.blur()}
              className="w-[calc(100%-80px)] mt-1 bg-white border border-gray-200 rounded px-1 py-0.5 text-[11px] font-bold outline-none focus:border-[#1E40AF] focus:ring-0 resize-none placeholder:font-normal placeholder:text-gray-400 block"
            />
          ) : (
            <p 
              onClick={() => !isReadOnly && setEditingTask({ id: task.id, field: 'actionText', value: task.actionText })}
              className={cn("text-[11px] mt-1 break-words leading-tight", task.isCompleted ? "line-through text-gray-400 font-bold" : "text-gray-800 font-bold hover:text-[#1E40AF]")}
            >
              {task.actionText}
            </p>
          )}

          <div className="clear-both"></div>

          {isEditing && editingTask.field === 'remark' ? (
            <textarea 
              autoFocus
              rows={1}
              value={editingTask.value}
              onFocus={(e) => { 
                e.target.setSelectionRange(e.target.value.length, e.target.value.length); 
                e.target.style.height = 'auto'; 
                e.target.style.height = e.target.scrollHeight + 'px'; 
              }}
              onChange={(e) => { 
                setEditingTask({ ...editingTask, value: e.target.value }); 
                e.target.style.height = 'auto'; 
                e.target.style.height = e.target.scrollHeight + 'px'; 
              }}
              onBlur={() => {
                updateTask(type, task.id, { remark: editingTask.value });
                setEditingTask(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && e.target.blur()}
              placeholder="Add remark..."
              className="w-full mt-1 bg-white border border-gray-200 rounded px-1 py-0.5 text-[10px] italic outline-none focus:border-[#1E40AF] focus:ring-0 resize-none block placeholder:not-italic placeholder:text-gray-400"
            />
          ) : task.remark ? (
            <p 
              onClick={() => !isReadOnly && setEditingTask({ id: task.id, field: 'remark', value: task.remark })}
              className={cn("text-[10px] mt-0.5 italic leading-tight block", task.isCompleted ? "text-gray-400" : "text-gray-500 hover:text-gray-700")}
            >
              {task.remark}
            </p>
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

const TaskBoard = ({ title, type, icon: Icon, tasks, isReadOnly, toggleTaskStatus, updateTask, editingTask, setEditingTask }) => {
  const activeCount = tasks.filter(t => !t.isCompleted).length;

  return (
    <div className={cn(
      "flex flex-col h-full",
      type === 'revenue' && "border-r border-gray-200"
    )}>
      <div className="px-3 py-1.5 bg-white border-b border-gray-200 flex items-center gap-2 shrink-0">
        <Icon size={12} className="text-[#6B7280]" />
        <h3 className="text-[9px] font-bold text-[#374151] uppercase tracking-wider">{title}</h3>
        <span className="ml-auto text-[9px] font-bold text-gray-500 bg-white px-1.5 py-0.5 rounded-full border border-gray-200">
          {activeCount}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto p-1 min-[height:801px]:p-2 space-y-1 min-[height:801px]:space-y-1.5 no-scrollbar">
        {tasks.length === 0 ? (
          <div className="py-8 flex flex-col items-center justify-center text-gray-300">
            <p className="text-[10px] font-medium uppercase tracking-tighter">No {title.split(' ')[0]} Actions</p>
          </div>
        ) : (
          [...tasks].sort((a, b) => {
            if (a.isCompleted !== b.isCompleted) return a.isCompleted ? 1 : -1;
            if (a.isCompleted && b.isCompleted) return (b.completedAt || 0) - (a.completedAt || 0);
            return 0;
          }).map(task => (
            <TaskCard 
              key={task.id} 
              task={task} 
              type={type}
              isReadOnly={isReadOnly}
              toggleTaskStatus={toggleTaskStatus}
              updateTask={updateTask}
              editingTask={editingTask}
              setEditingTask={setEditingTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

const TaskComposer = ({ isCreating, isReadOnly, setFormData }) => {
  const actionRef = React.useRef(null);
  const remarkRef = React.useRef(null);

  const [newAction, setNewAction] = React.useState({
    text: '',
    remark: '',
    type: 'revenue',
    dueDate: new Date().toISOString().split('T')[0]
  });

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

const ActionColumn = ({ formData, setFormData, isCreating, isReadOnly }) => {

  const [editingTask, setEditingTask] = React.useState(null);

  const toggleTaskStatus = (type, taskId) => {
    setFormData(prev => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        [type]: prev.tasks[type].map(t => 
          t.id === taskId ? { ...t, isCompleted: !t.isCompleted, completedAt: !t.isCompleted ? Date.now() : undefined } : t
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

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <TaskComposer 
        isCreating={isCreating} 
        isReadOnly={isReadOnly} 
        setFormData={setFormData} 
      />

      {/* Task Boards */}
      <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
        <div className={cn(
          "grid h-full",
          isCreating ? "grid-cols-1 gap-0" : "grid-cols-2 gap-0"
        )}>
          <TaskBoard 
            title="Revenue Tasks" 
            type="revenue" 
            icon={CheckCircle2} 
            tasks={formData.tasks.revenue} 
            isReadOnly={isReadOnly} 
            toggleTaskStatus={toggleTaskStatus} 
            updateTask={updateTask} 
            editingTask={editingTask} 
            setEditingTask={setEditingTask} 
          />
          <TaskBoard 
            title="Supply Tasks" 
            type="supply" 
            icon={Truck} 
            tasks={formData.tasks.supply} 
            isReadOnly={isReadOnly} 
            toggleTaskStatus={toggleTaskStatus} 
            updateTask={updateTask} 
            editingTask={editingTask} 
            setEditingTask={setEditingTask} 
          />
        </div>
      </div>
    </div>
  );
};

export default ActionColumn;
