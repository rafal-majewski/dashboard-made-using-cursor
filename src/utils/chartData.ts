export function generateHistoricalData(currentValue: number, days: number = 30) {
	const data = [];
	const today = new Date();

	for (let i = days - 1; i >= 0; i--) {
		const date = new Date(today);
		date.setDate(date.getDate() - i);

		// Generate a random value around the current value with ±20% variation
		const variation = 0.2;
		const min = currentValue * (1 - variation);
		const max = currentValue * (1 + variation);
		const randomValue = Math.floor(Math.random() * (max - min + 1) + min);

		data.push({
			date: date.toISOString().split('T')[0],
			value: randomValue,
		});
	}

	return data;
}
