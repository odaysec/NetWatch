import React, { useState } from 'react';
import {
  Search,
  Target,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Settings,
  Download,
  Filter,
  Clock,
  Server,
  Lock,
  Unlock,
  Eye,
  BarChart3
} from 'lucide-react';

const PortScanner = () => {
  const [scanTarget, setScanTarget] = useState('192.168.1.0/24');
  const [scanType, setScanType] = useState('tcp');
  const [portRange, setPortRange] = useState('1-1000');
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

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
        return prev + 2;
      });
    }, 100);
  };

  const scanResults = [
    {
      ip: '192.168.1.50',
      hostname: 'ubuntu-server-01',
      openPorts: [
        { port: 22, service: 'SSH', state: 'open', risk: 'medium', banner: 'OpenSSH 8.9p1 Ubuntu' },
        { port: 80, service: 'HTTP', state: 'open', risk: 'low', banner: 'Apache/2.4.41 (Ubuntu)' },
        { port: 443, service: 'HTTPS', state: 'open', risk: 'low', banner: 'Apache/2.4.41 (Ubuntu)' },
        { port: 3306, service: 'MySQL', state: 'open', risk: 'high', banner: 'MySQL 8.0.33-0ubuntu0.20.04.2' },
        { port: 5432, service: 'PostgreSQL', state: 'open', risk: 'high', banner: 'PostgreSQL 12.15' },
        { port: 8080, service: 'HTTP-Proxy', state: 'open', risk: 'medium', banner: 'Jetty 9.4.z-SNAPSHOT' }
      ],
      totalScanned: 1000,
      scanTime: '2.4s',
      os: 'Linux Ubuntu 22.04',
      risk: 'high'
    },
    {
      ip: '192.168.1.105',
      hostname: 'DESKTOP-4K7F9X2',
      openPorts: [
        { port: 135, service: 'MSRPC', state: 'open', risk: 'medium', banner: 'Microsoft Windows RPC' },
        { port: 139, service: 'NetBIOS', state: 'open', risk: 'medium', banner: 'Microsoft Windows netbios-ssn' },
        { port: 445, service: 'SMB', state: 'open', risk: 'high', banner: 'Microsoft Windows Server 2008 R2 - 2012 microsoft-ds' },
        { port: 3389, service: 'RDP', state: 'open', risk: 'high', banner: 'Microsoft Terminal Services' },
        { port: 5357, service: 'WSD', state: 'open', risk: 'low', banner: 'Microsoft HTTPAPI httpd 2.0' }
      ],
      totalScanned: 1000,
      scanTime: '1.8s',
      os: 'Windows 11 Pro',
      risk: 'high'
    },
    {
      ip: '192.168.1.1',
      hostname: 'cisco-switch-01',
      openPorts: [
        { port: 22, service: 'SSH', state: 'open', risk: 'medium', banner: 'Cisco SSH 2.0' },
        { port: 23, service: 'Telnet', state: 'open', risk: 'high', banner: 'Cisco IOS Telnet' },
        { port: 80, service: 'HTTP', state: 'open', risk: 'low', banner: 'Cisco-IOS HTTPd' },
        { port: 443, service: 'HTTPS', state: 'open', risk: 'low', banner: 'Cisco-IOS HTTPd' },
        { port: 161, service: 'SNMP', state: 'open', risk: 'medium', banner: 'Cisco SNMP Agent' }
      ],
      totalScanned: 1000,
      scanTime: '3.1s',
      os: 'Cisco IOS 15.1',
      risk: 'high'
    },
    {
      ip: '192.168.1.200',
      hostname: 'HP-LaserJet-Pro',
      openPorts: [
        { port: 80, service: 'HTTP', state: 'open', risk: 'low', banner: 'HP HTTP Server' },
        { port: 443, service: 'HTTPS', state: 'open', risk: 'low', banner: 'HP HTTPS Server' },
        { port: 515, service: 'LPD', state: 'open', risk: 'low', banner: 'HP LaserJet' },
        { port: 631, service: 'IPP', state: 'open', risk: 'low', banner: 'CUPS 1.4' },
        { port: 9100, service: 'JetDirect', state: 'open', risk: 'low', banner: 'HP JetDirect' }
      ],
      totalScanned: 1000,
      scanTime: '1.2s',
      os: 'HP JetDirect',
      risk: 'low'
    }
  ];

  const vulnerabilities = [
    {
      cve: 'CVE-2023-1234',
      description: 'SSH version vulnerability allowing remote code execution',
      severity: 'critical',
      affected: '192.168.1.50:22',
      solution: 'Update OpenSSH to version 9.0 or later'
    },
    {
      cve: 'CVE-2023-5678',
      description: 'SMB protocol vulnerability enabling privilege escalation',
      severity: 'high',
      affected: '192.168.1.105:445',
      solution: 'Apply Windows security update KB5028166'
    },
    {
      cve: 'CVE-2023-9012',
      description: 'Telnet service presents security risk',
      severity: 'high',
      affected: '192.168.1.1:23',
      solution: 'Disable Telnet and use SSH instead'
    },
    {
      cve: 'CVE-2023-3456',
      description: 'MySQL default configuration vulnerability',
      severity: 'medium',
      affected: '192.168.1.50:3306',
      solution: 'Configure MySQL with proper authentication'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-cyber-green bg-green-500/10 border-green-500/30';
      case 'medium': return 'text-cyber-yellow bg-yellow-500/10 border-yellow-500/30';
      case 'high': return 'text-cyber-red bg-red-500/10 border-red-500/30';
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/40';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  const getStateIcon = (state: string) => {
    switch (state) {
      case 'open': return <CheckCircle className="w-4 h-4 text-cyber-green" />;
      case 'closed': return <XCircle className="w-4 h-4 text-cyber-red" />;
      case 'filtered': return <Shield className="w-4 h-4 text-cyber-yellow" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Advanced Port Scanner</h1>
          <p className="text-gray-400 mt-1">Comprehensive network port scanning and vulnerability assessment</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
            <Target className="w-4 h-4 text-cyber-blue" />
            <span className="text-sm text-white">4 hosts scanned</span>
          </div>
        </div>
      </div>

      {/* Scan Configuration */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Scan Configuration</h3>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Advanced Settings</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Target</label>
            <input
              type="text"
              value={scanTarget}
              onChange={(e) => setScanTarget(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
              placeholder="IP address or range"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Scan Type</label>
            <select
              value={scanType}
              onChange={(e) => setScanType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            >
              <option value="tcp">TCP Connect</option>
              <option value="syn">TCP SYN</option>
              <option value="udp">UDP</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Port Range</label>
            <input
              type="text"
              value={portRange}
              onChange={(e) => setPortRange(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
              placeholder="1-65535"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleScan}
              disabled={scanning}
              className="w-full flex items-center justify-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/30 text-cyber-green py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {scanning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{scanning ? 'Scanning...' : 'Start Scan'}</span>
            </button>
          </div>
        </div>

        {scanning && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Scan Progress</span>
              <span className="text-white">{scanProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyber-green to-cyber-blue transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400">Scanning {scanTarget} ports {portRange}...</p>
          </div>
        )}
      </div>

      {/* Scan Results */}
      <div className="space-y-4">
        {scanResults.map((result, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-lg">
                  <Server className="w-6 h-6 text-cyber-blue" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="text-lg font-semibold text-white">{result.hostname}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(result.risk)}`}>
                      {result.risk.toUpperCase()} RISK
                    </span>
                  </div>
                  <p className="text-gray-400">{result.ip} • {result.os}</p>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span>Scanned: {result.totalScanned} ports</span>
                    <span>Time: {result.scanTime}</span>
                    <span>Open: {result.openPorts.length} ports</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {result.openPorts.map((port, portIndex) => (
                <div key={portIndex} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStateIcon(port.state)}
                      <span className="text-white font-medium">Port {port.port}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded border ${getRiskColor(port.risk)}`}>
                      {port.risk.toUpperCase()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-300">Service: {port.service}</p>
                    <p className="text-xs text-gray-400">Banner: {port.banner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Vulnerabilities */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Detected Vulnerabilities</h3>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-lg text-sm text-gray-300 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {vulnerabilities.map((vuln, index) => (
            <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <AlertTriangle className="w-5 h-5 text-cyber-red mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium">{vuln.cve}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getRiskColor(vuln.severity)}`}>
                        {vuln.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{vuln.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Affected: {vuln.affected}</span>
                    </div>
                    <div className="mt-2 p-3 bg-gray-800 rounded border-l-4 border-cyber-blue">
                      <p className="text-sm text-gray-300">
                        <strong className="text-cyber-blue">Solution:</strong> {vuln.solution}
                      </p>
                    </div>
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

      {/* Quick Actions */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Scan Templates</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-2 bg-cyber-green/10 hover:bg-cyber-green/20 border border-cyber-green/30 rounded-lg p-4 transition-colors">
            <Shield className="w-5 h-5 text-cyber-green" />
            <span className="text-sm text-white">Common Ports</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg p-4 transition-colors">
            <Search className="w-5 h-5 text-cyber-blue" />
            <span className="text-sm text-white">Full Scan</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-red/10 hover:bg-cyber-red/20 border border-cyber-red/30 rounded-lg p-4 transition-colors">
            <AlertTriangle className="w-5 h-5 text-cyber-red" />
            <span className="text-sm text-white">Vuln Scan</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-purple/10 hover:bg-cyber-purple/20 border border-cyber-purple/30 rounded-lg p-4 transition-colors">
            <Clock className="w-5 h-5 text-cyber-purple" />
            <span className="text-sm text-white">Stealth Scan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortScanner;