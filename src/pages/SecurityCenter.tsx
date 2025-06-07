import React, { useState } from 'react';
import {
  ShieldAlert,
  Shield,
  AlertTriangle,
  Eye,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  Globe,
  Activity,
  Zap,
  Target,
  Search,
  Filter,
  Download,
  RefreshCw,
  Clock,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SecurityCenter = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [threatFilter, setThreatFilter] = useState('all');

  // Mock security data
  const threatData = [
    { time: '00:00', malware: 5, intrusion: 3, ddos: 1, phishing: 2, total: 11 },
    { time: '04:00', malware: 3, intrusion: 2, ddos: 0, phishing: 1, total: 6 },
    { time: '08:00', malware: 8, intrusion: 5, ddos: 2, phishing: 4, total: 19 },
    { time: '12:00', malware: 12, intrusion: 8, ddos: 3, phishing: 6, total: 29 },
    { time: '16:00', malware: 9, intrusion: 6, ddos: 1, phishing: 3, total: 19 },
    { time: '20:00', malware: 6, intrusion: 4, ddos: 1, phishing: 2, total: 13 }
  ];

  const vulnerabilityData = [
    { severity: 'Critical', count: 8, color: '#ef4444' },
    { severity: 'High', count: 23, color: '#f97316' },
    { severity: 'Medium', count: 45, color: '#eab308' },
    { severity: 'Low', count: 67, color: '#22c55e' },
    { severity: 'Info', count: 34, color: '#6b7280' }
  ];

  const securityEvents = [
    {
      id: 1,
      timestamp: '2024-01-15 14:23:45',
      type: 'Intrusion Attempt',
      severity: 'critical',
      source: '203.123.45.67',
      target: '192.168.1.50',
      description: 'Multiple failed SSH login attempts detected',
      status: 'blocked',
      action: 'IP blocked for 24 hours',
      details: {
        attempts: 15,
        protocol: 'SSH',
        port: 22,
        country: 'Unknown',
        reputation: 'Malicious'
      }
    },
    {
      id: 2,
      timestamp: '2024-01-15 14:18:32',
      type: 'Malware Detection',
      severity: 'high',
      source: '192.168.1.105',
      target: 'Email Server',
      description: 'Trojan.Win32.Agent detected in email attachment',
      status: 'quarantined',
      action: 'File quarantined, user notified',
      details: {
        file: 'invoice.pdf.exe',
        hash: 'a1b2c3d4e5f6...',
        size: '2.4 MB',
        sender: 'unknown@suspicious.com',
        detection_rate: '45/67'
      }
    },
    {
      id: 3,
      timestamp: '2024-01-15 14:15:18',
      type: 'DDoS Attack',
      severity: 'high',
      source: 'Multiple IPs',
      target: '192.168.1.1',
      description: 'Distributed denial of service attack detected',
      status: 'mitigated',
      action: 'Traffic filtered, rate limiting applied',
      details: {
        requests_per_second: '15,000',
        attack_duration: '12 minutes',
        source_countries: ['CN', 'RU', 'KP'],
        attack_type: 'HTTP Flood',
        mitigation: 'DDoS Protection'
      }
    },
    {
      id: 4,
      timestamp: '2024-01-15 14:10:55',
      type: 'Phishing Attempt',
      severity: 'medium',
      source: 'phishing@fake-bank.com',
      target: 'sarah.smith@company.com',
      description: 'Phishing email attempting credential theft',
      status: 'blocked',
      action: 'Email blocked, user training scheduled',
      details: {
        subject: 'Urgent: Verify Your Account',
        spoofed_domain: 'bank-security.com',
        links: 3,
        attachments: 0,
        confidence: '98%'
      }
    },
    {
      id: 5,
      timestamp: '2024-01-15 14:05:22',
      type: 'Unauthorized Access',
      severity: 'high',
      source: '192.168.1.87',
      target: 'File Server',
      description: 'Access attempt to restricted directory',
      status: 'denied',
      action: 'Access denied, security team alerted',
      details: {
        user: 'guest_user',
        resource: '/admin/confidential/',
        method: 'SMB',
        permissions: 'Read/Write',
        escalation: 'Privilege escalation attempt'
      }
    }
  ];

  const securityMetrics = [
    {
      title: 'Threats Blocked',
      value: '1,247',
      change: '+23',
      trend: 'up',
      icon: Shield,
      color: 'text-cyber-green'
    },
    {
      title: 'Active Vulnerabilities',
      value: '177',
      change: '-12',
      trend: 'up',
      icon: AlertTriangle,
      color: 'text-cyber-red'
    },
    {
      title: 'Security Score',
      value: '94/100',
      change: '+2',
      trend: 'up',
      icon: Target,
      color: 'text-cyber-blue'
    },
    {
      title: 'Incidents Today',
      value: '8',
      change: '+3',
      trend: 'down',
      icon: ShieldAlert,
      color: 'text-cyber-yellow'
    }
  ];

  const complianceStatus = [
    { framework: 'ISO 27001', status: 'compliant', score: 96, lastAudit: '2024-01-10' },
    { framework: 'SOC 2 Type II', status: 'compliant', score: 98, lastAudit: '2024-01-08' },
    { framework: 'GDPR', status: 'compliant', score: 92, lastAudit: '2024-01-12' },
    { framework: 'HIPAA', status: 'non-compliant', score: 87, lastAudit: '2024-01-05' },
    { framework: 'PCI DSS', status: 'compliant', score: 95, lastAudit: '2024-01-15' }
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
      case 'blocked': return <Shield className="w-4 h-4 text-cyber-green" />;
      case 'quarantined': return <Lock className="w-4 h-4 text-cyber-yellow" />;
      case 'mitigated': return <CheckCircle className="w-4 h-4 text-cyber-blue" />;
      case 'denied': return <XCircle className="w-4 h-4 text-cyber-red" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      case 'non-compliant': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      case 'partial': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Security Command Center</h1>
          <p className="text-gray-400 mt-1">Advanced threat detection and security monitoring</p>
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
          <button className="flex items-center space-x-2 bg-cyber-red/20 hover:bg-cyber-red/30 border border-cyber-red/30 text-cyber-red px-4 py-2 rounded-lg transition-colors">
            <ShieldAlert className="w-4 h-4" />
            <span>Threat Hunt</span>
          </button>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => {
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

      {/* Main Security Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Timeline */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Threat Detection Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={threatData}>
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
              <Area type="monotone" dataKey="malware" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} name="Malware" />
              <Area type="monotone" dataKey="intrusion" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.3} name="Intrusion" />
              <Area type="monotone" dataKey="ddos" stackId="1" stroke="#eab308" fill="#eab308" fillOpacity={0.3} name="DDoS" />
              <Area type="monotone" dataKey="phishing" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} name="Phishing" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vulnerability Distribution */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Vulnerability Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={vulnerabilityData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {vulnerabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {vulnerabilityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-400">{item.severity}</span>
                </div>
                <span className="text-sm text-white">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Security Events</h3>
          <div className="flex items-center space-x-4">
            <select
              value={threatFilter}
              onChange={(e) => setThreatFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            >
              <option value="all">All Events</option>
              <option value="critical">Critical</option>
              <option value="high">High Priority</option>
              <option value="blocked">Blocked</option>
              <option value="active">Active Threats</option>
            </select>
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {securityEvents.map((event) => (
            <div key={event.id} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-lg">
                    <ShieldAlert className={`w-6 h-6 ${getSeverityColor(event.severity).split(' ')[0]}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{event.type}</h4>
                      {getStatusIcon(event.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(event.severity)}`}>
                        {event.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{event.timestamp}</span>
                    </div>
                    
                    <p className="text-gray-300 mb-3">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Source</p>
                        <p className="text-sm text-white">{event.source}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Target</p>
                        <p className="text-sm text-white">{event.target}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Action Taken</p>
                        <p className="text-sm text-white">{event.action}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded p-3">
                      <p className="text-xs text-gray-400 mb-2">Event Details</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        {Object.entries(event.details).map(([key, value]) => (
                          <div key={key}>
                            <span className="text-gray-400">{key.replace('_', ' ')}:</span>
                            <span className="text-white ml-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Compliance Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {complianceStatus.map((item, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{item.framework}</h4>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getComplianceColor(item.status)}`}>
                  {item.status === 'compliant' ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Score</span>
                  <span className="text-white">{item.score}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.score >= 90 ? 'bg-cyber-green' : item.score >= 70 ? 'bg-cyber-yellow' : 'bg-cyber-red'
                    }`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">
                  Last audit: {item.lastAudit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-red/10 hover:bg-cyber-red/20 border border-cyber-red/30 rounded-lg p-4 transition-colors">
            <ShieldAlert className="w-5 h-5 text-cyber-red" />
            <span className="text-sm text-white">Threat Hunt</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Search className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Investigate</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 rounded-lg p-4 transition-colors">
            <Fingerprint className="w-5 h-5 text-cyber-yellow" />
            <span className="text-sm text-white">Forensics</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <Shield className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Block Threat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCenter;