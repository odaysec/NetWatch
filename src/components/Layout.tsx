import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Shield,
  Activity,
  Network,
  Radar,
  Search,
  Server,
  Bell,
  Users,
  BarChart3,
  Settings,
  FileText,
  ShieldAlert,
  GitBranch,
  Menu,
  X,
  Eye,
  Zap,
  Github
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Activity, label: 'Dashboard', color: 'text-cyber-blue' },
    { path: '/discovery', icon: Radar, label: 'Network Discovery', color: 'text-cyber-green' },
    { path: '/traffic', icon: Network, label: 'Traffic Analysis', color: 'text-cyber-purple' },
    { path: '/scanner', icon: Search, label: 'Port Scanner', color: 'text-cyber-yellow' },
    { path: '/services', icon: Server, label: 'Service Monitor', color: 'text-success-400' },
    { path: '/topology', icon: GitBranch, label: 'Network Topology', color: 'text-primary-400' },
    { path: '/security', icon: ShieldAlert, label: 'Security Center', color: 'text-cyber-red' },
    { path: '/alerts', icon: Bell, label: 'Alert Manager', color: 'text-warning-400' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics', color: 'text-cyber-blue' },
    { path: '/users', icon: Users, label: 'User Management', color: 'text-cyber-green' },
    { path: '/logs', icon: FileText, label: 'System Logs', color: 'text-gray-400' },
    { path: '/settings', icon: Settings, label: 'Settings', color: 'text-gray-400' },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-800 border-r border-gray-700 flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyber-green animate-glow" />
              <span className="text-xl font-bold text-white">NetWatch Pro</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="mt-6 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? 'bg-gray-700 border-r-2 border-cyber-green text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-cyber-green' : item.color}`} />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Copyright Footer */}
        {sidebarOpen && (
          <div className="p-4 border-t border-gray-700">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Github className="w-4 h-4 text-gray-400" />
                <a 
                  href="https://github.com/odaysec" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-gray-400 hover:text-cyber-green transition-colors"
                >
                  github.com/odaysec
                </a>
              </div>
              <p className="text-xs text-gray-500">
                © 2024 odaysec
              </p>
              <p className="text-xs text-gray-500">
                All rights reserved
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Open Source Project
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-green rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-cyber-blue" />
                <span className="text-sm text-gray-400">Monitoring 1,247 devices</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-full">
                <Zap className="w-4 h-4 text-cyber-yellow" />
                <span className="text-sm text-white">High Performance Mode</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="https://github.com/identicons/admin.png"
                  alt="Admin User"
                  className="w-8 h-8 rounded-full border-2 border-cyber-green bg-gray-700"
                  onError={(e) => {
                    // Fallback to GitHub's default identicon pattern
                    e.currentTarget.src = "https://avatars.githubusercontent.com/u/0?s=64&v=4";
                  }}
                />
                <div className="text-right">
                  <div className="text-sm text-white font-medium">Admin User</div>
                  <div className="text-xs text-gray-400">Security Analyst</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-400">
                NetWatch Pro v1.0.0
              </span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-gray-400">
                Built with React + TypeScript
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/odaysec" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-gray-400 hover:text-cyber-green transition-colors"
              >
                <Github className="w-3 h-3" />
                <span>odaysec</span>
              </a>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-gray-400">
                © 2024 All rights reserved
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;