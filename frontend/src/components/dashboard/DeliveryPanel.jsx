// src/components/DeliveryPanel.jsx
import React from 'react';
import StatsCard from './StatsCard';


import {  CheckCircleIcon, XCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'; // Asumiendo Heroicons

const DeliveryPanel = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Estado de Domicilios Hoy 📦</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          title="Entregados" 
          value={data.delivered} 
          icon={<CheckCircleIcon className="h-12 w-12 text-white" />}
          bgColor="bg-green-600"
        />
        <StatsCard 
          title="Rechazados" 
          value={data.rejected} 
          icon={<XCircleIcon className="h-12 w-12 text-white" />}
          bgColor="bg-red-500"
        />
        <StatsCard 
          title="Pendientes" 
          value={data.pending} 
          icon={<PaperAirplaneIcon className="h-12 w-12 text-white" />}
          bgColor="bg-yellow-500"
        />
      </div>
    </div>
  );
};

export default DeliveryPanel;