import { useState, useEffect } from 'react';
import { Stats, HistoricalData } from '@/types/stats';
import { getDashboardStats } from '@/services/stats';

export function useDashboardStats() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchStats() {
			setLoading(true);
			try {
				const data = await getDashboardStats();
				setStats(data);

				// Generate historical data based on current stats
				setHistoricalData({
					posts: Array.from({ length: 7 }, () => Math.floor(Math.random() * data.totalPosts)),
					comments: Array.from({ length: 7 }, () => Math.floor(Math.random() * data.totalComments)),
					users: Array.from({ length: 7 }, () => Math.floor(Math.random() * data.activeUsers)),
				});
			} catch (error) {
				console.error('Error fetching dashboard stats:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchStats();
	}, []);

	return { stats, historicalData, loading };
}
