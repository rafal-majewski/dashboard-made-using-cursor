import { NextResponse } from 'next/server';

const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function GET() {
	try {
		const response = await fetch(POSTS_API_URL);
		if (!response.ok) {
			throw new Error('Failed to fetch posts');
		}

		const posts = await response.json();
		return NextResponse.json(posts);
	} catch (error) {
		console.error('Posts API error:', error);
		return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
	}
}
