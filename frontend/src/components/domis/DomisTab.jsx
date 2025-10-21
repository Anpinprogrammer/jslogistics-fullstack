import { useState, useEffect, Fragment } from "react";
import Domi from "./Domi";
import DetalleDomi from "./DetalleDomi";

const DomisTab = ({ data, toggleState }) => {
  const [domiSeleccionadoId, setDomiSeleccionadoId] = useState(null);
  const [pendientes, setPendientes] = useState([]);
  const [completadas, setCompletadas] = useState([]);
  const [rechazadas, setRechazadas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    if (data.length) {
      setPendientes(
        data.filter(
          (d) =>
            d.estado === "pendiente por recoger" ||
            d.estado === "en bodega" ||
            d.estado === "en ruta"
        )
      );
      setCompletadas(data.filter((d) => d.estado === "entregado"));
      setRechazadas(data.filter((d) => d.estado === "rechazado"));
    }
  }, [data]);

  const domiFiltrado =
    busqueda === ""
      ? data
      : data.filter((domi) =>
          domi.noDomi.toLowerCase().includes(busqueda.toLowerCase())
        );

  const renderRows = (lista) =>
    lista.map((domi) => (
      <Fragment key={domi._id}>
        <Domi
          domi={domi}
          onVerMas={() =>
            setDomiSeleccionadoId(
              domiSeleccionadoId === domi._id ? null : domi._id
            )
          }
        />
        {domiSeleccionadoId === domi._id && (
          <tr className="bg-gray-50 border-t border-gray-200 transition-all duration-200">
            <td colSpan={5} className="p-4">
              <DetalleDomi domi={domi} />
            </td>
          </tr>
        )}
      </Fragment>
    ));

  const EmptyState = ({ message }) => (
    <tr>
      <td colSpan={5} className="py-12">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-14 h-14 mb-3 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8.25v3.75m0 3.75h.008v.008H12v-.008zm9-3.75a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-base font-medium">{message}</p>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      {toggleState === 1 &&
        (pendientes.length ? (
          renderRows(pendientes)
        ) : (
          <EmptyState message="No tienes domis pendientes." />
        ))}

      {toggleState === 2 &&
        (completadas.length ? (
          renderRows(completadas)
        ) : (
          <EmptyState message="No tienes domis completados." />
        ))}

      {toggleState === 3 &&
        (rechazadas.length ? (
          renderRows(rechazadas)
        ) : (
          <EmptyState message="No tienes domis rechazados." />
        ))}
    </>
  );
};

export default DomisTab;
