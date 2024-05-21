import { useState, useEffect } from "react";
import Modal from "react-modal";
import NavAdmin from "./NavAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { API_URL } from "../services/Constantes";
import axios from "axios";
import { Chip } from "@mui/material";

Modal.setAppElement("#root"); // This line is needed for accessibility reasons

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  function obtenerProductos() {
    axios
      .get(API_URL + "producto/25")
      .then((response) => {
        setProductos([response.data[0]]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function openModal(product) {
    setSelectedProduct(product);
    setModalIsOpen(true);

    axios
      .get(API_URL + "categoria_producto/" + product.idProducto)
      .then((response) => {
        const categoriasNombres = response.data.map(
          (item) => item.nombreCategoria
        );
        setCategorias(categoriasNombres);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    axios
      .get(API_URL + "producto_ingrediente/" + product.idProducto)
      .then((response) => {
        const ingredientesNombres = response.data.map(
          (item) => item.nombreIngrediente
        );
        setIngredientes(ingredientesNombres);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function handleSaveChanges() {
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const costo = document.getElementById("costo").value;

    if (!nombre || !descripcion || !costo) {
      alert("Por favor, rellene todos los campos o ponga un numero valido en costo.");
      return;
    }

    const updatedProduct = {
      idProducto: selectedProduct.idProducto,
      nombre: nombre,
      descripcion: descripcion,
      costo: costo,
    };

    axios
      .put(`${API_URL}producto/`, updatedProduct)
      .then((response) => {
        console.log(response);
        obtenerProductos();
        closeModal();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  return (
    <div>
      <div className="text-center text-3xl font-bold mt-5">Productos</div>
      <a
        href="/agregarProducto"
        className="inline-block bg-pink-200 text-black text-lg px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Agregar Producto
      </a>

      {productos.map((producto, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-bold mb-2">{producto.nombre}</h2>
          <div className="w-36 h-36 bg-gray-300 rounded-lg mb-2"></div>
          <p className="mb-2">{producto.descripcion}</p>
          <p className="text-lg font-bold">${producto.costo}</p>
          <button
            className="bg-teal-200 rounded-lg p-4"
            onClick={() => openModal(producto)}
          >
            Modificar
          </button>
        </div>
      ))}

      {selectedProduct && (
        <Dialog
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Modificar Producto</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="nombre"
              label="Nombre"
              type="text"
              defaultValue={selectedProduct.nombre}
              fullWidth
            />
            <TextField
              margin="dense"
              id="descripcion"
              label="Descripción"
              type="text"
              defaultValue={selectedProduct.descripcion}
              fullWidth
            />
            <TextField
              margin="dense"
              id="costo"
              label="Costo"
              type="number"
              defaultValue={selectedProduct.costo}
              fullWidth
              inputProps={{ pattern: "\\d*" }}
            />
            <div>
              {categorias.map((categoria, i) => (
                <Chip key={i} label={categoria} className="m-1" />
              ))}
            </div>
            <div>
              {ingredientes.map((ingrediente, i) => (
                <Chip key={i} label={ingrediente} className="m-1" />
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges} color="primary">
              Guardar cambios
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <ToastContainer />
    </div>
  );
}

export default App;
