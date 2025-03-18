'use client';

import { useDashboardStats } from '@/hooks/useDashboardStats';
import StatCard from './StatCard';

export default function DashboardStats() {
  const { stats, historicalData, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Total Posts"
        value={stats?.totalPosts}
        historicalData={historicalData}
        dataKey="posts"
        color="#60a5fa"
      />
      <StatCard
        title="Total Users"
        value={stats?.totalUsers}
        historicalData={historicalData}
        dataKey="users"
        color="#34d399"
      />
      <StatCard
        title="Avg. Comments"
        value={stats?.averageComments}
        historicalData={historicalData}
        dataKey="comments"
        color="#a78bfa"
      />
    </div>
  );
} 