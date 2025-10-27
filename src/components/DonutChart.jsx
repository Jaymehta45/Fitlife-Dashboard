// Donut chart component for macros breakdown
// TODO: Replace with real data from Supabase
// TODO: Add interactive legend and click handlers

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function DonutChart({ data, title = "Macros Breakdown" }) {
  const COLORS = ['#000000', '#2a2a2a', '#4a4a4a', '#6a6a6a', '#8a8a8a', '#aaaaaa'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border-2 border-black shadow-lg">
          <p className="font-bold text-black">{data.name}</p>
          <p className="text-black">
            {data.value}g ({((data.value / data.payload.total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-bold text-black">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chart-container relative">
      <h3 className="text-lg font-bold text-black mb-4">{title}</h3>
      <div className="h-64 relative">
        {/* Gradient shadow under chart */}
        <div className="absolute inset-0 bg-white pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="proteinGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#000000" />
              </linearGradient>
              <linearGradient id="carbsGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a2a2a" />
                <stop offset="100%" stopColor="#2a2a2a" />
              </linearGradient>
              <linearGradient id="fatGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="100%" stopColor="#4a4a4a" />
              </linearGradient>
              <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.2)"/>
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={8}
              dataKey="value"
              filter="url(#pieShadow)"
            >
              {data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={COLORS[index] || '#000000'} />;
              })}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
