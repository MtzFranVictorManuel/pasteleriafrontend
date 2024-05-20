
import logo from "../imagenes/logo.jpeg";
import prueba from "../imagenes/prueba.png";


function NavBarSinLogin() {
  return (
    <div>
      <nav className="relative flex items-center justify-between p-5 bg-teal-100 border-b-4 border-teal-200" style={{height: '100px'}}>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <a href="/" className="flex items-center space-x-2">
            <div className="text-black font-pacifico">Reposteria</div>
            <img src={prueba} alt="Logo" className="w-24 h-24 rounded-full" style={{top: '50%', position: 'relative'}}/>
            <div className="text-black font-pacifico">Rosario</div>
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="/pasteles-y-gelatinas" className="text-black text-lg mx-3 hover:bg-pink-400 rounded-lg p-2 font-fjalla">Pasteles y Gelatinas</a>
          <a href="/dulces" className="text-black text-lg mx-4 hover:bg-pink-400 rounded-lg p-2 font-fjalla">Dulces</a>
          <a href="/extras" className="text-black text-lg mx-4 hover:bg-pink-400 rounded-lg p-2 font-fjalla">Extras</a>
        </div>
        <div className="flex space-x-4">
        <a
            className="text-xl text-black rounded-lg p-2 hover:bg-pink-400  font-fjalla"
            href="/registrar"
          >
            Registro
          </a>
          <a
            className="text-xl text-black rounded-lg p-2 hover:bg-pink-400  font-fjalla"
            href="/iniciarSesion"
          >
            Iniciar sesion
          </a>
        </div>
      </nav>
    </div>
  );
}

export default NavBarSinLogin;
