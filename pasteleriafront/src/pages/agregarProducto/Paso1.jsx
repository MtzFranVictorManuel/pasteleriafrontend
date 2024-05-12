import { useContext, useState, useCallback, useEffect } from "react";
import { RegistroContext } from "./Contexto";
import { useDropzone } from "react-dropzone";
import { TextField } from "@mui/material";

function Paso1() {
  const { setPasoActual, setProductoDatosBasicos, productoDatosBasicos } =
    useContext(RegistroContext);

  const [nombre, setNombre] = useState(productoDatosBasicos.nombre || "");
  const [descripcion, setDescripcion] = useState(
    productoDatosBasicos.descripcion || ""
  );
  const [costo, setCosto] = useState(productoDatosBasicos.costo || "");
  const [imagenes, setImagenes] = useState(productoDatosBasicos.imagenes || []);
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) {
        console.log("No se aceptaron archivos");
        return;
      }
      if (acceptedFiles.length + imagenes.length > 5) {
        alert("No puedes cargar más de 5 imágenes");
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagenes((prevImagenes) => [...prevImagenes, reader.result]);
      };

      reader.readAsDataURL(file);
    },
    [imagenes]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
    maxSize: 5 * 1024 * 1024,
  });

  const eliminarImagen = (index) => (event) => {
    event.stopPropagation();
    setImagenes((prevImagenes) => prevImagenes.filter((_, i) => i !== index));
  };

  const validarDatosBasicos = () => {
    if (!nombre || !descripcion || !costo || imagenes.length === 0) {
      alert("Por favor, completa todos los campos y asegúrate de haber cargado al menos una imagen.");
      return false;
    }
    return true;
  };

  const guardarDatosBasicos = () => {
    if (!validarDatosBasicos()) {
      return;
    }

    console.log("Guardando datos basicos");
    console.log("nombre", nombre);
    console.log("descripcion", descripcion);
    console.log("costo", costo);
    console.log("imagenes", imagenes);
    setProductoDatosBasicos({
      nombre,
      descripcion,
      costo,
      imagenes,
    });
    setPasoActual(1);
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
            placeholder="$"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Imagenes del producto: (Arrastre la imagen max 5)</span>
          <div className="flex" {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            {imagenes.length > 0 ? (
              imagenes.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`Preview ${index}`}
                    style={{ width: "150px", height: "150px" }}
                  />
                  <button onClick={eliminarImagen(index)}>Eliminar</button>
                </div>
              ))
            ) : (
              <img src={placeholder} alt="Placeholder" />
            )}
          </div>
        </label>
      </form>
      <a href='/productos' className="bg-red-200 rounded-lg px-4 py-2 hover:bg-red-400 transition-colors duration-200" onClick={() => console.log('Cancelar')}>
        Cancelar
      </a>
      <button
        onClick={guardarDatosBasicos}
        className="mt-4 px-4 py-2 bg-green-200 text-black rounded hover:bg-green-400 transition-colors duration-200"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Paso1;
