import React, { useState } from 'react';
import { Search, Filter, Users, Calendar } from 'lucide-react';
import { Board, Column, Task, TaskStatus } from '../types';
import StatusColumn from './StatusColumn';

interface BoardViewProps {
  board: Board;
}

const BoardView: React.FC<BoardViewProps> = ({ board }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return board.tasks.filter(task => 
      task.status === status && 
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    console.log('Task clicked:', task);
    // TODO: Open task detail modal
  };

  const handleAddTask = (status: string) => {
    console.log('Add task to status:', status);
    // TODO: Open add task modal
  };

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
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {board.members.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-white"
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
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-monday-blue focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <Filter size={16} />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <Calendar size={16} />
            <span className="text-sm">Calendar</span>
          </button>
        </div>
      </div>

      {/* Board Content */}
      <div className="p-6">
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <StatusColumn
              key={column.id}
              column={column}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoardView;