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
        setChartWidth(containerWidth - 88); // Subtract padding (24px on each side) and y-axis labels space (40px)
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  if (data.length < 2) return null;

  // Get today's date
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Get the month we're displaying
  const displayMonth = selectedMonth === 'current' ? currentMonth : currentMonth - 1;
  const displayYear = currentYear;

  // Get the number of days in the displayed month
  const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();
  const dayWidth = chartWidth / daysInMonth;

  // Create x-axis labels for the month
  const xAxisLabels = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const x = i * dayWidth;
    const date = new Date(displayYear, displayMonth, day);
    return {
      value: day.toString(),
      position: x,
      isFuture: date > today
    };
  });

  // Get min and max temperatures from the data
  const temperatures = data
    .filter(point => {
      const date = new Date(point.date);
      return date.getMonth() === displayMonth && date <= today;
    })
    .map(point => point.temperature);

  if (temperatures.length === 0) return null;

  const minTemp = Math.floor(Math.min(...temperatures));
  const maxTemp = Math.ceil(Math.max(...temperatures));
  // Add a small buffer to min and max
  const buffer = Math.max(1, Math.ceil((maxTemp - minTemp) * 0.1)); // 10% buffer or at least 1 degree
  const adjustedMinTemp = minTemp - buffer;
  const adjustedMaxTemp = maxTemp + buffer;
  const tempRange = adjustedMaxTemp - adjustedMinTemp;
  
  // Create 5 evenly spaced temperature points for the y-axis, including min and max
  const yAxisTemps = [
    adjustedMinTemp,
    adjustedMinTemp + tempRange * 0.25,
    adjustedMinTemp + tempRange * 0.5,
    adjustedMinTemp + tempRange * 0.75,
    adjustedMaxTemp
  ].map(temp => Math.round(temp));

  // Scale the data points for the selected month
  const scaledData = data
    .filter(point => {
      const date = new Date(point.date);
      return date.getMonth() === displayMonth && date <= today;
    })
    .map(point => {
      const date = new Date(point.date);
      const day = date.getDate();
      const x = (day - 1) * dayWidth;

      // Scale temperature to fit within chart height (200px)
      const y = 200 - ((point.temperature - adjustedMinTemp) / tempRange) * 180; // Leave some padding at top and bottom
      
      return {
        date: point.date,
        value: point.temperature,
        x,
        y
      };
    });

  // Create SVG path data from scaled points
  const pathData = scaledData.length > 0
    ? `M ${scaledData[0].x} ${scaledData[0].y} ` +
      scaledData.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ')
    : '';

  return (
    <div className="rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => onMonthChange('last')}
            className={`px-3 py-1 text-sm rounded-md border ${
              selectedMonth === 'last' 
                ? 'border-purple-500 text-purple-500' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-transparent'
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => onMonthChange('current')}
            className={`px-3 py-1 text-sm rounded-md border ${
              selectedMonth === 'current' 
                ? 'border-purple-500 text-purple-500' 
                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-transparent'
            }`}
          >
            Current Month
          </button>
        </div>
        <div className="text-sm text-zinc-400">
          {new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
      </div>
      <div ref={containerRef} className="relative pl-10">
        <svg
          width={chartWidth + 40}
          height="200"
          className="overflow-visible text-zinc-300"
        >
          {/* Y-axis labels */}
          {yAxisTemps.map((temp) => (
            <g key={temp} transform={`translate(0, ${200 - ((temp - adjustedMinTemp) / tempRange) * 180})`}>
              <text
                x="-10"
                y="0"
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-xs fill-current text-zinc-400"
              >
                {temp}°
              </text>
              <line
                x1="0"
                y1="0"
                x2={chartWidth}
                y2="0"
                stroke="currentColor"
                strokeWidth="1"
                className="text-purple-900/30"
              />
            </g>
          ))}

          {/* Temperature line */}
          <g transform="translate(40, 0)">
            <path
              d={pathData}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-purple-500"
            />

            {/* Data points */}
            {scaledData.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="currentColor"
                className="text-purple-500"
              />
            ))}

            {/* X-axis labels */}
            {xAxisLabels.map((label, index) => (
              <g key={index} transform={`translate(${label.position}, 220)`} className={label.isFuture ? 'text-zinc-500' : 'text-zinc-300'}>
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  className="text-xs fill-current"
                >
                  {label.value}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
} 