import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { FaCamera, FaPlus } from "react-icons/fa";
import { formatearEnPesosColombianos } from "../../data";
import Swal from "sweetalert2";

const ModalConfirmacionPago = ({ onConfirmar, onCancelar, id }) => {

    console.log(id)
    const [valorDomi, setValorDomi] = useState(0)
    const [mensajero, setMensajero] = useState('')
    const [cliente, setCliente] = useState('')
    const [pendiente, setPendiente] = useState(valorDomi)
    const [recibidoPor, setRecibidoPor] = useState('')
    const [valorRecibido, setValorRecibido] = useState(0)
    const [comprobante, setComprobante] = useState(null)
    const [alerta, setAlerta] = useState('')

    useEffect(() => {
        const buscar = async () => {
            const {data} = await clienteAxios( `/domis/buscar-domi/${id}` , {withCredentials: true})
            setValorDomi(data.valor)
            setMensajero(data.mensajero)
            setCliente(data.cliente)
        }
        buscar()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if([recibidoPor, valorRecibido].includes('')){
          setAlerta('ingrese quien recibe el pago y el valor recibido')
          return
        }

        try {
          console.log(recibidoPor)
          const { data } = await clienteAxios.post('/cuadre/ingresar', {
          id,
          recibidoPor,
          valor: valorRecibido,
          evidencia: comprobante
          }, { withCredentials: true })
          Swal.fire(data.msg)
        } catch (error) {
          console.log(error)
        }

        
        console.log('Enviando informacion...')
        console.log(recibidoPor)
        console.log(valorRecibido)
        console.log(comprobante)
        onConfirmar()
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-2xl shadow-lg w-auto p-6">
        <div className='flex flex-col text-center mb-4'>
            <h2 className="text-xl font-bold text-center">CONFIRMAR PAGO</h2>
            <p>Valor Domi: <span className='font-bold'>{formatearEnPesosColombianos(valorDomi)}</span> </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='flex flex-row gap-3'>
            <div>
                <label className="block text-sm font-medium">Recibido por:</label>
                <select
                    name="recibidoPor"
                    className="w-full p-2 border rounded-lg"
                    onChange={e => setRecibidoPor(e.target.value)}
                    value={recibidoPor}
                    required
                >
                    <option value="" disabled>Seleccione</option>
                    <option value="Mensajero">{mensajero}</option>
                    <option value="Cliente">{cliente}</option>
                    <option value="JS Logistics">JS Logistics</option>
                </select>
            </div>
            {/* Input number */}
            <div>
                <label className="block text-sm font-medium">Valor recibido:</label>
                <input
                    type="number"
                    name="valor"
                    className="w-full p-2 border rounded-lg"
                    onChange={e => setValorRecibido(e.target.value)}
                    value={valorRecibido}
                    required
                />
            </div>
            {/* Botón cámara */}
            <div className="flex items-center pt-4">
                <label
                    htmlFor="evidencia"
                    className="cursor-pointer flex flex-col items-center"
                >
                    <FaCamera className="w-8 h-8" />
                </label>
                <input
                    id="evidencia"
                    type="file"
                    name="evidencia"
                    accept="image/*"
                    className="hidden"
                    onChange={e => setComprobante(e.target.files[0])}
                />
            </div>

          </div>
          {alerta && Object.keys(alerta).length > 0 && (
                    <div className="mx-3 mt-2 text-center">
                    <p className="text-red-500">{alerta}</p>
                </div>
                    )
            
                }
          <div className="flex gap-2 justify-center">
            <button
              type="button"
              onClick={() => onCancelar()}
              className="px-3 py-2 bg-gray-300 rounded-lg cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleSubmit}
            >
              Completado
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalConfirmacionPago