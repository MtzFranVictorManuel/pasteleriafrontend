import { useState, useContext, useEffect } from "react";
import { PedidoContexto } from "./ContextoPedido";
import { API_URL } from "../../services/Constantes";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";

function Paso3() {
  const [direccion, setDireccion] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  const [fechaEntrega, setFechaEntrega] = useState("");

  const idUsuario = localStorage.getItem("token");

  const handleFechaEntregaChange = (event) => {
    setFechaEntrega(event.target.value);
  };

  const {
    setPasoActual,
    productoDatosBasicos,
    productoDatosExtras,
    productoDatosFinales,
  } = useContext(PedidoContexto);

  const handlePrevious = () => {
    console.log("Paso Anterior");
    setPasoActual(1);
  };

  const hacerPedido = () => {
    if (fechaEntrega === "") {
      alert("Debes seleccionar una fecha de entrega");
      return;
    }

    // Crear un código de pedido alfanumérico aleatorio de 5 caracteres
    const codigoPedido = uuidv4().substr(0, 5);

    // Crear la fecha del pedido con la fecha de hoy
    const fechaPedido = new Date().toISOString().split("T")[0];

    // Crear el objeto del pedido
    const pedido = {
      idDireccion: productoDatosBasicos.idDireccion,
      idUsuario: idUsuario, // Reemplaza esto con el ID del usuario actual
      fechaPedido: fechaPedido,
      fechaEntrega: fechaEntrega,
      estado: "pendiente pago", // Reemplaza esto con el estado inicial del pedido
      codigoPedido: codigoPedido,
    };

    // Enviar la solicitud POST a la API para crear el pedido
    axios
      .post(`${API_URL}pedido`, pedido)
      .then((response) => {
        console.log("Pedido creado correctamente:", response.data);

        // Guardar el ID del pedido recién creado
        const idPedido = response.data.idPedido;

        // Por cada producto en el carrito, hacer una llamada a la API para guardar el producto al pedido
        productos.forEach((producto) => {
          const pedidoProducto = {
            idPedido: idPedido,
            idProducto: producto.idProducto,
          };

          axios
            .post(`${API_URL}pedido_producto`, pedidoProducto)
            .then((response) => {
              console.log(
                "Producto guardado al pedido correctamente:",
                response.data
              );
            })
            .catch((error) => {
              console.error("Error guardando el producto al pedido:", error);
            });
        });

        // Hacer una llamada a la API para crear un pedido_pago
        const pedidoPago = {
          idPedido: idPedido,
          total: productos.reduce(
            (total, producto) => total + producto.costo,
            0
          ), // Suma los costos de todos los productos
          tipo: productoDatosExtras.tipoPago,
        };

        axios
          .post(`${API_URL}pedido_pago`, pedidoPago)
          .then((response) => {
            console.log("Pedido_pago creado correctamente:", response.data);
            regresarPaginaPrincipal();
          })
          .catch((error) => {
            console.error("Error creando el pedido_pago:", error);
          });
      })
      .catch((error) => {
        console.error("Error creando el pedido:", error);
      });
  };

  function regresarPaginaPrincipal() {
    navigate("/misPedidos");
  }

  useEffect(() => {
    // Obtener el carrito del usuario
    axios
      .get(`${API_URL}carrito/usuario/4`)
      .then((response) => {
        const carrito = response.data[0];
        // Obtener los productos en el carrito
        axios
          .get(`${API_URL}carrito_producto/${carrito.idCarrito}`)
          .then((response) => {
            setProductos(response.data);
          })
          .catch((error) => {
            console.error("Error obteniendo los productos:", error);
          });
      })
      .catch((error) => {
        console.error("Error obteniendo el carrito:", error);
      });
  }, []);

  useEffect(() => {
    // Obtener la dirección basada en idDireccion
    axios
      .get(`${API_URL}direccion/${productoDatosBasicos.idDireccion}`)
      .then((response) => {
        // Si la respuesta es un array, selecciona el primer elemento
        setDireccion(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((error) => {
        console.error("Error obteniendo la dirección:", error);
      });
  }, [productoDatosBasicos.idDireccion]);

  return (
    <>
      {direccion && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold">Dirección de entrega:</h2>
          <p className="text-lg">
            Calle: {direccion.calle}, Numero exterior:{" "}
            {direccion.numeroExterior}, Ciudad: {direccion.ciudad}, Estado:{" "}
            {direccion.estado} Codigo postal:
            {direccion.codigoPostal}, Colonia: {direccion.colonia}
          </p>
        </div>
      )}

      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Método de pago:</h2>
        {productoDatosExtras.tipoPago === "efectivo" ? (
          <p className="text-lg">
            Has seleccionado pagar en efectivo. Por favor, realiza el pago al
            momento de la entrega.
          </p>
        ) : (
          <p className="text-lg">
            Has seleccionado pagar por transferencia. Podrás completar el
            proceso de pago en la pestaña de pedidos después de hacer tu pedido.
          </p>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Productos en tu carrito:</h2>
        {productos.map((producto) => (
          <div
            key={producto.idProducto}
            className="flex flex-col items-center space-y-2"
          >
            <h3 className="text-xl font-medium">{producto.nombre}</h3>
            <p className="text-lg">Costo: {producto.costo}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl font-bold">Fecha y hora de entrega:</h2>
        <input
          type="datetime-local"
          value={fechaEntrega}
          onChange={handleFechaEntregaChange}
          className="text-lg"
        />
      </div>

      <div className="flex justify-between w-full">
        <a
          href="/cesta"
          className="mt-4 p-4 bg-red-300 rounded-lg"
          onClick={() => console.log("Cancelar")}
        >
          Cancelar
        </a>
        <button
          className="mt-4 p-4 bg-yellow-200 rounded-lg"
          onClick={handlePrevious}
        >
          Paso Anterior
        </button>
        <button
          className="mt-4 p-4 bg-teal-300 rounded-lg"
          onClick={hacerPedido}
        >
          Realizar Pedido
        </button>
      </div>
    </>
  );
}

export default Paso3;
