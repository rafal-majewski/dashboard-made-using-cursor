'use client';

import { useState } from 'react';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useWeather } from '@/hooks/useWeather';
import { useUsers } from '@/hooks/useUsers';
import { MonthType } from '@/services/weather';
import StatCard from './StatCard';
import WeatherChart from './WeatherChart';
import { UsersTable } from './UsersTable';

export default function DashboardStats() {
  const { stats, historicalData, loading: statsLoading } = useDashboardStats();
  const [selectedMonth, setSelectedMonth] = useState<MonthType>('current');
  const { weatherData, loading: weatherLoading } = useWeather(selectedMonth);
  const { users, loading: usersLoading } = useUsers();

  if (statsLoading || weatherLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts}
          historicalData={historicalData || undefined}
          dataKey="posts"
          color="#a855f7"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers}
          historicalData={historicalData || undefined}
          dataKey="users"
          color="#a855f7"
        />
        <StatCard
          title="Avg. Comments"
          value={stats?.averageComments}
          historicalData={historicalData || undefined}
          dataKey="comments"
          color="#a855f7"
        />
      </div>

      {/* Temperature Section */}
      <section className="bg-zinc-800/50 rounded-lg shadow p-6 border border-zinc-700/50">
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">Temperature Trends</h2>
        <WeatherChart
          data={weatherData}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </section>

      {/* Users Section */}
      <section className="bg-zinc-800/50 rounded-lg shadow p-6 border border-zinc-700/50">
        <h2 className="text-xl font-semibold text-zinc-100 mb-6">User Activity</h2>
        <UsersTable users={users} loading={usersLoading} error={null} />
      </section>
    </div>
  );
} 