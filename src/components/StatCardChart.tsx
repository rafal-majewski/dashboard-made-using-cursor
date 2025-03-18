'use client';

import BaseLineChart from './BaseLineChart';

interface StatCardChartProps {
  data: { date: string; value: number }[];
  color: string;
  width?: number;
  height?: number;
}

export default function StatCardChart({ data, color, width = 100, height = 40 }: StatCardChartProps) {
  if (data.length < 2) return null;

  return (
    <BaseLineChart
      data={data}
      color={color}
      width={width}
      height={height}
      showGrid={false}
      showYAxis={false}
      showXAxis={false}
    />
  );
} 