
import '../../styles/Product.css'; // Estilos específicos del producto

const Product = ({ nombre, descripcion, imagen }) => {
  return (
    <div className="product-card">
      <img src={imagen} alt={nombre} className="product-image" />
      <div className="product-info">
        <h2>{nombre}</h2>
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

export default Product;
