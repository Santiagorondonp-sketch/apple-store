import { Link } from "react-router-dom";

// Footer reutilizable: se dibuja en App.jsx debajo de todas las páginas
function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer-contenido">
        <div>
          <p className="footer-titulo">Apple Store</p>
          <p className="texto-suave">Proyecto académico desarrollado con React + Vite.</p>
        </div>
        <nav className="footer-links">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>
      </div>
      <p className="footer-copy">© 2026 Apple Store - Proyecto académico</p>
    </footer>
  );
}

export default Footer;
