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
    <div className="flex justify-between">
      <div className="flex-1 m-4 p-4 border rounded">
        <h1 className="text-xl font-bold mb-2">Paso 3</h1>
        <h2 className="text-lg font-semibold mb-1">Datos Básicos</h2>
        <p className="mb-1">Nombre: {productoDatosBasicos.nombre}</p>
        <p className="mb-1">Descripción: {productoDatosBasicos.descripcion}</p>
        <p className="mb-1">Costo: {productoDatosBasicos.costo}</p>

        {productoDatosBasicos.imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={`Producto ${index}`}
            className="w-36 h-36 m-4"
          />
        ))}
      </div>

      <div className="flex-1 m-4 p-4 border rounded">
        <h2 className="text-lg font-semibold mb-1">Datos Extras</h2>
        <h3 className="text-base font-medium mb-1">Categorías</h3>
        {productoDatosExtras.categorias.length > 0 ? (
          <ul>
            {productoDatosExtras.categorias.map((categoria, index) => (
              <li key={index}>{categoria.nombre}</li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron categorías</p>
        )}

        <h3 className="text-base font-medium mb-1">Ingredientes</h3>
        {productoDatosExtras.ingredientes.length > 0 ? (
          <ul>
            {productoDatosExtras.ingredientes.map((ingrediente, index) => (
              <li key={index}>
                {ingrediente.cantidad} {ingrediente.nombreMedida} de{" "}
                {ingrediente.nombre}
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron ingredientes</p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <a
          href="/productos"
          className="bg-red-200 rounded-lg px-4 py-2 hover:bg-red-400 transition-colors duration-200"
          onClick={() => console.log("Cancelar")}
        >
          Cancelar
        </a>
        <button
          className="px-4 py-2 bg-yellow-200 text-black rounded hover:bg-yellow-400 transition-colors duration-200"
          onClick={() => setPasoActual(pasoActual - 1)}
        >
          Retroceder
        </button>
        <button
          className="px-4 py-2 bg-green-200 text-black rounded hover:bg-green-400 transition-colors duration-200"
          onClick={guardarProducto}
        >
          Guardar Producto
        </button>
      </div>
    </div>
  );
}

export default Paso3;
