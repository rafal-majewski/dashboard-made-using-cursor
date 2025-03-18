import { Stats } from '@/types/stats';
import { HistoricalData } from '@/types/historicalData';
import LineChart from './LineChart';

interface StatCardProps {
  title: string;
  value: number | undefined;
  historicalData: HistoricalData | null;
  dataKey: keyof HistoricalData;
  color: string;
}

export default function StatCard({ title, value, historicalData, dataKey, color }: StatCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-sm">
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
            <p className="text-2xl font-bold text-white">{value}</p>
          </div>
          {historicalData && (
            <div className="flex items-center justify-end">
              <LineChart data={historicalData[dataKey].data} color={color} width={120} height={40} />
            </div>
          )}
        </div>
        {historicalData && (
          <div className="mt-4 flex items-center gap-2">
            <span className={`text-sm font-medium ${historicalData[dataKey].percentageChange && historicalData[dataKey].percentageChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {historicalData[dataKey].percentageChange && historicalData[dataKey].percentageChange >= 0 ? '+' : ''}{historicalData[dataKey].percentageChange ?? 0}%
            </span>
            <span className="text-sm text-gray-400">since {historicalData[dataKey].startDate}</span>
          </div>
        )}
      </div>
    </div>
  );
} 