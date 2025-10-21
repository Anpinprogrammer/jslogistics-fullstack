import { useState, useEffect } from "react"
import useAdmin from "../../hooks/useAdmin"
import clienteAxios from "../../config/axios"


const BusquedaCliente = () => {
    const {setNombreCli, setEmpresaCli, setDireccionCli, setTelefonoCli, setClienteId } = useAdmin()
    const [busqueda, setBusqueda] = useState('')
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        const cargarClientes = async () => {
                try {
                    const { data } = await clienteAxios.get('/clientes/listar-clientes', { withCredentials: true })
                    setClientes(data)
                } catch (error) {
                    console.log(error)
                }
        }

        cargarClientes()
    }, [])

    const clientesFiltrados = busqueda === ''
        ? []
        : clientes.filter(cliente => cliente.empresa.toLowerCase().includes(busqueda.toLowerCase()))

    const handleCliente = async (id) => {
        try {
            const { data } = await clienteAxios(`/clientes/listar-cliente/${id}`, { withCredentials: true })
            const { _id, nombres, empresa, telefono, direccion } = data
            setClienteId(_id)
            setNombreCli(nombres)
            setEmpresaCli(empresa)
            setTelefonoCli(telefono)
            setDireccionCli(direccion)
            setBusqueda('')
            
        } catch (error) {
            console.log(error)
        }
    }


  return (
        <div
            className="relative flex items-center rounded-md bg-white shadow shadow-gray-200 mt-5"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-5 text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>

            <input
                type="text"
                className="pl-2 pr-6 py-2 outline-none text-gray-800 placeholder-gray-400 w-full md:w-96 rounded-md"
                placeholder="Nombre Empresa"
                onChange={e => setBusqueda(e.target.value)}
                value={busqueda}
            />
            {/* Desplegar resultados debajo de la barra de búsqueda */}
        {clientes.length > 0 && (
            <ul className={`absolute top-[100%] left-0 right-0 bg-white z-10 overflow-auto max-h-[200px]`}>
                {busqueda !== '' && clientesFiltrados.length <= 0 ? (
                    <li className="p-[10px] cursor-pointer hover:bg-gray-300 flex gap-1">
                        No Hay Resultados
                    </li>
                ) : (
                    clientesFiltrados.map((cliente, index) => (
                        <li key={index} className="p-[10px] cursor-pointer hover:bg-gray-300" onClick={() => handleCliente(cliente._id)}>
                      {cliente.empresa} {/* Asume que cada resultado tiene una propiedad 'empresa' */}
                        </li>
                  ))
            )}
          
        </ul>
      )}
      
    </div>
    
  )
}

export default BusquedaCliente