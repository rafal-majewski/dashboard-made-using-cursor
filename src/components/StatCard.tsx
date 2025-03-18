'use client';

import { Stats } from '@/types/stats';
import { HistoricalData } from '@/types/historicalData';
import StatCardChart from './StatCardChart';
import BaseLineChart from './BaseLineChart';
import { useEffect, useRef, useState } from 'react';

type HistoricalDataKey = 'posts' | 'users' | 'comments';

interface StatCardProps {
  title: string;
  value: number | undefined;
  historicalData: HistoricalData | undefined;
  dataKey: HistoricalDataKey;
  color: string;
  percentageChange: number | null;
}

export default function StatCard({ title, value, historicalData, dataKey, color, percentageChange }: StatCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <div className="flex flex-col p-4 md:p-6 bg-zinc-800/50 border border-zinc-700/50 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-zinc-200">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-zinc-100">{value}</span>
        </div>
      </div>
      {historicalData && (
        <div className="mt-4">
          <div className="h-16" ref={containerRef}>
            <BaseLineChart
              data={historicalData[dataKey].data}
              color={color}
              width={chartWidth || 100}
              height={64}
              showGrid={false}
              showXAxis={false}
              showYAxis={false}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-zinc-700/50 flex items-center justify-between">
            <span className={`text-sm font-medium ${
              historicalData[dataKey].percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {historicalData[dataKey].percentageChange >= 0 ? '+' : ''}
              {historicalData[dataKey].percentageChange.toFixed(1)}%
            </span>
            <span className="text-xs text-zinc-400">
              since {new Date(historicalData[dataKey].startDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 