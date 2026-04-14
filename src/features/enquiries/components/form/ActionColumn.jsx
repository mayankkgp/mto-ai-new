import React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils.js';
import { CheckCircle2, Truck } from 'lucide-react';
import TaskComposer from './tasks/TaskComposer.jsx';
import TaskBoard from './tasks/TaskBoard.jsx';

const ActionColumn = ({ isCreating, isReadOnly }) => {
  const { watch, setValue } = useFormContext();
  const formData = watch();
  const [editingTask, setEditingTask] = React.useState(null);

  const toggleTaskStatus = (type, taskId) => {
    const currentTasks = formData.tasks[type] || [];
    const updatedTasks = currentTasks.map(t => 
      t.id === taskId ? { ...t, isCompleted: !t.isCompleted, completedAt: !t.isCompleted ? Date.now() : undefined } : t
    );
    setValue(`tasks.${type}`, updatedTasks);
  };

  const updateTask = (type, taskId, updates) => {
    const currentTasks = formData.tasks[type] || [];
    const updatedTasks = currentTasks.map(t => 
      t.id === taskId ? { ...t, ...updates } : t
    );
    setValue(`tasks.${type}`, updatedTasks);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {formData.status === 'Dropped' && formData.dropReason && (
        <div className="bg-[#FEF2F2] border-b border-[#FECACA] p-3 min-[height:801px]:p-4 shrink-0">
          <label className="block text-[10px] min-[resolution:1.5dppx]:text-[9px] font-bold text-[#991B1B] uppercase tracking-wider mb-1">
            Drop Reason
          </label>
          <p className="text-[11px] text-[#7F1D1D] leading-relaxed whitespace-pre-wrap break-words">
            {formData.dropReason}
          </p>
        </div>
      )}

      {!isReadOnly && (
        <TaskComposer 
          isCreating={isCreating} 
          isReadOnly={isReadOnly} 
        />
      )}

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
            tasks={formData.tasks?.revenue || []} 
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
            tasks={formData.tasks?.supply || []} 
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
