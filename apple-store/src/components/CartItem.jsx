import { formatearPrecio } from "../productosApi.js";

// Una fila del carrito. Los datos llegan por props y los cambios suben con callbacks
function CartItem({ item, onCambiarCantidad, onQuitar }) {
  return (
    <article className="item-carrito">
      <div className="item-imagen">
        <img src={item.imagen} alt={item.nombre} />
      </div>

      <div className="item-info">
        <h3>{item.nombre}</h3>
        <p className="texto-suave">{formatearPrecio(item.precio)} c/u</p>
        <div className="cantidad">
          <button onClick={() => onCambiarCantidad(item.id, -1)} aria-label="Quitar una unidad">
            −
          </button>
          <span>{item.cantidad}</span>
          <button onClick={() => onCambiarCantidad(item.id, 1)} aria-label="Agregar una unidad">
            +
          </button>
        </div>
      </div>

      <div className="item-total">
        <p className="card-precio">{formatearPrecio(item.precio * item.cantidad)}</p>
        <button className="enlace-quitar" onClick={() => onQuitar(item.id)}>
          Quitar
        </button>
      </div>
    </article>
  );
}

export default CartItem;
