import TarjetasEstadosPedidos from "./TarjetasEstadosPedidos";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/Constantes";

function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    obtenerPedidos();
  }, [reload]);

  function obtenerPedidos() {
    axios
      .get(API_URL + "pedidosypagos")
      .then((response) => {
        setPedidos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handlePedidoChange() {
    setReload(!reload);
  }

  const pedidosFiltrados = pedidos.filter(
    (pedido) =>
      pedido.estado != "pagado" &&
      pedido.estado != "pendiente pago" &&
      pedido.estado != "rechazado" &&
      pedido.estado != "entregado"
  );

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">Pedidos</h1>
      <div className="grid grid-cols-3 gap-4">
        {pedidosFiltrados.length > 0 ? (
        pedidosFiltrados.map((pedido, index) => (
            <TarjetasEstadosPedidos
              key={index}
              pedido={pedido}
              onPedidoChange={handlePedidoChange}
            />
          ))
        ) : (
          <p>No hay pedidos por ahora.</p>
        )
        }
      </div>
    </div>
  );
}

export default PedidosAdmin;