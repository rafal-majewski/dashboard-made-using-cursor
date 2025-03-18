import { Stats } from './stats';

export interface DataPoint {
	date: string;
	value: number;
}

export interface HistoricalDataItem {
	data: DataPoint[];
	startDate: Date;
	percentageChange: number;
}

export interface HistoricalData {
	posts: HistoricalDataItem;
	comments: HistoricalDataItem;
	users: HistoricalDataItem;
}
