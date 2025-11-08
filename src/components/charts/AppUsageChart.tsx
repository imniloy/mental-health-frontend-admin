// src/components/charts/AppUsageChart.tsx
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock Data
const appUsageData = [
  { name: 'Meditation', usage: 4000 },
  { name: 'Journaling', usage: 2400 },
  { name: 'Breathing', usage: 1800 },
  { name: 'Therapy Bot', usage: 2780 },
  { name: 'Mood Track', usage: 1890 },
];

export const AppUsageChart: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">App Feature Usage</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={appUsageData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
          <XAxis dataKey="name" stroke="#a0aec0" />
          <YAxis stroke="#a0aec0" />
          <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568' }} />
          <Legend wrapperStyle={{ color: '#a0aec0' }}/>
          {/* Changed the fill color to a shade of purple */}
          <Bar dataKey="usage" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
