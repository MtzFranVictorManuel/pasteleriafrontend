import { Autocomplete, Modal, TextField } from "@mui/material";
import ModalProductos from "../../components/ModalProductos";
import ModalPago from "../../components/ModalPago";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../services/Constantes";

const TarjetasEstadosPedidos = ({ pedido,onPedidoChange }) => {
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

  const estadosPosibles = [
    "en proceso",
    "listo para entrega",
    "entregado",
  ];

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

    function actualizarEstadoPedido(idPedido, estado) {
    axios
      .put(`${API_URL}pedido_estado`, { idPedido, estado })
      .then((response) => {
        console.log(response.data);
        onPedidoChange();
        alert("Estado del pedido actualizado");
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
      <Autocomplete
        value={estado}
        onChange={(event, newValue) => {
          actualizarEstadoPedido(idPedido, newValue);
        }}
        options={estadosPosibles}
        renderInput={(params) => (
          <TextField {...params} label="Estado" variant="outlined" />
        )}
      />
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
      </div>
      <ModalProductos
        idPedido={idPedido}
        open={modalOpen}
        onClose={cerrarModal}
      />
      <ModalPago
        open={modalPagoOpen}
        onClose={cerrarModalPago}
        imagen={imagenPago64}
      />
    </div>
  );
};

export default TarjetasEstadosPedidos;
