import { useContext } from "react";
import { RegistroContext } from "./Contexto";

function Paso2() {
    const { pasoActual, setPasoActual } = useContext(RegistroContext);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100">
      <h1 className="mb-4 text-2xl font-bold text-gray-700">Paso 2</h1>
      <p className="mb-8 text-gray-600">Ingrese los datos extra del producto</p>
      <button onClick={() => setPasoActual(pasoActual + 1)}>Siguiente</button>
      <button onClick={() => setPasoActual(pasoActual - 1)}>Retroceder</button>
    </div>
  );
}

export default Paso2;
