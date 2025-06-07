import React from 'react';
import {
  Activity,
  Shield,
  AlertTriangle,
  TrendingUp,
  Server,
  Users,
  Globe,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  // Mock data for charts
  const networkTrafficData = [
    { time: '00:00', inbound: 120, outbound: 80 },
    { time: '04:00', inbound: 180, outbound: 120 },
    { time: '08:00', inbound: 240, outbound: 180 },
    { time: '12:00', inbound: 320, outbound: 280 },
    { time: '16:00', inbound: 280, outbound: 220 },
    { time: '20:00', inbound: 200, outbound: 160 },
  ];

  const threatData = [
    { name: 'Low', value: 65, color: '#22c55e' },
    { name: 'Medium', value: 25, color: '#eab308' },
    { name: 'High', value: 8, color: '#f97316' },
    { name: 'Critical', value: 2, color: '#ef4444' },
  ];

  const performanceData = [
    { metric: 'CPU', value: 68, max: 100 },
    { metric: 'Memory', value: 82, max: 100 },
    { metric: 'Disk', value: 45, max: 100 },
    { metric: 'Network', value: 71, max: 100 },
  ];

  const statsCards = [
    {
      title: 'Active Devices',
      value: '1,247',
      change: '+12',
      icon: Server,
      color: 'text-cyber-green',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Network Alerts',
      value: '23',
      change: '+5',
      icon: AlertTriangle,
      color: 'text-cyber-red',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Bandwidth Usage',
      value: '847 GB',
      change: '+2.3%',
      icon: TrendingUp,
      color: 'text-cyber-blue',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Online Users',
      value: '892',
      change: '+18',
      icon: Users,
      color: 'text-cyber-purple',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Network Command Center</h1>
          <p className="text-gray-400 mt-1">Real-time network monitoring and security analysis</p>
        </div>
        <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
          <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse"></div>
          <span className="text-sm text-white">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change} from last hour</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Network Traffic */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Network Traffic</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-blue rounded-full"></div>
                <span className="text-sm text-gray-400">Inbound</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
                <span className="text-sm text-gray-400">Outbound</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={networkTrafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="inbound" stackId="1" stroke="#0099ff" fill="#0099ff" fillOpacity={0.3} />
              <Area type="monotone" dataKey="outbound" stackId="1" stroke="#00ff88" fill="#00ff88" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Analysis */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Threat Analysis</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={threatData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {threatData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {threatData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
                <span className="text-sm text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">System Performance</h3>
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{item.metric}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-cyber-green to-cyber-blue"
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-white w-12 text-right">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Security Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-cyber-red" />
              <div>
                <p className="text-sm text-white">Suspicious login attempt from 192.168.1.105</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-cyber-yellow" />
              <div>
                <p className="text-sm text-white">High bandwidth usage detected on subnet 10.0.1.0/24</p>
                <p className="text-xs text-gray-400">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Activity className="w-5 h-5 text-cyber-blue" />
              <div>
                <p className="text-sm text-white">New device discovered: HP-Printer-2F4A</p>
                <p className="text-xs text-gray-400">12 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <Wifi className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Network Scan</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Shield className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Security Check</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-red/10 hover:bg-cyber-red/20 border border-cyber-red/30 rounded-lg p-4 transition-colors">
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
            <span className="text-sm text-white">Alert Review</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Zap className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">Performance Boost</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;