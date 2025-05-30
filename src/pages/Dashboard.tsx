import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import BoardView from '../components/BoardView';
import { BoardProvider } from '../contexts/BoardContext';
import { Board, User, Task } from '../types';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('boards');

  const handleLogout = () => {
    console.log('User logging out...');
    // In a real app, you'd clear authentication tokens here
    navigate('/');
  };

  // Mock data with more realistic content
  const mockUsers: User[] = [
    { id: '1', name: 'John Doe', email: 'john@company.com', color: '#0073ea' },
    { id: '2', name: 'Sarah Wilson', email: 'sarah@company.com', color: '#00c875' },
    { id: '3', name: 'Mike Johnson', email: 'mike@company.com', color: '#ff9500' },
    { id: '4', name: 'Emily Davis', email: 'emily@company.com', color: '#a25ddc' },
    { id: '5', name: 'Alex Chen', email: 'alex@company.com', color: '#e2445c' },
  ];

  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new product landing page with modern UI/UX principles',
      status: 'progress',
      priority: 'high',
      assignee: mockUsers[0],
      dueDate: '2024-01-25',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      boardId: 'board1'
    },
    {
      id: '2',
      title: 'Implement user authentication',
      description: 'Set up login, registration, password reset functionality with JWT tokens and secure session management',
      status: 'todo',
      priority: 'critical',
      assignee: mockUsers[1],
      dueDate: '2024-01-30',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      boardId: 'board1'
    },
    {
      id: '3',
      title: 'Write API documentation',
      description: 'Document all REST API endpoints with examples, request/response schemas, and authentication requirements',
      status: 'done',
      priority: 'medium',
      assignee: mockUsers[2],
      dueDate: '2024-01-20',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-19',
      boardId: 'board1'
    },
    {
      id: '4',
      title: 'Fix mobile responsive issues',
      description: 'Address layout problems on mobile devices, especially tablet breakpoints and touch interactions',
      status: 'stuck',
      priority: 'high',
      assignee: mockUsers[3],
      dueDate: '2024-01-22',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-21',
      boardId: 'board1'
    },
    {
      id: '5',
      title: 'Set up CI/CD pipeline',
      description: 'Configure automated testing, building, and deployment pipeline using GitHub Actions',
      status: 'todo',
      priority: 'medium',
      assignee: mockUsers[1],
      dueDate: '2024-02-05',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      boardId: 'board1'
    },
    {
      id: '6',
      title: 'User testing session',
      description: 'Conduct usability testing with 10 users to gather feedback on new features and user experience',
      status: 'progress',
      priority: 'low',
      assignee: mockUsers[0],
      dueDate: '2024-02-10',
      createdAt: '2024-01-16',
      updatedAt: '2024-01-22',
      boardId: 'board1'
    },
    {
      id: '7',
      title: 'Database optimization',
      description: 'Optimize database queries and add proper indexing to improve application performance',
      status: 'todo',
      priority: 'medium',
      assignee: mockUsers[4],
      dueDate: '2024-02-01',
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20',
      boardId: 'board1'
    },
    {
      id: '8',
      title: 'Security audit',
      description: 'Perform comprehensive security audit and implement necessary security measures',
      status: 'todo',
      priority: 'critical',
      assignee: mockUsers[2],
      dueDate: '2024-01-28',
      createdAt: '2024-01-19',
      updatedAt: '2024-01-19',
      boardId: 'board1'
    }
  ];

  const mockBoard: Board = {
    id: 'board1',
    name: 'Product Development',
    description: 'Main board for tracking product development tasks and milestones',
    color: '#0073ea',
    tasks: mockTasks,
    members: mockUsers,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-22'
  };

  const renderContent = () => {
    switch (activeView) {
      case 'boards':
        return (
          <BoardProvider initialBoard={mockBoard}>
            <BoardView board={mockBoard} />
          </BoardProvider>
        );
      case 'home':
        return (
          <div className="flex-1 bg-white p-8">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome back, John!</h1>
              <p className="text-gray-600 mb-8">Here's what's happening with your projects today.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Total Tasks</h3>
                  <p className="text-3xl font-bold">{mockTasks.length}</p>
                  <p className="text-sm opacity-90 mt-1">Across all projects</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Completed</h3>
                  <p className="text-3xl font-bold">{mockTasks.filter(t => t.status === 'done').length}</p>
                  <p className="text-sm opacity-90 mt-1">This month</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">In Progress</h3>
                  <p className="text-3xl font-bold">{mockTasks.filter(t => t.status === 'progress').length}</p>
                  <p className="text-sm opacity-90 mt-1">Active now</p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {mockTasks.slice(0, 5).map((task) => (
                    <div key={task.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: task.assignee?.color }}
                      >
                        {task.assignee?.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-600">
                          {task.status === 'done' ? 'Completed' : 'Updated'} by {task.assignee?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === 'done' ? 'bg-green-100 text-green-800' :
                          task.status === 'progress' ? 'bg-blue-100 text-blue-800' :
                          task.status === 'stuck' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {task.status === 'progress' ? 'In Progress' : task.status}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(task.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-1 bg-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
              <p className="text-gray-600">This feature is under development.</p>
              <p className="text-sm text-gray-500 mt-2">
                Current view: <span className="font-medium">{activeView}</span>
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
};

export default Dashboard;