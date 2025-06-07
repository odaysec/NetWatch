import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Network,
  Shield,
  Bell,
  Users,
  Database,
  Monitor,
  Globe,
  Key,
  Clock,
  Mail,
  Smartphone,
  Save,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      systemName: 'NetWatch Pro',
      timezone: 'UTC',
      language: 'en',
      theme: 'dark',
      autoRefresh: true,
      refreshInterval: 30
    },
    network: {
      scanInterval: 300,
      discoveryEnabled: true,
      portScanTimeout: 30,
      maxConcurrentScans: 10,
      defaultSubnet: '192.168.1.0/24',
      snmpCommunity: 'public'
    },
    security: {
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      passwordPolicy: 'strong',
      twoFactorRequired: false,
      encryptionEnabled: true,
      auditLogging: true
    },
    alerts: {
      emailEnabled: true,
      smsEnabled: false,
      slackEnabled: true,
      alertThreshold: 'medium',
      maxAlertsPerHour: 50,
      escalationTime: 1800
    },
    monitoring: {
      metricsRetention: 90,
      logRetention: 365,
      performanceMonitoring: true,
      resourceThresholds: {
        cpu: 80,
        memory: 85,
        disk: 90,
        network: 75
      }
    }
  });

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'network', label: 'Network', icon: Network },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'monitoring', label: 'Monitoring', icon: Monitor }
  ];

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (category: string, parentKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey],
          [key]: value
        }
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">System Name</label>
          <input
            type="text"
            value={settings.general.systemName}
            onChange={(e) => handleSettingChange('general', 'systemName', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ja">Japanese</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
          <select
            value={settings.general.theme}
            onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Auto Refresh</h4>
            <p className="text-sm text-gray-400">Automatically refresh dashboard data</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.general.autoRefresh}
              onChange={(e) => handleSettingChange('general', 'autoRefresh', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
        
        {settings.general.autoRefresh && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Refresh Interval (seconds)</label>
            <input
              type="number"
              min="5"
              max="300"
              value={settings.general.refreshInterval}
              onChange={(e) => handleSettingChange('general', 'refreshInterval', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderNetworkSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Scan Interval (seconds)</label>
          <input
            type="number"
            min="60"
            max="3600"
            value={settings.network.scanInterval}
            onChange={(e) => handleSettingChange('network', 'scanInterval', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Port Scan Timeout (seconds)</label>
          <input
            type="number"
            min="5"
            max="120"
            value={settings.network.portScanTimeout}
            onChange={(e) => handleSettingChange('network', 'portScanTimeout', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Concurrent Scans</label>
          <input
            type="number"
            min="1"
            max="50"
            value={settings.network.maxConcurrentScans}
            onChange={(e) => handleSettingChange('network', 'maxConcurrentScans', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Default Subnet</label>
          <input
            type="text"
            value={settings.network.defaultSubnet}
            onChange={(e) => handleSettingChange('network', 'defaultSubnet', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            placeholder="192.168.1.0/24"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">SNMP Community</label>
          <input
            type="text"
            value={settings.network.snmpCommunity}
            onChange={(e) => handleSettingChange('network', 'snmpCommunity', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Auto Discovery</h4>
          <p className="text-sm text-gray-400">Automatically discover new devices on the network</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.network.discoveryEnabled}
            onChange={(e) => handleSettingChange('network', 'discoveryEnabled', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (seconds)</label>
          <input
            type="number"
            min="300"
            max="86400"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Login Attempts</label>
          <input
            type="number"
            min="3"
            max="10"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Password Policy</label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => handleSettingChange('security', 'passwordPolicy', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="weak">Weak (6+ characters)</option>
            <option value="medium">Medium (8+ characters, mixed case)</option>
            <option value="strong">Strong (12+ characters, mixed case, numbers, symbols)</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-400">Require 2FA for all user accounts</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.twoFactorRequired}
              onChange={(e) => handleSettingChange('security', 'twoFactorRequired', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Data Encryption</h4>
            <p className="text-sm text-gray-400">Encrypt sensitive data at rest and in transit</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.encryptionEnabled}
              onChange={(e) => handleSettingChange('security', 'encryptionEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-medium">Audit Logging</h4>
            <p className="text-sm text-gray-400">Log all user actions and system events</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.security.auditLogging}
              onChange={(e) => handleSettingChange('security', 'auditLogging', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderAlertSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Alert Threshold</label>
          <select
            value={settings.alerts.alertThreshold}
            onChange={(e) => handleSettingChange('alerts', 'alertThreshold', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          >
            <option value="low">Low (All alerts)</option>
            <option value="medium">Medium (Warning and above)</option>
            <option value="high">High (Critical only)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Max Alerts Per Hour</label>
          <input
            type="number"
            min="1"
            max="1000"
            value={settings.alerts.maxAlertsPerHour}
            onChange={(e) => handleSettingChange('alerts', 'maxAlertsPerHour', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Escalation Time (seconds)</label>
          <input
            type="number"
            min="300"
            max="7200"
            value={settings.alerts.escalationTime}
            onChange={(e) => handleSettingChange('alerts', 'escalationTime', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-cyber-blue" />
            <div>
              <h4 className="text-white font-medium">Email Notifications</h4>
              <p className="text-sm text-gray-400">Send alerts via email</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.alerts.emailEnabled}
              onChange={(e) => handleSettingChange('alerts', 'emailEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-cyber-green" />
            <div>
              <h4 className="text-white font-medium">SMS Notifications</h4>
              <p className="text-sm text-gray-400">Send critical alerts via SMS</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.alerts.smsEnabled}
              onChange={(e) => handleSettingChange('alerts', 'smsEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-cyber-purple" />
            <div>
              <h4 className="text-white font-medium">Slack Integration</h4>
              <p className="text-sm text-gray-400">Send alerts to Slack channels</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.alerts.slackEnabled}
              onChange={(e) => handleSettingChange('alerts', 'slackEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderMonitoringSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Metrics Retention (days)</label>
          <input
            type="number"
            min="7"
            max="365"
            value={settings.monitoring.metricsRetention}
            onChange={(e) => handleSettingChange('monitoring', 'metricsRetention', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Log Retention (days)</label>
          <input
            type="number"
            min="30"
            max="2555"
            value={settings.monitoring.logRetention}
            onChange={(e) => handleSettingChange('monitoring', 'logRetention', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-white font-medium">Performance Monitoring</h4>
          <p className="text-sm text-gray-400">Enable detailed performance metrics collection</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.monitoring.performanceMonitoring}
            onChange={(e) => handleSettingChange('monitoring', 'performanceMonitoring', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-blue"></div>
        </label>
      </div>
      
      <div>
        <h4 className="text-white font-medium mb-4">Resource Thresholds (%)</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">CPU</label>
            <input
              type="number"
              min="50"
              max="95"
              value={settings.monitoring.resourceThresholds.cpu}
              onChange={(e) => handleNestedSettingChange('monitoring', 'resourceThresholds', 'cpu', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Memory</label>
            <input
              type="number"
              min="50"
              max="95"
              value={settings.monitoring.resourceThresholds.memory}
              onChange={(e) => handleNestedSettingChange('monitoring', 'resourceThresholds', 'memory', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Disk</label>
            <input
              type="number"
              min="50"
              max="95"
              value={settings.monitoring.resourceThresholds.disk}
              onChange={(e) => handleNestedSettingChange('monitoring', 'resourceThresholds', 'disk', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Network</label>
            <input
              type="number"
              min="50"
              max="95"
              value={settings.monitoring.resourceThresholds.network}
              onChange={(e) => handleNestedSettingChange('monitoring', 'resourceThresholds', 'network', parseInt(e.target.value))}
              className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-cyber-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'network': return renderNetworkSettings();
      case 'security': return renderSecuritySettings();
      case 'alerts': return renderAlertSettings();
      case 'monitoring': return renderMonitoringSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">System Settings</h1>
          <p className="text-gray-400 mt-1">Configure system preferences and monitoring parameters</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import Config</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-300 px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Config</span>
          </button>
          <button className="flex items-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green/30 text-cyber-green px-4 py-2 rounded-lg transition-colors">
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Settings Categories</h3>
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Panel */}
        <div className="lg:col-span-3 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">
              {tabs.find(tab => tab.id === activeTab)?.label} Settings
            </h3>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm">Reset to Defaults</span>
            </button>
          </div>

          {renderTabContent()}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
            <CheckCircle className="w-5 h-5 text-cyber-green" />
            <div>
              <p className="text-sm text-white font-medium">Database</p>
              <p className="text-xs text-gray-400">Connected</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
            <CheckCircle className="w-5 h-5 text-cyber-green" />
            <div>
              <p className="text-sm text-white font-medium">Monitoring</p>
              <p className="text-xs text-gray-400">Active</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-cyber-yellow" />
            <div>
              <p className="text-sm text-white font-medium">Alerts</p>
              <p className="text-xs text-gray-400">3 Pending</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
            <CheckCircle className="w-5 h-5 text-cyber-green" />
            <div>
              <p className="text-sm text-white font-medium">Security</p>
              <p className="text-xs text-gray-400">Enabled</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;