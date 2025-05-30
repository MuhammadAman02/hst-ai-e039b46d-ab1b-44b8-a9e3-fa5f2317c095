import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Column, Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';

interface StatusColumnProps {
  column: Column;
  onTaskClick?: (task: Task) => void;
  onAddTask?: (status: TaskStatus) => void;
  onDragStart?: (task: Task) => void;
  onDragEnd?: () => void;
  onDrop?: (status: TaskStatus) => void;
  draggedTask?: Task | null;
}

const StatusColumn: React.FC<StatusColumnProps> = ({ 
  column, 
  onTaskClick, 
  onAddTask,
  onDragStart,
  onDragEnd,
  onDrop,
  draggedTask
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onDrop?.(column.id as TaskStatus);
  };

  return (
    <div 
      className={`bg-gray-50 rounded-lg p-4 min-h-[600px] w-80 transition-all duration-200 ${
        isDragOver ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : 'border-2 border-transparent'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
          onClick={() => onAddTask?.(column.id as TaskStatus)}
          className="p-1 hover:bg-gray-200 rounded transition-colors duration-150 group"
          title={`Add task to ${column.title}`}
        >
          <Plus size={16} className="text-gray-500 group-hover:text-gray-700" />
        </button>
      </div>

      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTaskClick={onTaskClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggedTask?.id === task.id}
          />
        ))}
        
        {column.tasks.length === 0 && (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Plus size={20} className="text-gray-400" />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">No tasks yet</p>
            <button
              onClick={() => onAddTask?.(column.id as TaskStatus)}
              className="text-blue-600 text-sm hover:underline font-medium"
            >
              Add your first task
            </button>
          </div>
        )}
      </div>

      {isDragOver && draggedTask && (
        <div className="mt-4 p-3 border-2 border-blue-300 border-dashed rounded-lg bg-blue-50">
          <p className="text-blue-600 text-sm text-center font-medium">
            Drop task here to move to {column.title}
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusColumn;