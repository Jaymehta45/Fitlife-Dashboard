// Donut chart component for macros breakdown
// TODO: Replace with real data from Supabase
// TODO: Add interactive legend and click handlers

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function DonutChart({ data, title = "Macros Breakdown" }) {
  const COLORS = ['#000000', '#404040', '#737373', '#171717', '#262626', '#525252'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border-2 border-black rounded-lg shadow-xl">
          <p className="font-black text-black">{data.name}</p>
          <p className="text-black font-bold">
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
              className="w-3 h-3 rounded-full border-2 border-black" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-black font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="chart-container relative">
      <h3 className="text-lg font-black text-black mb-4">{title}</h3>
      <div className="h-64 relative">
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="proteinGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#000000" />
                <stop offset="100%" stopColor="#262626" />
              </linearGradient>
              <linearGradient id="carbsGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#404040" />
                <stop offset="100%" stopColor="#171717" />
              </linearGradient>
              <linearGradient id="fatGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#737373" />
                <stop offset="100%" stopColor="#525252" />
              </linearGradient>
              <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="rgba(0,0,0,0.3)"/>
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
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((entry, index) => {
                const gradientId = index === 0 ? 'proteinGradient' : index === 1 ? 'carbsGradient' : 'fatGradient';
                return <Cell key={`cell-${index}`} fill={`url(#${gradientId})`} />;
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
