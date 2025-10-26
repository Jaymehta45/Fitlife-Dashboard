// Bar chart component for workout frequency
// TODO: Replace with real data from Supabase
// TODO: Add interactive features and drill-down capabilities

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChart({ data, title = "Workout Frequency" }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-medium text-neutral-900">{label}</p>
          <p className="text-primary-600">
            Workouts: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-accent-600">
            Calories: <span className="font-semibold">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container relative">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>
      <div className="h-64 relative">
        {/* Gradient shadow under chart */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-200/20 via-pink-100/10 to-transparent rounded-lg pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" />
                <stop offset="50%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
              <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.1)"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="week" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="workouts" 
              fill="url(#workoutGradient)" 
              radius={[12, 12, 0, 0]}
              filter="url(#barShadow)"
            />
            <Bar 
              dataKey="calories" 
              fill="url(#caloriesGradient)" 
              radius={[12, 12, 0, 0]}
              filter="url(#barShadow)"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
