import { WeatherDataPoint } from '@/types/weather';
import { NextResponse } from 'next/server';

const generateWeatherData = (month: number): WeatherDataPoint[] => {
	const today = new Date();
	const year = today.getFullYear();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	return Array.from({ length: daysInMonth }, (_, i) => {
		const date = new Date(year, month, i + 1);
		return {
			date: date.toISOString(),
			temperature: Math.floor(Math.random() * 15) + 10, // Random temp between 10-25°C
		};
	});
};

export async function GET() {
	const currentMonth = new Date().getMonth();
	const lastMonth = currentMonth - 1;

	const data = {
		current: generateWeatherData(currentMonth),
		last: generateWeatherData(lastMonth),
	};

	return NextResponse.json(data);
}

// Mark the route as static
export const dynamic = 'force-static';
