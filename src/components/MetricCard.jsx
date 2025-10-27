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
    return 'bg-black border-2 border-black text-white';
  };

  return (
    <div className={`metric-card-gradient animate-fade-in ${className} border-2 border-black shadow-xl`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold text-neutral-600 mb-1">{title}</p>
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
          <div className={`p-4 rounded-xl bg-black border-2 border-black shadow-xl transform hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
