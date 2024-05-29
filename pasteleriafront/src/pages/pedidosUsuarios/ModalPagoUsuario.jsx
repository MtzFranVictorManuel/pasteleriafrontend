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

function ModalPagoUsuario({ open, cerrarModalPago }) {
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
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ModalPagoUsuario;
