export interface WeatherData {
	latitude: number;
	longitude: number;
	hourly: {
		time: string[];
		temperature_2m: number[];
	};
	hourly_units: {
		temperature_2m: string;
	};
}

export interface WeatherDataPoint {
	date: string;
	temperature: number;
}
