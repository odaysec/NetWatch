import React, { useState } from 'react';
import {
  Network,
  TrendingUp,
  TrendingDown,
  Activity,
  Globe,
  Shield,
  AlertTriangle,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Eye,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TrafficAnalysis = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [trafficType, setTrafficType] = useState('all');

  // Mock data for traffic analysis
  const trafficData = [
    { time: '00:00', inbound: 250, outbound: 180, total: 430, packets: 15000, attacks: 2 },
    { time: '02:00', inbound: 180, outbound: 120, total: 300, packets: 12000, attacks: 1 },
    { time: '04:00', inbound: 120, outbound: 90, total: 210, packets: 8000, attacks: 0 },
    { time: '06:00', inbound: 300, outbound: 220, total: 520, packets: 18000, attacks: 3 },
    { time: '08:00', inbound: 450, outbound: 380, total: 830, packets: 25000, attacks: 5 },
    { time: '10:00', inbound: 520, outbound: 420, total: 940, packets: 28000, attacks: 4 },
    { time: '12:00', inbound: 480, outbound: 390, total: 870, packets: 26000, attacks: 2 },
    { time: '14:00', inbound: 550, outbound: 450, total: 1000, packets: 30000, attacks: 6 },
    { time: '16:00', inbound: 480, outbound: 380, total: 860, packets: 24000, attacks: 3 },
    { time: '18:00', inbound: 420, outbound: 320, total: 740, packets: 22000, attacks: 2 },
    { time: '20:00', inbound: 380, outbound: 280, total: 660, packets: 20000, attacks: 1 },
    { time: '22:00', inbound: 320, outbound: 240, total: 560, packets: 18000, attacks: 1 }
  ];

  const protocolData = [
    { name: 'HTTP/HTTPS', value: 45, color: '#00ff88' },
    { name: 'TCP', value: 25, color: '#0099ff' },
    { name: 'UDP', value: 15, color: '#8b5cf6' },
    { name: 'ICMP', value: 8, color: '#fbbf24' },
    { name: 'Others', value: 7, color: '#f87171' }
  ];

  const topTalkers = [
    { ip: '192.168.1.50', hostname: 'ubuntu-server-01', traffic: '2.4 GB', sessions: 1847, risk: 'low' },
    { ip: '192.168.1.105', hostname: 'DESKTOP-4K7F9X2', traffic: '1.8 GB', sessions: 892, risk: 'low' },
    { ip: '10.0.1.45', hostname: 'web-server-02', traffic: '1.2 GB', sessions: 2156, risk: 'medium' },
    { ip: '172.16.0.100', hostname: 'database-01', traffic: '950 MB', sessions: 567, risk: 'low' },
    { ip: '192.168.1.87', hostname: 'iPhone-Sarah', traffic: '420 MB', sessions: 234, risk: 'low' },
    { ip: '203.123.45.67', hostname: 'unknown-external', traffic: '380 MB', sessions: 89, risk: 'high' }
  ];

  const anomalies = [
    {
      timestamp: '14:23:45',
      type: 'Traffic Spike',
      description: 'Unusual bandwidth spike detected from 192.168.1.105',
      severity: 'medium',
      impact: 'Performance degradation on subnet'
    },
    {
      timestamp: '13:45:12',
      type: 'Port Scan',
      description: 'Multiple port scan attempts from 203.123.45.67',
      severity: 'high',
      impact: 'Potential security breach attempt'
    },
    {
      timestamp: '12:18:33',
      type: 'Protocol Anomaly',
      description: 'Unexpected UDP traffic pattern on port 53',
      severity: 'low',
      impact: 'DNS query irregularity'
    },
    {
      timestamp: '11:56:21',
      type: 'Connection Flood',
      description: 'High number of connections from single source',
      severity: 'high',
      impact: 'Possible DDoS attempt'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      case 'high': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-cyber-green';
      case 'medium': return 'text-cyber-yellow';
      case 'high': return 'text-cyber-red';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Traffic Analysis</h1>
          <p className="text-gray-400 mt-1">Real-time network traffic monitoring and analysis</p>
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
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Traffic</p>
              <p className="text-2xl font-bold text-white">847.2 GB</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-4 h-4 text-cyber-green" />
                <span className="text-sm text-cyber-green">+12.5%</span>
              </div>
            </div>
            <div className="p-3 bg-cyber-blue/10 rounded-lg">
              <Network className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Sessions</p>
              <p className="text-2xl font-bold text-white">8,429</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp className="w-4 h-4 text-cyber-green" />
                <span className="text-sm text-cyber-green">+8.2%</span>
              </div>
            </div>
            <div className="p-3 bg-cyber-green/10 rounded-lg">
              <Activity className="w-6 h-6 text-cyber-green" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Latency</p>
              <p className="text-2xl font-bold text-white">42ms</p>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingDown className="w-4 h-4 text-cyber-green" />
                <span className="text-sm text-cyber-green">-5.3ms</span>
              </div>
            </div>
            <div className="p-3 bg-cyber-purple/10 rounded-lg">
              <Zap className="w-6 h-6 text-cyber-purple" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Threats Blocked</p>
              <p className="text-2xl font-bold text-white">127</p>
              <div className="flex items-center space-x-1 mt-1">
                <Shield className="w-4 h-4 text-cyber-red" />
                <span className="text-sm text-cyber-red">+23 today</span>
              </div>
            </div>
            <div className="p-3 bg-cyber-red/10 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-cyber-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Traffic Chart */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Network Traffic Overview</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-blue rounded-full"></div>
              <span className="text-sm text-gray-400">Inbound</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-green rounded-full"></div>
              <span className="text-sm text-gray-400">Outbound</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-cyber-red rounded-full"></div>
              <span className="text-sm text-gray-400">Attacks</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={trafficData}>
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
            <Line type="monotone" dataKey="inbound" stroke="#0099ff" strokeWidth={2} dot={{ fill: '#0099ff', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="outbound" stroke="#00ff88" strokeWidth={2} dot={{ fill: '#00ff88', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="attacks" stroke="#ff3366" strokeWidth={2} dot={{ fill: '#ff3366', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Protocol Distribution */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Protocol Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={protocolData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {protocolData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {protocolData.map((item, index) => (
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

        {/* Top Talkers */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Top Talkers</h3>
            <button className="text-cyber-blue hover:text-cyber-blue/80 text-sm">View All</button>
          </div>
          <div className="space-y-3">
            {topTalkers.slice(0, 6).map((talker, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full text-xs text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{talker.hostname}</p>
                    <p className="text-xs text-gray-400">{talker.ip}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">{talker.traffic}</p>
                  <p className={`text-xs ${getRiskColor(talker.risk)}`}>
                    {talker.sessions} sessions
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Anomalies */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Traffic Anomalies</h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {anomalies.map((anomaly, index) => (
            <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-5 h-5 text-cyber-yellow mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{anomaly.type}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400">{anomaly.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{anomaly.description}</p>
                    <p className="text-xs text-gray-400">Impact: {anomaly.impact}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-lg transition-colors">
                    <BarChart3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficAnalysis;