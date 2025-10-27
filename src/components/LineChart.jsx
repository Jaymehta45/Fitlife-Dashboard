// Line chart component for weight progress
// TODO: Replace with real data from Supabase
// TODO: Add interactive tooltips and zoom functionality

import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function LineChart({ data, title = "Weight Progress" }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-2 border-black shadow-lg">
          <p className="font-bold text-black">{formatDate(label)}</p>
          <p className="text-black">
            Weight: <span className="font-black">{payload[0].value} kg</span>
          </p>
          {payload[1] && (
            <p className="text-black">
              Body Fat: <span className="font-black">{payload[1].value}%</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  // If no data, show a message
  if (!data || data.length === 0) {
    return (
      <div className="chart-container relative">
        <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 text-lg mb-2">No data yet</p>
            <p className="text-gray-500">Go to Upload Info to add your first entry</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container relative">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <div className="h-64 relative">
        {/* Gradient shadow under chart */}
        <div className="absolute inset-0 bg-white pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity={1} />
                <stop offset="100%" stopColor="#000000" stopOpacity={0.5} />
              </linearGradient>
              <linearGradient id="bodyFatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#404040" stopOpacity={1} />
                <stop offset="100%" stopColor="#404040" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#000000" opacity={0.2} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#000000"
              fontSize={12}
              tick={{ fill: '#000000', fontWeight: 'bold' }}
            />
            <YAxis 
              stroke="#000000"
              fontSize={12}
              tick={{ fill: '#000000', fontWeight: 'bold' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="basis" 
              dataKey="weight" 
              stroke="#000000" 
              strokeWidth={4}
              dot={{ fill: '#000000', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: '#000000', strokeWidth: 2, fill: '#ffffff' }}
            />
            <Line 
              type="basis" 
              dataKey="bodyFat" 
              stroke="#404040" 
              strokeWidth={3}
              dot={{ fill: '#404040', strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: '#404040', strokeWidth: 2, fill: '#ffffff' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
