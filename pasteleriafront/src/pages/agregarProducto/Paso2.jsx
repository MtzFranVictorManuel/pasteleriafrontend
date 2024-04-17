import { useContext, useState } from "react";
import { RegistroContext } from "./Contexto";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function Paso2() {
  const { pasoActual, setPasoActual } = useContext(RegistroContext);

  const [categoria, setCategoria] = useState("");

  const [formularioVisible, setFormularioVisible] = useState(false);
  const [nuevoIngrediente, setNuevoIngrediente] = useState({
    nombre: "",
    cantidad: "",
    tipo: "",
  });
  const [ingredientes, setIngredientes] = useState([]);

  const categorias = ["Categoría 1", "Categoría 2", "Categoría 3"]; // Tus categorías

  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);

  const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState(null);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState(
    []
  );

  const manejarCambioCategoria = (event, newValue) => {
    if (newValue) {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, newValue]);
      setCategoria("");
    }
  };

  const eliminarCategoria = (categoria) => {
    setCategoriasSeleccionadas(
      categoriasSeleccionadas.filter((cat) => cat !== categoria)
    );
  };

  const manejarCambioNuevoIngrediente = (event) => {
    setNuevoIngrediente({
      ...nuevoIngrediente,
      [event.target.name]: event.target.value,
    });
  };

  const agregarIngrediente = () => {
    setIngredientes([...ingredientes, nuevoIngrediente]);
    setNuevoIngrediente({ nombre: "", cantidad: "", tipo: "" });
    setFormularioVisible(false);
  };

  const manejarCambioIngrediente = (event, newValue) => {
    if (newValue) {
      setIngredientesSeleccionados([...ingredientesSeleccionados, newValue]);
      setIngredienteSeleccionado(null);
    }
  };

  const eliminarIngrediente = (ingrediente) => {
    setIngredientesSeleccionados(
      ingredientesSeleccionados.filter((ing) => ing !== ingrediente)
    );
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">Categorias</h1>
        <FormControl fullWidth className="mb-4">
          <Autocomplete
            value={categoria}
            onChange={manejarCambioCategoria}
            options={categorias.filter(
              (cat) => !categoriasSeleccionadas.includes(cat)
            )}
            renderInput={(params) => (
              <TextField {...params} label="Categoría" />
            )}
          />

          {categoriasSeleccionadas.map((categoria) => (
            <Chip
              key={categoria}
              label={categoria}
              onDelete={() => eliminarCategoria(categoria)}
              className="m-1"
            />
          ))}
        </FormControl>
        <button
          className="mt-4 px-4 py-2 bg-pink-200 text-black rounded hover:bg-pink-400 transition-colors duration-200"
          onClick={() => setPasoActual(pasoActual - 1)}
        >
          Retroceder
        </button>
      </div>
      <div className="w-1/2 p-4 flex flex-col">
        <h1 className="mb-4 text-2xl font-bold text-gray-700">Ingredientes</h1>

        <Autocomplete
          value={ingredienteSeleccionado}
          onChange={manejarCambioIngrediente}
          options={ingredientes.filter(
            (ing) => !ingredientesSeleccionados.includes(ing)
          )}
          getOptionLabel={(option) =>
            `${option.nombre} - ${option.cantidad} ${option.tipo}`
          }
          renderInput={(params) => (
            <TextField {...params} label="Buscar ingrediente" />
          )}
        />

        {ingredientesSeleccionados.map((ingrediente) => (
          <Chip
            key={ingrediente.nombre}
            label={`${ingrediente.nombre} - ${ingrediente.cantidad} ${ingrediente.tipo}`}
            onDelete={() => eliminarIngrediente(ingrediente)}
            className="m-1"
          />
        ))}

        <button onClick={() => setFormularioVisible(true)}>
          Agregar ingrediente
        </button>

        <Dialog
          open={formularioVisible}
          onClose={() => setFormularioVisible(false)}
        >
          <DialogTitle>Agregar ingrediente</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nombre"
              label="Nombre"
              type="text"
              fullWidth
              value={nuevoIngrediente.nombre}
              onChange={manejarCambioNuevoIngrediente}
            />
            <Select
              value={nuevoIngrediente.tipo}
              onChange={manejarCambioNuevoIngrediente}
              name="tipo"
              fullWidth
            >
              <MenuItem value={"Gramos"}>Gramos</MenuItem>
              <MenuItem value={"Unidades"}>Unidades</MenuItem>
              <MenuItem value={"Mililitros"}>Mililitros</MenuItem>
            </Select>
            <TextField
              margin="dense"
              name="cantidad"
              label="Cantidad"
              type="text"
              fullWidth
              value={nuevoIngrediente.cantidad}
              onChange={manejarCambioNuevoIngrediente}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFormularioVisible(false)}>
              Cancelar
            </Button>
            <Button onClick={agregarIngrediente}>Agregar</Button>
          </DialogActions>
        </Dialog>

        <button
          className="mt-4 px-4 py-2 bg-pink-200 text-black rounded hover:bg-pink-400 transition-colors duration-200"
          onClick={() => setPasoActual(pasoActual + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Paso2;
