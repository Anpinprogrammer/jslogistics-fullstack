import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Layouts
import PublicLayout from './layout/PublicLayout';
import AdminLayout from './layout/AdminLayout';

//Paginas Globales
import Login from './pages/Login';

//Paginas Admin
import Home from './pages/admin/Home';
import Dashboard from './pages/admin/HomeGemini';
import Clientes from './pages/admin/Clientes';
import Mensajeros from './pages/admin/Mensajeros';
import Cuadres from './pages/admin/Cuadres';
import Domis from './pages/admin/Domis';

//Providers
import { AdminProvider } from './context/AdminProvider';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AdminProvider>
          <Routes>
            {/**Ruta Publica */}
            <Route path='/' element={<PublicLayout />} >
              <Route index element={<Login />} />
            </Route>
            {/**Ruta Admin */}
            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<Dashboard />} />
              <Route path='clientes' element={<Clientes />} />
              <Route path='mensajeros' element={<Mensajeros />} />
              <Route path='cuadres' element={<Cuadres />} />
              <Route path='domis' element={<Domis />} />
            </Route>
          </Routes>
        </AdminProvider>
      </BrowserRouter>
    </>
  )
}

export default App
