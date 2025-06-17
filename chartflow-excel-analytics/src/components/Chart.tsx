import React, { useState } from 'react';
import { Line, Bar, Pie, Scatter, Area } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import ChartCustomization from './ChartCustomization';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  type: string;
  data: any;
  userId: string;
}

export default function Chart({ type, data, userId }: ChartProps) {
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [enableAnimation, setEnableAnimation] = useState(true);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend
      },
      title: {
        display: true,
        text: `${data.labels[0]} vs ${data.datasets[0].label}`
      }
    },
    scales: {
      x: {
        grid: {
          display: showGrid
        }
      },
      y: {
        grid: {
          display: showGrid
        }
      }
    },
    animation: {
      duration: enableAnimation ? 1000 : 0
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={chartOptions} />;
      case 'bar':
        return <Bar data={data} options={chartOptions} />;
      case 'pie':
        return <Pie data={data} options={chartOptions} />;
      case 'scatter':
        return <Scatter data={data} options={chartOptions} />;
      case 'area':
        return <Area data={data} options={chartOptions} />;
      default:
        return <Line data={data} options={chartOptions} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-[400px]">
        {renderChart()}
      </div>
      <ChartCustomization
        showGrid={showGrid}
        showLegend={showLegend}
        enableAnimation={enableAnimation}
        onShowGridChange={setShowGrid}
        onShowLegendChange={setShowLegend}
        onEnableAnimationChange={setEnableAnimation}
        onStyleChange={() => {}}
        onExport={() => {}}
      />
    </div>
  );
} 