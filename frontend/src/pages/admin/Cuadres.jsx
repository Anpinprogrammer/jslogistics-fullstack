import { useState } from "react";
import CuadreClientes from "../../components/cuadres/clientes/CuadreClientes";
import CuadreMensajeros from "../../components/cuadres/mensajeros/CuadreMensajeros";

const Cuadres = () => {
  const [status, setStatus] = useState("clientes");

  // Clases base y activas para las pestañas
  const tabBaseClasses = "text-lg font-semibold px-6 py-3 cursor-pointer transition-all duration-300";
  const tabActiveClasses = "text-white border-b-2 border-[#2291B9]"; // Color primario de la app
  const tabInactiveClasses = "text-gray-400 hover:text-gray-200 border-b-2 border-transparent hover:border-gray-500";

  return (
    <div className="p-4 md:p-8">
      {/* Contenedor de Pestañas (Tab Bar) */}
      <div className="flex items-center border-b border-gray-700 mb-6 bg-[#383838] rounded-t-xl shadow-lg">
        {/* Pestaña Clientes */}
        <button
          onClick={() => setStatus("clientes")}
          className={`${tabBaseClasses} ${
            status === "clientes" ? tabActiveClasses : tabInactiveClasses
          }`}
        >
          Clientes
        </button>

        {/* Pestaña Mensajeros */}
        <button
          onClick={() => setStatus("mensajeros")}
          className={`${tabBaseClasses} ${
            status === "mensajeros" ? tabActiveClasses : tabInactiveClasses
          }`}
        >
          Mensajeros
        </button>
      </div>

      {/* Contenido de la Pestaña */}
      <div className="mt-6">
        {status === "clientes" ? (
          <CuadreClientes />
        ) : (
          <CuadreMensajeros />
        )}
      </div>
    </div>
  );
};

export default Cuadres;