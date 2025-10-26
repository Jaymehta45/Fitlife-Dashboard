// Settings page for user preferences and configuration
// TODO: Add user profile management
// TODO: Add notification preferences
// TODO: Add data backup and restore functionality

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { 
  Palette, 
  Calendar, 
  Database, 
  Bell, 
  User, 
  Shield, 
  Download,
  Upload,
  Trash2
} from 'lucide-react';

export default function SettingsPage() {
  const { 
    theme, 
    updateDay, 
    updateTheme, 
    updateUpdateDay,
    clearAllData 
  } = useDashboard();

  const [localUpdateDay, setLocalUpdateDay] = useState(updateDay);
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);

  const handleUpdateDayChange = (day) => {
    setLocalUpdateDay(day);
    updateUpdateDay(day);
  };

  const handleClearData = () => {
    clearAllData();
    setShowClearDataConfirm(false);
    // Reload page to reset all data
    window.location.reload();
  };

  const handleSupabaseConnect = () => {
    // TODO: Implement Supabase connection setup
    alert('Supabase connection setup would open here. In production, this would:\n\n1. Show Supabase project configuration form\n2. Test connection\n3. Migrate localStorage data to Supabase\n4. Switch to real-time data updates');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-600 mt-1">
          Manage your preferences and configure your fitness tracking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Theme Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Palette className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900">Appearance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => updateTheme('dribbble')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      theme === 'dribbble' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-medium text-neutral-900">Dribbble</div>
                    <div className="text-sm text-neutral-500">Soft teal & coral palette</div>
                  </button>
                  <button
                    onClick={() => updateTheme('light')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      theme === 'light' 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="font-medium text-neutral-900">Light</div>
                    <div className="text-sm text-neutral-500">Clean minimal design</div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Update Day Settings */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900">Update Schedule</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Update Day of Month
                </label>
                <p className="text-sm text-neutral-500 mb-3">
                  Choose which day of each month you can update your progress data.
                </p>
                <select
                  value={localUpdateDay}
                  onChange={(e) => handleUpdateDayChange(parseInt(e.target.value))}
                  className="input-field max-w-xs"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>
                      {day}{day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of the month
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Next update:</strong> {new Date(new Date().getFullYear(), new Date().getMonth(), localUpdateDay).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-neutral-900">Data Management</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleSupabaseConnect}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Database className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-neutral-900">Connect to Supabase</span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Migrate from localStorage to cloud database
                  </p>
                </button>

                <button
                  onClick={() => {
                    // TODO: Implement data export
                    alert('Data export functionality would be implemented here');
                  }}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Download className="w-5 h-5 text-primary-600" />
                    <span className="font-medium text-neutral-900">Export Data</span>
                  </div>
                  <p className="text-sm text-neutral-500">
                    Download your data as CSV/JSON
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card border-red-200 bg-red-50">
            <div className="flex items-center space-x-3 mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-red-900">Danger Zone</h3>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-red-700">
                This will permanently delete all your local data. This action cannot be undone.
              </p>
              {!showClearDataConfirm ? (
                <button
                  onClick={() => setShowClearDataConfirm(true)}
                  className="btn-secondary border-red-300 text-red-700 hover:bg-red-100"
                >
                  Clear All Data
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Yes, Clear All Data
                  </button>
                  <button
                    onClick={() => setShowClearDataConfirm(false)}
                    className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Supabase Integration Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Supabase Integration</h3>
            <div className="space-y-3 text-sm text-neutral-600">
              <p>
                To connect to Supabase, you'll need to:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Create a Supabase project</li>
                <li>Set up the database schema</li>
                <li>Configure environment variables</li>
                <li>Update the context providers</li>
              </ol>
              <div className="p-3 bg-neutral-100 rounded-lg">
                <p className="font-medium text-neutral-900 mb-2">Required Environment Variables:</p>
                <code className="text-xs text-neutral-600">
                  VITE_SUPABASE_URL=your_url<br/>
                  VITE_SUPABASE_ANON_KEY=your_key
                </code>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">App Information</h3>
            <div className="space-y-2 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Data Storage:</span>
                <span className="font-medium">Local Storage</span>
              </div>
              <div className="flex justify-between">
                <span>Theme:</span>
                <span className="font-medium capitalize">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span>Update Day:</span>
                <span className="font-medium">{updateDay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
