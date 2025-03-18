import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/services/api';
import { generateHistoricalData } from '@/utils/chartData';
import { Stats } from '@/types/stats';
import { HistoricalData } from '@/types/historicalData';

export function useDashboardStats() {
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

	return { stats, historicalData, loading, error };
}
