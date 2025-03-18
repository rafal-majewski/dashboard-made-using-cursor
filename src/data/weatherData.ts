import { WeatherDataPoint } from '@/types/weather';

// Generate realistic temperature data for Berlin
const generateWeatherData = (month: number): WeatherDataPoint[] => {
	const today = new Date();
	const year = today.getFullYear();
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	// Base temperatures for Berlin by month (average min/max)
	const monthlyTemps = [
		{ min: 0, max: 4 }, // January
		{ min: 0, max: 5 }, // February
		{ min: 3, max: 9 }, // March
		{ min: 6, max: 14 }, // April
		{ min: 10, max: 19 }, // May
		{ min: 13, max: 22 }, // June
		{ min: 15, max: 24 }, // July
		{ min: 15, max: 24 }, // August
		{ min: 12, max: 19 }, // September
		{ min: 8, max: 14 }, // October
		{ min: 4, max: 9 }, // November
		{ min: 1, max: 5 }, // December
	];

	const { min, max } = monthlyTemps[month];

	return Array.from({ length: daysInMonth }, (_, i) => {
		const date = new Date(year, month, i + 1);
		// Use a seeded random number based on the date for consistent values
		const seed = date.getDate() + date.getMonth() * 31 + date.getFullYear() * 365;
		const random = Math.sin(seed) * 10000;
		// Generate temperature within the realistic range for the month
		const temperature = min + (random - Math.floor(random)) * (max - min);

		return {
			date: date.toISOString(),
			temperature: Math.round(temperature * 10) / 10, // Round to 1 decimal place
		};
	});
};

// Pre-generate the data for both months
const currentMonth = new Date().getMonth();
const lastMonth = currentMonth - 1;

export const weatherData = {
	current: generateWeatherData(currentMonth),
	last: generateWeatherData(lastMonth),
};
