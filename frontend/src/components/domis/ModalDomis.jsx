import { useState, useEffect } from 'react';
import clienteAxios from '../../config/axios';
import BusquedaCliente from './BusquedaCliente';
import useAdmin from '../../hooks/useAdmin';
import shortid from 'shortid';
import Swal from 'sweetalert2';

const ModalDomis = ({ isOpen, onClose }) => {
  const {
    clienteId, setClienteId,
    nombreCli, setNombreCli,
    empresaCli, setEmpresaCli,
    direccionCli, setDireccionCli,
    telefonoCli, setTelefonoCli,
    editar, setEditar,
    valorDomi, setValorDomi,
    pagoMen, setPagoMen,
    mensajeroSeleccionado, setMensajeroSeleccionado,
    fecha, setFecha,
    nombreEntrega, setNombreEntrega,
    direccion, setDireccion,
    telefono, setTelefono,
    notas, setNotas,
    ruta, setRuta,
    idDomi
  } = useAdmin();

  const [mensajeros, setMensajeros] = useState([]);
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    const cargarMensajeros = async () => {
      if (isOpen) {
        try {
          const { data } = await clienteAxios.get('/mensajeros/listar-mensajeros', { withCredentials: true });
          setMensajeros(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    cargarMensajeros();
  }, [isOpen]);

  useEffect(() => {
    setPagoMen(Number(valorDomi) * 0.7)
  }, [valorDomi])

  const resetForm = () => {
    setClienteId('');
    setMensajeroSeleccionado('');
    setValorDomi(0);
    setPagoMen(0);
    setRuta('');
    setFecha('');
    setNombreEntrega('');
    setDireccion('');
    setTelefono('');
    setNotas('');
    setAlerta('');
    setEditar(false);
  };

  const handleSave = async () => {
    if ([nombreCli, empresaCli, direccionCli, telefonoCli, mensajeroSeleccionado, ruta, fecha, direccion].includes('')) {
      setAlerta('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (valorDomi <= 0 || pagoMen <= 0) {
      setAlerta('Verifica los valores ingresados.');
      return;
    }

    if (Number(pagoMen) > Number(valorDomi)) {
      setAlerta('El pago al mensajero no puede ser mayor al valor del domicilio.');
      return;
    }

    setAlerta('');

    try {
      if (editar) {
        const { data } = await clienteAxios.put(`/domis/actualizar-domi/${idDomi}`, {
          cliente: clienteId, mensajero: mensajeroSeleccionado, valorDomi,
          pagoMensajero: pagoMen, ruta, fecha, nombreEntrega, direccion, telefono, notas
        }, { withCredentials: true });
        Swal.fire(data.msg);
      } else {
        if (clienteId) {
          const { data } = await clienteAxios.post('/domis/ingresar-domi', {
            noDomi: shortid.generate(),
            cliente: clienteId,
            mensajero: mensajeroSeleccionado,
            valorDomi,
            pagoMensajero: pagoMen,
            ruta, fecha, nombreEntrega, direccion, telefono, notas
          }, { withCredentials: true });
          Swal.fire(data.msg);
        } else {
          const { data } = await clienteAxios.post('/domis/ingresar-domi', {
            noDomi: shortid.generate(),
            nombres: nombreCli,
            empresa: empresaCli,
            direccionCli,
            telefonoCli,
            mensajero: mensajeroSeleccionado,
            valorDomi,
            pagoMensajero: pagoMen,
            ruta, fecha, nombreEntrega, direccion, telefono, notas
          }, { withCredentials: true });
          Swal.fire(data.msg);
        }
      }

      onClose();
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 md:p-8 overflow-y-auto max-h-[90vh] border border-gray-100">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editar ? 'Editar Domicilio' : 'Crear Nuevo Domicilio'}
          </h2>
          <button
            className="text-gray-500 hover:text-gray-800 transition"
            onClick={() => { onClose(); resetForm(); }}
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Columna Cliente */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              🧍 Datos del Cliente
            </h3>
            <BusquedaCliente />

            <div className="space-y-3">
              <Input label="Nombre *" value={nombreCli} setValue={setNombreCli} placeholder="Nombre del cliente" />
              <Input label="Empresa *" value={empresaCli} setValue={setEmpresaCli} placeholder="Empresa del cliente" />
              <Input label="Teléfono *" value={telefonoCli} setValue={setTelefonoCli} placeholder="Teléfono del cliente" />
              <Input label="Dirección de Recogida *" value={direccionCli} setValue={setDireccionCli} placeholder="Dirección completa" />
              <div className="flex gap-4">
                <Input label="Valor Domi *" value={valorDomi} setValue={setValorDomi} type="number" />
                <div className='flex flex-col mt-[3px]'>
                  <p className='block text-sm font-medium text-gray-700 mb-1'>Pago Mensajero:</p>
                  <p>{pagoMen}</p>
                </div>
                
                
              </div>
            </div>
          </div>

          {/* Columna Entrega */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
              📦 Datos de Entrega
            </h3>

            <div className="space-y-3">
              <Select
                label="Mensajero *"
                value={mensajeroSeleccionado}
                onChange={setMensajeroSeleccionado}
                options={mensajeros.map(m => ({ value: m._id, label: m.nombres }))}
                placeholder="Seleccione un mensajero"
              />

              <Select
                label="Ruta *"
                value={ruta}
                onChange={setRuta}
                options={[
                  { value: '1', label: 'Mañana' },
                  { value: '2', label: 'Tarde' },
                  { value: '3', label: 'Noche' },
                ]}
                placeholder="Seleccione una ruta"
              />
              

              <Input label="Fecha de entrega *" value={fecha} setValue={setFecha} type="date" />
              <Input label="Quién recibe" value={nombreEntrega} setValue={setNombreEntrega} placeholder="Nombre del receptor" />
              <Input label="Dirección de entrega *" value={direccion} setValue={setDireccion} placeholder="Dirección completa" />
              <Input label="Teléfono" value={telefono} setValue={setTelefono} placeholder="Teléfono del receptor" /> 
              
              <TextArea label="Anotaciones" value={notas} setValue={setNotas} placeholder="Notas especiales o comentarios" />
            </div>
          </div>
        </div>

        {/* Alerta */}
        {alerta && (
          <p className="text-center text-red-500 font-medium mt-5">{alerta}</p>
        )}

        {/* Footer */}
        <div className="flex  gap-4 mt-8 justify-center">
          <button
            className="px-5 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            onClick={() => { onClose(); resetForm(); }}
          >
            Cancelar
          </button>
          <button
            className="px-5 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition shadow-md"
            onClick={handleSave}
          >
            {editar ? 'Actualizar Domi' : 'Crear Domi'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Subcomponentes reutilizables
const Input = ({ label, value, setValue, placeholder, type = 'text' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 outline-none"
    />
  </div>
);

const Select = ({ label, value, onChange, options, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-orange-400 outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const TextArea = ({ label, value, setValue, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-lg p-2 h-20 resize-none focus:ring-2 focus:ring-orange-400 outline-none"
    />
  </div>
);

export default ModalDomis;
