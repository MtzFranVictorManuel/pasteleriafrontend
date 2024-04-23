import NavBarSinLogin from "./NavBarSinLogin";
import { Link, animateScroll as scroll } from "react-scroll";

function PaginaPrincipal() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarSinLogin />

      <header className="text-center py-5">
        <h1 className="text-4xl font-bold font-pacifico text-pink-400">
          Bienvenido a Reposteria Rosario
        </h1>
        <p className="text-xl font-pacifico">
          Los mejores dulces y pasteles a tu alcance
        </p>
      </header>

      <main className="flex-grow grid grid-cols-3 gap-4 p-5">
        {Array(9).fill().map((_, i) => (
          <Link to={`producto${i + 1}`} spy={true} smooth={true} duration={500}>
            <a href={`/producto/${i + 1}`} className="block transform transition-transform duration-200 hover:scale-105">
              <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-2">Producto {i + 1}</h2>
                <div className="w-36 h-36 bg-gray-300 rounded-lg mb-2"></div>
                <p className="mb-2">Descripción del producto...</p>
                <p className="text-lg font-bold">$100</p>
              </div>
            </a>
          </Link>
        ))}
        </main>

      <footer className="py-5 text-center bg-pink-100">
        <p>© 2022 Reposteria Rosario. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default PaginaPrincipal;
