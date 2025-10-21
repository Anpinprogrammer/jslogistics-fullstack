import React from 'react'

const TableContainer = ({ title, data, columns }) => {
  
  // Si no hay datos, mostramos un mensaje amigable
  if (!data || data.length === 0) {
    return (
      <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
        No se encontraron transacciones en esta categoría.
      </div>
    );
  }

  return (
    // Eliminamos el contenedor con shadow y padding para que el padre lo controle
    <div className="overflow-x-auto">
      
      {/* Título: Solo se renderiza si se pasa un título */}
      {title && (
        <h2 className="text-xl font-semibold mb-3 text-gray-700">
          {title}
        </h2>
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index} 
                className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            // Estilo Striped: bg-white y bg-gray-50 en filas alternas
            <tr 
              key={row.id || index} 
              className={`text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              {columns.map((col, i) => (
                <td 
                  key={i} 
                  className="px-4 py-2 whitespace-nowrap text-gray-700"
                >
                  {/* Manejo de render si existe, sino usa row[col.key] */}
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableContainer