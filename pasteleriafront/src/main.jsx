import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx"; // Cambia la importación a Login.jsx
import "./styles/index.css";
import Productos from "./pages/Productos.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgregarProducto from "./pages/agregarProducto/AgregarProducto.jsx";
import Contexto from "./pages/agregarProducto/Contexto.jsx";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/agregarProducto" element={<Contexto><AgregarProducto /></Contexto>} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
