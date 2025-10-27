// Sidebar navigation component
// TODO: Add mobile responsive behavior (hamburger menu)
// TODO: Add active state management based on current route

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Dumbbell, 
  TrendingUp, 
  MessageSquare, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Upload Info', href: '/upload', icon: Upload },
  { name: 'Programs', href: '/programs', icon: Dumbbell },
  { name: 'Progress', href: '/progress', icon: TrendingUp },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-black border-r-2 border-white transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-6 border-b-2 border-white bg-black">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white border-2 border-white flex items-center justify-center shadow-lg">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="text-2xl font-black text-white">FitLife</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    sidebar-link group flex items-center px-5 py-4 rounded-xl text-lg font-medium transition-all duration-200
                    ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-7 h-7 mr-5" />
                  <span className="text-lg">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User info */}
          <div className="px-6 py-5 border-t-2 border-white bg-black">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white border-2 border-white flex items-center justify-center shadow-lg">
                <span className="text-base font-black text-black">AJ</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-bold text-white truncate">
                  Alex Johnson
                </p>
                <p className="text-sm text-gray-400 truncate">
                  alex@example.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
