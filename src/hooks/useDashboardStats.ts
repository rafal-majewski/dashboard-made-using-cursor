import { useState, useEffect } from 'react';
import { Stats } from '@/types/stats';
import { HistoricalData } from '@/types/historicalData';

interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

interface Comment {
	id: number;
	postId: number;
	name: string;
	email: string;
	body: string;
}

interface User {
	id: number;
	name: string;
	username: string;
	email: string;
}

export function useDashboardStats() {
	const [stats, setStats] = useState<Stats | null>(null);
	const [historicalData, setHistoricalData] = useState<HistoricalData | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchStats() {
			setLoading(true);
			try {
				// Fetch all data from JSONPlaceholder API
				const [posts, comments, users] = await Promise.all([
					fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()) as Promise<
						Post[]
					>,
					fetch('https://jsonplaceholder.typicode.com/comments').then((res) =>
						res.json()
					) as Promise<Comment[]>,
					fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()) as Promise<
						User[]
					>,
				]);

				// Calculate current stats
				const totalPosts = posts.length;
				const avgCommentsPerPost = Math.round((comments.length / posts.length) * 10) / 10;
				const activeUsers = users.filter((user) =>
					posts.some((post) => post.userId === user.id)
				).length;

				setStats({
					totalPosts,
					avgCommentsPerPost,
					activeUsers,
				});

				// Generate historical data points based on actual data
				const startDate = new Date();
				startDate.setDate(startDate.getDate() - 7);

				// For each day, calculate the stats based on actual data
				const historicalPoints = Array.from({ length: 7 }, (_, i) => {
					const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
					// Simulate data accumulation over time by taking a slice of the data
					const dayIndex = i + 1;
					const postsSlice = posts.slice(0, Math.floor((posts.length * dayIndex) / 7));
					const commentsSlice = comments.slice(0, Math.floor((comments.length * dayIndex) / 7));
					const activeUsersCount = new Set(postsSlice.map((post) => post.userId)).size;

					return {
						posts: {
							date: date.toISOString(),
							value: postsSlice.length,
						},
						comments: {
							date: date.toISOString(),
							value: Math.round((commentsSlice.length / Math.max(postsSlice.length, 1)) * 10) / 10,
						},
						users: {
							date: date.toISOString(),
							value: activeUsersCount,
						},
					};
				});

				// Calculate percentage changes
				const calculatePercentageChange = (oldValue: number, newValue: number) =>
					oldValue === 0 ? 0 : Math.round(((newValue - oldValue) / oldValue) * 1000) / 10;

				setHistoricalData({
					posts: {
						data: historicalPoints.map((point) => point.posts),
						startDate,
						percentageChange: calculatePercentageChange(
							historicalPoints[0].posts.value,
							totalPosts
						),
					},
					comments: {
						data: historicalPoints.map((point) => point.comments),
						startDate,
						percentageChange: calculatePercentageChange(
							historicalPoints[0].comments.value,
							avgCommentsPerPost
						),
					},
					users: {
						data: historicalPoints.map((point) => point.users),
						startDate,
						percentageChange: calculatePercentageChange(
							historicalPoints[0].users.value,
							activeUsers
						),
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
