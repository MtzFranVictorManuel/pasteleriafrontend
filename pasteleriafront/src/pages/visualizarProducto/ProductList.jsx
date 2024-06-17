import { useEffect, useState } from 'react';
import Product from './Product';
import '../../styles/ProductList.css';

const ProductList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductosConImagenes = async () => {
      try {
        const response = await fetch('http://localhost:8000/productos_con_imagenes');
        if (!response.ok) {
          throw new Error('¡¡Error al obtener los productos!!');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductosConImagenes();
  }, []);

  return (
    <div className="product-list">
      {productos.map((producto) => (
        <Product
          key={producto.idProducto}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          imagen={producto.imagen}
        />
      ))}
    </div>
  );
};

export default ProductList;
