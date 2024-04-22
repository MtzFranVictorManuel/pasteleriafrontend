import { useState } from "react";

import AgregarProducto from "./AgregarProducto";
export const RegistroContext = React.createContext();

function Contexto() {
  const [pasoActual, setPasoActual] = useState(0);
  const [productoDatosBasicos, setProductoDatosBasicos] = useState([]);
  const [productoDatosExtras, setProductoDatosExtras] = useState([]);
  const [productoDatosFinales, setProductoDatosFinales] = useState([]);

  function enviarDatos(datos) {
    console.log(productoDatos);
  }
  return (
    <>
      <RegistroContext.Provider
        value={{
          pasoActual,
          setPasoActual,
          productoDatosBasicos,
          setProductoDatosBasicos,
          productoDatosExtras,
          setProductoDatosExtras,
          productoDatosFinales,
          setProductoDatosFinales,
        }}
      >
        <AgregarProducto />
      </RegistroContext.Provider>
    </>
  );
}

export default Contexto;
