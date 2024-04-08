import { useState } from "react";
import logo from "../imagenes/logo.jpeg";

function App() {
  return (
    <div>
      <nav className="flex items-center justify-between p-5 bg-pink-400">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <div className="text-black text-lg">Administración</div>
        <div className="flex space-x-4">
          <button className="bg-pink-600 text-black rounded px-2 py-1">
            Pedidos
          </button>
          <button className="bg-pink-600 text-black rounded px-2 py-1">
            Productos
          </button>
          <button className="bg-pink-600 text-black rounded px-2 py-1">
            Cerrar Sesión
          </button>
        </div>
      </nav>
      <div className="text-center text-3xl font-bold mt-5">Productos</div>
      <a
        href="/agregarProducto"
        className="inline-block bg-pink-200 text-black text-lg px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Agregar Producto
      </a>
    </div>
  );
}

export default App;
