import { useContext, useState, useCallback } from "react";
import { RegistroContext } from "./Contexto";
import { useDropzone } from "react-dropzone";

function Paso1() {
  const { setPasoActual } = useContext(RegistroContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [imagen, setImagen] = useState(null);
  const [files, setFiles] = useState([]);
  const [placeholder, setPlaceholder] = useState(
    "https://via.placeholder.com/150"
  );

  const readImageFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = await readImageFile(file);
    setImagen(imageUrl);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h1 className="mb-4 text-2xl font-bold text-gray-700">Paso 1</h1>
      <p className="mb-8 text-gray-600">Ingrese los datos del producto</p>
      <form className="w-full max-w-md mx-auto">
        <label className="block mb-4">
          <span className="text-gray-700">Nombre del producto:</span>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Descripción del producto:</span>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Costo del producto:</span>
          <input
            type="number"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Imagen principal del producto:</span>
          <div className="w-60 h-60" {...getRootProps({ className: "dropzone" }) }>
            <input {...getInputProps()} />
            {imagen ? (
              <img src={imagen} alt="Preview" />
            ) : (
              <img src={placeholder} alt="Placeholder" />
            )}
          </div>
        </label>
      </form>
      <button
        onClick={() => setPasoActual(1)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paso1;
