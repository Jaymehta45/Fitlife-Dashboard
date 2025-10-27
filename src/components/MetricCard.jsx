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
        return <TrendingUp className="w-4 h-4 text-black" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-black" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-black';
      case 'negative':
        return 'text-black';
      default:
        return 'text-gray-600';
    }
  };


  return (
    <div className={`metric-card-gradient animate-fade-in ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-700 mb-1">{title}</p>
          <p className="text-2xl font-black text-black mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              {getChangeIcon()}
              <span className={`text-sm font-bold ${getChangeColor()}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-4 bg-black text-white shadow-lg transform hover:scale-110 transition-transform duration-200">
            <Icon className="w-7 h-7" />
          </div>
        )}
      </div>
    </div>
  );
}
