import { Link, NavLink } from "react-router-dom";

// Recibe por props cuántas unidades hay en el carrito (PADRE -> HIJO)
function Navbar({ cantidadCarrito }) {
  return (
    <header className="navbar">
      <div className="navbar-contenido contenedor">
        <Link to="/" className="logo">
          Apple Store
        </Link>
        <nav className="menu">
          {/* "end" evita que Inicio quede marcado en todas las rutas */}
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
          <NavLink to="/carrito">
            Carrito
            {cantidadCarrito > 0 && <span className="badge">{cantidadCarrito}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
