export const formatearFecha = (fecha) => {
  if (!fecha) return '';
  return new Date(fecha).toISOString().split('T')[0];
};



export function formatearEnPesosColombianos(valor) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, // Para evitar decimales innecesarios
      maximumFractionDigits: 2, // Para mostrar hasta dos decimales si es necesario
    }).format(valor);
}