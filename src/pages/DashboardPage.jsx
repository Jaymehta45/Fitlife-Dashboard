// Main dashboard page with overview metrics and charts
// TODO: Add real-time data updates from Supabase
// TODO: Add loading states and error handling
// TODO: Add responsive design improvements

import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import MetricCard from '../components/MetricCard';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import ActivityFeed from '../components/ActivityFeed';
import { 
  Dumbbell, 
  Target, 
  Calendar, 
  Flame,
  TrendingUp,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const { 
    recentWeightData, 
    workoutFrequencyData, 
    macros, 
    activityFeed, 
    weeklyStats 
  } = useDashboard();

  // Prepare macros data for donut chart
  const macrosData = [
    { name: 'Protein', value: macros.protein, total: macros.calories },
    { name: 'Carbs', value: macros.carbs, total: macros.calories },
    { name: 'Fat', value: macros.fat, total: macros.calories },
  ];

  // Calculate weight change
  const weightChange = recentWeightData.length >= 2 
    ? recentWeightData[recentWeightData.length - 1].weight - recentWeightData[0].weight
    : 0;

  const weightChangeType = weightChange > 0 ? 'negative' : weightChange < 0 ? 'positive' : 'neutral';
  const weightChangeText = weightChange > 0 
    ? `+${weightChange.toFixed(1)} kg` 
    : weightChange < 0 
    ? `${weightChange.toFixed(1)} kg` 
    : 'No change';

  const currentWeight = recentWeightData.length > 0 ? recentWeightData[recentWeightData.length - 1]?.weight : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border-2 border-black p-8 mb-6">
        <h1 className="text-3xl font-black text-black">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Track your fitness journey and monitor your progress
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Program"
          value={weeklyStats.activeProgram}
          icon={Dumbbell}
          color="purple"
        />
        <MetricCard
          title="Weekly Goal"
          value={`${weeklyStats.workouts}/${weeklyStats.weeklyGoal}`}
          change={`${Math.round((weeklyStats.workouts / weeklyStats.weeklyGoal) * 100)}% complete`}
          changeType={weeklyStats.workouts >= weeklyStats.weeklyGoal ? 'positive' : 'neutral'}
          icon={Target}
          color="warning"
        />
        <MetricCard
          title="Workouts This Week"
          value={weeklyStats.workouts}
          change={`${weeklyStats.calories} calories burned`}
          changeType="positive"
          icon={Activity}
          color="success"
        />
        <MetricCard
          title="Current Weight"
          value={`${currentWeight ? currentWeight + ' kg' : 'No data'}`}
          change={recentWeightData.length > 0 ? weightChangeText : 'Add data to track changes'}
          changeType={recentWeightData.length > 0 ? weightChangeType : 'neutral'}
          icon={TrendingUp}
          color="primary"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress Chart */}
        <div className="lg:col-span-2">
          <LineChart 
            data={recentWeightData} 
            title="Weight Progress" 
          />
        </div>

        {/* Workout Frequency Chart */}
        <BarChart 
          data={workoutFrequencyData} 
          title="Workout Frequency (Last 4 Weeks)" 
        />

        {/* Macros Breakdown */}
        <DonutChart 
          data={macrosData} 
          title="Daily Macros Breakdown" 
        />
      </div>

      {/* Activity Feed */}
      <div className="lg:col-span-2">
        <ActivityFeed 
          activities={activityFeed} 
          title="Recent Activity" 
        />
      </div>
    </div>
  );
}
