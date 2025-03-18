import { useState, useEffect } from 'react';
import { WeatherDataPoint } from '@/types/weather';
import { MonthType } from '@/services/weather';
import { weatherData } from '@/data/weatherData';

export function useWeather(selectedMonth: MonthType) {
	const [data, setData] = useState<WeatherDataPoint[]>(weatherData[selectedMonth]);

	useEffect(() => {
		setData(weatherData[selectedMonth]);
	}, [selectedMonth]);

	return { weatherData: data, loading: false };
}
