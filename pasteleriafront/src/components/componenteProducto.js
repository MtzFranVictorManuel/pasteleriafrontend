function Product({ name, description, price, image }) {
    return (
      <div className="product">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>
    );
  }
  