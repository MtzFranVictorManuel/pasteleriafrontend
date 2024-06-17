import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/Constantes";
import PedidosUsuarios from "./TarjetasPedidosUsuarios";

function PedidosUsuario() {
  const [pedidos, setPedidos] = useState([]);
  const idUsuario = localStorage.getItem("token");

  useEffect(() => {
    fetchPedidos();
  }, []);

  function fetchPedidos() {
    axios
      .get(`${API_URL}pedidosusuariosdireccionespagos/${idUsuario}`)
      .then((response) => {
        console.log(response.data);
        const pedidosFiltrados = response.data.filter(
          (pedido) =>
            pedido.estadoPedido === "pendiente pago" ||
            pedido.estadoPedido === "pagado" ||
            pedido.estadoPedido === "aceptado"
        );
        setPedidos(pedidosFiltrados);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="pedidosUsuario">
      <div className="pedidosUsuario">
        {pedidos.map((pedido) => (
          <PedidosUsuarios
            key={pedido.id}
            pedido={pedido}
            fetchPedidos={fetchPedidos}
          />
        ))}
      </div>
    </div>
  );
}

export default PedidosUsuario;
