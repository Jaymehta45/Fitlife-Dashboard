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
        <div className="bg-white p-3 border border-neutral-200 rounded-lg shadow-lg">
          <p className="font-medium text-neutral-900">{formatDate(label)}</p>
          <p className="text-primary-600">
            Weight: <span className="font-semibold">{payload[0].value} kg</span>
          </p>
          {payload[1] && (
            <p className="text-accent-600">
              Body Fat: <span className="font-semibold">{payload[1].value}%</span>
            </p>
          )}
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
        <div className="absolute inset-0 bg-gradient-to-t from-blue-200/20 via-purple-100/10 to-transparent rounded-lg pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="bodyFatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="basis" 
              dataKey="weight" 
              stroke="url(#weightGradient)" 
              strokeWidth={4}
              dot={{ fill: '#14b8a6', strokeWidth: 3, r: 6, filter: 'drop-shadow(0 2px 4px rgba(20, 184, 166, 0.3))' }}
              activeDot={{ r: 8, stroke: '#14b8a6', strokeWidth: 3, fill: '#ffffff', filter: 'drop-shadow(0 4px 8px rgba(20, 184, 166, 0.4))' }}
            />
            <Line 
              type="basis" 
              dataKey="bodyFat" 
              stroke="url(#bodyFatGradient)" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 3, r: 5, filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))' }}
              activeDot={{ r: 7, stroke: '#ef4444', strokeWidth: 2, fill: '#ffffff', filter: 'drop-shadow(0 4px 8px rgba(239, 68, 68, 0.4))' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
