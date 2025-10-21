import { useState } from "react"
import { useLocation } from "react-router-dom"
import { modificarTituloCategoria } from '../helpers'
import useAdmin from "../hooks/useAdmin"

const Header = () => {

    const { changeToggle, setNavbar, admin } = useAdmin()
    const location = useLocation()
    

   


  return (
    <header
            className="w-full bg-white text-gray-800 px-7 md:px-16 py-[22px] xl:flex justify-between border-b border-gray-300"
        >

            <div className="flex justify-between items-center">
                <p className="font-bold text-xl">
                    {modificarTituloCategoria(location.pathname) === 'CATEGORIAS' ? 'CATEGORÍAS' : modificarTituloCategoria(location.pathname)}
                </p>

                <button
                    type="button"
                    className="block xl:hidden p-2"
                    onClick={() => {
                        changeToggle()
                        setNavbar(true)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>
            </div>

            <p className="text-xl">Hola {admin?.nombre}</p>

        </header>
  )
}

export default Header