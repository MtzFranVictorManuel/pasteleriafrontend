import { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx"; 
import "./styles/index.css";
import Productos from "./pages/Productos.jsx";
import AgregarProducto from "./pages/agregarProducto/AgregarProducto.jsx";
import Contexto from "./pages/agregarProducto/Contexto.jsx";
import Registrar from "./pages/Registrar.jsx";
import EditarPerfil from "./pages/usuario/EditarPerfil.jsx";
import PrivateRoute from "./pages/rutasPrivadas/PrivateRoute.jsx";
import { AuthContext, AuthProvider } from "./pages/autentificador/AuthContext.jsx";
import Home from "./pages/usuario/Home.jsx";

import ProductList from "./pages/visualizarProducto/ProductList.jsx";



import ContextoProducto from "./pages/agregarProducto/Contexto.jsx";
import PaginaPrincipal from "./pages/PaginaPrincipal.jsx";
import Cesta from "./pages/Cesta.jsx";
import HacerPedido from "./pages/realizarPedido/HacerPedido.jsx";
import ContextoPedido from "./pages/realizarPedido/ContextoPedido.jsx";
function Main() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log("isLoggedIn:", isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route path="/iniciarSesion" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/agregarProducto" element={<Contexto><AgregarProducto /></Contexto>} />
        <Route path="/registrar" element={<Registrar />} />

        <Route path="/visualizarProductos" element={<ProductList />} />

        <Route path="/agregarProducto" element={<ContextoProducto><AgregarProducto /></ContextoProducto>} />
        <Route path="/cesta" element={<Cesta />} />
        <Route path="/hacerPedido" element={<ContextoPedido><HacerPedido/></ContextoPedido>} />
        <Route path="/editarPerfil" element={<EditarPerfil />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Main />
  </AuthProvider>
);