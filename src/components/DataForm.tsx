import React, { useState, useEffect } from 'react';
import { BusinessData } from '../types/data';

interface DataFormProps {
  onSubmit: (data: Omit<BusinessData, 'ID'>) => void;
  initialData?: BusinessData;
  onCancel: () => void;
}

export const DataForm: React.FC<DataFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    EMPRESA: '',
    MUNICIPIO: '',
    DEPARTAMENTO: 'SUCRE',
    FECHA_REGISTRO: '',
    FECHA_RENOVACION: '',
    VALOR_ACTIVOS: '',
    CODIGO_ACTIVIDAD_PRINCIPAL: '',
    CODIGO_ACTIVIDAD_SECUNDARIA: '',
    TIPO_EMPRESA: '',
    TIPO_ORGANIZACION: '',
    SECTOR_PERTENECE: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        EMPRESA: initialData.EMPRESA,
        MUNICIPIO: initialData.MUNICIPIO,
        DEPARTAMENTO: initialData.DEPARTAMENTO,
        FECHA_REGISTRO: initialData.FECHA_REGISTRO.toString(),
        FECHA_RENOVACION: initialData.FECHA_RENOVACION.toString(),
        VALOR_ACTIVOS: initialData.VALOR_ACTIVOS.toString(),
        CODIGO_ACTIVIDAD_PRINCIPAL: initialData.CODIGO_ACTIVIDAD_PRINCIPAL,
        CODIGO_ACTIVIDAD_SECUNDARIA: initialData.CODIGO_ACTIVIDAD_SECUNDARIA,
        TIPO_EMPRESA: initialData.TIPO_EMPRESA,
        TIPO_ORGANIZACION: initialData.TIPO_ORGANIZACION,
        SECTOR_PERTENECE: initialData.SECTOR_PERTENECE,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      FECHA_REGISTRO: parseInt(formData.FECHA_REGISTRO),
      FECHA_RENOVACION: parseInt(formData.FECHA_RENOVACION),
      VALOR_ACTIVOS: parseInt(formData.VALOR_ACTIVOS),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Empresa</label>
          <input
            type="text"
            value={formData.EMPRESA}
            onChange={(e) => setFormData({ ...formData, EMPRESA: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Municipio</label>
          <input
            type="text"
            value={formData.MUNICIPIO}
            onChange={(e) => setFormData({ ...formData, MUNICIPIO: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Valor Activos</label>
          <input
            type="number"
            value={formData.VALOR_ACTIVOS}
            onChange={(e) => setFormData({ ...formData, VALOR_ACTIVOS: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo Empresa</label>
          <input
            type="text"
            value={formData.TIPO_EMPRESA}
            onChange={(e) => setFormData({ ...formData, TIPO_EMPRESA: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Actualizar' : 'Agregar'}
        </button>
      </div>
    </form>
  );
};