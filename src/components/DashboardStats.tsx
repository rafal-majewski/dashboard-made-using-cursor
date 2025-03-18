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
  const { stats, historicalData, loading: statsLoading, error: statsError } = useDashboardStats();
  const [selectedMonth, setSelectedMonth] = useState<MonthType>('current');
  const { weatherData, loading: weatherLoading, error: weatherError } = useWeather(selectedMonth);
  const { users, loading: usersLoading, error: usersError } = useUsers();

  if (statsLoading || weatherLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (statsError || weatherError || usersError) {
    return (
      <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg">
        {statsError || weatherError || usersError}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Posts"
          value={stats?.totalPosts}
          historicalData={historicalData || undefined}
          dataKey="posts"
          color="#60a5fa"
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers}
          historicalData={historicalData || undefined}
          dataKey="users"
          color="#34d399"
        />
        <StatCard
          title="Avg. Comments"
          value={stats?.averageComments}
          historicalData={historicalData || undefined}
          dataKey="comments"
          color="#a78bfa"
        />
      </div>
      <div className="grid grid-cols-1">
        <WeatherChart 
          data={weatherData} 
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>
      <div className="grid grid-cols-1">
        <div className="bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-100 mb-4">Users</h2>
          <UsersTable users={users} loading={usersLoading} error={usersError} />
        </div>
      </div>
    </div>
  );
} 