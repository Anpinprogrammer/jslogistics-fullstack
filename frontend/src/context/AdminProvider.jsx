import { useState, useEffect, createContext } from "react"
import clienteAxios from "../config/axios"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"

const AdminContext = createContext()

const AdminProvider = ({children}) => {

    const navigate = useNavigate()
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const [admin, setAdmin] = useState({})
    const [toggle, setToggle] = useState(false)
    const [editar, setEditar] = useState(false);
    const [modalCliente, setModalCliente] = useState(false);
    const [modalMensajero, setModalMensajero] = useState(false);
    const [modalDomi, setModalDomi] = useState(false);
    const [modalDetalleDomi, setModalDetalleDomi] = useState(false);
    const [navbar, setNavbar] = useState(false)
    const [opcFactura, setOpcFactura] = useState(false)
    const [cliente, setCliente] = useState({})
    const [clienteState, setClienteState] = useState({});
    const [idDomi, setIdDomi] = useState('')
    const [clienteId, setClienteId] = useState('');
    const [nombreCli, setNombreCli] = useState('');
    const [empresaCli, setEmpresaCli] = useState('');
    const [direccionCli, setDireccionCli] = useState('');
    const [telefonoCli, setTelefonoCli] = useState('');
    const [valorDomi, setValorDomi] = useState(0)
    const [pagoMen, setPagoMen] = useState(0);
    const [mensajeroSeleccionado, setMensajeroSeleccionado] = useState('');
    const [fecha, setFecha] = useState('')
    const [nombreEntrega, setNombreEntrega] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [notas, setNotas] = useState('')
    const [mensajeroState, setMensajeroState] = useState({});
    const [domiDetalle, setDomiDetalle] = useState({})
    const [ruta, setRuta] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [toggleState, setToggleState] = useState(1);

    const changeToggle = () => {
        setToggle(!toggle)
    }

    const changeNavbar = () => {
        setNavbar(!navbar)
      }
    
      const changeOpcFactura = () => {
        setOpcFactura(!opcFactura)
      }

      const changeModalCliente = () => {
        setModalCliente(!modalCliente)
      }

      const changeModalMensajero = () => {
        setModalMensajero(!modalMensajero)
      }

      const changeModalDomis = () => {
        setModalDomi(!modalDomi)
      }

      const changeModalDetalleDomi = () => {
        setModalDetalleDomi(!modalDetalleDomi)
      }

    //Autenticamos el perfil de quien inicia sesion
    useEffect(() => {
        const autenticarUsuario = async () => {
            try {
                const { data } = await clienteAxios('/admin/ruta-protegida', { withCredentials: true })
                setAuth(data)
            } catch (error) {
                console.log(error)
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    useEffect(() => {
        const obtenerAdmin = async () => {
            try {
                const { data } = await clienteAxios('/admin/ruta-protegida', { withCredentials: true })
                setAdmin(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerAdmin()
    }, [auth])

    const cerrarSesion = async () => {
        const token = Cookies.get('token')
        
        try {
            const { data } = await clienteAxios.post('/admin/logout', { token: token }, { withCredentials: true, })
            Cookies.remove(token, { path: '/' })
            navigate('/')
        } catch (error) {
            console.log(error)
        }
      }

  return (
    <AdminContext.Provider
        value={{
            admin,
            setAdmin,
            cargando,
            setCargando,
            auth, 
            setAuth,
            navbar,
            setNavbar,
            toggle,
            setToggle, 
            changeToggle,
            changeNavbar,
            changeOpcFactura,
            opcFactura,
            setOpcFactura, 
            changeModalCliente,
            modalCliente,
            setModalCliente,
            changeModalMensajero,
            modalMensajero,
            setModalMensajero,
            modalDomi,
            setModalDomi,
            changeModalDomis,
            setModalDetalleDomi,
            modalDetalleDomi,
            changeModalDetalleDomi,
            editar,
            setEditar,
            clienteState,
            setClienteState,
            cliente,
            setCliente,
            mensajeroState,
            setMensajeroState,
            domiDetalle,
            setDomiDetalle,
            cerrarSesion,
            clienteId,
            setClienteId,
            nombreCli,
            setNombreCli,
            empresaCli,
            setEmpresaCli,
            direccionCli,
            setDireccionCli,
            telefonoCli, 
            setTelefonoCli,
            modalOpen,
            setModalOpen,
            valorDomi,
            setValorDomi,
            pagoMen,
            setPagoMen,
            mensajeroSeleccionado,
            setMensajeroSeleccionado,
            fecha,
            setFecha,
            nombreEntrega,
            setNombreEntrega,
            direccion,
            setDireccion,
            telefono,
            setTelefono,
            notas,
            setNotas,
            ruta,
            setRuta,
            idDomi,
            setIdDomi,
            toggleState,
            setToggleState
        }}
    >
        {children}
    </AdminContext.Provider>
  )
}

export {
    AdminProvider
}

export default AdminContext