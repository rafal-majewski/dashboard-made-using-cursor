import { WeatherData } from '@/types/weather';

const WEATHER_API_URL = 'https://archive-api.open-meteo.com/v1/archive';

export type MonthType = 'current' | 'last';

export async function getMonthlyWeather(month: MonthType = 'current'): Promise<WeatherData> {
	const today = new Date();
	const startDate = new Date(today);

	if (month === 'current') {
		startDate.setDate(1); // First day of current month
	} else {
		startDate.setMonth(today.getMonth() - 1); // First day of last month
		startDate.setDate(1);
	}

	const endDate = new Date(startDate);
	if (month === 'current') {
		endDate.setMonth(today.getMonth() + 1);
		endDate.setDate(0); // Last day of current month
	} else {
		endDate.setMonth(today.getMonth());
		endDate.setDate(0); // Last day of last month
	}

	const params = new URLSearchParams({
		latitude: '52.52', // Berlin coordinates
		longitude: '13.41',
		start_date: startDate.toISOString().split('T')[0],
		end_date: endDate.toISOString().split('T')[0],
		hourly: 'temperature_2m',
	});

	const response = await fetch(`${WEATHER_API_URL}?${params}`);
	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	return response.json();
}
