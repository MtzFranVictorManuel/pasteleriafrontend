import { useDropzone } from "react-dropzone";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import qr from "../../imagenes/qr.png";
import placeholder from "../../imagenes/placeholder.png";
import axios from "axios";
import { API_URL } from "../../services/Constantes";

function ModalPagoUsuario({ open, cerrarModalPago, idPedido, idPago, fetchPedidos }) {
  const [src, setSrc] = useState(placeholder);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrc(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setSrc(placeholder);
      }
    },
  });

  const [confirmOpen, setConfirmOpen] = useState(false);

  function guardarImagenPago() {
    console.log("Guardar imagen de pago");
    console.log(idPago);
    console.log(src);
    axios
      .put(API_URL + "pedido_pago_imagen",
      {
        idPago: idPago,
        imagenPago64: src,
      }
      )
      .then((response) => {
        console.log(response.data);
        editarEstado();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function editarEstado() {
    console.log("Editar estado");
    axios
      .put(API_URL + "pedido_estado",
      {
        idPedido: idPedido,
        estado: "pagado",
      
      })
      .then((response) => {
        console.log(response.data);
        cerrarModalPago();
        fetchPedidos();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={cerrarModalPago}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Hacer pago</DialogTitle>
        <DialogContent>
          <div className="mt-2">
            <img src={qr} alt="QR Code" />
          </div>
          <h2 className="block text-gray-700 text-sm font-bold mb-2">
            Subir Comprobante de Pago
          </h2>
          <div {...getRootProps()} className="mt-2 h-52 w-52">
            <input {...getInputProps()} />
            {
              // Si no hay archivos seleccionados, muestra un placeholder
              acceptedFiles.length === 0 ? (
                <div>
                  <p>Arrastra tu archivo aquí</p>
                  <img src={placeholder} alt="Placeholder" />
                </div>
              ) : (
                <img src={src} alt="Dropped file" />
              )
            }
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModalPago} color="primary">
            Cerrrar
          </Button>
          <Button onClick={() => setConfirmOpen(true)} color="primary">
        Guardar
      </Button>
        </DialogActions>
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>
            ¿Estás seguro de que quieres guardar la imagen?
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => setConfirmOpen(false)} color="primary">
              Cancelar
            </Button>
            <Button onClick={guardarImagenPago} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </Dialog>
    </>
  );
}

export default ModalPagoUsuario;
