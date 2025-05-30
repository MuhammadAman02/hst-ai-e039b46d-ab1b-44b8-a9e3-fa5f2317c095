import React from 'react';
import { Plus } from 'lucide-react';
import { Column, Task } from '../types';
import TaskCard from './TaskCard';

interface StatusColumnProps {
  column: Column;
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: string) => void;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ 
  column, 
  onTaskClick, 
  onAddTask 
}) => {
  return (
    <div className="bg-monday-lightGray rounded-lg p-4 min-h-[600px] w-80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: column.color }}
          />
          <h2 className="font-semibold text-gray-900">{column.title}</h2>
          <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask?.(column.id)}
          className="p-1 hover:bg-gray-200 rounded transition-colors duration-150"
        >
          <Plus size={16} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskClick={onTaskClick}
          />
        ))}
        
        {column.tasks.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">No tasks yet</p>
            <button
              onClick={() => onAddTask?.(column.id)}
              className="mt-2 text-monday-blue text-sm hover:underline"
            >
              Add your first task
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusColumn;