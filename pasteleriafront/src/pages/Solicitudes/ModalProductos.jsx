import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../services/Constantes";

function ModalProductos({ idPedido, open, onClose }) {
  const [productos, setProductos] = useState([]);

  function obtenerProductos() {
    axios
      .get(`${API_URL}pedidosproductosimagenes/${idPedido}`)
      .then((response) => {
        console.log(idPedido);
        setProductos(response.data);
        console.log(response.data);
        console.log(productos);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (open) {
      obtenerProductos();
    }
  }, [open]);

  return (
    <div
      className={`${open ? "fixed" : "hidden"} z-10 inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Lista de Productos:
                </h3>
                {productos.map((producto, index) => (
                  <div
                    key={index}
                    className="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
                  >
                    <div className="px-4 py-5 sm:px-6">
                      <h2 className="text-lg leading-6 font-medium text-gray-900">
                        Nombre: {producto.nombre}
                      </h2>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Costo
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {producto.costo}
                          </dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Descripción
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {producto.descripcion}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalProductos;
