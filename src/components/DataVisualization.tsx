import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BusinessData, ChartData } from '../types/data';
import { formatCurrency } from '../utils/formatters';

interface DataVisualizationProps {
  data: BusinessData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const DataVisualization: React.FC<DataVisualizationProps> = ({ data }) => {
  const [chartType, setChartType] = useState<'municipality' | 'type' | 'sector'>('municipality');

  const getMunicipalityData = (): ChartData[] => {
    const grouped = data.reduce((acc, item) => {
      acc[item.MUNICIPIO] = (acc[item.MUNICIPIO] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const getTypeData = (): ChartData[] => {
    const grouped = data.reduce((acc, item) => {
      acc[item.TIPO_EMPRESA] = (acc[item.TIPO_EMPRESA] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const getSectorData = (): ChartData[] => {
    const grouped = data.reduce((acc, item) => {
      const value = item.VALOR_ACTIVOS;
      acc[item.SECTOR_PERTENECE] = (acc[item.SECTOR_PERTENECE] || 0) + value;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  };

  const getChartData = () => {
    switch (chartType) {
      case 'municipality':
        return getMunicipalityData();
      case 'type':
        return getTypeData();
      case 'sector':
        return getSectorData();
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="mb-4">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as any)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="municipality">Empresas por Municipio</option>
          <option value="type">Empresas por Tipo</option>
          <option value="sector">Activos por Sector</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => chartType === 'sector' ? formatCurrency(value as number) : value} />
              <Legend />
              <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={getChartData()}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {getChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => chartType === 'sector' ? formatCurrency(value as number) : value} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};