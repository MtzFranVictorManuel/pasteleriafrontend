import { useContext, useState } from "react";
import { RegistroContext } from "./Contexto";
import axios from "axios";
import { API_URL } from "../../services/Constantes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



function Paso3() {

  const navigate = useNavigate();
  const {
    pasoActual,
    setPasoActual,
    productoDatosBasicos,
    productoDatosExtras,
  } = useContext(RegistroContext);

  const [idProductoGuardar, setIdProductoGuardar] = useState(null);



  const producto = {
    nombre: productoDatosBasicos.nombre,
    descripcion: productoDatosBasicos.descripcion,
    costo: productoDatosBasicos.costo,
  };

  function guardarProducto1() {
    axios
      .post(API_URL + "productos", producto)
      .then((response) => {
        console.log(response.data.idProducto);
        setIdProductoGuardar(response.data.idProducto);
        console.log(response.data);
        console.log(idProductoGuardar);
        guardarImagenes(response.data.idProducto);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function guardarImagenes(idProducto) {
    if (productoDatosBasicos.imagenes.length == 0) {
      console.log("No hay imágenes");
      guardarCategorias(idProducto);
    } else {
      productoDatosBasicos.imagenes.forEach((imagen) => {
        axios
          .post(API_URL + "imagen_producto/", {
            idProducto: idProducto,
            imagen64: imagen,
          })
          .then((response) => {
            console.log(response.data);
            if (
              productoDatosBasicos.imagenes.indexOf(imagen) ==
              productoDatosBasicos.imagenes.length - 1
            ) {
              guardarCategorias(idProducto);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }

  function guardarCategorias(idProducto) {
    if (productoDatosExtras.categorias.length == 0) {
      console.log("No hay categorías");
      guardarIngredientes();
    } else {
      productoDatosExtras.categorias.forEach((categoria) => {
        console.log(idProducto);
        console.log(categoria.idCategoria);
        axios
          .post(API_URL + "categoria_producto/", {
            idProducto: idProducto,
            idCategoria: categoria.idCategoria,
          })
          .then((response) => {
            console.log(response.data);
            if (
              productoDatosExtras.categorias.indexOf(categoria) ==
              productoDatosExtras.categorias.length - 1
            ) {
              guardarIngredientes(idProducto);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }

  function guardarIngredientes(idProducto) {
    if (productoDatosExtras.ingredientes.length == 0) {
      console.log("No hay ingredientes");
      regresarPaginaPrincipalProductos();
    } else {
      productoDatosExtras.ingredientes.forEach((ingrediente) => {
        axios
          .post(API_URL + "producto_ingrediente/", {
            idProducto: idProducto,
            idIngrediente: ingrediente.idIngrediente,
          })
          .then((response) => {
            console.log(response.data);
            if (
              productoDatosExtras.ingredientes.indexOf(ingrediente) ==
              productoDatosExtras.ingredientes.length - 1
            ) {
              regresarPaginaPrincipalProductos();
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  }

  function guardarProducto() {
    guardarProducto1();
  }

  function regresarPaginaPrincipalProductos() {
    
    toast.success("Producto guardado correctamente");
    navigate("/productos");
  }

  return (
    <div>
      <h1>Paso 3</h1>
      <h2>Datos Básicos</h2>
      <p>Nombre: {productoDatosBasicos.nombre}</p>
      <p>Descripción: {productoDatosBasicos.descripcion}</p>
      <p>Costo: {productoDatosBasicos.costo}</p>

      {productoDatosBasicos.imagenes.map((imagen, index) => (
        <img key={index} src={imagen} alt={`Producto ${index}`} style={{width: "150px", height: "150px" }} />
      ))}
      <h2>Datos Extras</h2>
      <h3>Categorías</h3>
      <ul>
        {productoDatosExtras.categorias.map((categoria, index) => (
          <li key={index}>{categoria.nombre}</li>
        ))}
      </ul>
      <h3>Ingredientes</h3>
      <ul>
        {productoDatosExtras.ingredientes.map((ingrediente, index) => (
          <li key={index}>
            {ingrediente.cantidad} {ingrediente.nombreMedida} de{" "}
            {ingrediente.nombre}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-pink-200 text-black rounded hover:bg-pink-400 transition-colors duration-200"
        onClick={() => setPasoActual(pasoActual - 1)}
      >
        Retroceder
      </button>
      <button
        className="mt-4 px-4 py-2 bg-pink-200 text-black rounded hover:bg-pink-400 transition-colors duration-200"
        onClick={guardarProducto}
      >
        Guardar Producto
      </button>
    </div>
  );
}

export default Paso3;
