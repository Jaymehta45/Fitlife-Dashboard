// Progress page with detailed charts and data export
// TODO: Add more chart types and interactive features
// TODO: Add data export functionality (CSV, PDF)
// TODO: Add date range filtering

import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import DonutChart from '../components/DonutChart';
import { Download, Calendar, Filter, TrendingUp } from 'lucide-react';

export default function ProgressPage() {
  const { 
    recentWeightData, 
    workoutFrequencyData, 
    macros, 
    weightHistory 
  } = useDashboard();

  const [selectedTimeRange, setSelectedTimeRange] = useState('3months');

  // Prepare macros data for donut chart
  const macrosData = [
    { name: 'Protein', value: macros.protein, total: macros.calories },
    { name: 'Carbs', value: macros.carbs, total: macros.calories },
    { name: 'Fat', value: macros.fat, total: macros.calories },
  ];

  // Calculate progress statistics
  const totalWeightLoss = weightHistory.length >= 2 
    ? weightHistory[0].weight - weightHistory[weightHistory.length - 1].weight 
    : 0;

  const totalBodyFatReduction = weightHistory.length >= 2 
    ? weightHistory[0].bodyFat - weightHistory[weightHistory.length - 1].bodyFat 
    : 0;

  const averageWeeklyWorkouts = workoutFrequencyData.reduce((sum, week) => sum + week.workouts, 0) / workoutFrequencyData.length;

  const handleExportData = () => {
    // TODO: Implement CSV export functionality
    const csvData = weightHistory.map(entry => ({
      Date: entry.date,
      Weight: entry.weight,
      'Body Fat %': entry.bodyFat,
      Calories: entry.calories || '',
      Notes: entry.notes || ''
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitness-progress-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Progress</h1>
          <p className="text-neutral-600 mt-1">
            Detailed view of your fitness journey and achievements
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button
            onClick={handleExportData}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Weight Loss</p>
              <p className="text-2xl font-bold text-green-600">
                {totalWeightLoss > 0 ? `-${totalWeightLoss.toFixed(1)}` : '+0'} kg
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Body Fat Reduction</p>
              <p className="text-2xl font-bold text-accent-600">
                {totalBodyFatReduction > 0 ? `-${totalBodyFatReduction.toFixed(1)}` : '+0'}%
              </p>
            </div>
            <div className="p-3 bg-accent-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Avg Weekly Workouts</p>
              <p className="text-2xl font-bold text-primary-600">
                {averageWeeklyWorkouts.toFixed(1)}
              </p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="card">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-neutral-400" />
            <span className="text-sm font-medium text-neutral-700">Time Range:</span>
          </div>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="input-field"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight Progress - Full Width */}
        <div className="lg:col-span-2">
          <LineChart 
            data={recentWeightData} 
            title="Weight Progress Over Time" 
          />
        </div>

        {/* Workout Frequency */}
        <BarChart 
          data={workoutFrequencyData} 
          title="Workout Frequency by Week" 
        />

        {/* Macros Breakdown */}
        <DonutChart 
          data={macrosData} 
          title="Current Macros Distribution" 
        />
      </div>

      {/* Data Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Progress History</h3>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-500">
              {weightHistory.length} entries
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Weight (kg)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Body Fat (%)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Calories
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {weightHistory.slice(-10).reverse().map((entry, index) => (
                <tr key={index} className="hover:bg-neutral-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {new Date(entry.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {entry.weight}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {entry.bodyFat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {entry.calories || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-900 max-w-xs truncate">
                    {entry.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

