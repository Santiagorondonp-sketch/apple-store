import { Link } from "react-router-dom";

// Se muestra cuando la URL no coincide con ninguna ruta (path="*")
function NotFound() {
  return (
    <section className="contenedor seccion texto-centrado">
      <p className="numero-404">404</p>
      <h1 className="titulo-pagina">Página no encontrada</h1>
      <p className="texto-suave">La dirección que buscas no existe o fue movida.</p>
      <Link to="/" className="boton boton-grande">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;
