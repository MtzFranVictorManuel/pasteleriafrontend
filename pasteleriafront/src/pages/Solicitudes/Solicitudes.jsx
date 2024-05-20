import TarjetaPedido from "./TarjetaPedido";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../services/Constantes";

function Solitudes() {
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

  return (
    <div>
      <h1 className="text-4xl text-center font-bold">Solicitudes de Pedidos</h1>
      <div className="grid grid-cols-3 gap-4">
        {pedidos
          .filter(
            (pedido) =>
              pedido.estado === "pagado" ||
              pedido.estado === "pendiente pago"
          )
          .map((pedido, index) => (
            <TarjetaPedido
              key={index}
              pedido={pedido}
              onPedidoChange={handlePedidoChange}
            />
          ))}
      </div>
    </div>
  );
}

export default Solitudes;
