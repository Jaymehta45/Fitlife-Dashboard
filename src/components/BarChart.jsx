// Bar chart component for workout frequency
// TODO: Replace with real data from Supabase
// TODO: Add interactive features and drill-down capabilities

import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChart({ data, title = "Workout Frequency" }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-2 border-black rounded-lg shadow-xl">
          <p className="font-black text-black">{label}</p>
          <p className="text-black font-bold">
            Workouts: <span className="font-black">{payload[0].value}</span>
          </p>
          <p className="text-black font-bold">
            Calories: <span className="font-black">{payload[1].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container relative">
      <h3 className="text-lg font-black text-black mb-4">{title}</h3>
      <div className="h-64 relative">
        
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="50%" stopColor="#262626" />
                <stop offset="100%" stopColor="#404040" />
              </linearGradient>
              <linearGradient id="caloriesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#171717" />
                <stop offset="50%" stopColor="#404040" />
                <stop offset="100%" stopColor="#737373" />
              </linearGradient>
              <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.3)"/>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d4" opacity={0.5} />
            <XAxis 
              dataKey="week" 
              stroke="#000000"
              fontSize={12}
              tick={{ fill: '#000000', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 'bold' }}
            />
            <YAxis 
              stroke="#000000"
              fontSize={12}
              tick={{ fill: '#000000', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 'bold' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="workouts" 
              fill="url(#workoutGradient)" 
              radius={[12, 12, 0, 0]}
              filter="url(#barShadow)"
              stroke="#000000"
              strokeWidth={1}
            />
            <Bar 
              dataKey="calories" 
              fill="url(#caloriesGradient)" 
              radius={[12, 12, 0, 0]}
              filter="url(#barShadow)"
              stroke="#ffffff"
              strokeWidth={1}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
