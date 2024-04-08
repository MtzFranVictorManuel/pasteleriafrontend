import {useState} from 'react';
import AgregarProducto from './AgregarProducto';
export const RegistroContext = React.createContext();

function Contexto() {
    const [pasoActual, setPasoActual] = useState(0);
    const [productoDatos, setProductoDatos] = useState([]);
    const [datosFinales, setDatosFinales] = useState([]);

    function enviarDatos(datos) {
        console.log(productoDatos);
    }
    return (
        <>
            <RegistroContext.Provider value={{ pasoActual, setPasoActual, productoDatos, setProductoDatos, datosFinales, setDatosFinales, enviarDatos }}>
                <AgregarProducto />
            </RegistroContext.Provider>
        </>
    )
}

export default Contexto;