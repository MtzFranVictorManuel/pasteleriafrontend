
import { useState, useEffect } from "react";

import axios from "axios";

import { API_URL } from "../../services/Constantes";


function HistorialPedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPedidos = async () => {
        try {
            const response = await axios.get(API_URL+"pedidosusuariosdireccionespagos");
            setPedidos(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
        };
        fetchPedidos();
    }, []);
    
    return (
        <div>
        <h1>Historial de Pedidos</h1>
        {loading ? (
            <p>Cargando...</p>
        ) : (
            <table>
            <thead>
                <tr>
                <th>Codigo Pedido </th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Usuario nombre</th>
                <th>Usuario apellido</th>
                <th>Productos</th>
                </tr>
            </thead>
            <tbody>
                {pedidos.map((pedido) => (
                <tr key={pedido.idPedido}>
                    <td>{pedido.codigoPedido}</td>
                    <td>{pedido.fechaEntrega}</td>
                    <td>{pedido.estado}</td>
                    <td>{pedido.nombre}</td>
                    <td>{pedido.apellido}</td>
                    <td>
                    <button >Ver productos</button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    }

export default HistorialPedidos;