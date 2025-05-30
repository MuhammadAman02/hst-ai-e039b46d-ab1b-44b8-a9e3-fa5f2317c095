import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, Calendar, Plus, X } from 'lucide-react';
import { Board, Column, Task, TaskStatus, Priority } from '../types';
import { useBoard } from '../contexts/BoardContext';
import StatusColumn from './StatusColumn';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

interface BoardViewProps {
  board: Board;
}

const BoardView: React.FC<BoardViewProps> = ({ board: initialBoard }) => {
  const { 
    board, 
    searchTerm, 
    setSearchTerm, 
    selectedPriority, 
    setSelectedPriority,
    selectedAssignee,
    setSelectedAssignee,
    moveTask 
  } = useBoard();
  
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTasks = useMemo(() => {
    return board.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      const matchesAssignee = selectedAssignee === 'all' || task.assignee?.id === selectedAssignee;
      
      return matchesSearch && matchesPriority && matchesAssignee;
    });
  }, [board.tasks, searchTerm, selectedPriority, selectedAssignee]);

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return filteredTasks.filter(task => task.status === status);
  };

  const columns: Column[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: '#c4c4c4',
      tasks: getTasksByStatus('todo')
    },
    {
      id: 'progress',
      title: 'In Progress',
      color: '#fdab3d',
      tasks: getTasksByStatus('progress')
    },
    {
      id: 'done',
      title: 'Done',
      color: '#00c875',
      tasks: getTasksByStatus('done')
    },
    {
      id: 'stuck',
      title: 'Stuck',
      color: '#e2445c',
      tasks: getTasksByStatus('stuck')
    }
  ];

  const handleTaskClick = (task: Task) => {
    console.log('Opening task for editing:', task);
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleAddTask = (status: TaskStatus) => {
    console.log('Adding new task with status:', status);
    setEditingTask(null);
    setNewTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleDragStart = (task: Task) => {
    console.log('Drag started for task:', task.title);
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    console.log('Drag ended');
    setDraggedTask(null);
  };

  const handleDrop = (newStatus: TaskStatus) => {
    if (draggedTask && draggedTask.status !== newStatus) {
      console.log(`Moving task "${draggedTask.title}" from ${draggedTask.status} to ${newStatus}`);
      moveTask(draggedTask.id, newStatus);
    }
    setDraggedTask(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedPriority('all');
    setSelectedAssignee('all');
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm || selectedPriority !== 'all' || selectedAssignee !== 'all';

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
            {board.description && (
              <p className="text-gray-600 mt-1">{board.description}</p>
            )}
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{board.tasks.length} total tasks</span>
              <span>{filteredTasks.length} showing</span>
              <span>Last updated: {new Date(board.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {board.members.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: member.color }}
                  title={member.name}
                >
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
              ))}
              {board.members.length > 4 && (
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
                  +{board.members.length - 4}
                </div>
              )}
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
              <Users size={16} />
              <span className="text-sm">Invite</span>
            </button>
            <button 
              onClick={() => handleAddTask('todo')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              <Plus size={16} />
              <span className="text-sm">Add Task</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors duration-150 ${
              hasActiveFilters 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            <span className="text-sm">Filter</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {[searchTerm, selectedPriority !== 'all', selectedAssignee !== 'all'].filter(Boolean).length}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <X size={14} />
              Clear
            </button>
          )}

          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <Calendar size={16} />
            <span className="text-sm">Calendar</span>
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value as Priority | 'all')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assignee</label>
                <select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Assignees</option>
                  <option value="">Unassigned</option>
                  {board.members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Board Content with Custom Drag and Drop */}
      <div className="p-6">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <StatusColumn
              key={column.id}
              column={column}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrop={handleDrop}
              draggedTask={draggedTask}
            />
          ))}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        task={editingTask}
        initialStatus={newTaskStatus}
        users={board.members}
      />
    </div>
  );
};

export default BoardView;