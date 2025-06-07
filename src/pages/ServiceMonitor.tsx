import React, { useState } from 'react';
import {
  Server,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Globe,
  Database,
  Mail,
  Shield,
  Wifi,
  HardDrive,
  Cpu,
  Activity,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Plus,
  Settings,
  Eye,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ServiceMonitor = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  
  const services = [
    {
      id: 1,
      name: 'Web Server (Apache)',
      host: '192.168.1.50',
      port: 80,
      type: 'HTTP',
      status: 'online',
      uptime: '99.8%',
      responseTime: 45,
      lastCheck: '30 seconds ago',
      sla: 99.9,
      description: 'Main web server hosting company website',
      checks: ['HTTP Response', 'SSL Certificate', 'Content Validation'],
      icon: Globe,
      color: 'text-cyber-green'
    },
    {
      id: 2,
      name: 'Database Server (MySQL)',
      host: '192.168.1.50',
      port: 3306,
      type: 'MySQL',
      status: 'online',
      uptime: '99.9%',
      responseTime: 12,
      lastCheck: '1 minute ago',
      sla: 99.95,
      description: 'Primary database server for application data',
      checks: ['Connection Test', 'Query Performance', 'Disk Space'],
      icon: Database,
      color: 'text-cyber-blue'
    },
    {
      id: 3,
      name: 'Mail Server (SMTP)',
      host: '192.168.1.75',
      port: 587,
      type: 'SMTP',
      status: 'warning',
      uptime: '98.2%',
      responseTime: 234,
      lastCheck: '2 minutes ago',
      sla: 99.0,
      description: 'Email server for internal communications',
      checks: ['SMTP Auth', 'Queue Status', 'TLS Encryption'],
      icon: Mail,
      color: 'text-cyber-yellow'
    },
    {
      id: 4,
      name: 'VPN Gateway',
      host: '10.0.1.1',
      port: 1194,
      type: 'OpenVPN',
      status: 'online',
      uptime: '99.5%',
      responseTime: 89,
      lastCheck: '45 seconds ago',
      sla: 99.5,
      description: 'VPN server for remote access',
      checks: ['VPN Tunnel', 'Certificate Validity', 'Bandwidth'],
      icon: Shield,
      color: 'text-cyber-purple'
    },
    {
      id: 5,
      name: 'DNS Server',
      host: '192.168.1.2',
      port: 53,
      type: 'DNS',
      status: 'online',
      uptime: '99.9%',
      responseTime: 8,
      lastCheck: '15 seconds ago',
      sla: 99.99,
      description: 'Internal DNS resolver',
      checks: ['DNS Resolution', 'Query Speed', 'Zone Transfer'],
      icon: Wifi,
      color: 'text-cyber-green'
    },
    {
      id: 6,
      name: 'File Server (NFS)',
      host: '192.168.1.100',
      port: 2049,
      type: 'NFS',
      status: 'offline',
      uptime: '87.3%',
      responseTime: 0,
      lastCheck: '5 minutes ago',
      sla: 98.0,
      description: 'Network file server for shared storage',
      checks: ['Mount Test', 'Read/Write Speed', 'Disk Usage'],
      icon: HardDrive,
      color: 'text-cyber-red'
    },
    {
      id: 7,
      name: 'Application Server',
      host: '192.168.1.60',
      port: 8080,
      type: 'Tomcat',
      status: 'online',
      uptime: '99.1%',
      responseTime: 156,
      lastCheck: '1 minute ago',
      sla: 99.0,
      description: 'Java application server',
      checks: ['Application Health', 'Memory Usage', 'Thread Pool'],
      icon: Server,
      color: 'text-cyber-blue'
    },
    {
      id: 8,
      name: 'Monitoring Agent',
      host: '192.168.1.200',
      port: 9100,
      type: 'Prometheus',
      status: 'online',
      uptime: '100%',
      responseTime: 23,
      lastCheck: '10 seconds ago',
      sla: 99.99,
      description: 'System monitoring and metrics collection',
      checks: ['Metrics Export', 'Agent Health', 'Data Collection'],
      icon: Activity,
      color: 'text-cyber-green'
    }
  ];

  const responseTimeData = [
    { time: '00:00', web: 45, db: 12, mail: 234, dns: 8 },
    { time: '04:00', web: 42, db: 15, mail: 198, dns: 7 },
    { time: '08:00', web: 58, db: 18, mail: 267, dns: 12 },
    { time: '12:00', web: 67, db: 22, mail: 289, dns: 15 },
    { time: '16:00', web: 52, db: 19, mail: 245, dns: 9 },
    { time: '20:00', web: 48, db: 14, mail: 201, dns: 8 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-5 h-5 text-cyber-green" />;
      case 'offline': return <XCircle className="w-5 h-5 text-cyber-red" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-cyber-yellow" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'border-cyber-green bg-green-500/10';
      case 'offline': return 'border-cyber-red bg-red-500/10';
      case 'warning': return 'border-cyber-yellow bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getUptimeColor = (uptime: string) => {
    const uptimeValue = parseFloat(uptime);
    if (uptimeValue >= 99.5) return 'text-cyber-green';
    if (uptimeValue >= 98.0) return 'text-cyber-yellow';
    return 'text-cyber-red';
  };

  const getResponseTimeColor = (responseTime: number) => {
    if (responseTime === 0) return 'text-cyber-red';
    if (responseTime <= 50) return 'text-cyber-green';
    if (responseTime <= 150) return 'text-cyber-yellow';
    return 'text-cyber-red';
  };

  const onlineServices = services.filter(s => s.status === 'online').length;
  const offlineServices = services.filter(s => s.status === 'offline').length;
  const warningServices = services.filter(s => s.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Service Monitor</h1>
          <p className="text-gray-400 mt-1">Real-time monitoring of network services and applications</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="flex items-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/30 text-cyber-green px-4 py-2 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-white">{services.length}</p>
            </div>
            <div className="p-3 bg-cyber-blue/10 rounded-lg">
              <Server className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Online</p>
              <p className="text-2xl font-bold text-cyber-green">{onlineServices}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-6 h-6 text-cyber-green" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Warning</p>
              <p className="text-2xl font-bold text-cyber-yellow">{warningServices}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-cyber-yellow" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Offline</p>
              <p className="text-2xl font-bold text-cyber-red">{offlineServices}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <XCircle className="w-6 h-6 text-cyber-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Response Time Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Response Time Trends</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
              <span className="text-sm text-gray-400">Web Server</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-blue rounded-full"></div>
              <span className="text-sm text-gray-400">Database</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-yellow rounded-full"></div>
              <span className="text-sm text-gray-400">Mail Server</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-purple rounded-full"></div>
              <span className="text-sm text-gray-400">DNS</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={responseTimeData}>
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
            <Line type="monotone" dataKey="web" stroke="#00ff88" strokeWidth={2} />
            <Line type="monotone" dataKey="db" stroke="#0099ff" strokeWidth={2} />
            <Line type="monotone" dataKey="mail" stroke="#fbbf24" strokeWidth={2} />
            <Line type="monotone" dataKey="dns" stroke="#8b5cf6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {services.map((service) => {
          const ServiceIcon = service.icon;
          
          return (
            <div key={service.id} className={`bg-gray-800 border rounded-lg p-6 hover:border-gray-600 transition-colors ${getStatusColor(service.status)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg">
                    <ServiceIcon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-lg font-semibold text-white">{service.name}</h4>
                      {getStatusIcon(service.status)}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{service.host}:{service.port}</span>
                      <span>Type: {service.type}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Uptime</p>
                  <p className={`text-sm font-semibold ${getUptimeColor(service.uptime)}`}>
                    {service.uptime}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Response Time</p>
                  <p className={`text-sm font-semibold ${getResponseTimeColor(service.responseTime)}`}>
                    {service.responseTime === 0 ? 'N/A' : `${service.responseTime}ms`}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">SLA</p>
                  <p className="text-sm font-semibold text-white">{service.sla}%</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Health Checks</p>
                <div className="flex flex-wrap gap-1">
                  {service.checks.map((check, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
                      {check}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Last checked: {service.lastCheck}</span>
                <div className="flex items-center space-x-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Auto-refresh: 30s</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <RefreshCw className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Refresh All</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Plus className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Add Service</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 rounded-lg p-4 transition-colors">
            <BarChart3 className="w-5 h-5 text-cyber-yellow" />
            <span className="text-sm text-white">View Reports</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Settings className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">Configure</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceMonitor;