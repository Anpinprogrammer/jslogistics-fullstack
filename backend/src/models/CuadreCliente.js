import mongoose from 'mongoose';

const CuadreClienteSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  totalDomis: {
    type: Number,
    default: 0
  },
  totalValor: {
    type: Number,
    default: 0
  },
  ultimaActualizacion: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('CuadreCliente', CuadreClienteSchema);
