import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Board, Task, TaskStatus, Priority, User } from '../types';

interface BoardContextType {
  board: Board;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedPriority: Priority | 'all';
  setSelectedPriority: (priority: Priority | 'all') => void;
  selectedAssignee: string;
  setSelectedAssignee: (assignee: string) => void;
  addTask: (taskData: Partial<Task>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  reorderTasks: (status: TaskStatus, fromIndex: number, toIndex: number) => void;
}

const BoardContext = createContext<BoardContextType | undefined>(undefined);

interface BoardProviderProps {
  children: ReactNode;
  initialBoard: Board;
}

export const BoardProvider: React.FC<BoardProviderProps> = ({ children, initialBoard }) => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<Priority | 'all'>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');

  const addTask = (taskData: Partial<Task>) => {
    console.log('Adding new task:', taskData);
    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: taskData.title || 'Untitled Task',
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || null,
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      boardId: board.id
    };

    setBoard(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
      updatedAt: new Date().toISOString()
    }));
  };

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

  const deleteTask = (taskId: string) => {
    console.log('Deleting task:', taskId);
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId),
      updatedAt: new Date().toISOString()
    }));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    console.log('Moving task to new status:', taskId, newStatus);
    updateTask(taskId, { status: newStatus });
  };

  const reorderTasks = (status: TaskStatus, fromIndex: number, toIndex: number) => {
    console.log(`Reordering tasks in ${status} column from ${fromIndex} to ${toIndex}`);
    
    setBoard(prev => {
      const tasksInColumn = prev.tasks.filter(task => task.status === status);
      const otherTasks = prev.tasks.filter(task => task.status !== status);
      
      // Remove the task from its current position
      const [movedTask] = tasksInColumn.splice(fromIndex, 1);
      
      // Insert it at the new position
      tasksInColumn.splice(toIndex, 0, movedTask);
      
      // Combine all tasks back together
      const reorderedTasks = [...otherTasks, ...tasksInColumn];
      
      return {
        ...prev,
        tasks: reorderedTasks,
        updatedAt: new Date().toISOString()
      };
    });
  };

  const value: BoardContextType = {
    board,
    searchTerm,
    setSearchTerm,
    selectedPriority,
    setSelectedPriority,
    selectedAssignee,
    setSelectedAssignee,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};