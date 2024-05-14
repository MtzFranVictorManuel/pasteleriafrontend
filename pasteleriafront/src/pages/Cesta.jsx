import NavBarSinLogin from "./NavBarSinLogin";

function Cesta() {
  return (
    <>
      <h1>cesta</h1>
      <a
        href="/hacerPedido"
        className="inline-block bg-pink-200 text-black text-lg px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Hacer Pedido
      </a>
    </>
  );
}

export default Cesta;
