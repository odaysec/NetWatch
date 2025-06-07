import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  Globe,
  Shield,
  Zap,
  Download,
  Filter,
  Calendar,
  Eye,
  Target,
  Cpu,
  HardDrive
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [metricType, setMetricType] = useState('performance');

  // Mock data for various analytics
  const performanceData = [
    { date: '2024-01-09', cpu: 65, memory: 78, disk: 45, network: 82, latency: 45 },
    { date: '2024-01-10', cpu: 72, memory: 81, disk: 48, network: 85, latency: 52 },
    { date: '2024-01-11', cpu: 68, memory: 75, disk: 52, network: 79, latency: 38 },
    { date: '2024-01-12', cpu: 85, memory: 88, disk: 58, network: 92, latency: 67 },
    { date: '2024-01-13', cpu: 79, memory: 82, disk: 55, network: 87, latency: 48 },
    { date: '2024-01-14', cpu: 73, memory: 79, disk: 49, network: 83, latency: 42 },
    { date: '2024-01-15', cpu: 76, memory: 84, disk: 53, network: 89, latency: 55 }
  ];

  const securityData = [
    { date: '2024-01-09', threats: 23, blocked: 21, allowed: 2, incidents: 1 },
    { date: '2024-01-10', threats: 31, blocked: 28, allowed: 3, incidents: 2 },
    { date: '2024-01-11', threats: 18, blocked: 17, allowed: 1, incidents: 0 },
    { date: '2024-01-12', threats: 45, blocked: 41, allowed: 4, incidents: 3 },
    { date: '2024-01-13', threats: 27, blocked: 25, allowed: 2, incidents: 1 },
    { date: '2024-01-14', threats: 34, blocked: 32, allowed: 2, incidents: 1 },
    { date: '2024-01-15', threats: 29, blocked: 27, allowed: 2, incidents: 1 }
  ];

  const trafficData = [
    { hour: '00:00', inbound: 120, outbound: 80, total: 200 },
    { hour: '04:00', inbound: 90, outbound: 60, total: 150 },
    { hour: '08:00', inbound: 280, outbound: 220, total: 500 },
    { hour: '12:00', inbound: 350, outbound: 280, total: 630 },
    { hour: '16:00', inbound: 320, outbound: 250, total: 570 },
    { hour: '20:00', inbound: 180, outbound: 140, total: 320 }
  ];

  const deviceTypeData = [
    { name: 'Workstations', value: 45, color: '#00ff88' },
    { name: 'Servers', value: 25, color: '#0099ff' },
    { name: 'Mobile Devices', value: 15, color: '#8b5cf6' },
    { name: 'Network Equipment', value: 10, color: '#fbbf24' },
    { name: 'IoT Devices', value: 5, color: '#f87171' }
  ];

  const radarData = [
    { subject: 'Performance', A: 85, B: 78, fullMark: 100 },
    { subject: 'Security', A: 92, B: 85, fullMark: 100 },
    { subject: 'Availability', A: 98, B: 95, fullMark: 100 },
    { subject: 'Compliance', A: 88, B: 82, fullMark: 100 },
    { subject: 'Efficiency', A: 76, B: 71, fullMark: 100 },
    { subject: 'Reliability', A: 94, B: 89, fullMark: 100 }
  ];

  const topMetrics = [
    {
      title: 'Network Uptime',
      value: '99.97%',
      change: '+0.02%',
      trend: 'up',
      icon: Activity,
      color: 'text-cyber-green'
    },
    {
      title: 'Avg Response Time',
      value: '42ms',
      change: '-8ms',
      trend: 'up',
      icon: Zap,
      color: 'text-cyber-blue'
    },
    {
      title: 'Security Score',
      value: '94/100',
      change: '+3',
      trend: 'up',
      icon: Shield,
      color: 'text-cyber-purple'
    },
    {
      title: 'Bandwidth Utilization',
      value: '67%',
      change: '+5%',
      trend: 'down',
      icon: Globe,
      color: 'text-cyber-yellow'
    }
  ];

  const alertTrends = [
    { category: 'Performance', count: 23, severity: 'medium', trend: '+12%' },
    { category: 'Security', count: 8, severity: 'high', trend: '-15%' },
    { category: 'Network', count: 15, severity: 'low', trend: '+8%' },
    { category: 'System', count: 12, severity: 'medium', trend: '-5%' },
    { category: 'Application', count: 6, severity: 'high', trend: '+25%' }
  ];

  const complianceData = [
    { standard: 'ISO 27001', compliance: 94, target: 95, status: 'warning' },
    { standard: 'SOC 2', compliance: 98, target: 95, status: 'good' },
    { standard: 'GDPR', compliance: 92, target: 90, status: 'good' },
    { standard: 'HIPAA', compliance: 87, target: 90, status: 'critical' },
    { standard: 'PCI DSS', compliance: 96, target: 95, status: 'good' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-cyber-red';
      case 'medium': return 'text-cyber-yellow';
      case 'low': return 'text-cyber-green';
      default: return 'text-gray-400';
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      case 'warning': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      case 'critical': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive network performance and security analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="flex items-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {topMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{metric.value}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-cyber-green" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-cyber-red" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-cyber-green' : 'text-cyber-red'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Performance Trends</h3>
            <select
              value={metricType}
              onChange={(e) => setMetricType(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue text-sm"
            >
              <option value="performance">Performance</option>
              <option value="security">Security</option>
              <option value="traffic">Traffic</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="cpu" stroke="#00ff88" strokeWidth={2} name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#0099ff" strokeWidth={2} name="Memory %" />
              <Line type="monotone" dataKey="network" stroke="#8b5cf6" strokeWidth={2} name="Network %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Security Analytics */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Security Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={securityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="threats" stackId="1" stroke="#ff3366" fill="#ff3366" fillOpacity={0.3} name="Total Threats" />
              <Area type="monotone" dataKey="blocked" stackId="2" stroke="#00ff88" fill="#00ff88" fillOpacity={0.3} name="Blocked" />
              <Area type="monotone" dataKey="incidents" stackId="3" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.3} name="Incidents" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Distribution */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Device Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceTypeData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {deviceTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {deviceTypeData.map((item, index) => (
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

        {/* Network Health Radar */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Network Health Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <PolarRadiusAxis tick={{ fill: '#9ca3af', fontSize: 10 }} />
              <Radar name="Current" dataKey="A" stroke="#00ff88" fill="#00ff88" fillOpacity={0.3} strokeWidth={2} />
              <Radar name="Target" dataKey="B" stroke="#0099ff" fill="#0099ff" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Alert Trends */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Alert Trends</h3>
          <div className="space-y-4">
            {alertTrends.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm text-white font-medium">{alert.category}</p>
                  <p className={`text-xs ${getSeverityColor(alert.severity)}`}>
                    {alert.severity} severity
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white font-bold">{alert.count}</p>
                  <p className={`text-xs ${alert.trend.startsWith('+') ? 'text-cyber-red' : 'text-cyber-green'}`}>
                    {alert.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Compliance Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {complianceData.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{item.standard}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getComplianceColor(item.status)}`}>
                  {item.status.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Current</span>
                  <span className="text-white">{item.compliance}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.compliance >= item.target ? 'bg-cyber-green' : 'bg-cyber-red'
                    }`}
                    style={{ width: `${item.compliance}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Target: {item.target}%</span>
                  <span>{item.compliance >= item.target ? 'Met' : 'Below Target'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Analysis */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Traffic Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="inbound" fill="#0099ff" name="Inbound (Mbps)" />
            <Bar dataKey="outbound" fill="#00ff88" name="Outbound (Mbps)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Analytics Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <BarChart3 className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Custom Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Calendar className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Schedule Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 rounded-lg p-4 transition-colors">
            <Target className="w-5 h-5 text-cyber-yellow" />
            <span className="text-sm text-white">Set Thresholds</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Eye className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">View Insights</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;