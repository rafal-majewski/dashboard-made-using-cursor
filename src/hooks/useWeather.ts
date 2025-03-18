import { useState, useEffect } from 'react';
import { getMonthlyWeather, MonthType } from '@/services/weather';
import { WeatherData, WeatherDataPoint } from '@/types/weather';

export function useWeather(month: MonthType = 'current') {
	const [weatherData, setWeatherData] = useState<WeatherDataPoint[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWeather = async () => {
			try {
				const data = await getMonthlyWeather(month);

				// Transform the data into our format
				const transformedData: WeatherDataPoint[] = data.hourly.time.map((time, index) => ({
					date: time,
					temperature: data.hourly.temperature_2m[index],
				}));

				setWeatherData(transformedData);
			} catch (err) {
				setError('Failed to load weather data');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchWeather();
	}, [month]);

	return { weatherData, loading, error };
}
