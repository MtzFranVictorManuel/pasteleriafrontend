import { useState, useEffect } from "react";
import axios from "axios"


function PedidosUsuarios() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("/pedidos");
        setPedidos(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPedidos();
  }, []);

  // if (loading) {
  //   return <Loader />;
  // }

  // if (error) {
  //   return <Error />;
  // }

  return (
    <div className="pedidosUsuarios">
      <h1>Pedidos</h1>
      <div className="pedidosUsuarios__list">
        {pedidos.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </div>
  );
}

export default PedidosUsuarios;