import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ModalPago({ open, onClose, imagen }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pago</DialogTitle>
      <DialogContent>
        <img src={imagen} alt="Pago" style={{ width: '100%', height: 'auto' }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalPago;