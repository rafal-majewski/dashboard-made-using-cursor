import { User } from '@/types/user';

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';
const AVATAR_API_URL = 'https://api.dicebear.com/7.x/avataaars/svg';

interface JsonPlaceholderUser {
	id: number;
	name: string;
	email: string;
	username: string;
}

interface JsonPlaceholderPost {
	userId: number;
}

export async function getUsers(): Promise<User[]> {
	// Fetch users
	const usersResponse = await fetch(USERS_API_URL);
	if (!usersResponse.ok) {
		throw new Error('Failed to fetch users');
	}
	const users: JsonPlaceholderUser[] = await usersResponse.json();

	// Fetch posts to get post counts
	const postsResponse = await fetch(POSTS_API_URL);
	if (!postsResponse.ok) {
		throw new Error('Failed to fetch posts');
	}
	const posts: JsonPlaceholderPost[] = await postsResponse.json();

	// Count posts per user
	const postsCountByUser = posts.reduce(
		(acc: Record<number, number>, post: JsonPlaceholderPost) => {
			acc[post.userId] = (acc[post.userId] || 0) + 1;
			return acc;
		},
		{}
	);

	// Transform users data and add avatars and post counts
	return users.map((user: JsonPlaceholderUser) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		username: user.username,
		avatar: `${AVATAR_API_URL}?seed=${user.username}`,
		postsCount: postsCountByUser[user.id] || 0,
	}));
}
