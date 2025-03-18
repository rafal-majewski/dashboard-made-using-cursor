import { useState, useEffect } from 'react';
import { WeatherDataPoint } from '@/types/weather';
import { MonthType } from '@/services/weather';
import { weatherData } from '@/data/weatherData';

export function useWeather(selectedMonth: MonthType) {
	const [data, setData] = useState<WeatherDataPoint[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate a small loading delay for better UX
		setLoading(true);
		const timer = setTimeout(() => {
			setData(weatherData[selectedMonth]);
			setLoading(false);
		}, 150);

		return () => clearTimeout(timer);
	}, [selectedMonth]);

	return { weatherData: data, loading };
}
