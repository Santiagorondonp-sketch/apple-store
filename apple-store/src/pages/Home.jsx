import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductList from "../components/ProductList.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { API_URL, esProductoTech, adaptarProducto } from "../productosApi.js";

function Home({ onAgregar }) {
  // Estados para los productos destacados
  const [destacados, setDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Cargamos los productos cuando se monta el componente
  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then((data) => {
        const lista = data.products.filter(esProductoTech).map(adaptarProducto);
        setDestacados(lista.slice(0, 3)); // Solo los 3 primeros
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // Cancelamos nosotros: no es un error real
        setError(true);
        setLoading(false);
      });

    // Cancelamos la petición si salimos de la página
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div className="contenedor">
          <h1>Apple Store</h1>
          <p className="hero-subtitulo">Tecnología que se adapta a ti.</p>
          <p className="hero-texto">
            Descubre una selección de productos tecnológicos diseñados para acompañar tu día.
          </p>
          <Link to="/productos" className="boton boton-grande">Ver productos</Link>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="contenedor seccion">
        <h2 className="titulo-seccion">Productos destacados</h2>
        {loading && <Loading />}
        {error && <ErrorMessage mensaje="No fue posible cargar los productos." />}
        {!loading && !error && <ProductList productos={destacados} onAgregar={onAgregar} />}
      </section>

      {/* Características */}
      <section className="fondo-gris seccion">
        <div className="contenedor grid-caracteristicas">
          <div className="caracteristica">
            <h3>Diseño</h3>
            <p>Líneas limpias y materiales pensados para verse bien todos los días.</p>
          </div>
          <div className="caracteristica">
            <h3>Rendimiento</h3>
            <p>Equipos rápidos y fluidos para trabajar, estudiar y crear sin interrupciones.</p>
          </div>
          <div className="caracteristica">
            <h3>Innovación</h3>
            <p>Tecnología actual que simplifica tareas y abre nuevas posibilidades.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
