import { NextResponse } from 'next/server';

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

export async function GET() {
	try {
		// Fetch users and posts in parallel
		const [usersResponse, postsResponse] = await Promise.all([
			fetch(USERS_API_URL),
			fetch(POSTS_API_URL),
		]);

		if (!usersResponse.ok || !postsResponse.ok) {
			throw new Error('Failed to fetch data');
		}

		const users: JsonPlaceholderUser[] = await usersResponse.json();
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
		const transformedUsers = users.map((user: JsonPlaceholderUser) => ({
			id: user.id,
			name: user.name,
			email: user.email,
			username: user.username,
			avatar: `${AVATAR_API_URL}?seed=${user.username}`,
			postsCount: postsCountByUser[user.id] || 0,
		}));

		return NextResponse.json(transformedUsers);
	} catch (error) {
		console.error('Users API error:', error);
		return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
	}
}
