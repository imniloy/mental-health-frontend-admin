// src/components/StatCard.tsx
'use client';

import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  detail?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ icon, title, value, detail }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
    <div className="flex items-center space-x-4">
      <div className="bg-gray-700 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
        {detail && <p className="text-xs text-green-400">{detail}</p>}
      </div>
    </div>
  </div>
);
