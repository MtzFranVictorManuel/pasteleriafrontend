import { useState, useContext, useEffect } from "react";
import TarjetaDireccion from "../../components/Direcciones";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { PedidoContexto } from "./ContextoPedido";
import axios from "axios";
import { API_URL } from "../../services/Constantes.js";

function Paso1() {
  const { setPasoActual, setProductoDatosBasicos, productoDatosBasicos } =
    useContext(PedidoContexto);

  const [selectedValue, setSelectedValue] = useState("");

  const idUsuario = localStorage.getItem("token");
  var mensaje = "";


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleCardSelect = (idDireccion) => {
    setSelectedValue(idDireccion);
  };

  const [direcciones, setDirecciones] = useState([]);
  const obtenerDirecciones = async () => {
    try {
      const response = await axios.get(API_URL + "direccion/usuario/"+idUsuario);
      console.log(response.data);
      if(response.data.error)
      {
        mensaje="No hay direcciones registradas para este usuario.";
      }
      else{
        mensaje="";
        setDirecciones(response.data);
      }
    } catch (error) {
      console.error("Hubo un error al obtener las direcciones: ", error);
    }
  };

  useEffect(() => {
    obtenerDirecciones();
  }, []);

  const handleNext = () => {
    if (selectedValue === "") {
      alert("Debes seleccionar una dirección");
      return;
    }
    console.log(selectedValue);
    setProductoDatosBasicos({
      ...productoDatosBasicos,
      idDireccion: selectedValue,
    });
    setPasoActual(1);
  };

  const [open, setOpen] = useState(false);
  const [newDireccion, setNewDireccion] = useState({
    calle: "",
    numeroExterior: "",
    numeroInterior: null,
    colonia: "",
    codigoPostal: "",
    ciudad: "",
    estado: "",
  });

  const handleCambio = (event) => {
    setNewDireccion({
      ...newDireccion,
      [event.target.name]: event.target.value, 
    });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    try {
      const direccion = { ...newDireccion };
      if (direccion.numeroInterior === null) {
        delete direccion.numeroInterior;
      }
      console.log(direccion);
      const response = axios
        .post(API_URL + "direccion", newDireccion)
        .then((response) => {
          agregarDireccionUsuario(response.data.idDireccion);
        });
    } catch (error) {
      console.error("Hubo un error al agregar la dirección: ", error);
    }
    setNewDireccion({
      calle: "",
      numeroExterior: "",
      numeroInterior: "",
      colonia: "",
      codigoPostal: "",
      ciudad: "",
      estado: "",
    });

    handleClose();
  };

  function agregarDireccionUsuario(numeroDireccion) {
    console.log(numeroDireccion);
    try {
      axios
        .post(API_URL + "direccionUsuario", {
          idUsuario: idUsuario,
          idDireccion: numeroDireccion,
        })
        .then((response) => {
          console.log(response);
          obtenerDirecciones();
        });
    } catch (error) {
      console.error(
        "Hubo un error al agregar la dirección al usuario: ",
        error
      );
    }
  }

  return (
    <div className="flex flex-col items-center">
      <RadioGroup value={selectedValue} onChange={handleChange}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            {mensaje}
          </div>
          {direcciones.map((direccion) => (
            <FormControlLabel
              key={direccion.idDireccion}
              value={direccion.idDireccion.toString()}
              control={<Radio />}
              label={<TarjetaDireccion {...direccion} />}
            />
          ))}
        </div>
      </RadioGroup>

      <h2 className="text-xl font-bold mb-2">Otra dirección</h2>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Agregar dirección
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Agregar nueva dirección</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="calle"
            label="Calle"
            type="text"
            fullWidth
            value={newDireccion.calle}
            onChange={handleCambio}
          />
          <TextField
            margin="dense"
            name="numeroExterior"
            label="Número exterior"
            type="number"
            fullWidth
            value={newDireccion.numeroExterior}
            onChange={handleCambio}
          />
          <TextField
            margin="dense"
            name="numeroInterior"
            label="Número interior (opcional)"
            type="number"
            fullWidth
            value={newDireccion.numeroInterior}
            onChange={handleCambio}
          />
          <TextField
            margin="dense"
            name="colonia"
            label="Colonia"
            type="text"
            fullWidth
            value={newDireccion.colonia}
            onChange={handleCambio}
          />
          <TextField
            margin="dense"
            name="codigoPostal"
            label="Código postal"
            type="number"
            fullWidth
            value={newDireccion.codigoPostal}
            onChange={handleCambio}
          />
          <TextField
            margin="dense"
            name="ciudad"
            label="Ciudad"
            type="text"
            fullWidth
            value={newDireccion.ciudad}
            onChange={handleCambio}
          />
          <TextField
            margin="dense"
            name="estado"
            label="Estado"
            type="text"
            fullWidth
            value={newDireccion.estado}
            onChange={handleCambio}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      <div className="flex justify-between w-1/2">
        <a
          href="/cesta"
          className="mt-4 p-4 bg-red-300 rounded-lg"
          onClick={() => console.log("Cancelar")}
        >
          Cancelar
        </a>
        <button
          className="mt-4 p-4 bg-teal-300 rounded-lg"
          onClick={handleNext}
        >
          Siguiente paso
        </button>
      </div>
    </div>
  );
}

export default Paso1;
