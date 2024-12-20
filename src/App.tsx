import { useState } from 'react';
import { DataTable } from './components/DataTable';
import { DataForm } from './components/DataForm';
import { DataVisualization } from './components/DataVisualization';
import { Pagination } from './components/Pagination';
import { BusinessData } from './types/data';
import { businessData } from './data/businessData';
import { PlusCircle } from 'lucide-react';

function App() {
  const [data, setData] = useState<BusinessData[]>(businessData);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState<BusinessData | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleAdd = (newItem: Omit<BusinessData, 'ID'>) => {
    const id = Math.max(...data.map(item => item.ID), 0) + 1;
    setData([...data, { ...newItem, ID: id }]);
    setIsFormOpen(false);
  };

  const handleEdit = (item: BusinessData) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleUpdate = (updatedItem: Omit<BusinessData, 'ID'>) => {
    if (editingItem) {
      setData(data.map(item => 
        item.ID === editingItem.ID ? { ...updatedItem, ID: item.ID } : item
      ));
      setEditingItem(null);
      setIsFormOpen(false);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este registro?')) {
      setData(data.filter(item => item.ID !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Empresas - Sucre</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Agregar Empresa
            </button>
          </div>

          {isFormOpen && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Editar Empresa' : 'Agregar Nueva Empresa'}
              </h2>
              <DataForm
                onSubmit={editingItem ? handleUpdate : handleAdd}
                initialData={editingItem}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingItem(null);
                }}
              />
            </div>
          )}

          <DataTable
            data={data}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Visualización de Datos</h2>
          <DataVisualization data={data} />
        </div>
      </div>
    </div>
  );
}

export default App;