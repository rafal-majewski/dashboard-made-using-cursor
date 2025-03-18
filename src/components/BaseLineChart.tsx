'use client';

interface DataPoint {
  date: string;
  value: number;
  x?: number;
}

interface BaseLineChartProps {
  data: DataPoint[];
  color: string;
  width?: number;
  height?: number;
  showGrid?: boolean;
  showYAxis?: boolean;
  showXAxis?: boolean;
  xAxisLabels?: { value: string; position: number }[];
}

export default function BaseLineChart({ 
  data, 
  color, 
  width = 100, 
  height = 40, 
  showGrid = false,
  showYAxis = false,
  showXAxis = false,
  xAxisLabels = []
}: BaseLineChartProps) {
  if (data.length < 2) return null;

  const padding = showYAxis ? 40 : 0; // Add padding for Y-axis labels
  const chartWidth = width - padding;
  
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;

  // Use custom x positions if provided, otherwise calculate evenly spaced positions
  const points = data.map((d, i) => {
    const x = d.x ? d.x + padding : Math.round((i / (data.length - 1)) * chartWidth) + padding;
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
    <svg width={width} height={height + (showXAxis ? 20 : 0)} className="overflow-visible">
      {/* Grid lines */}
      {showGrid && gridLines.map(({ value, y }) => (
        <g key={value}>
          <line
            x1={padding}
            y1={y}
            x2={width}
            y2={y}
            stroke="#374151"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          {showYAxis && (
            <text
              x={padding - 8}
              y={y + 4}
              textAnchor="end"
              fill="#9CA3AF"
              fontSize="12"
            >
              {value.toFixed(1)}
            </text>
          )}
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

      {/* X-axis labels */}
      {showXAxis && xAxisLabels.map(({ value, position }) => (
        <text
          key={position}
          x={position + padding}
          y={height + 16}
          textAnchor="middle"
          fill="#9CA3AF"
          fontSize="12"
        >
          {value}
        </text>
      ))}
    </svg>
  );
} 