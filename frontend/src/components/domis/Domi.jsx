import { useState, useEffect } from 'react'
import clienteAxios from '../../config/axios'
import useAdmin from '../../hooks/useAdmin'
import { IoMdEye } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { HiTrash } from "react-icons/hi2";
import Swal from 'sweetalert2';
import { formatearFecha } from '../../data';


const rutas = {
    1: 'mañana',
    2: 'tarde',
    3: 'noche'
}



const Domi = ({ domi, onVerMas }) => {
    const {noDomi, cliente, mensajero, estado } = domi
    const {setClienteId, setIdDomi, setModalOpen, setDomiDetalle, setEditar, setNombreCli, setEmpresaCli, setDireccionCli, setTelefonoCli, setValorDomi, setPagoMen, setMensajeroSeleccionado, setFecha, setNombreEntrega, setNotas, setDireccion, setTelefono, setRuta} = useAdmin()
    const [client, setClient] = useState({})
    const [mensaj, setMensaj] = useState({})

    useEffect(() => {
        const buscarCliente = async () => {
            try {
                const {data} = await clienteAxios.get(`/clientes/listar-cliente/${cliente}`, { withCredentials: true })
                setClient(data)
            } catch (error) {
                console.log(error)
            }
        }

        buscarCliente()
    }, [])

    useEffect(() => {
        const buscarMensajero = async () => {
            try {
                const {data} = await clienteAxios.get(`/mensajeros/listar-mensajero/${mensajero}`, { withCredentials: true })
                setMensaj(data)
            } catch (error) {
                console.log(error)
            }
        }

        buscarMensajero()
    }, [])

    const mostrarDetalleDomi = () => {
        setDomiDetalle({
            ...domi,
            cliente: client,
            mensajero: mensaj
        })
        onVerMas()

    }

    const editarDomi = () => {
        setEditar(true)
        setModalOpen(true)
        setIdDomi(domi._id)
        setClienteId(client._id)
        setNombreCli(client.nombres)
        setEmpresaCli(client.empresa)
        setDireccionCli(client.direccion)
        setTelefonoCli(client.telefono)
        setValorDomi(domi.valorDomi)
        setPagoMen(domi.pagoMensajero)
        setMensajeroSeleccionado(mensaj._id)
        setFecha(formatearFecha(domi.fecha))
        console.log(formatearFecha(domi.fecha))
        setNombreEntrega(domi.nombreEntrega)
        setTelefono(domi.telefono)
        setNotas(domi.notas)
        setDireccion(domi.direccion)
        setRuta(Object.keys(rutas).find(key => rutas[key] === domi.ruta))
    }

    const eliminarDomi = async () => {
        const respuesta = await Swal.fire({
                              title: '¿Estas seguro de eliminar este Domi ?',
                              text: '¡Si confirmas la accion no se puede deshacer!',
                              showDenyButton: true,
                              confirmButtonText: 'Si',
                              denyButtonText: `Cancelar`
                          })
    
        if(respuesta.isConfirmed){
            try {
                const {data} = await clienteAxios.delete(`/domis/eliminar-domi/${domi._id}`, {withCredentials: true})
                Swal.fire(data.msg)
            } catch (error) {
                console.log(error)
            }
        }

        
        
    }

  return (
    <tr className="even:bg-[#F8F8F8] border-b last-of-type:border-none">
    <td className="text-start p-2 lg:px-7 lg:py-5">{noDomi}</td>
    <td className="text-start p-2 lg:px-7 lg:py-5">{client.empresa}</td>
    <td className="text-start p-2 lg:px-7 lg:py-5">{mensaj.nombres} </td>
    <td className="text-start p-2 lg:px-7 lg:py-5">{estado}</td>
    <td className="text-start p-2 lg:px-7 lg:py-5">
        <div className='flex gap-1'>
            <IoMdEye 
                className='h-6 w-6'
                onClick={mostrarDetalleDomi}
            />
            {estado !== 'entregado' && (
            <>    
            <CiEdit
                className='h-6 w-6'
                onClick={editarDomi}
            />
        
            
                <HiTrash
                className='h-6 w-6'
                onClick={eliminarDomi}
            />
            </>
            )}
        </div>
        
    </td>
</tr>
  )
}

export default Domi