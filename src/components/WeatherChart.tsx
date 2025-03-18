'use client';

import { WeatherDataPoint } from '@/types/weather';
import LineChart from './LineChart';

interface WeatherChartProps {
  data: WeatherDataPoint[];
}

export default function WeatherChart({ data }: WeatherChartProps) {
  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-200">Monthly Temperatures</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Berlin, Germany</span>
          <span className="text-xs text-gray-500">52.52°N, 13.41°E</span>
        </div>
      </div>
      <div className="h-64 relative">
        <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-sm text-gray-400">
          Temperature (°C)
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm text-gray-400">
          Date
        </div>
        <div className="ml-8">
          <LineChart
            data={data.map(point => ({
              date: new Date(point.date).toLocaleDateString(),
              value: point.temperature,
            }))}
            color="#f59e0b"
            width={800}
            height={256}
            showGrid={true}
          />
        </div>
      </div>
    </div>
  );
} 