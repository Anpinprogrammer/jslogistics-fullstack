import { useState, useEffect } from 'react';
import useAdmin from '../../hooks/useAdmin';
import clienteAxios from '../../config/axios';
import {
    FileText,
    Package,
    Bike,
    CheckCircle,
    XCircle
  } from 'lucide-react';

import { formatearEnPesosColombianos, formatearFecha } from '../../data';
import ModalConfirmacionPago from './ModalConfirmacionPago';

const estados = [
    'pendiente por recoger',
    'en ruta',
    'entregado',
    'rechazado'
]

const pasos = [
    { estado: 'pendiente por recoger', icono: FileText, color: 'text-yellow-400 scale-110' },
    { estado: 'en bodega', icono: Package, color: 'text-orange-400 scale-110' },
    { estado: 'en ruta', icono: Bike, color: 'text-blue-400 scale-110' },
    { estado: 'entregado', icono: CheckCircle, color: 'text-green-400 scale-110' },
    { estado: 'rechazado', icono: XCircle, color: 'text-red-400 scale-110' }
    ];

const DetalleDomi = () => {

  const {domiDetalle} = useAdmin()

  const { _id, cliente, direccion, fecha, mensajero, nombreEntrega, notas, valorDomi, telefono, ruta } = domiDetalle

  const [domicilio, setDomicilio] = useState(domiDetalle)
  const [modalPago, setModalPago] = useState({})
  
  const progreso = () => {
        let index
        if(domicilio.estado === 'entregado' || domicilio.estado === 'rechazado'){
            return index = 100
        } else {
            index = pasos.findIndex(p => p.estado === domicilio.estado);
            return index >= 0 ? ((index + 1) / pasos.length) * 100 : 0;
        }
        
    
  };

  const esperarConfirmacionPago = () => {
  return new Promise((resolve, reject) => {
    setModalPago({
      abierto: true,
      onConfirmar: () => {
        setModalPago({ abierto: false }); 
        resolve(true);
      },
      onCancelar: () => {
        setModalPago({ abierto: false });
        reject(new Error("Pago cancelado"));
      }
    });
  });
};


  const cambiarEstado = async (nuevoEstado) => {
    if (nuevoEstado === 'entregado') {
    try {
      await esperarConfirmacionPago();  // 👈 Aquí se pausa hasta confirmar
    } catch (e) {
      console.log("El pago fue cancelado:", e.message);
      return; // No sigue con la actualización
    }
  }
    setDomicilio({ ...domicilio, estado: nuevoEstado });
    try {
        const {data} = await clienteAxios.put(`/domis/actualizar-estado-domi/${_id}`, {
            estado: nuevoEstado
        }, {withCredentials: true})
    } catch (error) {
        console.log(error)
    }
  };

  const colorBarra = () => {
    switch (domicilio.estado) {
      case 'pendiente por recoger':
        return 'bg-yellow-400';
      case 'en bodega':
        return 'bg-orange-500'
      case 'en ruta':
        return 'bg-blue-500';
      case 'entregado':
        return 'bg-green-500';
      case 'rechazado':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };
  

  /*

  const progreso = () => {
    const index = estados.indexOf(domicilio.estado);
    return index >= 0 ? ((index + 1) / estados.length) * 100 : 0;
  };
  
  
  */

  return (
    <>
    <div className="bg-gray-200 p-4 shadow space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/** Columna 1 Datos del cliente */}
        <div>
            <p><strong>Cliente:{' '}</strong>{cliente.nombres}</p>
            <p><strong>Empresa:{' '}</strong>{cliente.empresa}</p>
            <p><strong>Dirección:{' '}</strong>{cliente.direccion}</p>
            <p><strong>Teléfono:{' '}</strong>{cliente.telefono}</p>
        </div>

        {/** Columna 2 Datos del Mensajero*/}
        <div>
            <p><strong>Mensajero:{' '}</strong>{mensajero.nombres} </p>
            <p><strong>Ruta:{' '}</strong>{ruta}</p>
            <p><strong>Fecha:{' '}</strong>{formatearFecha(fecha)}</p>
            <p><strong>Valor:{' '}</strong>{formatearEnPesosColombianos(valorDomi)}</p>
        </div>

        {/** Columna 3 Datos Direccion Entrega */}
        <div>
            <p><strong>Recibe:{' '}</strong>{nombreEntrega}</p>
            <p><strong>Direccion:{' '}</strong>{direccion}</p>
            <p><strong>Telefono:{' '}</strong>{telefono}</p>
            <p><strong>Notas:{' '}</strong>{notas}</p>
        </div>
      </div>

      {/* Barra con íconos */}
      <div className="relative mt-6">
        <div className="flex justify-between mb-2">
          {pasos.map((paso, idx) => {
            const Icono = paso.icono;
            const activo = domicilio.estado === paso.estado;

            return (
              <button
                key={idx}
                onClick={() => cambiarEstado(paso.estado)}
                className="flex flex-col items-center text-center w-full focus:outline-none"
              >
                <Icono
                  className={`w-6 h-6 mb-1 transition-colors ${
                    activo ? `${paso.color}` : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs ${
                    activo ? `${paso.color}` : 'text-gray-500'
                  }`}
                >
                  {paso.estado}
                </span>
              </button>
            );
          })}
        </div>

        {/* Barra de progreso visual */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${colorBarra()} bg-blue-500 transition-all duration-500`}
            style={{ width: `${progreso()}%` }}
          ></div>
        </div>

        {/**Boton para confirmar pago */}
        {domicilio.estado === 'entregado' && (
            <div className='mt-4 text-center'>
              <button
                onClick={() => setModalPago({
        abierto: true,
        onConfirmar: () => {
          console.log("Pago confirmado ✅");
          setModalPago({ abierto: false });
          // aquí puedes continuar con cambiarEstado o actualizar backend
        },
        onCancelar: () => {
          console.log("Pago cancelado ❌");
          setModalPago({ abierto: false });
        }
      })}
                className="px-3 py-1 bg-gray-500 text-white rounded-lg cursor-pointer"
              >
                Confirmar pago
              </button>
            </div>
        )}
      </div>
    </div>
    {modalPago.abierto && (
      <ModalConfirmacionPago
      onConfirmar={modalPago.onConfirmar}
      onCancelar={modalPago.onCancelar}
      id={_id}
    />
    )}
    
    </>
  );
};

export default DetalleDomi;
