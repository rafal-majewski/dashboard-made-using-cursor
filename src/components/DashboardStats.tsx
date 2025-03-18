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
  posts: { date: string; value: number }[];
  users: { date: string; value: number }[];
  comments: { date: string; value: number }[];
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
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-500 text-white">
                  <svg className="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                  </svg>
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-200">Total Posts</h3>
                <p className="text-2xl font-bold text-white">{stats?.totalPosts}</p>
              </div>
            </div>
            {historicalData && (
              <LineChart data={historicalData.posts} color="#60a5fa" width={120} height={40} />
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500 text-white">
                  <svg className="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-200">Total Users</h3>
                <p className="text-2xl font-bold text-white">{stats?.totalUsers}</p>
              </div>
            </div>
            {historicalData && (
              <LineChart data={historicalData.users} color="#34d399" width={120} height={40} />
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-violet-500 text-white">
                  <svg className="flex-shrink-0 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-200">Avg. Comments</h3>
                <p className="text-2xl font-bold text-white">{stats?.averageComments}</p>
              </div>
            </div>
            {historicalData && (
              <LineChart data={historicalData.comments} color="#a78bfa" width={120} height={40} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 