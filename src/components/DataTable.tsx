import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { BusinessData } from '../types/data';
import { formatCurrency, formatDate } from '../utils/formatters';

interface DataTableProps {
  data: BusinessData[];
  currentPage: number;
  itemsPerPage: number;
  onEdit: (item: BusinessData) => void;
  onDelete: (id: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  currentPage,
  itemsPerPage,
  onEdit,
  onDelete,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Municipio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registro</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {paginatedData.map((item) => (
            <tr key={item.ID} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{item.EMPRESA}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.MUNICIPIO}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.TIPO_EMPRESA}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatCurrency(item.VALOR_ACTIVOS)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formatDate(item.FECHA_REGISTRO)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-900 mr-3"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(item.ID)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};