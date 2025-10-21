import { useState, useEffect } from "react";
import TableContainer from "../TableContainer";
import TableContainerGPT from "../TableContainerGPT";
import clienteAxios from "../../../config/axios";
import { Download, MoreVertical, FileSpreadsheet, ChevronDown, ChevronUp } from "lucide-react";
import * as XLSX from "xlsx";

// Función auxiliar para formatear moneda
const formatCurrency = (value) => {
  return value.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 });
};

const CuadreClientes = () => {
  const [globalData, setGlobalData] = useState([]);
  const [ingresoCliente, setIngresoCliente] = useState([]);
  const [ingresosJS, setIngresosJS] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  
  

  // ... (Lógica de useEffect para buscar datos - Se mantiene igual)
  useEffect(() => {
    // Lógica para buscar detalles de cuadre (ingresoCliente, ingresosJS)
    const buscarCuadres = async () => {
      // ... (Llamada a API)
      const { data } = await clienteAxios("/cuadre/listar", { withCredentials: true });
      if (data.length) {
        setIngresoCliente(data.filter((d) => d.recibidoPor === "Cliente"));
        setIngresosJS(data.filter((d) => d.recibidoPor !== "Cliente"));
      }
    };
    buscarCuadres();
  }, []);

  useEffect(() => {
    // Lógica para buscar resumen de clientes (globalData)
    const buscarCuadreClientes = async () => {
      // ... (Llamada a API)
      const { data } = await clienteAxios("/cuadre/resumen-clientes", { withCredentials: true });
      setGlobalData(data.filter((d) => d.totalDomis > 0));
    };
    buscarCuadreClientes();
  }, []);
  
  // ... (Lógica de descargarExcel y descargarExcelGlobal - Se mantiene igual)
  // Descargar Excel individual
  const descargarExcel = (cliente) => {
    const worksheet = XLSX.utils.json_to_sheet([cliente]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cuadre Cliente");
    XLSX.writeFile(workbook, `cuadre_${cliente.empresa || cliente.nombre}.xlsx`);
  };

  // Descargar todo el resumen
  const descargarExcelGlobal = () => {
    const worksheet = XLSX.utils.json_to_sheet(globalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Resumen Global");
    XLSX.writeFile(workbook, `resumen_cuadres.xlsx`);
  };

  return (
    <div className="p-4 bg-gray-50 rounded-xl">
      {/* ENCABEZADO Y ACCIONES */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 border-b pb-4">
        {/* Título y Contador */}
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
          Cuadre de Clientes
          <span className="text-base bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium shadow-sm">
            {globalData.length} Clientes
          </span>
        </h1>

        {/* Botón de Acción Principal */}
        <button
          onClick={descargarExcelGlobal}
          className="flex items-center gap-2 bg-[#2291B9] hover:bg-[#1A7799] text-white px-5 py-2.5 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]"
        >
          <FileSpreadsheet size={20} />
          Descargar Resumen Global
        </button>
      </div>

      {/* CONTENEDOR PRINCIPAL DE LA TABLA */}
      <div className="bg-white rounded-2xl shadow-xl p-0 border border-gray-200 overflow-hidden">
        <TableContainerGPT
          title="Resumen de Cuadres"
          data={globalData}
          expandedRow={clienteSeleccionado}
          onExpandRow={setClienteSeleccionado}
          renderExpandedContent={(cliente) => (
            // Contenido Expandido: Mejora de la jerarquía visual con bordes y títulos
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gray-50 border-t border-gray-200">
              
              {/* Bloque: Recibido por Cliente */}
              <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
                <h3 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                    Pagos Recibidos por {cliente.empresa}
                </h3>
                <TableContainer
                  title={null} // El título ya está en el h3
                  data={ingresoCliente.filter((d) => d.colector === cliente.empresa)}
                  columns={[
                    { header: "Referencia", key: "referencia" },
                    { header: "Valor", key: "valor", render: (item) => formatCurrency(item.valor) },
                    { header: "Comprobante", key: "comprobante" },
                  ]}
                />
              </div>

              {/* Bloque: Recibido por JS Logistics */}
              <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
                <h3 className="text-xl font-bold text-green-800 mb-4 border-b pb-2">
                    Pagos Recibidos por JS Logistics
                </h3>
                <TableContainer
                  title={null} // El título ya está en el h3
                  data={ingresosJS.filter((item) => cliente.domicilios.includes(item.referencia))}
                  columns={[
                    { header: "Referencia", key: "referencia" },
                    { header: "Colector", key: "colector" },
                    { header: "Valor", key: "valor", render: (item) => formatCurrency(item.valor) },
                    { header: "Comprobante", key: "comprobante" },
                  ]}
                />
              </div>
            </div>
          )}
          columns={[
            { header: "Cliente", key: "empresa" },
            { header: "Domis", key: "totalDomis" },
            // Aplicamos formato de moneda a los valores
            { header: "Total Esperado", key: "totalValorEsperado", render: (cliente) => formatCurrency(cliente.totalValorEsperado) },
            { header: "Recibido JS", key: "valorJS", render: (cliente) => formatCurrency(cliente.valorJS) },
            { header: "Recibido Cliente", key: "valorCliente", render: (cliente) => formatCurrency(cliente.valorCliente) },
            {
              header: "Diferencia",
              key: "diferenciaJS",
              render: (cliente) => {
                // Lógica de colores más moderna y legible
                let classes = "px-3 py-1 rounded-full font-bold text-sm shadow-sm";
                if (cliente.diferenciaJS > 0) {
                  classes += " bg-green-100 text-green-800 ring-1 ring-green-500";
                } else if (cliente.diferenciaJS < 0) {
                  classes += " bg-red-100 text-red-800 ring-1 ring-red-500";
                } else {
                  classes += " bg-gray-100 text-gray-600";
                }

                return (
                  <span className={classes}>
                    {formatCurrency(cliente.diferenciaJS)}
                  </span>
                );
              },
            },
            {
              header: "Acciones",
              key: "acciones",
              render: (cliente) => (
                <div className="flex items-center gap-4 justify-center">
                  <button
                    onClick={() => descargarExcel(cliente)}
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                    title="Descargar Cuadre Individual"
                  >
                    <Download size={18} />
                  </button>
                  {/* El icono de expansión, crucial para la UX de TableContainerGPT */}
                  <button
                    onClick={() => setClienteSeleccionado(clienteSeleccionado === cliente ? null : cliente)}
                    className="text-gray-600 hover:text-gray-800 transition-colors p-1.5 rounded-lg hover:bg-gray-50"
                    title={clienteSeleccionado === cliente ? "Contraer Detalles" : "Ver Detalles"}
                  >
                    {clienteSeleccionado === cliente ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default CuadreClientes;