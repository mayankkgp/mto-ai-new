import React from 'react';
import { cn } from '@/lib/utils.js';
import TaskCard from './TaskCard.jsx';

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

export default TaskBoard;
