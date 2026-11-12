import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../productosApi.js";

// Recibe UN producto y el callback "onAgregar" por props (PADRE -> HIJO)
function ProductCard({ producto, onAgregar }) {
  // Estado para mostrar "Agregado" un momento después de presionar el botón
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!agregado) return;
    // Después de 1.2 segundos volvemos al texto normal del botón
    const temporizador = setTimeout(() => setAgregado(false), 1200);
    // Limpiamos el temporizador si salimos de la página antes de tiempo
    return () => clearTimeout(temporizador);
  }, [agregado]);

  function manejarAgregar() {
    onAgregar(producto); // HIJO -> CALLBACK -> PADRE (App guarda el carrito)
    setAgregado(true);
  }

  return (
    <article className="card">
      <div className="card-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <span className="etiqueta">{producto.categoria}</span>
      <h3>{producto.nombre}</h3>
      <p className="card-precio">{formatearPrecio(producto.precio)}</p>
      <p className="card-descripcion">{producto.descripcion}</p>
      <div className="card-acciones">
        {/* El id del producto viaja en la URL: /productos/1 */}
        <Link to={`/productos/${producto.id}`} className="boton boton-completo">
          Ver producto
        </Link>
        <button className="boton boton-secundario boton-completo" onClick={manejarAgregar}>
          {agregado ? "Agregado ✓" : "Agregar al carrito"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
