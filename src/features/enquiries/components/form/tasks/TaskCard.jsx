import React from 'react';
import { cn } from '@/lib/utils.js';
import { CheckCircle2, Circle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea.jsx';

const TaskCard = ({ task, isReadOnly, onToggle, onUpdate }) => {
  const [editingField, setEditingField] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  return (
    <div className={cn(
      "group p-1.5 rounded border transition-all", 
      task.isCompleted ? "bg-gray-50 border-gray-100 opacity-60" : cn("bg-white border-gray-200 shadow-sm", !isReadOnly && "hover:border-primary/20")
    )}>
      <div className="flex items-start gap-1.5">
        <button onClick={() => !isReadOnly && onToggle()} disabled={isReadOnly} className={cn("shrink-0 min-w-[24px] min-h-[24px] flex items-center justify-center rounded disabled:cursor-not-allowed", !isReadOnly && "hover:bg-gray-100")}>
          {task.isCompleted ? <CheckCircle2 size={14} className="text-[#059669]" /> : <Circle size={14} className={cn("text-gray-300", !isReadOnly && "hover:text-[#1E40AF]/80")} />}
        </button>
        
        <div className="flex-1 min-w-0">
          <input 
            type="date"
            value={task.dueDate}
            onChange={(e) => onUpdate({ dueDate: e.target.value })}
            className={cn(
              "relative float-right ml-2 mb-1 bg-transparent border-none outline-none focus:underline p-0 cursor-pointer text-[9px] font-bold w-[70px] text-right shrink-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer",
              isReadOnly ? "text-gray-400 cursor-not-allowed" : "text-gray-500 hover:underline"
            )}
            disabled={isReadOnly}
          />

          {editingField === 'actionText' ? (
            <div 
              contentEditable
              suppressContentEditableWarning
              autoFocus
              onInput={(e) => setEditValue(e.currentTarget.innerText)}
              onBlur={() => {
                onUpdate({ actionText: editValue });
                setEditingField(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.blur();
                }
              }}
              className="mt-1 bg-white border border-gray-200 rounded px-1 py-0.5 text-[11px] font-bold outline-none focus:border-[#1E40AF] focus:ring-0 block min-h-[20px]"
              // We use a React ref or dangerouslySetInnerHTML approach if needed, but for simple initialization:
              ref={(el) => { if (el && document.activeElement !== el && el.innerText !== editValue) el.innerText = editValue; }}
            />
          ) : (
            <p 
              onClick={() => !isReadOnly && (setEditingField('actionText'), setEditValue(task.actionText))}
              className={cn(
                "text-[11px] mt-1 break-words leading-tight", 
                task.isCompleted ? "line-through text-gray-400 font-bold" : isReadOnly ? "text-gray-800 font-bold cursor-not-allowed" : "text-gray-800 font-bold cursor-pointer hover:text-[#1E40AF]"
              )}
            >
              {task.actionText}
            </p>
          )}

          <div className="clear-both"></div>

          <div className="w-full mt-0.5">
            {editingField === 'remark' ? (
              <Textarea
                autoFocus
                size="micro"
                rows={1}
                value={editValue}
                onFocus={(e) => {
                  e.target.setSelectionRange(e.target.value.length, e.target.value.length);
                }}
                onChange={(e) => {
                  setEditValue(e.target.value);
                }}
                onBlur={() => {
                  onUpdate({ remark: editValue });
                  setEditingField(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.target.blur();
                  }
                }}
                placeholder="Add remark..."
                className="mt-1 w-full text-[10px] italic bg-white border-gray-200 placeholder:not-italic placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-[#1E40AF] focus-visible:ring-0"
              />
            ) : task.remark ? (
              <p 
                onClick={() => !isReadOnly && (setEditingField('remark'), setEditValue(task.remark))}
                className={cn(
                  "text-[10px] mt-0.5 italic leading-tight block", 
                  task.isCompleted ? "text-gray-400" : isReadOnly ? "text-gray-500 cursor-not-allowed" : "text-gray-500 cursor-pointer hover:text-gray-700"
                )}
              >
                {task.remark}
              </p>
            ) : !isReadOnly && (
              <button 
                onClick={() => (setEditingField('remark'), setEditValue(''))}
                className="mt-0.5 text-[9px] text-primary/60 hover:text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
              >
                + Remark
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
