// Main App component with routing and layout
// TODO: Add authentication routing when integrating Clerk
// TODO: Add error boundaries for production

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardProvider, useDashboard } from './context/DashboardContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Toast from './components/Toast';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ProgramsPage from './pages/ProgramsPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const { theme } = useDashboard();

  useEffect(() => {
    // Apply theme class to body on mount and theme change
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen ${theme === 'monotone' ? 'bg-black' : 'bg-gradient-to-br from-violet-50 via-fuchsia-50 to-purple-50'}`}>
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              {/* Topbar */}
              <Topbar />
              
              {/* Page content */}
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </main>
            </div>
          </div>
          
          {/* Toast notifications */}
          <Toast />
        </div>
      </Router>
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <AppContent />
    </DashboardProvider>
  );
}

export default App;
