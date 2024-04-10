import { useContext, useState, useCallback } from "react";
import { RegistroContext } from "./Contexto";
import { useDropzone } from "react-dropzone";
import { TextField } from "@mui/material";

function Paso1(setDatosBasicos) {
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

  const guardarDatosBasicos = () => {
    setDatosBasicos({
      nombre,
      descripcion,
      costo,
      imagen,
    });
    setPasoActual((prevPaso) => prevPaso + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="mb-4 text-2xl font-bold text-gray-700">Paso 1</h1>
      <p className="mb-8 text-gray-600">Ingrese los datos del producto</p>
      <form className="w-full max-w-md mx-auto">
        <label className="block mb-4 p-4">
          <TextField
            label="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            variant="outlined"
            fullWidth
            className="mb-4"
            margin="normal"
          />
          <TextField
            label="Descripción del producto"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            className="mb-4"
            margin="normal"
          />
          <TextField
            label="Costo del producto"
            value={costo}
            onChange={(e) => setCosto(e.target.value)}
            variant="outlined"
            type="number"
            fullWidth
            className="mb-4"
            margin="normal"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Imagen principal del producto:</span>
          <div
            className="w-60 h-60"
            {...getRootProps({ className: "dropzone" })}
          >
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
        onClick={guardarDatosBasicos}
        className="mt-4 px-4 py-2 bg-pink-400 text-white rounded hover:bg-pink-600 transition-colors duration-200"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paso1;
