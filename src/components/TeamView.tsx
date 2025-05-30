import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Mail, Phone, Calendar, MoreVertical, Users, Award, Clock, TrendingUp } from 'lucide-react';
import { User, Task } from '../types';

interface TeamMember extends User {
  role: string;
  department: string;
  joinDate: string;
  lastActive: string;
  tasksCompleted: number;
  tasksInProgress: number;
  avatar?: string;
  phone?: string;
  location?: string;
  skills: string[];
}

interface TeamViewProps {
  users: User[];
  tasks: Task[];
}

const TeamView: React.FC<TeamViewProps> = ({ users, tasks }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Enhanced team members with additional data
  const teamMembers: TeamMember[] = useMemo(() => {
    return users.map((user, index) => {
      const userTasks = tasks.filter(task => task.assignee?.id === user.id);
      const completedTasks = userTasks.filter(task => task.status === 'done');
      const inProgressTasks = userTasks.filter(task => task.status === 'progress');

      const roles = ['Product Manager', 'Senior Developer', 'UI/UX Designer', 'DevOps Engineer', 'QA Engineer'];
      const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Operations'];
      const locations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Remote', 'London, UK'];
      const skillSets = [
        ['React', 'TypeScript', 'Node.js'],
        ['Figma', 'Sketch', 'Prototyping'],
        ['Python', 'AWS', 'Docker'],
        ['Product Strategy', 'Analytics', 'Roadmapping'],
        ['Testing', 'Automation', 'Quality Assurance']
      ];

      return {
        ...user,
        role: roles[index % roles.length],
        department: departments[index % departments.length],
        joinDate: new Date(2023, index % 12, (index * 3) % 28 + 1).toISOString().split('T')[0],
        lastActive: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toISOString(),
        tasksCompleted: completedTasks.length,
        tasksInProgress: inProgressTasks.length,
        phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        location: locations[index % locations.length],
        skills: skillSets[index % skillSets.length]
      };
    });
  }, [users, tasks]);

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           member.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
      const matchesRole = selectedRole === 'all' || member.role === selectedRole;
      
      return matchesSearch && matchesDepartment && matchesRole;
    });
  }, [teamMembers, searchTerm, selectedDepartment, selectedRole]);

  const departments = [...new Set(teamMembers.map(member => member.department))];
  const roles = [...new Set(teamMembers.map(member => member.role))];

  const getActivityStatus = (lastActive: string) => {
    const lastActiveDate = new Date(lastActive);
    const now = new Date();
    const diffHours = (now.getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 1) return { status: 'online', text: 'Online', color: 'bg-green-500' };
    if (diffHours < 24) return { status: 'recent', text: `${Math.floor(diffHours)}h ago`, color: 'bg-yellow-500' };
    if (diffHours < 168) return { status: 'week', text: `${Math.floor(diffHours / 24)}d ago`, color: 'bg-gray-500' };
    return { status: 'offline', text: 'Offline', color: 'bg-gray-400' };
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const TeamStats = () => {
    const totalTasks = teamMembers.reduce((sum, member) => sum + member.tasksCompleted + member.tasksInProgress, 0);
    const completedTasks = teamMembers.reduce((sum, member) => sum + member.tasksCompleted, 0);
    const activeMembers = teamMembers.filter(member => getActivityStatus(member.lastActive).status === 'online').length;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{teamMembers.length}</p>
              <p className="text-sm text-gray-600">Team Members</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeMembers}</p>
              <p className="text-sm text-gray-600">Active Now</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{Math.round((completedTasks / totalTasks) * 100) || 0}%</p>
              <p className="text-sm text-gray-600">Completion Rate</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MemberCard = ({ member }: { member: TeamMember }) => {
    const activity = getActivityStatus(member.lastActive);
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: member.color }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${activity.color} rounded-full border-2 border-white`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical size={16} className="text-gray-400" />
          </button>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            <span>{member.email}</span>
          </div>
          {member.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} />
              <span>{member.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={14} />
            <span>Joined {formatJoinDate(member.joinDate)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-1">
            {member.skills.map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{member.tasksCompleted}</p>
            <p className="text-xs text-gray-600">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{member.tasksInProgress}</p>
            <p className="text-xs text-gray-600">In Progress</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            activity.status === 'online' ? 'bg-green-100 text-green-800' :
            activity.status === 'recent' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
            {activity.text}
          </span>
          <span className="text-xs text-gray-500">{member.department}</span>
        </div>
      </div>
    );
  };

  const MemberListItem = ({ member }: { member: TeamMember }) => {
    const activity = getActivityStatus(member.lastActive);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                style={{ backgroundColor: member.color }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${activity.color} rounded-full border-2 border-white`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.department}</p>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm text-gray-900">{member.tasksCompleted} completed</p>
                  <p className="text-sm text-gray-600">{member.tasksInProgress} in progress</p>
                </div>
                <div className="hidden xl:block">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    activity.status === 'online' ? 'bg-green-100 text-green-800' :
                    activity.status === 'recent' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <div className={`w-2 h-2 ${activity.color} rounded-full`}></div>
                    {activity.text}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical size={16} className="text-gray-400" />
          </button>
        </div>
      </div>
    );
  };

  const InviteModal = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');

    const handleInvite = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Inviting user:', { email, role, department });
      // In a real app, this would send an invitation
      alert(`Invitation sent to ${email}!`);
      setShowInviteModal(false);
      setEmail('');
      setRole('');
      setDepartment('');
    };

    if (!showInviteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Invite Team Member</h2>
            <button
              onClick={() => setShowInviteModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleInvite} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="colleague@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a role</option>
                {roles.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a department</option>
                {departments.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-600 mt-1">Manage your team members and collaboration</p>
          </div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            Invite Member
          </button>
        </div>

        {/* Stats */}
        <TeamStats />

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current h-0.5 rounded-sm"></div>
                  <div className="bg-current h-0.5 rounded-sm"></div>
                  <div className="bg-current h-0.5 rounded-sm"></div>
                  <div className="bg-current h-0.5 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredMembers.length} of {teamMembers.length} team members
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMembers.map(member => (
              <MemberListItem key={member.id} member={member} />
            ))}
          </div>
        )}

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <Users size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDepartment('all');
                setSelectedRole('all');
              }}
              className="text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        <InviteModal />
      </div>
    </div>
  );
};

export default TeamView;