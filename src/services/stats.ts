import { Stats } from '@/types/stats';

export async function getDashboardStats(): Promise<Stats> {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Return mock data
	return {
		totalPosts: Math.floor(Math.random() * 1000) + 500,
		totalComments: Math.floor(Math.random() * 2000) + 1000,
		activeUsers: Math.floor(Math.random() * 500) + 100,
	};
}
