import logo from "../imagenes/logo.jpeg";

function NavAdmin() {

    function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('rol');
        window.location.href = '/';
    }
    
    return (
      <nav className="flex items-center justify-between p-5 bg-pink-100">
        <div className="flex items-center space-x-2">
          <a href="/productos">
            <img src={logo} alt="Logo" className="w-16 h-16 rounded-lg" />
          </a>
          <div>Reposteria Rosario</div>
        </div>
        <div className="text-black text-lg">Administración</div>
        <div className="flex space-x-4">
          <a
            className="bg-pink-200 text-black px-2 py-1 rounded-lg hover:bg-pink-400"
            href="/pedidos"
          >
            Pedidos
          </a>
          <a
            className="bg-pink-200 text-black rounded-lg px-2 py-1 hover:bg-pink-400"
            href="/productos"
          >
            Productos
          </a>
          <button className="bg-pink-200 text-black rounded-lg px-2 py-1 hover:bg-pink-400"
          onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </nav>
    );
};

export default NavAdmin;
