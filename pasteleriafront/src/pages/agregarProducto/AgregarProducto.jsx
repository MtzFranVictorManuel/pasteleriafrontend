import { useContext } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import logo from "../../imagenes/logo.jpeg";
import { RegistroContext } from "./Contexto";
import Paso2 from "./Paso2";
import Paso1 from "./Paso1";
import Paso3 from "./Paso3";

function AgregarProducto() {
  const { pasoActual, datosFinales } = useContext(RegistroContext);

  function mostrarPasos(paso) {
    console.log(paso);
    switch (paso) {
      case 0:
        return <Paso1 />;
      case 1:
        return <Paso2 />;
      case 2:
        return <Paso3 />;
    }
  }
  return (
    <>
      <nav className="flex items-center justify-between p-5 bg-pink-400">
        <a href="/productos">
          {" "}
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </a>
        <div className="text-black text-lg">Administración</div>
        <div className="flex space-x-4">
          <button className="bg-pink-600 text-black rounded px-2 py-1">
            Pedidos
          </button>
          <button className="bg-pink-600 text-black rounded px-2 py-1">
            Productos
          </button>
          <button className="bg-pink-600 text-black rounded px-2 py-1">
            Cerrar Sesión
          </button>
        </div>
      </nav>
      <div className="flex justify-center items-center text-3xl font-bold mt-5">
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
      <div className="mt-5">
      {mostrarPasos(pasoActual)}
      </div>
    </>
  );
}

export default AgregarProducto;
