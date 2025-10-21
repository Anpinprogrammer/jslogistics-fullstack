// src/components/StatsCard.jsx
import React from 'react';

const StatsCard = ({ title, value, icon, bgColor = 'bg-blue-500' }) => {
  // 1. Define las palabras clave que deben ser tratadas como dinero
  const monetaryKeywords = ['Ingresos', 'Deudas', 'Pagos', 'Recibir'];

  // 2. Crea una función para verificar si el título es monetario
  const isMonetary = (title) => 
    monetaryKeywords.some(keyword => title.includes(keyword));

  // 3. Aplica el formato solo si el valor es numérico Y el título coincide con una palabra clave monetaria
  const formattedValue = (typeof value === 'number' && isMonetary(title)) ? 
    // Formato de moneda (ej: $15.500.000)
    `$${value.toLocaleString('es-CO')}` : 
    // Formato normal (ej: 1,250)
    value.toLocaleString('es-CO');

  return (
    <div className={`flex items-center p-4 ${bgColor} rounded-xl shadow-md text-white transition duration-300 ease-in-out hover:shadow-xl`}>
      <div className="  lg:hidden rounded-full bg-opacity-20 mr-4">
        {/* Aquí iría un ícono (ej. de Heroicons o similar) */}
        {icon} 
      </div>
      <div>
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-3xl lg:text-xl font-bold">{formattedValue}</p>
      </div>
    </div>
  );
};

export default StatsCard;