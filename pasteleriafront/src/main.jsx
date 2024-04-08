import ReactDOM from "react-dom/client";
import Login from "./pages/Login.jsx"; 
import "./styles/index.css";
import App from "./pages/App.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AgregarProducto from "./pages/agregarProducto/AgregarProducto.jsx";
import Contexto from "./pages/agregarProducto/Contexto.jsx";
function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/productos" element={<App />} />
        <Route path="/agregarProducto" element={<Contexto><AgregarProducto /></Contexto>} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
