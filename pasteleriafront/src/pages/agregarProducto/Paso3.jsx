import {useContext} from 'react';
import {RegistroContext} from './Contexto';


function Paso3() {
    const {setPasoActual}=useContext(RegistroContext);
    return (
        <div>
            <h1>Paso 3</h1>
            <button onClick={()=>setPasoActual(3)}>Siguiente</button>
        </div>
    )
}

export default Paso3