import { Stats } from '@/types/stats';

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

export async function getDashboardStats(): Promise<Stats> {
	// Fetch data from JSONPlaceholder API
	const [posts, comments, users] = await Promise.all([
		fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()) as Promise<
			Post[]
		>,
		fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json()) as Promise<
			Comment[]
		>,
		fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()) as Promise<
			User[]
		>,
	]);

	// Calculate stats
	const totalPosts = posts.length;
	const avgCommentsPerPost = Math.round((comments.length / posts.length) * 10) / 10; // Round to 1 decimal
	const activeUsers = users.filter((user) => posts.some((post) => post.userId === user.id)).length;

	return {
		totalPosts,
		avgCommentsPerPost,
		activeUsers,
	};
}
