import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import clienteAxios from "../../config/axios";

// Dashboard completo en React (JavaScript) + Tailwind CSS
// -------------------------------------------------------
// Cómo usar:
// 1) Copia este archivo como `DashboardApp.jsx` dentro de tu src/
// 2) Asegúrate de tener Tailwind configurado en tu proyecto
// 3) Instala dependencias opcionales: `npm i recharts framer-motion`
// 4) En los lugares marcados con TODO: conecta tus llamadas a la API

// -----------------------------
// Mock data (puedes reemplazarlo con tu API)
// -----------------------------
const mockStats = {
  totalToday: 324,
  delivered: 310,
  delayed: 14,
  revenue: 3250000,
};

const mockArea = [
  { day: "Mon", envios: 120 },
  { day: "Tue", envios: 200 },
  { day: "Wed", envios: 150 },
  { day: "Thu", envios: 220 },
  { day: "Fri", envios: 300 },
  { day: "Sat", envios: 180 },
  { day: "Sun", envios: 95 },
];

const mockBar = [
  { name: "Juan", completed: 42 },
  { name: "María", completed: 36 },
  { name: "Carlos", completed: 28 },
  { name: "Luisa", completed: 22 },
  { name: "Andrés", completed: 18 },
];

const mockTable = [
  {
    id: "E-1023",
    client: "Empresa X",
    address: "Cll 45 #12-34",
    courier: "Juan",
    status: "En ruta",
    date: "2025-10-16 09:34",
    value: 12000,
  },
  {
    id: "E-1022",
    client: "Andrea G",
    address: "Cll 10 #2-45",
    courier: "María",
    status: "Entregado",
    date: "2025-10-16 08:10",
    value: 8500,
  },
  {
    id: "E-1021",
    client: "Tienda Y",
    address: "Av 7 #99-11",
    courier: "Carlos",
    status: "Retrasado",
    date: "2025-10-15 18:20",
    value: 22000,
  },
];

// -----------------------------
// Componentes
// -----------------------------
function Sidebar({ compact }) {
  return (
    <aside className={`h-full p-4 ${compact ? "w-20" : "w-64"} bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100`}>
      <div className="mb-6 flex items-center gap-3">
        <div className={`h-10 w-10 rounded-md bg-white/10 flex items-center justify-center text-xl font-bold`}>🚚</div>
        {!compact && (
          <div>
            <div className="text-lg font-semibold">EnviosCo</div>
            <div className="text-sm text-slate-400">Panel operativo</div>
          </div>
        )}
      </div>

      <nav className="flex flex-col gap-2">
        {[
          ["Dashboard", "🏠"],
          ["Envíos", "📦"],
          ["Mensajeros", "🧑‍✈️"],
          ["Finanzas", "💳"],
          ["Ajustes", "⚙️"],
        ].map(([label, icon]) => (
          <a key={label} className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/5 transition">
            <div className="text-lg">{icon}</div>
            {!compact && <span className="text-sm text-slate-100">{label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Navbar({ onToggleDark, dark }) {
  return (
    <header className="flex items-center justify-between gap-4 p-4 bg-transparent">
      <div className="flex items-center gap-4">
        <input
          placeholder="Buscar envío, cliente o mensajero..."
          className="bg-slate-800/60 placeholder:text-slate-400 px-3 py-2 rounded-md focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="px-3 py-2 rounded-md bg-white/5">🔔</button>
        <button
          onClick={onToggleDark}
          className="px-3 py-2 rounded-md bg-white/5"
        >
          {dark ? "🌙" : "☀️"}
        </button>

        <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">A</div>
          <div className="text-sm">
            <div className="font-medium">Andrés</div>
            <div className="text-xs text-slate-400">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function StatCard({ title, value, delta, icon }) {
  return (
    <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center text-2xl">{icon}</div>
          <div>
            <div className="text-sm text-slate-400">{title}</div>
            <div className="text-xl font-semibold">{value}</div>
          </div>
        </div>
        <div className={`text-sm ${delta >= 0 ? "text-emerald-400" : "text-rose-400"}`}>{delta >= 0 ? `+${delta}%` : `${delta}%`}</div>
      </div>
    </div>
  );
}

function AreaChartCard({ data }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-800/60">
      <h3 className="text-sm text-slate-300 mb-2">Envíos esta semana</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colEnvios" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="envios" stroke="#3B82F6" fillOpacity={1} fill="url(#colEnvios)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BarChartCard({ data }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-800/60">
      <h3 className="text-sm text-slate-300 mb-2">Rendimiento mensajeros</h3>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="completed" fill="#06B6D4" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RecentTable({ rows }) {
  return (
    <div className="rounded-2xl bg-slate-800/50 p-4">
      <h3 className="text-sm text-slate-300 mb-3">Envíos recientes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="text-slate-400 text-xs uppercase">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Cliente</th>
              <th className="px-3 py-2">Dirección</th>
              <th className="px-3 py-2">Mensajero</th>
              <th className="px-3 py-2">Estado</th>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-700 hover:bg-white/2 transition">
                <td className="px-3 py-2">{r.id}</td>
                <td className="px-3 py-2">{r.client}</td>
                <td className="px-3 py-2">{r.address}</td>
                <td className="px-3 py-2">{r.courier}</td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${r.status === "Entregado" ? "bg-emerald-500/20 text-emerald-300" : r.status === "Retrasado" ? "bg-rose-500/20 text-rose-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-3 py-2">{r.date}</td>
                <td className="px-3 py-2">${r.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Placeholder para mapa. Si quieres integrar Leaflet o Google Maps, agrega la librería y reemplaza este componente.
function MapPlaceholder() {
  return (
    <div className="rounded-2xl bg-slate-800/40 p-4 h-64 flex items-center justify-center">
      <div className="text-slate-400">Mapa de mensajeros (integrar Leaflet / Google Maps aquí)</div>
    </div>
  );
}

export default function Home() {
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [dark, setDark] = useState(true);
  const [stats, setStats] = useState(mockStats);
  const [areaData, setAreaData] = useState(mockArea);
  const [barData, setBarData] = useState(mockBar);
  const [tableData, setTableData] = useState(mockTable);
  const [entregados, setEntregados] = useState(0)

  useEffect(() => {
    // TODO: Aquí debes realizar la llamada a tu API para obtener datos reales.
    // EJEMPLO (fetch):
    // fetch('/api/dashboard')
    //   .then(res => res.json())
    //   .then(data => {
    //     setStats(data.stats);
    //     setAreaData(data.area);
    //     setBarData(data.bar);
    //     setTableData(data.recent);
    //   })
    //   .catch(err => console.error(err));

    // Por ahora usamos mock (ya inicializado arriba)
    console.log('desde home')
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="flex">
        <div className="flex-shrink-0">
          <Sidebar compact={compactSidebar} />
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Panel de control</h1>
            <div className="flex items-center gap-3">
              <button onClick={() => setCompactSidebar((s) => !s)} className="px-3 py-2 rounded-md bg-white/5">
                {compactSidebar ? "Expandir" : "Compactar"}
              </button>
            </div>
          </div>

          <Navbar onToggleDark={() => setDark((d) => !d)} dark={dark} />

          <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <StatCard title="Envíos hoy" value={stats.totalToday} delta={12} icon="🚚" />
                <StatCard title="Entregados" value={stats.delivered} delta={5} icon="✅" />
                <StatCard title="Retrasos" value={stats.delayed} delta={-2} icon="⚠️" />
                <StatCard title="Ingresos" value={`$${(stats.revenue || 0).toLocaleString()}`} delta={8} icon="💰" />
              </div>

              <div className="md:col-span-2">
                <AreaChartCard data={areaData} />
              </div>

              <div className="md:col-span-2">
                <BarChartCard data={barData} />
              </div>

              <div className="md:col-span-2">
                <RecentTable rows={tableData} />
              </div>
            </div>

            <div className="lg:col-span-1 flex flex-col gap-4">
              <MapPlaceholder />

              <div className="p-4 rounded-2xl bg-slate-800/50">
                <h3 className="text-sm text-slate-300">Alertas</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-2">
                  <li>🚨 3 envíos con retraso en la zona norte</li>
                  <li>🛠️ Mensajero "Carlos" sin dispositivo registrado</li>
                  <li>⚠️ 5 cancelaciones en las últimas 24h</li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
