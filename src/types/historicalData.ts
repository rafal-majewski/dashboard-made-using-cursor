import { Stats } from './stats';

export interface HistoricalDataPoint {
	date: string;
	value: number;
}

export interface HistoricalDataItem {
	data: HistoricalDataPoint[];
	startDate: string;
	percentageChange: number;
}

export interface HistoricalData {
	posts: HistoricalDataItem;
	users: HistoricalDataItem;
	comments: HistoricalDataItem;
}
