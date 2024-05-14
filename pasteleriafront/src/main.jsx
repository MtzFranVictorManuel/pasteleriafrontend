import { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx";
import "./styles/index.css";
import Productos from "./pages/Productos.jsx";
import AgregarProducto from "./pages/agregarProducto/AgregarProducto.jsx";
import Registrar from "./pages/Registrar.jsx";
import EditarPerfil from "./pages/usuario/EditarPerfil.jsx";
import PrivateRoute from "./pages/rutasPrivadas/PrivateRoute.jsx";
import {
  AuthContext,
  AuthProvider,
} from "./pages/autentificador/AuthContext.jsx";
import Home from "./pages/usuario/Home.jsx";
import NavBars from "./pages/NavBars.jsx";

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
      <NavBars />
      <Routes>
        <Route path="/iniciarSesion" element={<Login />} />
        <Route
          path="/productos"
          element={
            <PrivateRoute roles={['2']}>
              <Productos />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/visualizarProductos" element={<ProductList />} />
        <Route
          path="/agregarProducto"
          element={
            <PrivateRoute roles={['2']}>
              <ContextoProducto>
                <AgregarProducto />
              </ContextoProducto>
            </PrivateRoute>
          }
        />
        <Route
          path="/cesta"
          element={
            <PrivateRoute roles={['1','2']}>
              <Cesta />
            </PrivateRoute>
          }
        />
        <Route
          path="/hacerPedido"
          element={
            <PrivateRoute roles={['1','2']}>
              <ContextoPedido>
                <HacerPedido />
              </ContextoPedido>
            </PrivateRoute>
          }
        />
        <Route
          path="/editarPerfil"
          element={
            <PrivateRoute roles={['1']}>
              <EditarPerfil />
            </PrivateRoute>
          }
        />
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
