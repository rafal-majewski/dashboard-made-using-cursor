export interface Stats {
	totalPosts: number;
	totalComments: number;
	activeUsers: number;
}

export interface HistoricalData {
	posts: number[];
	comments: number[];
	users: number[];
}
