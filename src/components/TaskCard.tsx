import React from 'react';
import { Calendar, User, AlertCircle, GripVertical } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
  onDragStart?: (task: Task) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onTaskClick, 
  onDragStart, 
  onDragEnd,
  isDragging = false 
}) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date() && task.status !== 'done';
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger click when clicking on drag handle
    if ((e.target as HTMLElement).closest('[data-drag-handle]')) return;
    
    onTaskClick?.(task);
  };

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Starting drag for task:', task.title);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
    onDragStart?.(task);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('Ending drag for task:', task.title);
    onDragEnd?.();
  };

  return (
    <div
      className={`task-card group cursor-pointer animate-fade-in ${
        isDragging ? 'opacity-50 rotate-1 scale-105 shadow-xl z-50' : ''
      }`}
      onClick={handleCardClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-start gap-2">
        {/* Drag Handle */}
        <div
          data-drag-handle
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-grab active:cursor-grabbing mt-1 p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical size={14} className="text-gray-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1 pr-2">
              {task.title}
            </h3>
            <span className={`status-badge flex-shrink-0 ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {task.assignee && (
                <div className="flex items-center gap-1" title={task.assignee.name}>
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: task.assignee.color }}
                  >
                    {task.assignee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              )}
            </div>

            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs ${
                isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-500'
              }`}>
                {isOverdue(task.dueDate) && <AlertCircle size={12} />}
                <Calendar size={12} />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Task Status Indicator */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1">
              <div 
                className={`h-1 rounded-full transition-all duration-300 ${
                  task.status === 'done' ? 'w-full bg-green-500' :
                  task.status === 'progress' ? 'w-2/3 bg-blue-500' :
                  task.status === 'stuck' ? 'w-1/3 bg-red-500' :
                  'w-1/4 bg-gray-400'
                }`}
              />
            </div>
            <span className="text-xs text-gray-500 capitalize">
              {task.status === 'progress' ? 'In Progress' : task.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;