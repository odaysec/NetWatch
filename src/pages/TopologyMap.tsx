import React, { useState } from 'react';
import {
  GitBranch,
  Server,
  Router,
  Smartphone,
  Monitor,
  Printer,
  Shield,
  Wifi,
  Globe,
  Database,
  HardDrive,
  Activity,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  Download,
  RefreshCw,
  Layers,
  Filter
} from 'lucide-react';

const TopologyMap = () => {
  const [viewMode, setViewMode] = useState('logical');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showLabels, setShowLabels] = useState(true);

  const networkDevices = [
    {
      id: 'router-1',
      name: 'Main Router',
      type: 'router',
      ip: '192.168.1.1',
      status: 'online',
      position: { x: 50, y: 20 },
      connections: ['switch-1', 'firewall-1'],
      details: {
        model: 'Cisco ISR 4331',
        uptime: '45 days',
        throughput: '850 Mbps',
        cpu: '23%',
        memory: '45%'
      }
    },
    {
      id: 'firewall-1',
      name: 'Security Firewall',
      type: 'firewall',
      ip: '192.168.1.2',
      status: 'online',
      position: { x: 20, y: 40 },
      connections: ['router-1', 'dmz-switch'],
      details: {
        model: 'Fortinet FortiGate 100F',
        uptime: '67 days',
        blocked_threats: '1,247',
        rules: '156',
        cpu: '18%'
      }
    },
    {
      id: 'switch-1',
      name: 'Core Switch',
      type: 'switch',
      ip: '192.168.1.3',
      status: 'online',
      position: { x: 80, y: 40 },
      connections: ['router-1', 'server-1', 'server-2', 'access-switch-1'],
      details: {
        model: 'Cisco Catalyst 9300',
        uptime: '89 days',
        ports: '48',
        active_ports: '32',
        vlan_count: '12'
      }
    },
    {
      id: 'server-1',
      name: 'Web Server',
      type: 'server',
      ip: '192.168.1.50',
      status: 'online',
      position: { x: 70, y: 60 },
      connections: ['switch-1'],
      details: {
        model: 'Dell PowerEdge R740',
        os: 'Ubuntu 22.04 LTS',
        uptime: '23 days',
        cpu: '68%',
        memory: '82%',
        disk: '45%'
      }
    },
    {
      id: 'server-2',
      name: 'Database Server',
      type: 'database',
      ip: '192.168.1.51',
      status: 'warning',
      position: { x: 90, y: 60 },
      connections: ['switch-1'],
      details: {
        model: 'HP ProLiant DL380',
        os: 'CentOS 8',
        uptime: '156 days',
        cpu: '89%',
        memory: '94%',
        disk: '78%'
      }
    },
    {
      id: 'access-switch-1',
      name: 'Access Switch 1',
      type: 'switch',
      ip: '192.168.1.10',
      status: 'online',
      position: { x: 30, y: 70 },
      connections: ['switch-1', 'workstation-1', 'workstation-2', 'printer-1'],
      details: {
        model: 'Cisco Catalyst 2960',
        uptime: '45 days',
        ports: '24',
        active_ports: '18',
        poe_usage: '67%'
      }
    },
    {
      id: 'workstation-1',
      name: 'Admin Workstation',
      type: 'workstation',
      ip: '192.168.1.100',
      status: 'online',
      position: { x: 10, y: 85 },
      connections: ['access-switch-1'],
      details: {
        model: 'Dell OptiPlex 7090',
        os: 'Windows 11 Pro',
        user: 'admin',
        uptime: '8 hours',
        cpu: '25%',
        memory: '56%'
      }
    },
    {
      id: 'workstation-2',
      name: 'Developer PC',
      type: 'workstation',
      ip: '192.168.1.105',
      status: 'online',
      position: { x: 30, y: 90 },
      connections: ['access-switch-1'],
      details: {
        model: 'HP EliteDesk 800',
        os: 'Windows 11 Pro',
        user: 'developer',
        uptime: '12 hours',
        cpu: '78%',
        memory: '89%'
      }
    },
    {
      id: 'printer-1',
      name: 'Office Printer',
      type: 'printer',
      ip: '192.168.1.200',
      status: 'online',
      position: { x: 50, y: 85 },
      connections: ['access-switch-1'],
      details: {
        model: 'HP LaserJet Pro M404n',
        status: 'Ready',
        toner: '78%',
        pages_printed: '12,456',
        queue: '0 jobs'
      }
    },
    {
      id: 'wifi-ap-1',
      name: 'WiFi Access Point',
      type: 'wifi',
      ip: '192.168.1.20',
      status: 'online',
      position: { x: 60, y: 75 },
      connections: ['access-switch-1', 'mobile-1', 'mobile-2'],
      details: {
        model: 'Ubiquiti UniFi AP AC Pro',
        ssid: 'CompanyWiFi',
        clients: '23',
        channel: '6 (2.4GHz), 36 (5GHz)',
        signal_strength: '-45 dBm'
      }
    },
    {
      id: 'mobile-1',
      name: 'iPhone 14',
      type: 'mobile',
      ip: '192.168.1.150',
      status: 'online',
      position: { x: 75, y: 85 },
      connections: ['wifi-ap-1'],
      details: {
        model: 'iPhone 14 Pro',
        os: 'iOS 17.1',
        user: 'sarah.smith',
        signal: '-52 dBm',
        battery: '78%'
      }
    },
    {
      id: 'mobile-2',
      name: 'Android Device',
      type: 'mobile',
      ip: '192.168.1.151',
      status: 'offline',
      position: { x: 85, y: 90 },
      connections: ['wifi-ap-1'],
      details: {
        model: 'Samsung Galaxy S23',
        os: 'Android 14',
        user: 'john.doe',
        last_seen: '2 hours ago',
        signal: 'N/A'
      }
    }
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'router': return Router;
      case 'switch': return GitBranch;
      case 'server': return Server;
      case 'database': return Database;
      case 'workstation': return Monitor;
      case 'mobile': return Smartphone;
      case 'printer': return Printer;
      case 'firewall': return Shield;
      case 'wifi': return Wifi;
      case 'storage': return HardDrive;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-cyber-green border-cyber-green bg-green-500/10';
      case 'warning': return 'text-cyber-yellow border-cyber-yellow bg-yellow-500/10';
      case 'offline': return 'text-cyber-red border-cyber-red bg-red-500/10';
      case 'critical': return 'text-red-400 border-red-400 bg-red-500/20';
      default: return 'text-gray-400 border-gray-400 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-3 h-3 text-cyber-green" />;
      case 'warning': return <AlertTriangle className="w-3 h-3 text-cyber-yellow" />;
      case 'offline': return <XCircle className="w-3 h-3 text-cyber-red" />;
      default: return <Activity className="w-3 h-3 text-gray-400" />;
    }
  };

  const renderConnection = (from: any, to: any) => {
    const fromDevice = networkDevices.find(d => d.id === from);
    const toDevice = networkDevices.find(d => d.id === to);
    
    if (!fromDevice || !toDevice) return null;

    const x1 = fromDevice.position.x;
    const y1 = fromDevice.position.y;
    const x2 = toDevice.position.x;
    const y2 = toDevice.position.y;

    return (
      <line
        key={`${from}-${to}`}
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="#374151"
        strokeWidth="2"
        strokeDasharray="none"
        className="hover:stroke-cyber-blue transition-colors"
      />
    );
  };

  const deviceStats = {
    total: networkDevices.length,
    online: networkDevices.filter(d => d.status === 'online').length,
    warning: networkDevices.filter(d => d.status === 'warning').length,
    offline: networkDevices.filter(d => d.status === 'offline').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Network Topology</h1>
          <p className="text-gray-400 mt-1">Interactive network topology visualization and management</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="logical">Logical View</option>
            <option value="physical">Physical View</option>
            <option value="layer2">Layer 2</option>
            <option value="layer3">Layer 3</option>
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
              <p className="text-sm text-gray-400">Total Devices</p>
              <p className="text-2xl font-bold text-white">{deviceStats.total}</p>
            </div>
            <div className="p-3 bg-cyber-blue/10 rounded-lg">
              <GitBranch className="w-6 h-6 text-cyber-blue" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Online</p>
              <p className="text-2xl font-bold text-cyber-green">{deviceStats.online}</p>
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
              <p className="text-2xl font-bold text-cyber-yellow">{deviceStats.warning}</p>
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
              <p className="text-2xl font-bold text-cyber-red">{deviceStats.offline}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <XCircle className="w-6 h-6 text-cyber-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Topology View */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Topology Canvas */}
        <div className="lg:col-span-3 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Network Topology Map</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                  showLabels 
                    ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30' 
                    : 'bg-gray-700 text-gray-400 border border-gray-600'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>Labels</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* SVG Topology Canvas */}
          <div className="relative bg-gray-900 rounded-lg border border-gray-700 h-96 overflow-hidden">
            <svg className="w-full h-full">
              {/* Render connections first */}
              {networkDevices.map(device => 
                device.connections.map(connectionId => 
                  renderConnection(device.id, connectionId)
                )
              )}
              
              {/* Render devices */}
              {networkDevices.map(device => {
                const DeviceIcon = getDeviceIcon(device.type);
                return (
                  <g key={device.id}>
                    {/* Device node */}
                    <circle
                      cx={`${device.position.x}%`}
                      cy={`${device.position.y}%`}
                      r="20"
                      className={`cursor-pointer transition-all hover:r-25 ${getStatusColor(device.status)}`}
                      onClick={() => setSelectedDevice(device)}
                      fill="currentColor"
                      fillOpacity="0.1"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    
                    {/* Device icon */}
                    <foreignObject
                      x={`${device.position.x - 1.5}%`}
                      y={`${device.position.y - 1.5}%`}
                      width="3%"
                      height="3%"
                      className="pointer-events-none"
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        <DeviceIcon className={`w-4 h-4 ${getStatusColor(device.status).split(' ')[0]}`} />
                      </div>
                    </foreignObject>
                    
                    {/* Status indicator */}
                    <foreignObject
                      x={`${device.position.x + 1}%`}
                      y={`${device.position.y - 2}%`}
                      width="1%"
                      height="1%"
                      className="pointer-events-none"
                    >
                      <div className="flex items-center justify-center w-full h-full">
                        {getStatusIcon(device.status)}
                      </div>
                    </foreignObject>
                    
                    {/* Device label */}
                    {showLabels && (
                      <text
                        x={`${device.position.x}%`}
                        y={`${device.position.y + 4}%`}
                        textAnchor="middle"
                        className="fill-white text-xs font-medium pointer-events-none"
                      >
                        {device.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Device Details Panel */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Device Details</h3>
          
          {selectedDevice ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                {(() => {
                  const DeviceIcon = getDeviceIcon(selectedDevice.type);
                  return <DeviceIcon className={`w-8 h-8 ${getStatusColor(selectedDevice.status).split(' ')[0]}`} />;
                })()}
                <div>
                  <h4 className="text-white font-medium">{selectedDevice.name}</h4>
                  <p className="text-sm text-gray-400">{selectedDevice.ip}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Status</span>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedDevice.status)}
                    <span className={`text-sm ${getStatusColor(selectedDevice.status).split(' ')[0]}`}>
                      {selectedDevice.status}
                    </span>
                  </div>
                </div>
                
                {Object.entries(selectedDevice.details).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-400 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-white">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-2">Connections</p>
                <div className="space-y-1">
                  {selectedDevice.connections.map(connId => {
                    const connectedDevice = networkDevices.find(d => d.id === connId);
                    return connectedDevice ? (
                      <div key={connId} className="text-sm text-gray-300">
                        • {connectedDevice.name}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <button className="flex-1 flex items-center justify-center space-x-2 bg-cyber-blue/20 hover:bg-cyber-blue/30 border border-cyber-blue/30 text-cyber-blue py-2 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Configure</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/30 text-cyber-green py-2 rounded-lg transition-colors">
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">Monitor</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <GitBranch className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Click on a device to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Topology Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <RefreshCw className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Auto-Discovery</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Layers className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Layer View</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-yellow/10 hover:bg-cyber-yellow/20 border border-cyber-yellow/30 rounded-lg p-4 transition-colors">
            <Filter className="w-5 h-5 text-cyber-yellow" />
            <span className="text-sm text-white">Filter Devices</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Download className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">Export Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopologyMap;