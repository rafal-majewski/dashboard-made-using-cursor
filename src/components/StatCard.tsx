'use client';

import { Stats } from '@/types/stats';
import { HistoricalData } from '@/types/historicalData';
import LineChart from './LineChart';

type HistoricalDataKey = 'posts' | 'users' | 'comments';

interface StatCardProps {
  title: string;
  value: number | undefined;
  historicalData: HistoricalData | undefined;
  dataKey: HistoricalDataKey;
  color: string;
}

export default function StatCard({ title, value, historicalData, dataKey, color }: StatCardProps) {
  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
          <p className="mt-2 text-3xl font-bold text-gray-100">{value}</p>
        </div>
        {historicalData?.[dataKey]?.data && (
          <div className="w-32">
            <LineChart
              data={historicalData[dataKey].data.map(point => ({
                date: new Date(point.date).toLocaleDateString(),
                value: point.value,
              }))}
              color={color}
              width={128}
              height={64}
            />
          </div>
        )}
      </div>
      {historicalData?.[dataKey]?.percentageChange !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
          <span className={`text-sm font-medium ${
            historicalData[dataKey].percentageChange >= 0 ? 'text-green-500' : 'text-red-500'
          }`}>
            {historicalData[dataKey].percentageChange >= 0 ? '+' : ''}
            {historicalData[dataKey].percentageChange.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400">
            since {new Date(historicalData[dataKey].startDate).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
} 