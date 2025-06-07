import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Key,
  Settings,
  Eye,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Clock,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@company.com',
      fullName: 'System Administrator',
      role: 'administrator',
      status: 'active',
      lastLogin: '2024-01-15 14:30:22',
      loginCount: 1247,
      permissions: ['full_access', 'user_management', 'system_config', 'security_admin'],
      department: 'IT Security',
      createdAt: '2023-01-15',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      twoFactorEnabled: true,
      sessionCount: 3,
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      username: 'jdoe',
      email: 'john.doe@company.com',
      fullName: 'John Doe',
      role: 'analyst',
      status: 'active',
      lastLogin: '2024-01-15 13:45:18',
      loginCount: 892,
      permissions: ['network_monitor', 'alert_view', 'report_generate'],
      department: 'Network Operations',
      createdAt: '2023-03-22',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      twoFactorEnabled: true,
      sessionCount: 1,
      ipAddress: '192.168.1.105'
    },
    {
      id: 3,
      username: 'ssmith',
      email: 'sarah.smith@company.com',
      fullName: 'Sarah Smith',
      role: 'operator',
      status: 'active',
      lastLogin: '2024-01-15 12:20:45',
      loginCount: 567,
      permissions: ['dashboard_view', 'basic_monitoring'],
      department: 'Operations',
      createdAt: '2023-06-10',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      twoFactorEnabled: false,
      sessionCount: 2,
      ipAddress: '192.168.1.110'
    },
    {
      id: 4,
      username: 'mjohnson',
      email: 'mike.johnson@company.com',
      fullName: 'Mike Johnson',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '2024-01-10 16:30:12',
      loginCount: 234,
      permissions: ['dashboard_view'],
      department: 'Management',
      createdAt: '2023-08-15',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      twoFactorEnabled: false,
      sessionCount: 0,
      ipAddress: 'N/A'
    },
    {
      id: 5,
      username: 'agarcia',
      email: 'ana.garcia@company.com',
      fullName: 'Ana Garcia',
      role: 'analyst',
      status: 'locked',
      lastLogin: '2024-01-14 09:15:33',
      loginCount: 445,
      permissions: ['network_monitor', 'alert_view'],
      department: 'Security',
      createdAt: '2023-04-18',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      twoFactorEnabled: true,
      sessionCount: 0,
      ipAddress: 'N/A'
    },
    {
      id: 6,
      username: 'rbrown',
      email: 'robert.brown@company.com',
      fullName: 'Robert Brown',
      role: 'administrator',
      status: 'active',
      lastLogin: '2024-01-15 11:45:22',
      loginCount: 1089,
      permissions: ['full_access', 'user_management', 'system_config'],
      department: 'IT Operations',
      createdAt: '2023-02-28',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      twoFactorEnabled: true,
      sessionCount: 2,
      ipAddress: '192.168.1.115'
    }
  ];

  const roles = [
    {
      name: 'administrator',
      description: 'Full system access and user management',
      permissions: ['full_access', 'user_management', 'system_config', 'security_admin'],
      color: 'text-cyber-red',
      count: users.filter(u => u.role === 'administrator').length
    },
    {
      name: 'analyst',
      description: 'Network monitoring and analysis capabilities',
      permissions: ['network_monitor', 'alert_view', 'report_generate'],
      color: 'text-cyber-blue',
      count: users.filter(u => u.role === 'analyst').length
    },
    {
      name: 'operator',
      description: 'Basic monitoring and operational tasks',
      permissions: ['dashboard_view', 'basic_monitoring'],
      color: 'text-cyber-green',
      count: users.filter(u => u.role === 'operator').length
    },
    {
      name: 'viewer',
      description: 'Read-only access to dashboards',
      permissions: ['dashboard_view'],
      color: 'text-cyber-yellow',
      count: users.filter(u => u.role === 'viewer').length
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-cyber-green" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-400" />;
      case 'locked': return <Lock className="w-4 h-4 text-cyber-red" />;
      default: return <AlertTriangle className="w-4 h-4 text-cyber-yellow" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      case 'inactive': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
      case 'locked': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      default: return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
    }
  };

  const getRoleColor = (role: string) => {
    const roleData = roles.find(r => r.name === role);
    return roleData ? roleData.color : 'text-gray-400';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    locked: users.filter(u => u.status === 'locked').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="text-gray-400 mt-1">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/30 text-cyber-green px-4 py-2 rounded-lg transition-colors">
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded-lg transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-white">{userStats.total}</p>
            </div>
            <div className="p-3 bg-cyber-blue/10 rounded-lg">
              <Users className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-cyber-green">{userStats.active}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-cyber-green" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-400">{userStats.inactive}</p>
            </div>
            <div className="p-3 bg-gray-500/10 rounded-lg">
              <XCircle className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Locked Users</p>
              <p className="text-2xl font-bold text-cyber-red">{userStats.locked}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <Lock className="w-6 h-6 text-cyber-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Roles Overview */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Role Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {roles.map((role, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-medium ${role.color}`}>{role.name}</h4>
                <span className="text-white font-bold">{role.count}</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">{role.description}</p>
              <div className="space-y-1">
                {role.permissions.slice(0, 3).map((permission, permIndex) => (
                  <div key={permIndex} className="text-xs text-gray-500">
                    • {permission.replace('_', ' ')}
                  </div>
                ))}
                {role.permissions.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{role.permissions.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">User Filters</h3>
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Users</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
          
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="all">All Roles</option>
            {roles.map(role => (
              <option key={role.name} value={role.name}>{role.name}</option>
            ))}
          </select>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="locked">Locked</option>
          </select>
          
          <div className="text-sm text-gray-400">
            {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full border-2 border-gray-600"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{user.fullName}</h4>
                    {getStatusIcon(user.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(user.status)}`}>
                      {user.status.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${getRoleColor(user.role)} bg-gray-700`}>
                      {user.role.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Contact Information</p>
                      <p className="text-white">@{user.username}</p>
                      <p className="text-gray-300">{user.email}</p>
                      <p className="text-gray-400">{user.department}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Access Information</p>
                      <p className="text-white">Last Login: {user.lastLogin}</p>
                      <p className="text-gray-300">Login Count: {user.loginCount}</p>
                      <p className="text-gray-300">Active Sessions: {user.sessionCount}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-400">Security</p>
                      <div className="flex items-center space-x-2">
                        <Key className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm ${user.twoFactorEnabled ? 'text-cyber-green' : 'text-cyber-red'}`}>
                          2FA {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                      <p className="text-gray-300">IP: {user.ipAddress}</p>
                      <p className="text-gray-400">Created: {user.createdAt}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map((permission, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  {user.status === 'locked' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </button>
                <button className="p-2 text-gray-400 hover:text-cyber-red hover:bg-gray-700 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <UserPlus className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Add User</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Shield className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Manage Roles</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 rounded-lg p-4 transition-colors">
            <Activity className="w-5 h-5 text-cyber-yellow" />
            <span className="text-sm text-white">User Activity</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Settings className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">Security Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;