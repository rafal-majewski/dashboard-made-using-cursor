import { NextResponse } from 'next/server';

const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';

export async function GET() {
	try {
		const response = await fetch(COMMENTS_API_URL);
		if (!response.ok) {
			throw new Error('Failed to fetch comments');
		}

		const comments = await response.json();
		return NextResponse.json(comments);
	} catch (error) {
		console.error('Comments API error:', error);
		return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
	}
}
