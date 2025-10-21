const Alerta = ({alerta}) => {
    return (
      <div className={`${alerta.error ? 'from-red-700 to-red-900' : 'from-green-700 to-green-900'} bg-gradient-to-br text-center p-3 uppercase text-white font-bold text-sm my-10`}>
          {alerta.msg}
      </div>
    )
  }
  
  export default Alerta