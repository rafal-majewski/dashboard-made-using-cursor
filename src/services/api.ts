import { Post, Comment } from '@/types/jsonplaceholder';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export async function getPosts(): Promise<Post[]> {
	const response = await fetch(`${BASE_URL}/posts`);
	if (!response.ok) throw new Error('Failed to fetch posts');
	return response.json();
}

export async function getComments(): Promise<Comment[]> {
	const response = await fetch(`${BASE_URL}/comments`);
	if (!response.ok) throw new Error('Failed to fetch comments');
	return response.json();
}

export async function getDashboardStats() {
	const [posts, comments] = await Promise.all([getPosts(), getComments()]);

	const uniqueUserIds = new Set(posts.map((post) => post.userId));
	const totalComments = comments.length;
	const averageComments = totalComments / posts.length;

	return {
		totalPosts: posts.length,
		totalUsers: uniqueUserIds.size,
		averageComments: Math.round(averageComments * 10) / 10,
	};
}
