import { useEffect, useRef } from "react";
import NavBarSinLogin from "./NavBarSinLogin";
import ScrollIntoViewIfNeeded from 'react-scroll-into-view-if-needed';

function PaginaPrincipal() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, 9);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBarSinLogin />

      <header className="text-center py-5">
        <h1 className="text-3xl font-pacifico m-2 text-pink-300">
          Bienvenido a Repostería Rosario
        </h1>
        <p className="text-xl font-fjalla text-pink-300">
          Los mejores dulces y pasteles a tu alcance
        </p>
      </header>

      <main className="flex-grow grid grid-cols-3 gap-4 p-5">
        {Array(9)
          .fill()
          .map((_, i) => (
            <ScrollIntoViewIfNeeded
              key={i}
              options={{
                behavior: "smooth",
                block: "nearest",
                inline: "nearest",
              }}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <a
                href={`/producto/${i + 1}`}
                className="block transform transition-transform duration-200 hover:scale-105"
              >
                <div className="flex flex-col items-center justify-center p-5 bg-gray-200 rounded-lg shadow-lg">
                  <h2 className="text-xl font-bold mb-2">Producto {i + 1}</h2>
                  <div className="w-36 h-36 bg-gray-300 rounded-lg mb-2"></div>
                  <p className="mb-2">Descripción del producto...</p>
                  <p className="text-lg font-bold">$100</p>
                </div>
              </a>
            </ScrollIntoViewIfNeeded>
          ))}
      </main>

      <footer className="py-5 text-center bg-teal-100">
        <p>© 2024 Reposteria Rosario. Todos los derechos reservados.</p>
      </footer>

      <a href="https://wa.me/1234567890?text=Hola%20estoy%20interesado%20en%20sus%20productos" 
         className="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded-full" 
         target="_blank" 
         rel="noopener noreferrer">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="24" height="24" />
      </a>
    </div>
  );
}

export default PaginaPrincipal;
