import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Eye,
  Archive,
  Trash2,
  RefreshCw,
  Server,
  Shield,
  Network,
  Database,
  Activity
} from 'lucide-react';

const Logs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [logLevel, setLogLevel] = useState('all');
  const [logSource, setLogSource] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');

  const logEntries = [
    {
      id: 1,
      timestamp: '2024-01-15 14:23:45.123',
      level: 'error',
      source: 'web-server-01',
      category: 'application',
      message: 'Database connection timeout after 30 seconds',
      details: 'Connection to MySQL server at 192.168.1.50:3306 failed. Error: Connection timeout',
      user: 'system',
      ip: '192.168.1.50',
      session: 'sess_abc123',
      tags: ['database', 'timeout', 'mysql']
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:22:18.456',
      level: 'warning',
      source: 'firewall-01',
      category: 'security',
      message: 'Multiple failed login attempts detected',
      details: 'IP 203.123.45.67 attempted 15 failed SSH logins to 192.168.1.105 in 5 minutes',
      user: 'unknown',
      ip: '203.123.45.67',
      session: 'N/A',
      tags: ['security', 'ssh', 'brute-force']
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:21:33.789',
      level: 'info',
      source: 'dns-server-01',
      category: 'network',
      message: 'DNS query resolved successfully',
      details: 'Query for example.com resolved to 93.184.216.34 in 12ms',
      user: 'system',
      ip: '192.168.1.2',
      session: 'N/A',
      tags: ['dns', 'query', 'resolution']
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:20:55.012',
      level: 'critical',
      source: 'database-01',
      category: 'system',
      message: 'Disk space critically low',
      details: 'Partition /var/lib/mysql has only 2% free space remaining (450MB of 20GB)',
      user: 'system',
      ip: '192.168.1.51',
      session: 'N/A',
      tags: ['disk', 'storage', 'critical']
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:19:42.345',
      level: 'info',
      source: 'load-balancer-01',
      category: 'network',
      message: 'Health check passed for backend server',
      details: 'Server 192.168.1.50:80 responded with HTTP 200 in 45ms',
      user: 'system',
      ip: '192.168.1.10',
      session: 'N/A',
      tags: ['health-check', 'load-balancer', 'http']
    },
    {
      id: 6,
      timestamp: '2024-01-15 14:18:27.678',
      level: 'warning',
      source: 'mail-server-01',
      category: 'application',
      message: 'Email queue size exceeding threshold',
      details: 'Current queue size: 1,247 emails. Threshold: 1,000 emails',
      user: 'system',
      ip: '192.168.1.75',
      session: 'N/A',
      tags: ['email', 'queue', 'threshold']
    },
    {
      id: 7,
      timestamp: '2024-01-15 14:17:15.901',
      level: 'error',
      source: 'backup-server-01',
      category: 'system',
      message: 'Backup job failed',
      details: 'Daily backup of /home/data failed. Error: Permission denied accessing /home/data/restricted',
      user: 'backup-user',
      ip: '192.168.1.100',
      session: 'backup_job_001',
      tags: ['backup', 'permission', 'failure']
    },
    {
      id: 8,
      timestamp: '2024-01-15 14:16:03.234',
      level: 'info',
      source: 'monitoring-agent-01',
      category: 'monitoring',
      message: 'Metric collection completed',
      details: 'Collected 1,247 metrics from 23 hosts in 2.3 seconds',
      user: 'monitoring',
      ip: '192.168.1.200',
      session: 'metric_collection_456',
      tags: ['monitoring', 'metrics', 'collection']
    },
    {
      id: 9,
      timestamp: '2024-01-15 14:15:48.567',
      level: 'warning',
      source: 'vpn-gateway-01',
      category: 'security',
      message: 'VPN certificate expiring soon',
      details: 'SSL certificate for VPN gateway will expire in 7 days (2024-01-22)',
      user: 'system',
      ip: '10.0.1.1',
      session: 'N/A',
      tags: ['vpn', 'certificate', 'expiration']
    },
    {
      id: 10,
      timestamp: '2024-01-15 14:14:32.890',
      level: 'info',
      source: 'web-server-02',
      category: 'application',
      message: 'User login successful',
      details: 'User john.doe logged in successfully from 192.168.1.105',
      user: 'john.doe',
      ip: '192.168.1.105',
      session: 'sess_xyz789',
      tags: ['login', 'authentication', 'success']
    }
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return <XCircle className="w-4 h-4 text-red-400" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-cyber-red" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-cyber-yellow" />;
      case 'info': return <Info className="w-4 h-4 text-cyber-blue" />;
      case 'debug': return <CheckCircle className="w-4 h-4 text-gray-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/40';
      case 'error': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      case 'warning': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      case 'info': return 'text-cyber-blue bg-blue-500/10 border-blue-500/30';
      case 'debug': return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return Shield;
      case 'network': return Network;
      case 'system': return Server;
      case 'application': return Activity;
      case 'database': return Database;
      case 'monitoring': return Eye;
      default: return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security': return 'text-cyber-red';
      case 'network': return 'text-cyber-blue';
      case 'system': return 'text-cyber-green';
      case 'application': return 'text-cyber-purple';
      case 'database': return 'text-cyber-yellow';
      case 'monitoring': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const filteredLogs = logEntries.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = logLevel === 'all' || log.level === logLevel;
    const matchesSource = logSource === 'all' || log.category === logSource;
    return matchesSearch && matchesLevel && matchesSource;
  });

  const logStats = {
    total: logEntries.length,
    critical: logEntries.filter(l => l.level === 'critical').length,
    error: logEntries.filter(l => l.level === 'error').length,
    warning: logEntries.filter(l => l.level === 'warning').length,
    info: logEntries.filter(l => l.level === 'info').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Logs</h1>
          <p className="text-gray-400 mt-1">Centralized log management and analysis</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="flex items-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/30 text-cyber-blue px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Logs</p>
              <p className="text-2xl font-bold text-white">{logStats.total}</p>
            </div>
            <div className="p-3 bg-cyber-blue/10 rounded-lg">
              <FileText className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Critical</p>
              <p className="text-2xl font-bold text-red-400">{logStats.critical}</p>
            </div>
            <div className="p-3 bg-red-500/20 rounded-lg">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Errors</p>
              <p className="text-2xl font-bold text-cyber-red">{logStats.error}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-cyber-red" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Warnings</p>
              <p className="text-2xl font-bold text-cyber-yellow">{logStats.warning}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-cyber-yellow" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Info</p>
              <p className="text-2xl font-bold text-cyber-blue">{logStats.info}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Info className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Log Filters</h3>
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="w-full bg-gray-700 border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
          
          <select
            value={logLevel}
            onChange={(e) => setLogLevel(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="error">Error</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
          
          <select
            value={logSource}
            onChange={(e) => setLogSource(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="all">All Sources</option>
            <option value="security">Security</option>
            <option value="network">Network</option>
            <option value="system">System</option>
            <option value="application">Application</option>
            <option value="database">Database</option>
            <option value="monitoring">Monitoring</option>
          </select>
          
          <div className="text-sm text-gray-400 flex items-center">
            Showing {filteredLogs.length} of {logEntries.length} logs
          </div>
        </div>
      </div>

      {/* Log Entries */}
      <div className="space-y-2">
        {filteredLogs.map((log) => {
          const CategoryIcon = getCategoryIcon(log.category);
          
          return (
            <div key={log.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center space-x-2">
                    {getLevelIcon(log.level)}
                    <CategoryIcon className={`w-4 h-4 ${getCategoryColor(log.category)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm text-gray-400 font-mono">{log.timestamp}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-300">{log.source}</span>
                      <span className={`text-xs ${getCategoryColor(log.category)}`}>
                        {log.category}
                      </span>
                    </div>
                    
                    <p className="text-white mb-2 font-medium">{log.message}</p>
                    <p className="text-gray-400 text-sm mb-3">{log.details}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-gray-500 mb-3">
                      <div>
                        <span className="text-gray-400">User:</span>
                        <span className="text-white ml-1">{log.user}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">IP:</span>
                        <span className="text-white ml-1">{log.ip}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Session:</span>
                        <span className="text-white ml-1">{log.session}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">ID:</span>
                        <span className="text-white ml-1">#{log.id}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {log.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded text-gray-300">
                          {tag}
                        </span>
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
                  <button className="p-2 text-gray-400 hover:text-cyber-red hover:bg-gray-700 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Log Management Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <Download className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Export Logs</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Archive className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Archive Old</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 rounded-lg p-4 transition-colors">
            <Calendar className="w-5 h-5 text-cyber-yellow" />
            <span className="text-sm text-white">Schedule Report</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Filter className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">Advanced Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logs;