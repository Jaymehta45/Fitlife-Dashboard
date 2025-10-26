// Metric card component for displaying key statistics
// TODO: Add loading states and error handling
// TODO: Add click handlers for navigation to detailed views

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  color = 'primary',
  className = '' 
}) {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-neutral-500';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-gradient-to-br from-indigo-500 via-blue-500 to-blue-600 text-white shadow-lg';
      case 'accent':
        return 'bg-gradient-to-br from-rose-500 via-pink-500 to-pink-600 text-white shadow-lg';
      case 'success':
        return 'bg-gradient-to-br from-emerald-500 via-green-500 to-green-600 text-white shadow-lg';
      case 'warning':
        return 'bg-gradient-to-br from-amber-500 via-yellow-500 to-yellow-600 text-white shadow-lg';
      case 'purple':
        return 'bg-gradient-to-br from-purple-500 via-indigo-500 to-indigo-600 text-white shadow-lg';
      case 'blue':
        return 'bg-gradient-to-br from-sky-500 via-cyan-500 to-cyan-600 text-white shadow-lg';
      default:
        return 'bg-gradient-to-br from-slate-500 via-gray-500 to-gray-600 text-white shadow-lg';
    }
  };

  return (
    <div className={`metric-card-gradient animate-fade-in ${className} border border-white/40 shadow-xl`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-700 mb-1">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              {getChangeIcon()}
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-4 rounded-xl ${getColorClasses()} shadow-xl transform hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-7 h-7" />
          </div>
        )}
      </div>
    </div>
  );
}
