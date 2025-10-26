// Activity feed component for recent user activities
// TODO: Replace with real data from Supabase
// TODO: Add real-time updates and pagination

import React from 'react';
import { Clock, TrendingUp, Target, Award, Utensils } from 'lucide-react';

const getActivityIcon = (type) => {
  switch (type) {
    case 'workout':
      return <TrendingUp className="w-5 h-5 text-primary-600" />;
    case 'weight':
      return <Target className="w-5 h-5 text-accent-600" />;
    case 'goal':
      return <Award className="w-5 h-5 text-green-600" />;
    case 'nutrition':
      return <Utensils className="w-5 h-5 text-yellow-600" />;
    case 'milestone':
      return <Award className="w-5 h-5 text-purple-600" />;
    default:
      return <Clock className="w-5 h-5 text-neutral-600" />;
  }
};

const getActivityColor = (type) => {
  switch (type) {
    case 'workout':
      return 'bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 border-blue-200';
    case 'weight':
      return 'bg-gradient-to-r from-pink-100 via-pink-50 to-red-100 border-pink-200';
    case 'goal':
      return 'bg-gradient-to-r from-green-100 via-green-50 to-emerald-100 border-green-200';
    case 'nutrition':
      return 'bg-gradient-to-r from-yellow-100 via-yellow-50 to-orange-100 border-yellow-200';
    case 'milestone':
      return 'bg-gradient-to-r from-purple-100 via-purple-50 to-pink-100 border-purple-200';
    default:
      return 'bg-gradient-to-r from-gray-100 via-gray-50 to-slate-100 border-gray-200';
  }
};

export default function ActivityFeed({ activities, title = "Recent Activity" }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start space-x-3 p-4 rounded-lg border shadow-sm ${getActivityColor(activity.type)} animate-slide-up hover:shadow-md transition-all duration-200`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900">
                {activity.title}
              </p>
              <p className="text-sm text-neutral-600 mt-1">
                {activity.description}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <Clock className="w-3 h-3 text-neutral-400" />
                <span className="text-xs text-neutral-500">
                  {formatTime(activity.timestamp)}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 text-2xl">
              {activity.icon}
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-neutral-500">No recent activity</p>
        </div>
      )}
    </div>
  );
}
