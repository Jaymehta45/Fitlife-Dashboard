// Activity feed component for recent user activities
// TODO: Replace with real data from Supabase
// TODO: Add real-time updates and pagination

import React from 'react';
import { Clock, TrendingUp, Target, Award, Utensils } from 'lucide-react';

const getActivityIcon = (type) => {
  switch (type) {
    case 'workout':
      return <TrendingUp className="w-5 h-5 text-black" />;
    case 'weight':
      return <Target className="w-5 h-5 text-black" />;
    case 'goal':
      return <Award className="w-5 h-5 text-black" />;
    case 'nutrition':
      return <Utensils className="w-5 h-5 text-black" />;
    case 'milestone':
      return <Award className="w-5 h-5 text-black" />;
    default:
      return <Clock className="w-5 h-5 text-black" />;
  }
};

const getActivityColor = (type) => {
  return 'bg-white border-2 border-black';
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
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start space-x-3 p-4 ${getActivityColor(activity.type)} animate-slide-up hover:shadow-xl transition-all duration-200`}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-black">
                {activity.title}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {activity.description}
              </p>
              <div className="flex items-center mt-2 space-x-2">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-xs text-gray-500">
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
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No recent activity</p>
        </div>
      )}
    </div>
  );
}
