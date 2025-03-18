import { useState, useEffect } from 'react';
import { WeatherDataPoint } from '@/types/weather';
import { MonthType } from '@/services/weather';

export function useWeather(selectedMonth: MonthType) {
	const [weatherData, setWeatherData] = useState<WeatherDataPoint[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchWeatherData() {
			setLoading(true);
			try {
				const response = await fetch('/dashboard-with-preline/api/weather');
				const data = await response.json();
				setWeatherData(data[selectedMonth]);
			} catch (error) {
				console.error('Error fetching weather data:', error);
			} finally {
				setLoading(false);
			}
		}

		fetchWeatherData();
	}, [selectedMonth]);

	return { weatherData, loading };
}
