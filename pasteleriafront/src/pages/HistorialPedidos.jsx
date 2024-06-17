import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Chip } from '@mui/material';

const HistorialPedidos = () => {
  const [historial, setHistorial] = useState([]);
  const email = localStorage.getItem('email');
  const rol = localStorage.getItem('rol');

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
  
  // Llamar a obtenerHistorial cuando cambia el correo electrónico
  useEffect(() => {
    obtenerHistorial();
  }, [email]);

  async function cancelarPedido(codigoPedido) {
    const response = await fetch(`http://127.0.0.1:8000/cancelar-pedido/${codigoPedido}`, {
      method: 'POST',
    });

    if (response.ok) {
      obtenerHistorial();  // recargar los datos de los pedidos
    } else {
      const errorData = await response.json();
      console.error('Error al cancelar el pedido:', errorData.detail);
    }
  }



  return (
    <TableContainer component={Paper} className="my-4 mx-auto max-w-7xl">
      <Table>
        <TableHead>
          <TableRow>
            {rol === '2' && <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Nombre Cliente</TableCell>}
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Código de Pedido</TableCell>
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Estado</TableCell>
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Fecha de Pedido</TableCell>
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Fecha de Entrega</TableCell>
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Calle</TableCell>
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>Colonia</TableCell>
            <TableCell style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historial.map((pedido) => (
            <TableRow key={pedido.codigoPedido}>
              {rol === '2' && <TableCell>{pedido.nombreUsuario}</TableCell>}
              <TableCell>{pedido.codigoPedido}</TableCell>
              <TableCell>
                {(() => {
                  switch (pedido.estado) {
                    case 'pagado':
                      return <Chip label="Pagado" style={{ backgroundColor: '#1C7C19', color: 'white' }} />;
                    case 'pendiente pago':
                      return <Chip label="Pendiente Pago" style={{ backgroundColor: '#B4D33F', color: 'white' }} />;
                    case 'rechazado':
                      return <Chip label="Rechazado" style={{ backgroundColor: '#DF310B', color: 'white' }} />;
                    case 'en proceso':
                      return <Chip label="En Proceso" style={{ backgroundColor: '#EA8E17', color: 'white' }} />;
                    case 'listo para entregar':
                      return <Chip label="Listo Para Entregar" style={{ backgroundColor: '#1731EA', color: 'white' }} />;
                    case 'entregado':
                      return <Chip label="Entregado" style={{ backgroundColor: '#6AA264', color: 'white' }} />;
                    case 'cancelado':
                      return <Chip label="Cancelado" style={{ backgroundColor: '#F63333', color: 'white' }} />;
                    default:
                      return null;
                  }
                })()}
              </TableCell>
              <TableCell>{pedido.fechaPedido}</TableCell>
              <TableCell>{pedido.fechaEntrega}</TableCell>
              <TableCell>{pedido.calle}</TableCell>
              <TableCell>{pedido.colonia}</TableCell>
              <TableCell>
                {pedido.estado === 'en proceso' && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      const confirmacion = window.confirm(`Estás a punto de cancelar el pedido ${pedido.codigoPedido}. ¿Deseas continuar?`);
                      if (confirmacion) {
                        const codigo = window.prompt('Ingresa el código del pedido a cancelar');
                        if (codigo === pedido.codigoPedido) {
                          cancelarPedido(pedido.codigoPedido);
                        } else {
                          window.alert('El código ingresado no coincide con el pedido. Por favor, inténtalo de nuevo.');
                        }
                      }
                    }}
                  >
                    Cancelar pedido
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistorialPedidos;