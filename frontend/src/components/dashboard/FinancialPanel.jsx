// src/components/FinancialPanel.jsx
import React from 'react';
import StatsCard from './StatsCard';

import {  CurrencyDollarIcon, CreditCardIcon, ClockIcon } from '@heroicons/react/24/solid'



const FinancialPanel = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">Finanzas de la Empresa 💰</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          title="Ingresos Totales (MES)" 
          value={data.totalRevenue} 
          icon={<CurrencyDollarIcon className="h-12 w-12 text-white" />}
          bgColor="bg-teal-600"
        />
        <StatsCard 
          title="Por Pagar a Clientes" 
          value={data.debts} 
          icon={<CreditCardIcon className="h-12 w-12 text-white" />}
          bgColor="bg-pink-600"
        />
        <StatsCard 
          title="Pagos por Recibir" 
          value={data.pendingPayments} 
          icon={<ClockIcon className="h-12 w-12 text-white" />}
          bgColor="bg-indigo-600"
        />
      </div>
    </div>
  );
};

export default FinancialPanel;