import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clienteAxios from "../config/axios";
import useAdmin from "../hooks/useAdmin";

const Login = () => {
  const { setAuth } = useAdmin();

  const [state, setState] = useState("Admin");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([usuario, password].includes("")) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/admin/login",
        { usuario, password },
        { withCredentials: true }
      );
      setAuth(data);
      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* COLUMNA IZQUIERDA: Imagen o texto */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-blue-700 to-sky-500 text-white p-10 relative rounded-r-[4rem] shadow-lg">
        {/* Puedes reemplazar este bloque de texto con una imagen */}
        <h1 className="text-5xl font-bold leading-tight mb-4">
          Bienvenido a <br /> JS Logistics
        </h1>
        <p className="text-lg text-blue-100 max-w-md text-center">
          Simplifica tu gestión de envíos con nuestra plataforma inteligente.  
          Inicia sesión para acceder a tus herramientas administrativas.
        </p>
        <div className="absolute bottom-8 text-sm text-blue-200">
          © {new Date().getFullYear()} JS Logistics
        </div>
      </div>

      {/* COLUMNA DERECHA: Formulario */}
      <div className="flex justify-center items-center w-full lg:w-1/2 p-8 bg-white shadow-2xl lg:rounded-l-[4rem]">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
            Iniciar Sesión {state === "Admin" ? "como Admin" : "como Mensajero"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="usuario"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Usuario
              </label>
              <input
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                placeholder="Tu usuario"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
              >
                Entrar
              </button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm text-gray-600">
            {state === "Admin" ? (
              <p>
                ¿Eres mensajero?{" "}
                <span
                  onClick={() => setState("Mensajero")}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Accede aquí
                </span>
              </p>
            ) : (
              <p>
                ¿Eres administrador?{" "}
                <span
                  onClick={() => setState("Admin")}
                  className="text-blue-600 font-semibold hover:underline cursor-pointer"
                >
                  Accede aquí
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
