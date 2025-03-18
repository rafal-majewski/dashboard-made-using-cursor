import { useState, useEffect } from 'react';
import { Stats } from '@/types/stats';
import { HistoricalData } from '@/types/historicalData';
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
				const startDate = new Date();
				startDate.setDate(startDate.getDate() - 7); // 7 days ago

				const generateDataPoints = (max: number) =>
					Array.from({ length: 7 }, (_, i) => {
						const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
						return {
							date: date.toISOString(),
							value: Math.floor(Math.random() * max),
						};
					});

				setHistoricalData({
					posts: {
						data: generateDataPoints(data.totalPosts),
						startDate,
						percentageChange: 12.5,
					},
					comments: {
						data: generateDataPoints(data.totalComments),
						startDate,
						percentageChange: 8.2,
					},
					users: {
						data: generateDataPoints(data.activeUsers),
						startDate,
						percentageChange: 5.3,
					},
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
