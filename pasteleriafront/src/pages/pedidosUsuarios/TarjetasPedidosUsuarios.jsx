import { useState } from 'react';
import ModalProductos from '../../components/ModalProductos';
import ModalPago from '../../components/ModalPago';
import ModalPagoUsuario from './ModalPagoUsuario';



const PedidosUsuarios = ({pedido}) => {
    const {
        idPedido,
        codigoPedido,
        fechaPedido,
        fechaEntrega,
        tipo,
        estadoPedido,
        total,
        imagenPago64,
      } = pedido;

        const [modalOpen, setModalOpen] = useState(false);
        const [modalPago, setModalPago] = useState(false);

        const abrirModalPago = () => {
            console.log("abrir modal");
            setModalPago(true);
        }

        const cerrarModalPago = () => {
          console.log("cerrar modal");
          setModalPago(false);
        }

        function abrirModalProductos() {
            console.log("abrir modal");
            setModalOpen(true);

        }

        function cerrarModal() {
            setModalOpen(false);
        }

        function getColorClass(estadoPedido) {
            switch (estadoPedido) {
              case 'pagado':
                return 'bg-green-100';
              case 'pendiente pago':
                return 'bg-yellow-100';
              default:
                return 'bg-white';
            }
          }
        
    return (
        <div className={`tarjeta-pedido ${getColorClass(estadoPedido)} shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
      <h2 className="block text-gray-700 text-sm font-bold mb-2">
        Código de Pedido: {codigoPedido}
      </h2>
      <p className="mb-2">Fecha Pedido:{fechaPedido}</p>
      <p className="mb-2">Fecha de Entrega: {fechaEntrega}</p>
      <p className="mb-2">Tipo de Pago: {tipo}</p>
      <p className="mb-2">Total: {total}</p>
      <p className="mb-2">{estadoPedido}</p>
      <p className="mb-2">{tipo}</p>
      <div className="flex items-center justify-between">
        {tipo === "transferencia" && estadoPedido === "pendiente pago" && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={abrirModalPago}
          >
            Hacer Pago
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
      <ModalPagoUsuario open={modalPago} cerrarModalPago={cerrarModalPago} />
    </div>
    );
}

export default PedidosUsuarios;