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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border-2 border-black text-black p-8 rounded-2xl mb-6 shadow-xl">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-neutral-600 mt-2 text-lg font-bold">
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
          value={`${recentWeightData[recentWeightData.length - 1]?.weight || 0} kg`}
          change={weightChangeText}
          changeType={weightChangeType}
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
            title="Weight Progress (Last 12 Updates)" 
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
