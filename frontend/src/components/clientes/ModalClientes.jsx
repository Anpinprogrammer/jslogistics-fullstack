import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

const ModalClientes = () => {
  const [nombres, setNombres] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [alerta, setAlerta] = useState("");

  const {
    changeModalCliente,
    setEditar,
    editar,
    clienteState,
    setClienteState,
  } = useAdmin();

  const {
    _id,
    nombres: nombresState,
    identificacion: identificacionState,
    direccion: direccionState,
    telefono: telefonoState,
    empresa: empresaState,
    descripcion: descripcionState,
  } = clienteState;

  const limpiarCampos = () => {
        setNombres('');
        setIdentificacion('');
        setDireccion('');
        setTelefono('');
        setEmpresa('');
        setDescripcion('');
  }

  useEffect(() => {
    if (clienteState?._id) {
        setNombres(nombresState);
        setIdentificacion(identificacionState);
        setDireccion(direccionState);
        setTelefono(telefonoState);
        setEmpresa(empresaState);
        setDescripcion(descripcionState);
    } else {
        limpiarCampos()
    }

}, [clienteState])

  useEffect(() => {
    if (!editar) {
      limpiarCampos()
    }
  }, [])

  const controlModal = () => {
    setEditar(false);
    changeModalCliente();
    setClienteState({});
  };

  const handleSubmitCliente = async (e) => {
    e.preventDefault();

    if ([nombres, identificacion, direccion, telefono, empresa].includes("")) {
      setAlerta("Todos los campos excepto la descripción son obligatorios");
      return;
    }

    setAlerta("");

    try {
      if (clienteState?._id) {
        const { data } = await clienteAxios.put(
          `/clientes/actualizar-cliente/${clienteState._id}`,
          {
            nombres,
            identificacion,
            direccion,
            telefono,
            empresa,
            descripcion,
          },
          { withCredentials: true }
        );
        Swal.fire("", data.msg, "success");
      } else {
        const { data } = await clienteAxios.post(
          "/clientes/ingresar",
          {
            nombres,
            identificacion,
            direccion,
            telefono,
            empresa,
            descripcion,
          },
          { withCredentials: true }
        );
        Swal.fire("", data.msg, "success");
      }
    } catch (error) {
      Swal.fire("", error.response?.data?.msg || "Error al guardar", "error");
    }

    changeModalCliente();
  };

  const eliminarCliente = async () => {
    const respuesta = await Swal.fire({
      title: "¿Eliminar cliente?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (respuesta.isConfirmed) {
      try {
        const { data } = await clienteAxios.delete(
          `/clientes/eliminar-cliente/${clienteState._id}`,
          { withCredentials: true }
        );
        Swal.fire("", data.msg, "success");
      } catch (error) {
        Swal.fire("", "Error al eliminar el cliente", "error");
      }

      
      limpiarCampos();
      setClienteState({});
      changeModalCliente()
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        {/* Encabezado */}
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-[#0C8AB7] to-[#2F9CC4] text-white">
          <h2 className="text-lg font-semibold">
            {editar ? "Editar Cliente" : "Agregar Cliente"}
          </h2>
          <button
            onClick={controlModal}
            className="hover:bg-white/20 p-1 rounded-full transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Formulario */}
        <form
          className="p-6 space-y-4 bg-[#F8F8F8]"
        >
          {[
            { id: "nombres", label: "Nombres", value: nombres, set: setNombres },
            {
              id: "identificacion",
              label: "Cédula o NIT",
              value: identificacion,
              set: setIdentificacion,
            },
            {
              id: "direccion",
              label: "Dirección",
              value: direccion,
              set: setDireccion,
            },
            {
              id: "telefono",
              label: "Teléfono",
              value: telefono,
              set: setTelefono,
            },
            { id: "empresa", label: "Empresa", value: empresa, set: setEmpresa },
          ].map(({ id, label, value, set }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}:
              </label>
              <input
                id={id}
                type="text"
                value={value}
                onChange={(e) => set(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción:
            </label>
            <textarea
              id="descripcion"
              rows={4}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
            />
          </div>

          {alerta && (
            <p className="text-center text-red-500 text-sm font-medium">
              {alerta}
            </p>
          )}

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              className="bg-[#2291B9] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#2F9CC4] transition"
              onClick={handleSubmitCliente}            
            >
              {editar ? "Guardar cambios" : "Agregar cliente"}
            </button>

            {editar && (
              <button
                type="button"
                onClick={eliminarCliente}
                className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalClientes;
