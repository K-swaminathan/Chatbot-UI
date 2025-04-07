import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartData } from '../types';
import { motion } from 'framer-motion';

interface DataVisualizerProps {
  data: ChartData;
}

export const DataVisualizer: React.FC<DataVisualizerProps> = ({ data }) => {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    ...data.datasets.reduce((acc, dataset) => ({
      ...acc,
      [dataset.label]: dataset.data[index]
    }), {})
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-dark-800 to-dark-700 p-4 shadow-lg"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(45, 45, 45, 0.5)" />
          <XAxis
            dataKey="name"
            stroke="#666666"
            tick={{ fill: '#666666' }}
            axisLine={{ stroke: '#2D2D2D' }}
          />
          <YAxis
            stroke="#666666"
            tick={{ fill: '#666666' }}
            axisLine={{ stroke: '#2D2D2D' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 15, 15, 0.9)',
              border: '1px solid #2D2D2D',
              borderRadius: '0.75rem',
              color: '#E5E7EB',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(8px)'
            }}
          />
          {data.datasets.map((dataset, index) => (
            <Line
              key={dataset.label}
              type="monotone"
              dataKey={dataset.label}
              stroke={`hsl(${index * 60}, 70%, 50%)`}
              strokeWidth={2}
              dot={{ fill: `hsl(${index * 60}, 70%, 50%)`, strokeWidth: 2 }}
              activeDot={{
                r: 6,
                stroke: `hsl(${index * 60}, 70%, 50%)`,
                strokeWidth: 2,
                fill: '#1A1A1A'
              }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
};