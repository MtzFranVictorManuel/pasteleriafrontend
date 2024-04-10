import logo from "../imagenes/logo.jpeg";

function NavAdmin(){
    return(
        <nav className="flex items-center justify-between p-5 bg-pink-100">
        <a href="/productos">
          {" "}
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg" />
        </a>
        <div className="text-black text-lg">Administración</div>
        <div className="flex space-x-4">
          <button className="bg-pink-400 text-black px-2 py-1 rounded-lg">
            Pedidos
          </button>
          <button className="bg-pink-400 text-black rounded-lg px-2 py-1">
            Productos
          </button>
          <button className="bg-pink-400 text-black rounded-lg px-2 py-1">
            Cerrar Sesión
          </button>
        </div>
      </nav>
        
    );
}

export default NavAdmin;