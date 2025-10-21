import { Link, useLocation } from "react-router-dom"
import styles from '../styles/navBar.module.css'
import useAdmin from "../hooks/useAdmin"
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";
import { MdMenuOpen } from "react-icons/md";
import { LuBike } from "react-icons/lu";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";



const Nav = ({ children }) => {

    const { changeNavbar, navbar, changeOpcFactura, opcFactura, toggle, cerrarSesion  } = useAdmin()
    const location = useLocation()

  return (
    <nav
            className={`${toggle ? 'right-[calc(100%-145px)]' : ''} fixed right-[100%] xl:relative xl:right-0 text-white bg-[#232A2F] h-screen xl:flex xl:flex-col main-navbar transition-width duration-300 overflow-hidden overflow-y-auto ${styles.scroll} ${navbar ? 'w-[145px]' : 'w-72'} z-20`}
        >
            <p
                className={`hidden xl:flex items-center py-4 px-7 bg-[#1b2227] font-bold border-b border-black ${navbar ? 'justify-center' : 'justify-between'}`}
            >
                {!navbar && <span className="block text-[#3EA8CE]">JS LOGISTICS</span>}

                <button
                    className="hover:bg-[#3EA8CE] p-2 rounded-full transition-colors"
                    onClick={changeNavbar}
                >
                    <div><MdMenuOpen className={`duration-500 cursor-pointer  h-6 w-6 ${!navbar && 'rotate-180'}`} /></div>
                </button>
            </p>

            <div className="h-full flex flex-col justify-between">
                <ul className="p-5">
                    <li>
                        <Link
                            to="/admin"
                            className={`${location.pathname === '/admin' && 'bg-[#404446]'} flex hover:bg-[#404446] rounded-md py-3 px-2 transition-colors ${navbar ? 'text-[12px] flex-col items-center gap-1' : 'gap-4'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Inicio
                        </Link>
                    </li>
                    
                    <li>
                        <Link
                            to="/admin/cuadres"
                            className={`${location.pathname === '/admin/cuadres' && 'bg-[#404446]'} flex hover:bg-[#404446] rounded-md py-3 px-2 transition-colors ${navbar ? 'text-[12px] flex-col items-center gap-1' : 'gap-4'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                            </svg>
                            Cuadres
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/admin/domis"
                            className={`${location.pathname === '/admin/domis' && 'bg-[#404446]'} flex hover:bg-[#404446] rounded-md py-3 px-2 transition-colors ${navbar ? 'text-[12px] flex-col items-center gap-1 text-white' : 'gap-4'}`}
                        >
                            <MdOutlineDeliveryDining className="h-6 w-6 text-white" />
                            Domis
                        </Link>
                        
                    </li>
                    <li>
                        <Link
                            to="/admin/mensajeros"
                            className={`${location.pathname === '/admin/mensajeros'&& 'bg-[#404446]'} flex hover:bg-[#404446] rounded-md py-3 px-2 transition-colors ${navbar ? 'text-[12px] flex-col items-center gap-1' : 'gap-4'}`}
                        >
                            <LuBike className="h-6 w-6 text-white" />
                            Mensajeros
                            
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/clientes"
                            className={`${location.pathname === '/admin/clientes' && 'bg-[#404446]'} flex hover:bg-[#404446] rounded-md py-3 px-2 transition-colors ${navbar ? 'text-[12px] flex-col items-center gap-1' : 'gap-4'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            Clientes
                        </Link>
                    </li>
                </ul>

                <ul className="p-5">
                    <li>
                        <Link
                            to="/"
                            className={`flex hover:bg-[#404446] rounded-md py-3 px-2 transition-colors enlace ${navbar ? 'text-[12px] flex-col items-center gap-1' : 'gap-4'}`}
                            onClick={cerrarSesion}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                            </svg>
                            Salir
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
  )
}

export default Nav