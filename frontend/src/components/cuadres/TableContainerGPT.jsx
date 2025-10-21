import { Fragment } from "react";

const TableContainerGPT = ({
  title,
  data,
  columns,
  expandedRow,
  onExpandRow,
  renderExpandedContent,
}) => {
  return (
    // Se elimina el p-4 del contenedor, ya que el padding se maneja mejor en la vista padre
    <div className="bg-white rounded-lg overflow-x-auto"> 
      
      {/* Título (se mantiene por si el componente se usa de forma independiente) */}
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 p-4 border-b">
          {title}
        </h2>
      )}
      
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, idx) => (
            <Fragment key={idx}>
              {/* Fila Principal */}
              <tr
                // Diseño más limpio: border-b y color de hover sutil
                className={`transition duration-150 ease-in-out cursor-pointer ${
                  expandedRow === row 
                    ? "bg-blue-50 text-blue-900 shadow-inner" // Fila activa con estilo
                    : "hover:bg-gray-50 text-gray-800"
                }`}
                onClick={() => onExpandRow(expandedRow === row ? null : row)}
              >
                {columns.map((col, i) => (
                  <td 
                    key={i} 
                    className="px-6 py-3 whitespace-nowrap text-sm"
                  >
                    {col.render
                      ? col.render(row)
                      : col.key.split('.').reduce((obj, key) => obj?.[key], row) ?? ''}
                  </td>
                ))}
              </tr>

              {/* Fila de Contenido Expandido */}
              {expandedRow === row && (
                <tr className="bg-gray-50"> 
                  {/* Se quita el padding y fondo de la TD para que renderExpandedContent lo controle */}
                  <td colSpan={columns.length} className="p-0 border-0"> 
                    {renderExpandedContent && renderExpandedContent(row)}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>

      {/* Manejo de estado vacío */}
      {data.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No hay datos disponibles para mostrar en este resumen.
        </div>
      )}
    </div>
  );
};

export default TableContainerGPT;