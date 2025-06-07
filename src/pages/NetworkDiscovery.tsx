import React, { useState } from 'react';
import {
  Radar,
  Search,
  Filter,
  RefreshCw,
  MapPin,
  Shield,
  Wifi,
  Server,
  Smartphone,
  Monitor,
  Printer,
  Router,
  HardDrive,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

const NetworkDiscovery = () => {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [filter, setFilter] = useState('all');

  const handleScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const networkDevices = [
    {
      id: 1,
      hostname: 'DESKTOP-4K7F9X2',
      ip: '192.168.1.105',
      mac: '00:1B:44:11:3A:B7',
      os: 'Windows 11 Pro',
      deviceType: 'workstation',
      status: 'online',
      ports: [22, 80, 443, 3389],
      vendor: 'Dell Inc.',
      location: 'Building A, Floor 2',
      lastSeen: '2 minutes ago',
      risk: 'low',
      services: ['SSH', 'HTTP', 'HTTPS', 'RDP']
    },
    {
      id: 2,
      hostname: 'iPhone-Sarah',
      ip: '192.168.1.87',
      mac: '02:00:00:00:00:00',
      os: 'iOS 17.1',
      deviceType: 'mobile',
      status: 'online',
      ports: [80, 443],
      vendor: 'Apple Inc.',
      location: 'WiFi Network',
      lastSeen: '5 minutes ago',
      risk: 'low',
      services: ['HTTP', 'HTTPS']
    },
    {
      id: 3,
      hostname: 'ubuntu-server-01',
      ip: '192.168.1.50',
      mac: '00:16:3E:5E:6C:0F',
      os: 'Ubuntu 22.04 LTS',
      deviceType: 'server',
      status: 'online',
      ports: [22, 80, 443, 8080, 3306, 5432],
      vendor: 'VMware, Inc.',
      location: 'Data Center Rack 3',
      lastSeen: '1 minute ago',
      risk: 'medium',
      services: ['SSH', 'HTTP', 'HTTPS', 'Jenkins', 'MySQL', 'PostgreSQL']
    },
    {
      id: 4,
      hostname: 'HP-LaserJet-Pro',
      ip: '192.168.1.200',
      mac: '00:1F:29:4A:7B:2C',
      os: 'HP JetDirect',
      deviceType: 'printer',
      status: 'online',
      ports: [80, 443, 9100],
      vendor: 'Hewlett-Packard',
      location: 'Office Floor 1',
      lastSeen: '3 minutes ago',
      risk: 'low',
      services: ['HTTP', 'HTTPS', 'Print Service']
    },
    {
      id: 5,
      hostname: 'cisco-switch-01',
      ip: '192.168.1.1',
      mac: '00:1A:A2:F4:8C:14',
      os: 'Cisco IOS',
      deviceType: 'router',
      status: 'online',
      ports: [22, 23, 80, 443],
      vendor: 'Cisco Systems',
      location: 'Network Closet A',
      lastSeen: '30 seconds ago',
      risk: 'high',
      services: ['SSH', 'Telnet', 'HTTP', 'HTTPS']
    },
    {
      id: 6,
      hostname: 'UNKNOWN-DEVICE',
      ip: '192.168.1.234',
      mac: '00:50:56:C0:00:08',
      os: 'Unknown',
      deviceType: 'unknown',
      status: 'offline',
      ports: [],
      vendor: 'Unknown',
      location: 'Unknown',
      lastSeen: '2 hours ago',
      risk: 'high',
      services: []
    }
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'workstation': return Monitor;
      case 'mobile': return Smartphone;
      case 'server': return Server;
      case 'printer': return Printer;
      case 'router': return Router;
      case 'storage': return HardDrive;
      default: return Shield;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      case 'high': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-cyber-green" />;
      case 'offline': return <XCircle className="w-4 h-4 text-cyber-red" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-cyber-yellow" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredDevices = filter === 'all' ? networkDevices : networkDevices.filter(device => device.deviceType === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Network Discovery</h1>
          <p className="text-gray-400 mt-1">Discover and analyze network devices and services</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <Radar className="w-4 h-4 text-cyber-green" />
            <span className="text-sm text-white">{networkDevices.length} devices discovered</span>
          </div>
        </div>
      </div>

      {/* Scan Controls */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Network Scan</h3>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="flex items-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/30 text-cyber-green px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${scanning ? 'animate-spin' : ''}`} />
            <span>{scanning ? 'Scanning...' : 'Start Scan'}</span>
          </button>
        </div>
        
        {scanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyber-green to-cyber-blue transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">Scanning subnet 192.168.1.0/24...</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">IP Range</p>
                <p className="text-white font-semibold">192.168.1.0/24</p>
              </div>
              <Wifi className="w-8 h-8 text-cyber-blue" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Hosts</p>
                <p className="text-white font-semibold">247</p>
              </div>
              <Server className="w-8 h-8 text-cyber-green" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Open Ports</p>
                <p className="text-white font-semibold">1,423</p>
              </div>
              <Shield className="w-8 h-8 text-cyber-yellow" />
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Risk Score</p>
                <p className="text-white font-semibold">Medium</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-cyber-red" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
        >
          <option value="all">All Devices</option>
          <option value="workstation">Workstations</option>
          <option value="server">Servers</option>
          <option value="mobile">Mobile Devices</option>
          <option value="printer">Printers</option>
          <option value="router">Network Equipment</option>
          <option value="unknown">Unknown Devices</option>
        </select>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span>Showing {filteredDevices.length} of {networkDevices.length} devices</span>
        </div>
      </div>

      {/* Device List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredDevices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.deviceType);
          
          return (
            <div key={device.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg">
                    <DeviceIcon className="w-6 h-6 text-cyber-blue" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-white">{device.hostname}</h4>
                      {getStatusIcon(device.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(device.risk)}`}>
                        {device.risk.toUpperCase()} RISK
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Network Information</p>
                        <p className="text-white">IP: {device.ip}</p>
                        <p className="text-white">MAC: {device.mac}</p>
                        <p className="text-gray-300">Vendor: {device.vendor}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">System Information</p>
                        <p className="text-white">OS: {device.os}</p>
                        <p className="text-white">Type: {device.deviceType}</p>
                        <p className="text-gray-300">Last Seen: {device.lastSeen}</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400">Services & Ports</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {device.ports.slice(0, 6).map((port, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-700 text-xs rounded">
                              {port}
                            </span>
                          ))}
                          {device.ports.length > 6 && (
                            <span className="px-2 py-1 bg-gray-700 text-xs rounded">
                              +{device.ports.length - 6} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs">{device.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkDiscovery;