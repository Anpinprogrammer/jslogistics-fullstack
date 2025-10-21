// src/pages/Dashboard.jsx
import React, { useEffect, useState, useMemo } from 'react';
//import Layout from '../../components/dashboard/Layout';
import DeliveryPanel from '../../components/dashboard/DeliveryPanel';
import CouriersTable from '../../components/dashboard/CouriersTable';
import FinancialPanel from '../../components/dashboard/FinancialPanel';
import clienteAxios from '../../config/axios';

const couriersData = [
  { id: 1, name: 'Carlos Mejia', status: 'Activo', assignedDeliveries: 15, schedule: '8:00 - 17:00' },
  { id: 2, name: 'Laura Gómez', status: 'Activo', assignedDeliveries: 12, schedule: '9:00 - 18:00' },
  { id: 3, name: 'Pedro Ruiz', status: 'Inactivo', assignedDeliveries: 0, schedule: 'N/A' },
  { id: 4, name: 'Sofia Castro', status: 'Activo', assignedDeliveries: 18, schedule: '10:00 - 19:00' },
];

const Dashboard = () => {

  const [domicilios, setDomicilios] = useState([])
  /**const [deliveryData, setDeliveryData] = useState({
  deliveredArray: [],  
  delivered: 0,
  rejectedArray: [],
  rejected: 0,
  pendingArray: [],
  pending: 0  })
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    debts: 0,
    pendingPayments: 0,
  })*/

  useEffect(() => {
    const obtenerDomis = async () => {
      const { data } = await clienteAxios('/domis/listar-domis', { withCredentials: true })
      //setEntregados((data.filter(d => d.estado === 'entregado')).length)
      setDomicilios(data)
    }
    obtenerDomis()
  }, [])

  const deliveryData = useMemo(() => {
  const entregados = domicilios.filter(d => d.estado === "entregado");
  const pendientes = domicilios.filter(d =>
    ["pendiente por recoger", "en bodega", "en ruta"].includes(d.estado)
  );
  const rechazados = domicilios.filter(d => d.estado === "rechazado");

  return {
    deliveredArray: entregados,
    delivered: entregados.length,
    pendingArray: pendientes,
    pending: pendientes.length,
    rejectedArray: rechazados,
    rejected: rechazados.length,
  };
}, [domicilios]);

const financialData = useMemo(() => {
  const totalValorEntregados = deliveryData.deliveredArray.reduce(
    (acc, d) => acc + (d.valorDomi || 0),
    0
  );
  const pagosPendientes = deliveryData.pendingArray.reduce((acc, d) => acc + (d.valorDomi || 0), 0)

  return {
    totalRevenue: totalValorEntregados,
    debts: 0,
    pendingPayments: pagosPendientes,
  };
}, [deliveryData]);


  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración JSLogistics 🚀</h1>

      {/* Seccion 1: Paneles de Métricas (Finanzas y Entregas) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <FinancialPanel data={financialData} />
        <DeliveryPanel data={deliveryData} />
      </div>

      {/* Seccion 2: Tabla de Mensajeros */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Mensajeros Activos y Asignaciones</h2>
        <CouriersTable data={couriersData} />
      </div>
    </>
  );
};

export default Dashboard;