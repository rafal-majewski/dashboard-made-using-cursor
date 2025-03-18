import { WeatherData } from '@/types/weather';

export type MonthType = 'current' | 'last';

export async function getMonthlyWeather(month: MonthType): Promise<WeatherData> {
	const response = await fetch(`/api/weather?month=${month}`);
	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	return response.json();
}
