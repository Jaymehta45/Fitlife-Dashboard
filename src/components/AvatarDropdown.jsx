// Avatar dropdown component with polished SVG avatar
// TODO: Replace with real user data from Clerk/Supabase
// TODO: Implement actual sign in/up functionality

import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { User, LogIn, UserPlus, Settings, LogOut } from 'lucide-react';

// Polished SVG Avatar component
const AvatarSVG = ({ className = "w-8 h-8" }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#14b8a6" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
    </defs>
    <circle cx="16" cy="16" r="16" fill="url(#avatarGradient)" />
    <circle cx="16" cy="12" r="6" fill="white" fillOpacity="0.9" />
    <path
      d="M8 24c0-4.4 3.6-8 8-8s8 3.6 8 8"
      fill="white"
      fillOpacity="0.9"
    />
  </svg>
);

export default function AvatarDropdown() {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <AvatarSVG className="w-8 h-8" />
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-neutral-900">Alex Johnson</p>
            <p className="text-xs text-neutral-500">alex@example.com</p>
          </div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {/* User info section */}
            <div className="px-4 py-3 border-b border-neutral-200">
              <p className="text-sm font-medium text-neutral-900">Alex Johnson</p>
              <p className="text-xs text-neutral-500">alex@example.com</p>
            </div>

            {/* Menu items */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-neutral-100' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-neutral-700`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-neutral-100' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-neutral-700`}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
              )}
            </Menu.Item>

            <div className="border-t border-neutral-200 my-1"></div>

            {/* Placeholder auth buttons */}
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-neutral-100' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-neutral-700`}
                >
                  <LogIn className="w-4 h-4 mr-3" />
                  Sign In
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-neutral-100' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-neutral-700`}
                >
                  <UserPlus className="w-4 h-4 mr-3" />
                  Sign Up
                </button>
              )}
            </Menu.Item>

            <div className="border-t border-neutral-200 my-1"></div>

            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-neutral-100' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

