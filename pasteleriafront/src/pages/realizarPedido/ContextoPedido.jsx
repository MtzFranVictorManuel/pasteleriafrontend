import { useState} from "react";

import HacerPedido from "./HacerPedido";
export const PedidoContexto = React.createContext();

function ContextoPedido() {
  const [pasoActual, setPasoActual] = useState(0);
  const [productoDatosBasicos, setProductoDatosBasicos] = useState([]);
  const [productoDatosExtras, setProductoDatosExtras] = useState([]);
  const [productoDatosFinales, setProductoDatosFinales] = useState([]);

  function enviarDatos(datos) {
    console.log(productoDatos);
  }
  return (
    <>
      <PedidoContexto.Provider
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
        <HacerPedido />
      </PedidoContexto.Provider>
    </>
  );
}

export default ContextoPedido;
