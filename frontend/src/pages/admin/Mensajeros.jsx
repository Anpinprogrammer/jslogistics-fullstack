import { useState } from 'react';
import Modal from 'react-modal'
import ModalMensajeros from '../../components/mensajeros/ModalMensajeros';
import Mensajero from '../../components/mensajeros/Mensajero';
import styles from '../../styles/sppiner.module.css'
import clienteAxios from '../../config/axios';
import useAdmin from '../../hooks/useAdmin';
import useSWR from 'swr'

/*
const customStyles = {
    overlay: {
        backgroundColor: 'rgba(6, 6, 6, 0.45)',
        height: '100vh',
        width: '100vw'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '0',
        maxWidth: '90%',
        maxHeight: '90%',
        overflow: 'hidden',
        overflow: 'auto',
    },
};*/

 const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(4px)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "relative",
    inset: "unset", // ❗ evita que react-modal fuerce los top/bottom automáticos
    borderRadius: "1rem",
    width: "90%",
    maxWidth: "350px",
    maxHeight: "90vh", // 👈 usa el 90% de la altura de la ventana
    overflowY: "auto", // 👈 activa scroll si hay mucho contenido
    backgroundColor: "white",
    padding: "2rem",
    border: "none",
    boxShadow: "0 0 25px rgba(0,0,0,0.2)",
  },
};

Modal.setAppElement('#root');

const Mensajeros = () => {

  const [busqueda, setBusqueda] = useState('')

  const { modalMensajero, changeModalMensajero } = useAdmin()

  const fetcher = () => clienteAxios(`/mensajeros/listar-mensajeros`, { withCredentials: true }).then(datos => datos.data)
    const { data, error, isLoading } = useSWR(`/mensajeros/listar-mensajeros`, fetcher, { refreshInterval: 100 })

    const mensajeroFiltrado = busqueda === ''
        ? data
        : data.filter(mensajero => mensajero.cedula.includes(busqueda))

  return (
    <div className="min-h-screen bg-gray-50 p-6 rounded-xl">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div
                            className="relative flex items-center w-full md:w-96"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-3 w-5 h-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.6}
                                stroke="currentColor"
                            >
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 105.2 5.2a7.5 7.5 0 0011.45 11.45z"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Buscar por identificación..."
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2291B9]       focus:border-[#2291B9]text-gray-700 placeholder-gray-400 shadow-sm transition-all"
                            />
                        </div>
                        <button
                            onClick={changeModalMensajero}
                            className="flex items-center justify-center gap-2 bg-[#2291B9] hover:bg-[#2FA5CF] text-white px-5 py-2.5 rounded-lg shadow-md transition-all"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Agregar Mensajero</span>
                        </button>
                    </div>

                    {
                        data && data.length ?
                            <div className='mt-8 overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100'>
                                <table
                                    className={`min-w-full text-sm text-gray-700 ${isLoading ? 'hidden' : 'table'}`}
                                >
                                    <thead className="bg-indigo-50 text-gray-600 uppercase text-xs tracking-wider sticky top-0" >
                                        <tr>
                                            <th className="py-3 px-6 text-left">Nombre</th>
                                            <th className="py-3 px-6 text-left">Cedula</th>
                                            <th className="py-3 px-6 text-left">Telefono</th>
                                            <th className="py-3 px-6 text-left">Usuario</th>
                                            <th className="py-3 px-6 text-left"></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            mensajeroFiltrado.map(messanger =>
                                                <Mensajero
                                                    key={messanger._id}
                                                    messanger={messanger}
                                                />
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <p className='text-center text-xl mt-10 uppercase'>Sin Clientes</p>
                    }

                    <div className={`${styles.skchase} ${isLoading ? 'block' : 'hidden'} my-16 m-auto`}>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                        <div className={`${styles.skchasedot}`}></div>
                    </div>

                    <Modal
                        isOpen={modalMensajero}
                        style={customStyles}
                        onRequestClose={changeModalMensajero}
                        ariaHideApp={false}
                    >
                        <ModalMensajeros />
                    </Modal> 
                    
                </div>
  )
}

export default Mensajeros