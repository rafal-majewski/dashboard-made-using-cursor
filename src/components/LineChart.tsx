'use client';

interface DataPoint {
  date: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color: string;
  width?: number;
  height?: number;
  showGrid?: boolean;
}

export default function LineChart({ data, color, width = 100, height = 40, showGrid = false }: LineChartProps) {
  if (data.length < 2) return null;

  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;

  // Get the first and last dates from the data
  const firstDate = new Date(data[0].date);
  const lastDate = new Date(data[data.length - 1].date);
  
  // Get the number of days in the current month
  const daysInMonth = new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0).getDate();

  // Create an array of all days in the month
  const allDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  // Calculate x positions for all days
  const dayLabels = allDays.map(day => {
    const x = ((day - 1) / (daysInMonth - 1)) * width;
    return { day, x };
  });

  // Map data points to their x positions
  const points = data.map((d, i) => {
    const date = new Date(d.date);
    const day = date.getDate();
    const x = ((day - 1) / (daysInMonth - 1)) * width;
    const y = height - ((d.value - minValue) / valueRange) * height;
    return `${x},${y}`;
  }).join(' ');

  // Calculate grid lines
  const numGridLines = 5;
  const gridLines = Array.from({ length: numGridLines }, (_, i) => {
    const value = minValue + (valueRange * i) / (numGridLines - 1);
    const y = height - ((value - minValue) / valueRange) * height;
    return { value, y };
  });

  return (
    <svg width={width} height={height + 20} className="overflow-visible">
      {/* Grid lines */}
      {showGrid && gridLines.map(({ value, y }) => (
        <g key={value}>
          <line
            x1={0}
            y1={y}
            x2={width}
            y2={y}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <text
            x={-8}
            y={y + 4}
            textAnchor="end"
            fill="#9CA3AF"
            fontSize="12"
          >
            {value.toFixed(1)}°
          </text>
        </g>
      ))}
      
      {/* Data line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Day numbers */}
      {dayLabels.map(({ day, x }) => {
        const date = new Date(firstDate.getFullYear(), firstDate.getMonth(), day);
        const isFuture = date > new Date();
        
        return (
          <text
            key={x}
            x={x}
            y={height + 16}
            textAnchor="middle"
            fill={isFuture ? "#4B5563" : "#9CA3AF"}
            fontSize="12"
            className={isFuture ? "opacity-50" : ""}
          >
            {day}
          </text>
        );
      })}
    </svg>
  );
} 