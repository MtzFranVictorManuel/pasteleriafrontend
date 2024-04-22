import { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { RegistroContext } from "./Contexto";
import Paso2 from "./Paso2";
import Paso1 from "./Paso1";
import Paso3 from "./Paso3";
import NavBarAdmin from "../NavAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function AgregarProducto() {
  const { pasoActual, datosFinales } = useContext(RegistroContext);
  const { setDatosBasicos, setDatosExtras, setDatosFinales } = useContext(RegistroContext);


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
    <NavBarAdmin/>
      <div className="flex justify-center items-center text-3xl font-bold py-5 bg-pink-100">
      <Stepper activeStep={pasoActual} className="w-2/3">
        <Step>
          <StepLabel>Datos basicos</StepLabel>
        </Step>
        <Step>
          <StepLabel>Datos extras</StepLabel>
        </Step>
        <Step>
          <StepLabel>Finalizar</StepLabel>
        </Step>
      </Stepper>
      </div>
      <div className="py-5">
      {mostrarPasos(pasoActual)}
      </div>
      <ToastContainer />
    </>
  );
}

export default AgregarProducto;
