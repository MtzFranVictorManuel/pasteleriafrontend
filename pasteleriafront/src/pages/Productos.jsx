import { useState } from "react";
import logo from "../imagenes/logo.jpeg";
import NavAdmin from "./NavAdmin";

function App() {
  return (
    <div>
      <NavAdmin />
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
