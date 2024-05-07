import { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { PedidoContexto } from "./ContextoPedido";
import Paso1 from "./Paso1";
import Paso2 from "./Paso2";
import Paso3 from "./Paso3";

function AgregarProducto() {

  const { pasoActual, datosFinales } = useContext(PedidoContexto);
  const { setDatosBasicos, setDatosExtras, setDatosFinales } = useContext(PedidoContexto);


  function mostrarPasos(paso) {
    console.log(paso);
    switch (paso) {
      case 0:
        return <Paso1 setDatosBasicos={setDatosBasicos} />;
      case 1:
        return <Paso2 setDatosExtras={setDatosExtras}/>;
      case 2:
        return <Paso3 setDatosFinales={setDatosFinales}/>;
    }
  }

      return (
    <>
      <div className="flex justify-center items-center text-3xl font-bold py-5 bg-teal-100">
      <Stepper activeStep={pasoActual} className="w-2/3">
        <Step>
          <StepLabel>Direcciones</StepLabel>
        </Step>
        <Step>
          <StepLabel>Forma de pago</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finalizar pedido</StepLabel>
        </Step>
      </Stepper>
      </div>
      <div className="py-5">
      {mostrarPasos(pasoActual)}
      </div>
    </>
  );
}


export default AgregarProducto;