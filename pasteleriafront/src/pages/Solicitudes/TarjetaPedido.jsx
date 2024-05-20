import axios from "axios";
import ModalProductos from "./ModalProductos";
import { API_URL } from "../../services/Constantes";
import ModalPago from "./ModalPago";
import { useState } from "react";

const TarjetaPedido = ({ pedido, onPedidoChange }) => {
  const {
    idPedido,
    codigoPedido,
    fechaPedido,
    fechaEntrega,
    tipo,
    estado,
    total,
    imagenPago64,
  } = pedido;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPagoOpen, setModalPagoOpen] = useState(false);

  function abrirModalPago() {
    setModalPagoOpen(true);
  }

  function cerrarModalPago() {
    setModalPagoOpen(false);
  }

  function abrirModalProductos() {
    console.log("abrir modal");
    setModalOpen(true);
  }

  function cerrarModal() {
    setModalOpen(false);
  }

  function aceptarPedido() {
    axios
      .put(`${API_URL}pedido_estado`, { idPedido, estado: "Aceptado" })
      .then((response) => {
        console.log(response.data);
        onPedidoChange();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function rechazarPedido() {
    axios
      .put(`${API_URL}pedido_estado`, { idPedido, estado: "Rechazado" })
      .then((response) => {
        console.log(response.data);
        onPedidoChange();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="tarjeta-pedido bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="block text-gray-700 text-sm font-bold mb-2">
        Código de Pedido: {codigoPedido}
      </h2>
      <p className="mb-2">Fecha Pedido:{fechaPedido}</p>
      <p className="mb-2">Fecha de Entrega: {fechaEntrega}</p>
      <p className="mb-2">Tipo de Pago: {tipo}</p>
      <p className="mb-2">Total: {total}</p>
      <p className="mb-2">{estado}</p>
      <div className="flex items-center justify-between">
        {tipo === "transferencia" && estado === "pagado" && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={abrirModalPago}
          >
            Ver Pago
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={abrirModalProductos}
        >
          Ver Productos
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={aceptarPedido}
        >
          Aceptar
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={rechazarPedido}
        >
          Rechazar
        </button>
      </div>
      <ModalProductos
        idPedido={idPedido}
        open={modalOpen}
        onClose={cerrarModal}
      />
      <ModalPago open={modalPagoOpen} onClose={cerrarModalPago} imagen={imagenPago64} />
    </div>
  );
};

export default TarjetaPedido;
