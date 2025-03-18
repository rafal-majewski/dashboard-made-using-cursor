'use client';

import { WeatherDataPoint } from '@/types/weather';
import { MonthType } from '@/services/weather';
import BaseLineChart from './BaseLineChart';
import { useEffect, useRef, useState } from 'react';

interface WeatherChartProps {
  data: WeatherDataPoint[];
  selectedMonth: MonthType;
  onMonthChange: (month: MonthType) => void;
}

export default function WeatherChart({ data, selectedMonth, onMonthChange }: WeatherChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(800);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setChartWidth(containerWidth - 48); // Subtract padding (24px on each side)
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (data.length < 2) return null;
  
  // Get the first date from the data to determine the month
  const firstDate = new Date(data[0].date);
  
  // Get the number of days in the current month
  const daysInMonth = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();
  
  // Get today's date
  const today = new Date();
  const todayDay = today.getDate();
  
  // Calculate the width of the chart up to today
  const activeWidth = Math.round((todayDay / daysInMonth) * chartWidth);
  
  // Create x-axis labels for all days of the month
  const xAxisLabels = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const x = Math.round((i / (daysInMonth - 1)) * chartWidth);
    const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
    const isFuture = date > today;
    
    return {
      value: day.toString(),
      position: x,
      isFuture
    };
  });

  // Scale the data points to only use the active portion of the chart
  const scaledData = data.map((point, i) => {
    const date = new Date(point.date);
    const day = date.getDate();
    const x = Math.round((day / todayDay) * activeWidth);
    return {
      date: point.date,
      value: point.temperature,
      x
    };
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-100">Monthly Temperatures</h2>
        <div className="flex gap-2">
          <button
            onClick={() => onMonthChange('current')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedMonth === 'current'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Current Month
          </button>
          <button
            onClick={() => onMonthChange('last')}
            className={`px-3 py-1 rounded-md text-sm ${
              selectedMonth === 'last'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Last Month
          </button>
        </div>
      </div>
      <div ref={containerRef} className="mt-4 w-full overflow-x-auto">
        <BaseLineChart
          data={scaledData}
          color="#60a5fa"
          width={chartWidth}
          height={200}
          showGrid={true}
          showYAxis={true}
          showXAxis={true}
          xAxisLabels={xAxisLabels.map(({ value, position, isFuture }) => ({
            value,
            position,
            style: isFuture ? { fill: '#4B5563', opacity: 0.5 } : undefined
          }))}
        />
      </div>
    </div>
  );
} 