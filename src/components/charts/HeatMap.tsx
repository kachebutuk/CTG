// CipherTrade-frontend/src/components/charts/HeatMap.tsx
import React, { useEffect, useRef } from 'react';

interface HeatMapProps {
  data: Array<{
    day: string;
    values: number[];
  }>;
  height?: number;
  colorRange?: [string, string];
}

const HeatMap: React.FC<HeatMapProps> = ({
  data,
  height = 300,
  colorRange = ['#22c55e', '#ef4444'],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !data.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hours = 24;
    const days = data.length;
    const cellWidth = canvas.width / hours;
    const cellHeight = canvas.height / days;

    // Find min and max values for color scaling
    const allValues = data.flatMap(d => d.values);
    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues);
    const range = maxValue - minValue;

    // Draw heatmap
    data.forEach((day, dayIndex) => {
      day.values.forEach((value, hourIndex) => {
        const x = hourIndex * cellWidth;
        const y = dayIndex * cellHeight;

        // Calculate color based on value
        let color: string;
        if (range === 0) {
          color = '#9ca3af';
        } else {
          const normalized = (value - minValue) / range;
          const r = Math.round(parseInt(colorRange[1].slice(1, 3), 16) * normalized +
                              parseInt(colorRange[0].slice(1, 3), 16) * (1 - normalized));
          const g = Math.round(parseInt(colorRange[1].slice(3, 5), 16) * normalized +
                              parseInt(colorRange[0].slice(3, 5), 16) * (1 - normalized));
          const b = Math.round(parseInt(colorRange[1].slice(5, 7), 16) * normalized +
                              parseInt(colorRange[0].slice(5, 7), 16) * (1 - normalized));
          color = `rgb(${r}, ${g}, ${b})`;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);

        // Add text for value
        ctx.fillStyle = Math.abs(value) > range / 2 ? 'white' : 'black';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          value.toFixed(0),
          x + cellWidth / 2,
          y + cellHeight / 2
        );
      });
    });

    // Draw labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px sans-serif';

    // Day labels
    data.forEach((day, index) => {
      ctx.fillText(day.day, 5, index * cellHeight + cellHeight / 2);
    });

    // Hour labels
    for (let i = 0; i < hours; i += 3) {
      ctx.fillText(`${i}:00`, i * cellWidth + cellWidth / 2, canvas.height - 15);
    }

  }, [data, colorRange]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
};

export default HeatMap;