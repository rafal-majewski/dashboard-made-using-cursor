import { WeatherData } from '@/types/weather';

const WEATHER_API_URL = 'https://archive-api.open-meteo.com/v1/archive';

export type MonthType = 'current' | 'last';

export async function getMonthlyWeather(month: MonthType): Promise<WeatherData> {
	const today = new Date();
	const startDate = new Date(today);

	if (month === 'current') {
		startDate.setDate(1); // First day of current month
	} else {
		startDate.setMonth(today.getMonth() - 1);
		startDate.setDate(1);
	}

	const endDate = new Date(today);
	if (month === 'last') {
		endDate.setDate(1); // First day of current month
		endDate.setDate(0); // Last day of previous month
	}

	// Format dates as YYYY-MM-DD
	const formatDate = (date: Date): string => {
		return date.toISOString().split('T')[0];
	};

	const params = new URLSearchParams({
		latitude: '52.52', // Berlin coordinates
		longitude: '13.41',
		start_date: formatDate(startDate),
		end_date: formatDate(endDate),
		hourly: 'temperature_2m',
	});

	const response = await fetch(`${WEATHER_API_URL}?${params}`);
	if (!response.ok) {
		throw new Error('Failed to fetch weather data');
	}

	return response.json();
}
