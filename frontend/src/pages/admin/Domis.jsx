import { useState } from 'react';
import Modal from 'react-modal';
import ModalDomis from '../../components/domis/ModalDomis';
import styles from '../../styles/sppiner.module.css';
import clienteAxios from '../../config/axios';
import useAdmin from '../../hooks/useAdmin';
import useSWR from 'swr';
import DomisTab from '../../components/domis/DomisTab';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 50,
  },
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: '0',
    maxWidth: '90%',
    maxHeight: '90%',
    borderRadius: '1rem',
    overflow: 'auto',
  },
};

Modal.setAppElement('#root');

const Domis = () => {
  const [busqueda, setBusqueda] = useState('');
  const { modalOpen, setModalOpen, setNombreCli, setEmpresaCli, setDireccionCli, setTelefonoCli, toggleState, setToggleState } = useAdmin();

  const fetcher = () => clienteAxios('/domis/listar-domis', { withCredentials: true }).then(res => res.data);
  const { data, error, isLoading } = useSWR('/domis/listar-domis', fetcher, { refreshInterval: 100 });

  const toggleTab = (index) => setToggleState(index);

  return (
    <div className="p-6 text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/2 bg-white rounded-xl shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-[#2291B9] transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 ml-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Buscar por código de domicilio..."
            className="w-full py-3 px-4 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Create button */}
        <button
          className="flex items-center justify-center gap-2 bg-[#2291B9] hover:bg-[#2FA5CF] text-white font-medium rounded-xl px-5 py-3 shadow-sm transition-all"
          onClick={() => setModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Crear Domi
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 text-sm font-semibold uppercase">
        <button
          className={`flex-1 text-center py-3 rounded-t-xl transition-all ${
            toggleState === 1 ? 'bg-orange-500 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => toggleTab(1)}
        >
          Pendientes
        </button>
        <button
          className={`flex-1 text-center py-3 rounded-t-xl transition-all ${
            toggleState === 2 ? 'bg-green-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => toggleTab(2)}
        >
          Completados
        </button>
        <button
          className={`flex-1 text-center py-3 rounded-t-xl transition-all ${
            toggleState === 3 ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => toggleTab(3)}
        >
          Rechazados
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-b-xl mt-0 border border-gray-200">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <div className={`${styles.skchase}`}>
              <div className={styles.skchasedot}></div>
              <div className={styles.skchasedot}></div>
              <div className={styles.skchasedot}></div>
              <div className={styles.skchasedot}></div>
              <div className={styles.skchasedot}></div>
              <div className={styles.skchasedot}></div>
            </div>
          </div>
        ) : data && data.length ? (
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F7F9FB] border-b border-gray-200 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 font-semibold">Código</th>
                <th className="p-4 font-semibold">Cliente</th>
                <th className="p-4 font-semibold">Mensajero</th>
                <th className="p-4 font-semibold">Estado</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              <DomisTab data={data} toggleState={toggleState} />
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-12 text-sm">No hay domicilios registrados.</div>
        )}
      </div>

      {/* Modal */}
      <ModalDomis
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setNombreCli('');
          setEmpresaCli('');
          setDireccionCli('');
          setTelefonoCli('');
        }}
      />
    </div>
  );
};

export default Domis;
