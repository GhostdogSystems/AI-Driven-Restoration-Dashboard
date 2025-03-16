import React, { useState } from 'react';
import { PlusIcon, TrashIcon, ChevronDownIcon, LinkIcon, GripVerticalIcon } from 'lucide-react';
interface EquipmentItem {
  id: string;
  item: string;
  sku: string;
  qty: number;
  unit: string;
  cost: number;
  markup: number;
  room: string;
  tax: boolean;
  websiteLink?: string;
}
const EquipmentCalculator: React.FC = () => {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [taxRate, setTaxRate] = useState(7.25);
  const addItem = () => {
    const newItem: EquipmentItem = {
      id: Date.now().toString(),
      item: '',
      sku: '',
      qty: 0,
      unit: '',
      cost: 0,
      markup: 0,
      room: '',
      tax: false
    };
    setItems([...items, newItem]);
  };
  const updateItem = (id: string, field: keyof EquipmentItem, value: any) => {
    setItems(items.map(item => item.id === id ? {
      ...item,
      [field]: value
    } : item));
  };
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => {
      const itemTotal = item.cost * item.qty * (1 + item.markup / 100);
      return sum + itemTotal;
    }, 0);
  };
  const calculateTax = () => {
    const taxableItems = items.filter(item => item.tax);
    return taxableItems.reduce((sum, item) => {
      const itemTotal = item.cost * item.qty * (1 + item.markup / 100);
      return sum + itemTotal * (taxRate / 100);
    }, 0);
  };
  const subtotal = calculateSubtotal();
  const tax = calculateTax();
  const total = subtotal + tax;
  return <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            Equipment Calculator
          </h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
              Preview
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-8 px-3 py-3"></th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Markup
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax
              </th>
              <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website Link
              </th>
              <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th scope="col" className="w-8 px-3 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map(item => <tr key={item.id}>
                <td className="px-3 py-4">
                  <GripVerticalIcon className="h-4 w-4 text-gray-400 cursor-move" />
                </td>
                <td className="px-3 py-4">
                  <input type="text" value={item.item} onChange={e => updateItem(item.id, 'item', e.target.value)} className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Enter item name" />
                </td>
                <td className="px-3 py-4">
                  <input type="text" value={item.sku} onChange={e => updateItem(item.id, 'sku', e.target.value)} className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="SKU" />
                </td>
                <td className="px-3 py-4">
                  <input type="number" value={item.qty} onChange={e => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} className="block w-20 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                </td>
                <td className="px-3 py-4">
                  <input type="text" value={item.unit} onChange={e => updateItem(item.id, 'unit', e.target.value)} className="block w-20 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Unit" />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-1">$</span>
                    <input type="number" value={item.cost} onChange={e => updateItem(item.id, 'cost', parseFloat(e.target.value) || 0)} className="block w-24 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center">
                    <input type="number" value={item.markup} onChange={e => updateItem(item.id, 'markup', parseFloat(e.target.value) || 0)} className="block w-20 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    <span className="text-gray-500 ml-1">%</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <input type="text" value={item.room} onChange={e => updateItem(item.id, 'room', e.target.value)} className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="Room" />
                </td>
                <td className="px-3 py-4">
                  <input type="checkbox" checked={item.tax} onChange={e => updateItem(item.id, 'tax', e.target.checked)} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center">
                    <input type="text" value={item.websiteLink || ''} onChange={e => updateItem(item.id, 'websiteLink', e.target.value)} className="block w-full text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" placeholder="URL" />
                    {item.websiteLink && <a href={item.websiteLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:text-blue-700">
                        <LinkIcon className="h-4 w-4" />
                      </a>}
                  </div>
                </td>
                <td className="px-3 py-4 text-right">
                  <span className="text-sm text-gray-900">
                    $
                    {(item.cost * item.qty * (1 + item.markup / 100) || 0).toFixed(2)}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-700">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 border-t border-gray-200">
        <button onClick={addItem} className="flex items-center text-sm text-blue-600 hover:text-blue-700">
          <PlusIcon className="h-4 w-4 mr-1" />
          Add Item
        </button>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-end space-y-2">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Subtotal</span>
              <span className="text-sm text-gray-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Tax</span>
              <div className="flex items-center space-x-2">
                <input type="number" value={taxRate} onChange={e => setTaxRate(parseFloat(e.target.value) || 0)} className="w-16 text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                <span className="text-sm text-gray-500">%</span>
                <span className="text-sm text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-sm text-gray-900">Total</span>
              <span className="text-sm text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default EquipmentCalculator;