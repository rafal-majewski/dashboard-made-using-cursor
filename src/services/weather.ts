import { WeatherData } from '@/types/weather';

const WEATHER_API_URL = 'https://archive-api.open-meteo.com/v1/archive';

export type MonthType = 'current' | 'last';

export async function getMonthlyWeather(month: MonthType): Promise<WeatherData> {
	const today = new Date();
	const startDate = new Date(today);
	const endDate = new Date(today);

	if (month === 'current') {
		// First day of current month
		startDate.setDate(1);
		// Last day of current month (or today if we're not at the end of the month)
		endDate.setDate(1);
		endDate.setMonth(endDate.getMonth() + 1);
		endDate.setDate(0);
		if (endDate > today) {
			endDate.setTime(today.getTime());
		}
	} else {
		// First day of last month
		startDate.setDate(1);
		startDate.setMonth(startDate.getMonth() - 1);
		// Last day of last month
		endDate.setDate(1);
		endDate.setDate(0);
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

	const data = await response.json();

	// Filter out future dates and keep only one data point per day (at noon)
	const now = new Date();
	const filteredData = {
		...data,
		hourly: {
			time: data.hourly.time.filter((time: string) => {
				const date = new Date(time);
				return date <= now && date.getHours() === 12; // Only keep noon data points
			}),
			temperature_2m: data.hourly.temperature_2m.filter((_: number, index: number) => {
				const date = new Date(data.hourly.time[index]);
				return date <= now && date.getHours() === 12; // Only keep noon data points
			}),
		},
	};

	return filteredData;
}
