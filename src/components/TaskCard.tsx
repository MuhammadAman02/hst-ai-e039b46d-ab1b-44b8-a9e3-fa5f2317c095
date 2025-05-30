import React from 'react';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick }) => {
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

  return (
    <div 
      className="task-card cursor-pointer animate-fade-in"
      onClick={() => onTaskClick?.(task)}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-gray-900 text-sm leading-tight flex-1">
          {task.title}
        </h3>
        <span className={`status-badge ml-2 ${getPriorityColor(task.priority)}`}>
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
            <div className="flex items-center gap-1">
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
    </div>
  );
};

export default TaskCard;