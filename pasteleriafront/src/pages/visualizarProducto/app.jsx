import { useEffect, useState } from 'react';
import '../../styles/verProducto.css'; 

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const response = await fetch('http://localhost:4040/productos_con_imagenes');
      const data = await response.json();
      setProductos(data);
    };

    obtenerProductos();
  }, []);

  return (
    <div className="app-container">
      <h1>Lista de Productos</h1>
      <div className="productos-container">
        {productos.map(producto => (
          <div key={producto.idProducto} className="producto-card">
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Costo: ${producto.costo}</p>
            <div className="imagenes-container">
              {producto.imagenes.map((imagen, index) => (
                <img key={index} src={`data:image/jpeg;base64,${imagen.imagen64}`} alt={`Imagen ${index}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
