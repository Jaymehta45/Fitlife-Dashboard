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
        return <TrendingUp className="w-4 h-4 text-white" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-white" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-white';
      case 'negative':
        return 'text-white';
      default:
        return 'text-gray-400';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-black border-2 border-white text-white shadow-lg';
      case 'accent':
        return 'bg-black border-2 border-white text-white shadow-lg';
      case 'success':
        return 'bg-black border-2 border-white text-white shadow-lg';
      case 'warning':
        return 'bg-black border-2 border-white text-white shadow-lg';
      case 'purple':
        return 'bg-black border-2 border-white text-white shadow-lg';
      case 'blue':
        return 'bg-black border-2 border-white text-white shadow-lg';
      default:
        return 'bg-black border-2 border-white text-white shadow-lg';
    }
  };

  return (
    <div className={`metric-card-gradient animate-fade-in ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-black text-white mb-2">{value}</p>
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
