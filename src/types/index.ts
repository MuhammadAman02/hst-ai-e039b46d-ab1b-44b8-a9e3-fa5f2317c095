export interface User {
  id: string;
  name: string;
  email: string;
  color: string;
}

export type TaskStatus = 'todo' | 'progress' | 'done' | 'stuck';
export type Priority = 'low' | 'medium' | 'high' | 'critical';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: User;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  boardId: string;
}

export interface Column {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  description?: string;
  color: string;
  tasks: Task[];
  members: User[];
  createdAt: string;
  updatedAt: string;
}