import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Search,
  Settings,
  Mail,
  MessageSquare,
  Phone,
  Eye,
  Trash2,
  Archive,
  RotateCcw,
  Zap,
  Shield,
  Activity,
  Server,
  Network,
  Database
} from 'lucide-react';

const AlertManager = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const alerts = [
    {
      id: 1,
      title: 'High CPU Usage Detected',
      description: 'CPU usage on server ubuntu-server-01 has exceeded 85% threshold',
      severity: 'critical',
      status: 'active',
      source: 'System Monitor',
      host: '192.168.1.50',
      timestamp: '2024-01-15 14:23:45',
      duration: '12 minutes',
      category: 'performance',
      icon: Activity,
      actions: ['Restart Service', 'Scale Resources', 'Investigate'],
      details: {
        metric: 'CPU Usage',
        threshold: '85%',
        current: '92%',
        trend: 'increasing'
      }
    },
    {
      id: 2,
      title: 'Suspicious Login Attempt',
      description: 'Multiple failed login attempts from IP 203.123.45.67',
      severity: 'high',
      status: 'active',
      source: 'Security Monitor',
      host: '192.168.1.105',
      timestamp: '2024-01-15 14:18:32',
      duration: '5 minutes',
      category: 'security',
      icon: Shield,
      actions: ['Block IP', 'Notify Admin', 'Investigate'],
      details: {
        attempts: 15,
        source_ip: '203.123.45.67',
        target_user: 'administrator',
        location: 'Unknown'
      }
    },
    {
      id: 3,
      title: 'Database Connection Pool Full',
      description: 'MySQL connection pool on database-01 is at maximum capacity',
      severity: 'high',
      status: 'active',
      source: 'Database Monitor',
      host: '192.168.1.50',
      timestamp: '2024-01-15 14:15:18',
      duration: '8 minutes',
      category: 'database',
      icon: Database,
      actions: ['Increase Pool Size', 'Kill Idle Connections', 'Restart DB'],
      details: {
        current_connections: 100,
        max_connections: 100,
        active_queries: 87,
        slow_queries: 12
      }
    },
    {
      id: 4,
      title: 'Network Bandwidth Spike',
      description: 'Unusual bandwidth usage detected on subnet 10.0.1.0/24',
      severity: 'medium',
      status: 'acknowledged',
      source: 'Network Monitor',
      host: '10.0.1.1',
      timestamp: '2024-01-15 14:10:55',
      duration: '15 minutes',
      category: 'network',
      icon: Network,
      actions: ['Traffic Analysis', 'QoS Adjustment', 'Investigate'],
      details: {
        current_usage: '850 Mbps',
        threshold: '500 Mbps',
        top_talker: '10.0.1.45',
        protocol: 'HTTP/HTTPS'
      }
    },
    {
      id: 5,
      title: 'Service Health Check Failed',
      description: 'Web server on port 80 is not responding to health checks',
      severity: 'high',
      status: 'resolved',
      source: 'Service Monitor',
      host: '192.168.1.60',
      timestamp: '2024-01-15 13:45:12',
      duration: '3 minutes',
      category: 'service',
      icon: Server,
      actions: ['Restart Service', 'Check Logs', 'Failover'],
      details: {
        service: 'Apache HTTP Server',
        port: 80,
        response_code: 'No Response',
        last_success: '2024-01-15 13:42:08'
      }
    },
    {
      id: 6,
      title: 'Disk Space Low Warning',
      description: 'Disk usage on /var partition has reached 88%',
      severity: 'medium',
      status: 'active',
      source: 'System Monitor',
      host: '192.168.1.100',
      timestamp: '2024-01-15 13:30:27',
      duration: '45 minutes',
      category: 'system',
      icon: Activity,
      actions: ['Clean Logs', 'Archive Data', 'Add Storage'],
      details: {
        partition: '/var',
        usage: '88%',
        available: '2.4 GB',
        growth_rate: '1.2 GB/day'
      }
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/40';
      case 'high': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      case 'low': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <AlertTriangle className="w-4 h-4 text-cyber-red" />;
      case 'acknowledged': return <Clock className="w-4 h-4 text-cyber-yellow" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-cyber-green" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'text-cyber-red';
      case 'performance': return 'text-cyber-blue';
      case 'network': return 'text-cyber-purple';
      case 'database': return 'text-cyber-green';
      case 'service': return 'text-cyber-yellow';
      case 'system': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.status === filter || alert.severity === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const alertCounts = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    critical: alerts.filter(a => a.severity === 'critical').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Alert Manager</h1>
          <p className="text-gray-400 mt-1">Monitor and manage system alerts and notifications</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Alert Rules</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Alerts</p>
              <p className="text-2xl font-bold text-white">{alertCounts.total}</p>
            </div>
            <div className="p-3 bg-cyber-blue/10 rounded-lg">
              <Bell className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Alerts</p>
              <p className="text-2xl font-bold text-cyber-red">{alertCounts.active}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-cyber-red" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-400">{alertCounts.critical}</p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Acknowledged</p>
              <p className="text-2xl font-bold text-cyber-yellow">{alertCounts.acknowledged}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Clock className="w-6 h-6 text-cyber-yellow" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Alert Filters</h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            >
              <option value="all">All Alerts</option>
              <option value="active">Active</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="resolved">Resolved</option>
              <option value="critical">Critical</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
            </select>
          </div>
          
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search alerts..."
              className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
          
          <div className="text-sm text-gray-400">
            Showing {filteredAlerts.length} of {alerts.length} alerts
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const AlertIcon = alert.icon;
          
          return (
            <div key={alert.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg">
                    <AlertIcon className={`w-6 h-6 ${getCategoryColor(alert.category)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{alert.title}</h4>
                      {getStatusIcon(alert.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{alert.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Host: {alert.host}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Source: {alert.source}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Duration: {alert.duration}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Time: {alert.timestamp}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Category: {alert.category}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Status: {alert.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Alert Details */}
                    <div className="bg-gray-700 rounded-lg p-4 mb-4">
                      <h5 className="text-sm font-medium text-white mb-2">Alert Details</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {Object.entries(alert.details).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-400">{key.replace('_', ' ')}:</span>
                            <span className="text-white ml-2">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                      {alert.actions.map((action, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-xs text-gray-300 rounded transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Notification Settings */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notification Channels</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Mail className="w-5 h-5 text-cyber-blue" />
              <span className="text-white font-medium">Email Alerts</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Send alerts via email</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
              <span className="text-sm text-gray-300">Active</span>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <MessageSquare className="w-5 h-5 text-cyber-green" />
              <span className="text-white font-medium">Slack Integration</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Send alerts to Slack channels</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
              <span className="text-sm text-gray-300">Active</span>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Phone className="w-5 h-5 text-cyber-yellow" />
              <span className="text-white font-medium">SMS Alerts</span>
            </div>
            <p className="text-sm text-gray-400 mb-3">Critical alerts via SMS</p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyber-yellow rounded-full"></div>
              <span className="text-sm text-gray-300">Critical Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertManager;