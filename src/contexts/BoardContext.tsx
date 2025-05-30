import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Board, Task, User, TaskStatus, Priority } from '../types';

interface BoardContextType {
  board: Board;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPriority: Priority | 'all';
  setSelectedPriority: (priority: Priority | 'all') => void;
  selectedAssignee: string | 'all';
  setSelectedAssignee: (assignee: string | 'all') => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};

interface BoardProviderProps {
  children: ReactNode;
  initialBoard: Board;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children, initialBoard }) => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string | 'all'>('all');

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    console.log('Updating task:', taskId, updates);
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      ),
      updatedAt: new Date().toISOString()
    }));
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('Adding new task:', newTask);
    setBoard(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      updatedAt: new Date().toISOString()
    }));
  };

  const deleteTask = (taskId: string) => {
    console.log('Deleting task:', taskId);
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId),
      updatedAt: new Date().toISOString()
    }));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    console.log('Moving task:', taskId, 'to status:', newStatus);
    updateTask(taskId, { status: newStatus });
  };

  return (
    <BoardContext.Provider value={{
      board,
      updateTask,
      addTask,
      deleteTask,
      moveTask,
      searchTerm,
      setSearchTerm,
      selectedPriority,
      setSelectedPriority,
      selectedAssignee,
      setSelectedAssignee
    }}>
      {children}
    </BoardContext.Provider>
  );
};