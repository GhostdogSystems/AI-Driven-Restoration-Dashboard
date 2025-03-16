import React, { useState } from 'react';
import { SearchIcon, PlusIcon, FilterIcon } from 'lucide-react';
interface Equipment {
  id: string;
  name: string;
  sku: string;
  category: string;
  cost: number;
  unit: string;
  description: string;
}
const EquipmentList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // Mock equipment data
  const equipment: Equipment[] = [{
    id: '1',
    name: 'Dehumidifier XL2000',
    sku: 'DEH-XL2000',
    category: 'Dehumidification',
    cost: 75.0,
    unit: 'day',
    description: 'Industrial grade dehumidifier, 70 pint capacity'
  }, {
    id: '2',
    name: 'Air Mover AM500',
    sku: 'AM-500',
    category: 'Air Movement',
    cost: 35.0,
    unit: 'day',
    description: 'High-velocity air mover, 3-speed settings'
  }, {
    id: '3',
    name: 'HEPA Air Scrubber',
    sku: 'HEPA-2000',
    category: 'Air Filtration',
    cost: 95.0,
    unit: 'day',
    description: 'HEPA filtration system with carbon pre-filter'
  }];
  const categories = ['all', 'Dehumidification', 'Air Movement', 'Air Filtration'];
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  return <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Equipment List</h2>
      </div>
      <div className="p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search equipment..." />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FilterIcon className="h-5 w-5 text-gray-400" />
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="block w-40 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              {categories.map(category => <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEquipment.map(item => <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">{item.sku}</p>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <PlusIcon className="h-5 w-5 text-blue-600" />
                </button>
              </div>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">
                  ${item.cost.toFixed(2)} / {item.unit}
                </span>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default EquipmentList;