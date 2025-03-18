'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/services/api';
import { generateHistoricalData } from '@/utils/chartData';
import LineChart from './LineChart';

interface Stats {
  totalPosts: number;
  totalUsers: number;
  averageComments: number;
}

interface HistoricalData {
  posts: {
    data: { date: string; value: number }[];
    startDate: string;
    percentageChange: number;
  };
  users: {
    data: { date: string; value: number }[];
    startDate: string;
    percentageChange: number;
  };
  comments: {
    data: { date: string; value: number }[];
    startDate: string;
    percentageChange: number;
  };
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
        
        // Generate historical data based on current stats
        setHistoricalData({
          posts: generateHistoricalData(data.totalPosts),
          users: generateHistoricalData(data.totalUsers),
          comments: generateHistoricalData(data.averageComments),
        });
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Total Posts</h3>
              <p className="text-2xl font-bold text-white">{stats?.totalPosts}</p>
            </div>
            {historicalData && (
              <div className="flex items-center justify-end">
                <LineChart data={historicalData.posts.data} color="#60a5fa" width={120} height={40} />
              </div>
            )}
          </div>
          {historicalData && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-medium ${historicalData.posts.percentageChange && historicalData.posts.percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {historicalData.posts.percentageChange && historicalData.posts.percentageChange >= 0 ? '+' : ''}{historicalData.posts.percentageChange ?? 0}%
              </span>
              <span className="text-sm text-gray-400">since {historicalData.posts.startDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Total Users</h3>
              <p className="text-2xl font-bold text-white">{stats?.totalUsers}</p>
            </div>
            {historicalData && (
              <div className="flex items-center justify-end">
                <LineChart data={historicalData.users.data} color="#34d399" width={120} height={40} />
              </div>
            )}
          </div>
          {historicalData && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-medium ${historicalData.users.percentageChange && historicalData.users.percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {historicalData.users.percentageChange && historicalData.users.percentageChange >= 0 ? '+' : ''}{historicalData.users.percentageChange ?? 0}%
              </span>
              <span className="text-sm text-gray-400">since {historicalData.users.startDate}</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">Avg. Comments</h3>
              <p className="text-2xl font-bold text-white">{stats?.averageComments}</p>
            </div>
            {historicalData && (
              <div className="flex items-center justify-end">
                <LineChart data={historicalData.comments.data} color="#a78bfa" width={120} height={40} />
              </div>
            )}
          </div>
          {historicalData && (
            <div className="mt-4 flex items-center gap-2">
              <span className={`text-sm font-medium ${historicalData.comments.percentageChange && historicalData.comments.percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {historicalData.comments.percentageChange && historicalData.comments.percentageChange >= 0 ? '+' : ''}{historicalData.comments.percentageChange ?? 0}%
              </span>
              <span className="text-sm text-gray-400">since {historicalData.comments.startDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 