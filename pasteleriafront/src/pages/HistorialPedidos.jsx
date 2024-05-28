import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const HistorialPedidos = () => {
  const [historial, setHistorial] = useState([]);
  const email = localStorage.getItem('email');
  const rol = localStorage.getItem('rol');

  useEffect(() => {
    // Obtén el historial de pedidos del usuario actual
    // Obtén el historial de pedidos del usuario actual
    const obtenerHistorial = async () => {
      try {
        let response;
        if (rol === '2') {
          // Si el usuario es un administrador, obtén todos los pedidos
          response = await axios.get(`http://127.0.0.1:8000/historialPedidos/${email}`);
        } else {
          // Si el usuario no es un administrador, obtén solo sus pedidos
          response = await axios.get(`http://127.0.0.1:8000/historialPedidos/${email}`);
        }
        setHistorial(response.data);
      } catch (error) {
        console.error('Hubo un error al obtener el historial de pedidos', error);
      }
    };

    obtenerHistorial();
  }, [email]);

  return (
    <TableContainer component={Paper} className="my-4 mx-auto max-w-7xl">
      <Table>
        <TableHead>
          <TableRow>
            {rol === '2' && <TableCell>Nombre Cliente</TableCell>}
            <TableCell>Código de Pedido</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Fecha de Pedido</TableCell>
            <TableCell>Fecha de Entrega</TableCell>
            <TableCell>Calle</TableCell>
            <TableCell>Colonia</TableCell>
            {rol === '2' && <TableCell>Detalles</TableCell>}{/* Agregamos una nueva columna para mostrar los detalles del pedido */}
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map((pedido) => (
            <TableRow key={pedido.codigoPedido}>
              {rol === '2' && <TableCell>{pedido.nombreUsuario}</TableCell>}
              <TableCell>{pedido.codigoPedido}</TableCell>
              <TableCell>{pedido.estado}</TableCell>
              <TableCell>{pedido.fechaPedido}</TableCell>
              <TableCell>{pedido.fechaEntrega}</TableCell>
              <TableCell>{pedido.calle}</TableCell>
              <TableCell>{pedido.colonia}</TableCell>
              {rol === '2' &&
                <TableCell>
                  <Button style={{ backgroundColor: '#CD006A', color:'white' }} href={`/historialPedidos/${pedido.codigoPedido}`}>Ver Detalles</Button>
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistorialPedidos;