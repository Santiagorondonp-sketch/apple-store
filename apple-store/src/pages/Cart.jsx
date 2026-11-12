import { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import EmptyMessage from "../components/EmptyMessage.jsx";
import { formatearPrecio } from "../productosApi.js";

// Recibe el carrito y las funciones para modificarlo por props (App es el PADRE)
function Cart({ carrito, onCambiarCantidad, onQuitar, onVaciar }) {
  // Estado para mostrar el mensaje cuando se "finaliza" la compra
  const [compraFinalizada, setCompraFinalizada] = useState(false);

  // Total a pagar: suma de precio x cantidad de cada producto
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  function finalizarCompra() {
    onVaciar(); // Le pedimos al padre que vacíe el carrito
    setCompraFinalizada(true);
  }

  let contenido;
  if (compraFinalizada) {
    contenido = (
      <div className="mensaje-estado">
        <p>¡Gracias por tu compra! Este es un proyecto académico, no se realizó ningún cobro.</p>
        <Link to="/productos" className="boton">Seguir explorando</Link>
      </div>
    );
  } else if (carrito.length === 0) {
    contenido = (
      <div>
        <EmptyMessage mensaje="Tu carrito está vacío." />
        <div className="texto-centrado">
          <Link to="/productos" className="boton">Ver productos</Link>
        </div>
      </div>
    );
  } else {
    contenido = (
      <div className="carrito-layout">
        <div className="lista-carrito">
          {/* Una fila por producto, con su id como key */}
          {carrito.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onCambiarCantidad={onCambiarCantidad}
              onQuitar={onQuitar}
            />
          ))}
        </div>

        <aside className="resumen">
          <h2>Resumen</h2>
          <div className="resumen-fila">
            <span>Unidades</span>
            <span>{unidades}</span>
          </div>
          <div className="resumen-fila resumen-total">
            <span>Total</span>
            <span>{formatearPrecio(total)}</span>
          </div>
          <button className="boton" onClick={finalizarCompra}>Finalizar compra</button>
          <button className="boton boton-secundario" onClick={onVaciar}>Vaciar carrito</button>
        </aside>
      </div>
    );
  }

  return (
    <section className="contenedor seccion">
      <h1 className="titulo-pagina">Carrito</h1>
      <p className="texto-suave">Revisa tus productos antes de finalizar.</p>
      {contenido}
    </section>
  );
}

export default Cart;
