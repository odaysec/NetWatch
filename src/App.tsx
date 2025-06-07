import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import NetworkDiscovery from './pages/NetworkDiscovery';
import TrafficAnalysis from './pages/TrafficAnalysis';
import PortScanner from './pages/PortScanner';
import ServiceMonitor from './pages/ServiceMonitor';
import AlertManager from './pages/AlertManager';
import UserManagement from './pages/UserManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Logs from './pages/Logs';
import SecurityCenter from './pages/SecurityCenter';
import TopologyMap from './pages/TopologyMap';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/discovery" element={<NetworkDiscovery />} />
            <Route path="/traffic" element={<TrafficAnalysis />} />
            <Route path="/scanner" element={<PortScanner />} />
            <Route path="/services" element={<ServiceMonitor />} />
            <Route path="/alerts" element={<AlertManager />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/topology" element={<TopologyMap />} />
            <Route path="/security" element={<SecurityCenter />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}

export default App;