
import logo from "../imagenes/logo.jpeg";


function NavBarSinLogin() {
    return (
      <div>
        <nav className="flex items-center justify-between p-5 bg-pink-100">
          <div className="flex items-center space-x-2">
            <a href="/paginaPrincipal" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg" />
              <div className="text-lg">Reposteria Rosario</div>
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="/pasteles-y-gelatinas" className="bg-pink-200 text-black text-lg mx-3 hover:bg-pink-400 rounded-lg p-2">Pasteles y Gelatinas</a>
            <a href="/dulces" className="bg-pink-200 text-black text-lg mx-4 hover:bg-pink-400 rounded-lg p-2">Dulces</a>
            <a href="/extras" className="bg-pink-200 text-black text-lg mx-4 hover:bg-pink-400 rounded-lg p-2">Extras</a>
          </div>
          <div className="flex space-x-4">
            <a
              className="bg-pink-200 text-xl text-black rounded-lg p-2 hover:bg-pink-400 border-2 border-pink-400 "
              href="/iniciarSesion"
            >
              Iniciar sesion
            </a>
            <button className="bg-pink-200 text-xl text-black rounded-lg p-2 hover:bg-pink-400 border-2 border-pink-400"
            href="/registro">
              Registro
            </button>
          </div>
        </nav>
      </div>
    );
  }

export default NavBarSinLogin;
