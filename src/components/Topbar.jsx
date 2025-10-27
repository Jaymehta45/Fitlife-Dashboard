// Topbar component with search, notifications, and user menu
// TODO: Implement search functionality
// TODO: Add real notification system
// TODO: Integrate with Clerk for authentication

import React, { useState } from 'react';
import { Search, Bell, ShoppingCart, User } from 'lucide-react';
import AvatarDropdown from './AvatarDropdown';

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white shadow-lg border-b-2 border-black px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search workouts, programs, or progress..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border-2 border-black rounded-lg leading-5 bg-white placeholder-neutral-400 focus:outline-none focus:placeholder-neutral-300 focus:ring-2 focus:ring-black focus:border-black sm:text-sm transition-all duration-200 text-black"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-neutral-400 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg transition-colors duration-200 hover:bg-primary-50">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            {/* Notification badge */}
            <span className="absolute -mt-1 -mr-1 h-3 w-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full shadow-sm"></span>
          </button>

          {/* Cart - hidden until sign-in */}
          <button className="p-2 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg hidden">
            <span className="sr-only">Shopping cart</span>
            <ShoppingCart className="h-6 w-6" />
          </button>

          {/* User avatar dropdown */}
          <AvatarDropdown />
        </div>
      </div>
    </header>
  );
}
