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

				const generateDataPoints = (value: number, variance: number) =>
					Array.from({ length: 7 }, (_, i) => {
						const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
						// Use a seeded random number for consistent values
						const seed = date.getDate() + date.getMonth() * 31 + date.getFullYear() * 365;
						const random = Math.sin(seed) * 10000;
						const change = (random - Math.floor(random)) * variance * 2 - variance;
						return {
							date: date.toISOString(),
							value: Math.max(0, Math.round((value + change) * 10) / 10),
						};
					});

				setHistoricalData({
					posts: {
						data: generateDataPoints(data.totalPosts, 5),
						startDate,
						percentageChange: 12.5,
					},
					comments: {
						data: generateDataPoints(data.avgCommentsPerPost, 1),
						startDate,
						percentageChange: 8.2,
					},
					users: {
						data: generateDataPoints(data.activeUsers, 2),
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
