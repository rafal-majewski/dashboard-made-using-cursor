import { WeatherDataPoint } from '@/types/weather';
import { MonthType } from '@/services/weather';
import { NextResponse } from 'next/server';

const generateWeatherData = (month: number): WeatherDataPoint[] => {
	const today = new Date();
	const year = today.getFullYear();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	return Array.from({ length: daysInMonth }, (_, i) => {
		const date = new Date(year, month, i + 1);
		// Use a seeded random number based on the date to ensure consistent values
		const seed = date.getDate() + date.getMonth() * 31 + date.getFullYear() * 365;
		const random = Math.sin(seed) * 10000;
		const temperature = Math.floor((random - Math.floor(random)) * 15) + 10; // Random temp between 10-25°C

		return {
			date: date.toISOString(),
			temperature,
		};
	});
};

// Generate data for both months at build time
const currentMonth = new Date().getMonth();
const lastMonth = currentMonth - 1;

const staticData = {
	current: generateWeatherData(currentMonth),
	last: generateWeatherData(lastMonth),
};

export async function GET() {
	return NextResponse.json(staticData);
}

export const dynamic = 'force-static';

// This ensures the data is generated at build time
export function generateStaticParams() {
	return [{}];
}
