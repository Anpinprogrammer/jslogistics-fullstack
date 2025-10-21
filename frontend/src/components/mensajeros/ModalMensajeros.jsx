import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";
import clienteAxios from '../../config/axios';
import Swal from "sweetalert2";


const ModalMensajeros = () => {

  const [id, setId] = useState('')
  const [nombres, setNombres] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [usuarioMen, setUsuarioMen] = useState('')
  const [passwordMen, setPasswordMen] = useState('')
  const [alerta, setAlerta] = useState('')

  const {
    changeModalMensajero,
    setEditar,
    editar,
    mensajeroState,
    setMensajeroState
  } = useAdmin()

  const {
    _id,
    nombres: nombresState,
    cedula: identificacionState,
    telefono: telefonoState,
    usuario: usuarioMenState,
  } = mensajeroState

  const limpiarCampos = () => {
      setId('');
      setNombres('');
      setIdentificacion('');
      setTelefono('');
      setUsuarioMen('');
  }

  useEffect(() => {
    if (mensajeroState?._id) {
        setId(mensajeroState._id)
        setNombres(nombresState);
        setIdentificacion(identificacionState);
        setTelefono(telefonoState);
        setUsuarioMen(usuarioMenState);
    } else {
        limpiarCampos()
    }
    

}, [mensajeroState])

useEffect(() => {
  if (!editar) {
      limpiarCampos()
  }
}, [])

const controlModal = () => {
  setEditar(false)
  changeModalMensajero()
  setMensajeroState({})
}

const handleSubmitMensajero = async e => {
  e.preventDefault()

  if(editar){
    try {
        const { data } = await clienteAxios.put(`/mensajeros/editar-mensajero/${id}`, {
            nombres,
            cedula: identificacion,
            telefono,
            usuario: usuarioMen,
            password: passwordMen
        }, { withCredentials: true })
        Swal.fire("", data.msg, "success")
        setEditar(false)
    } catch (error) {
        console.log(error)
    }
  } else {
    if([nombres, identificacion, telefono, usuarioMen, passwordMen].includes('')){
        setAlerta('Todos los campos son obligatorios')
        return
    }
    if(passwordMen.length <= 6){
      setAlerta('Contraseña muy corta')
      return
    }
    setAlerta('')
    try {
        const { data } = await clienteAxios.post('/mensajeros/ingresar-mensajero', {
            nombres,
            cedula: identificacion,
            telefono,
            usuario: usuarioMen,
            password: passwordMen
        }, { withCredentials: true })
        Swal.fire("", data.msg, "success")
      } catch (error) {
        Swal.fire("", error.response?.data?.msg || "Error al guardar", "error");
      }
  }

  
  
  changeModalMensajero()
}

const eliminarMensajero = async () => {
  const respuesta = await Swal.fire({
                      title: '¿Estas seguro de eliminar este mensajero ?',
                      text: '¡Si confirmas la accion no se puede deshacer!',
                      showDenyButton: true,
                      confirmButtonText: 'Si',
                      denyButtonText: `Cancelar`
                  })
  if(respuesta.isConfirmed){
      try {
         const { data } = await clienteAxios.delete(`/mensajeros/eliminar-mensajero/${id}`, { withCredentials: true })
          Swal.fire("", data.msg, "success");
          
      } catch (error) {
          Swal.fire("", "Error al eliminar el cliente", "error");
      }
  }
  
  changeModalMensajero()
  limpiarCampos();
}

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-[#0C8AB7] to-[#2F9CC4] text-white">
            <h2 className="text-lg font-semibold">
                {editar ? "Editar Mensajero" : "Agregar Mensajero"}
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
    

    <form
        className="p-6 space-y-4 bg-[#F8F8F8]"
    >
        <div className="mb-3">
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="nombres"
            >
                Nombre:
            </label>
            <input
                id="nombres"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
                value={nombres}
                onChange={e => setNombres(e.target.value)}
            />
        </div>


        <div className="mb-3">
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="identificacion"
            >
                Cedula:
            </label>
            <input
                id="identificacion"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
                value={identificacion}
                onChange={e => setIdentificacion(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="telefono"
            >
                Teléfono:
            </label>
            <input
                id="telefono"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="identificacion"
            >
                Usuario:
            </label>
            <input
                id="identificacion"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
                value={usuarioMen}
                onChange={e => setUsuarioMen(e.target.value)}
            />
        </div>

        <div className="mb-3">
            <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="identificacion"
            >
                Contraseña:
            </label>
            <input
                id="identificacion"
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0C8AB7]"
                value={passwordMen}
                onChange={e => setPasswordMen(e.target.value)}
            />
        </div>


        {alerta && Object.keys(alerta).length > 0 && (
            <div className="mx-3 mt-2 text-center">
                <p className="text-red-500">{alerta}</p>
            </div>
            )
    
        }

        <div
            className="flex justify-between items-center pt-4"
        >
            <button
                type="button"
                className="bg-[#2291B9] text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-[#2F9CC4] transition"
                onClick={handleSubmitMensajero}
            >
                {`${editar ? 'Guardar Cambios' : 'Agregar Mensajero'}`}
            </button>

            {editar &&
                <button
                    type="button"
                    className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600 transition"
                    onClick={eliminarMensajero}
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
            }
        </div>
        
    </form>
 </div>
</div>
  )
}

export default ModalMensajeros