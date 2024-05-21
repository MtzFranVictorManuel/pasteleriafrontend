
const PedidosUsuarios = ({pedido}) => {
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

        
    return (
        <div className="tarjetaPedido">
            <div className="tarjetaPedido__header">
                <h3>Pedido {codigoPedido}</h3>
                <p>{fechaPedido}</p>
            </div>
            <div className="tarjetaPedido__body">
                <p>Fecha de entrega: {fechaEntrega}</p>
                <p>Tipo de pedido: {tipo}</p>
                <p>Estado: {estado}</p>
                <p>Total: {total}</p>
                <img src={imagenPago64} alt="imagen" />
            </div>
            <div className="tarjetaPedido__footer">
                <button onClick={abrirModalProductos}>Ver productos</button>
                <button onClick={abrirModalPago}>Ver pago</button>
            </div>
            <ModalProductos
                isOpen={modalOpen}
                onClose={cerrarModal}
                idPedido={idPedido}
            />
            <ModalPago
                isOpen={modalPagoOpen}
                onClose={cerrarModalPago}
                idPedido={idPedido}
            />
        </div>
    );
}

export default PedidosUsuarios;