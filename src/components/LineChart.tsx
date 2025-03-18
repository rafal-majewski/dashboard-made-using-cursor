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

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
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
    <svg width={width} height={height} className="overflow-visible">
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
    </svg>
  );
} 