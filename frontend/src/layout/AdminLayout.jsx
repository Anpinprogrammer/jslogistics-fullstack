import { Outlet, Navigate } from "react-router-dom"
import useAdmin from "../hooks/useAdmin"
import styles from '../styles/navBar.module.css'
import Header from "../components/Header"
import Nav from "../components/Nav"

const AdminLayout = () => {

  const { auth, cargando } = useAdmin()
  
  if(cargando) return 'Cargando...'

  return (
    <>
      {auth?._id ? (
        <div className="flex">

          <Nav />

        
          <div className="flex flex-col w-full h-screen">
            <Header/>
            <main className={`bg-[#f5f7f8] w-full h-full px-5 py-3 lg:px-16 lg:py-7 overflow-auto text-gray-800 ${styles.scroll}`}>
              <Outlet />
            </main>
          </div>
        </div>
          
      ) : <Navigate to="/" />

      }
    </>
  )
}

export default AdminLayout