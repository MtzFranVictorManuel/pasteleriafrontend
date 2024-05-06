function TarjetaDireccion({ idDireccion,calle, colonia, codigoPostal, ciudad, estado,numeroExterior,numeroInterior }) {
    return (
      <div className="p-4 bg-white shadow rounded flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <h2 className="text-xl font-bold mb-2">Dirección</h2>
          <p className="mb-1"><strong>Calle:</strong> {calle}</p>
          <p className="mb-1"><strong>Colonia:</strong> {colonia}</p>
          <p className="mb-1"><strong>Código Postal:</strong> {codigoPostal}</p>
        </div>
        <div className="md:w-1/2">
          
          <p className="mb-1"><strong>Ciudad:</strong> {ciudad}</p>
          <p className="mb-1"><strong>Estado:</strong> {estado}</p>
          <p className="mb-1"><strong>Número Exterior:</strong> {numeroExterior}</p>
          <p className="mb-1"><strong>Número Interior:</strong> {numeroInterior}</p>
        </div>
      </div>
    );
}
  
export default TarjetaDireccion;