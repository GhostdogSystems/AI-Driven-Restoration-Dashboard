import React from 'react';
import EquipmentCalculator from './EquipmentCalculator';
import EquipmentList from './EquipmentList';
const Equipment: React.FC = () => {
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <EquipmentCalculator />
      <EquipmentList />
    </div>;
};
export default Equipment;