import { useState, useContext, useEffect } from "react";
import { PedidoContexto } from "./ContextoPedido";
import efectivoImage from '../../imagenes/efectivo.jpg';
import transferenciaImage from '../../imagenes/transferencia.jpg';


function Paso2() {



  const { setPasoActual, setProductoDatosExtras, productoDatosExtras } =
    useContext(PedidoContexto);

  const [tipoPago, setTipoPago] = useState("");

  const handleNext = () => {
    console.log(productoDatosExtras);
    console.log("Tipo de pago: ", productoDatosExtras.tipoPago);
    if (tipoPago === "") {
      alert("Debes seleccionar un tipo de pago");
      return;
    }
    console.log("Siguiente paso");
    setPasoActual(2);
  };
  const handlePrevious = () => {
    console.log("Paso Anterior");
    setPasoActual(0);
  }

  const handlecambioPago = (event) => {
    setTipoPago(event.target.value);
    setProductoDatosExtras({
      ...productoDatosExtras,
      tipoPago: event.target.value,
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <label className="p-4 bg-white shadow rounded flex flex-col items-center">
        <input
          type="radio"
          name="payment"
          value="efectivo"
          onChange={handlecambioPago}
        />
        <img src={efectivoImage} alt="Pago por efectivo" className="w-32 h-32" />
        <h2 className="text-xl font-bold mb-2">Pago por efectivo</h2>
        <p>Selecciona esta opción si deseas pagar en efectivo.</p>
      </label>
      <label className="p-4 bg-white shadow rounded flex flex-col items-center">
        <input
          type="radio"
          name="payment"
          value="transferencia"
          onChange={handlecambioPago}
        />
        <img src={transferenciaImage} alt="Pago por transferencia" className="w-32 h-32" />
        <h2 className="text-xl font-bold mb-2">Pago por transferencia</h2>
        <p>Selecciona esta opción si deseas pagar por transferencia bancaria.</p>
      </label>
    </div>

      <div className="flex justify-between">
        <a
          href="/cesta"
          className="mt-4 p-4 bg-red-300 rounded-lg"
          onClick={() => console.log("Cancelar")}
        >
          Cancelar
        </a>
        <button
          className="mt-4 p-4 bg-yellow-200 rounded-lg"
          onClick={handlePrevious}
        >
          Paso Anterior
        </button>
        <button
          className="mt-4 p-4 bg-teal-300 rounded-lg"
          onClick={handleNext}
        >
          Siguiente paso
        </button>
      </div>
    </>
  );
}

export default Paso2;
