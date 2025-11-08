// src/app/page.tsx
'use client';

import React from 'react';
import { UserRegistrationChart } from '../components/charts/UserRegistrationChart';
import { PaidUsersTable } from '../components/tables/PaidUsersTable';
import { StatCard } from '@/components/StatCard';
import { AppUsageChart } from '@/components/charts/AppUsageChart';
import { DollarSign, Music, Tag, Users } from 'lucide-react';

export default function DashboardPage() {
  // All layout components (Sidebar, Header) and state (isDarkMode) have been moved to AdminLayout.tsx

  // In a real app, this data would come from an API
  const stats = {
    totalCategories: 12,
    totalSongs: 158,
    totalUsers: '12,456',
    totalIncome: '$42,879',
    paidUsers: '3,114',
    freeUsers: '9,342',
    activeOffer: 'Summer Peace - 50% Off'
  };

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Tag size={24} className="text-cyan-400" />} title="Total Categories" value={stats.totalCategories.toString()} />
        <StatCard icon={<Music size={24} className="text-rose-400" />} title="Total Songs" value={stats.totalSongs.toString()} />
        <StatCard icon={<Users size={24} className="text-emerald-400" />} title="Total Users" value={stats.totalUsers} detail="+12% this month" />
        <StatCard icon={<DollarSign size={24} className="text-amber-400" />} title="Total Income" value={stats.totalIncome} detail="+8% this month" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <UserRegistrationChart />
        <AppUsageChart />
      </div>

      {/* Paid Users Table */}
      <PaidUsersTable />
    </>
  );
}
