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
        <div className="bg-white p-3 border-2 border-black rounded-lg shadow-xl">
          <p className="font-black text-black">{formatDate(label)}</p>
          <p className="text-black font-bold">
            Weight: <span className="font-black">{payload[0].value} kg</span>
          </p>
          {payload[1] && (
            <p className="text-black font-bold">
              Body Fat: <span className="font-black">{payload[1].value}%</span>
            </p>
          )}
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
          <RechartsLineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000000" stopOpacity={1} />
                <stop offset="100%" stopColor="#000000" stopOpacity={0.3} />
              </linearGradient>
              <linearGradient id="bodyFatGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#404040" stopOpacity={1} />
                <stop offset="100%" stopColor="#404040" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#d4d4d4" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
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
            <Line 
              type="basis" 
              dataKey="weight" 
              stroke="url(#weightGradient)" 
              strokeWidth={4}
              dot={{ fill: '#000000', strokeWidth: 2, r: 6, stroke: '#ffffff' }}
              activeDot={{ r: 8, stroke: '#000000', strokeWidth: 3, fill: '#ffffff' }}
            />
            <Line 
              type="basis" 
              dataKey="bodyFat" 
              stroke="url(#bodyFatGradient)" 
              strokeWidth={3}
              dot={{ fill: '#404040', strokeWidth: 2, r: 5, stroke: '#ffffff' }}
              activeDot={{ r: 7, stroke: '#000000', strokeWidth: 2, fill: '#ffffff' }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
