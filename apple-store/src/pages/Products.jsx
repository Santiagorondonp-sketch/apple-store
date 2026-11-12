import { useState, useEffect } from "react";
import ProductList from "../components/ProductList.jsx";
import PriceFilter from "../components/PriceFilter.jsx";
import Loading from "../components/Loading.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import EmptyMessage from "../components/EmptyMessage.jsx";
import { API_URL, esProductoTech, adaptarProducto } from "../productosApi.js";

// Esta página es el PADRE: controla los productos y el filtro
// "onAgregar" llega desde App y se lo pasamos hacia abajo (props)
function Products({ onAgregar }) {
  // Estado que almacena los productos
  const [products, setProducts] = useState([]);
  // Estados de carga y error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // Precio máximo escrito en el filtro ("" significa sin filtro)
  const [precioMaximo, setPrecioMaximo] = useState("");
  // Contador para volver a ejecutar el efecto al presionar "Intentar nuevamente"
  const [intento, setIntento] = useState(0);

  // Cargamos los productos cuando se monta el componente
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la API");
        return res.json();
      })
      .then((data) => {
        // Dejamos solo los productos tecnológicos y los adaptamos a nuestro formato
        const lista = data.products.filter(esProductoTech).map(adaptarProducto);
        setProducts(lista);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // La petición se canceló a propósito
        setError(true);
        setLoading(false);
      });

    // Cancelamos la petición si salimos de la página
    return () => {
      controller.abort();
    };
  }, [intento]);

  // Callback que el hijo (PriceFilter) llama para avisarnos el nuevo valor
  function manejarFiltro(valor) {
    setPrecioMaximo(valor);
  }

  // Callback del botón "Intentar nuevamente"
  function reintentar() {
    setIntento(intento + 1);
  }

  // Filtramos productos por precio (menor o igual al precio máximo)
  const productosFiltrados = products.filter(
    (producto) => precioMaximo === "" || producto.precio <= Number(precioMaximo)
  );

  // Elegimos qué mostrar según el estado
  let contenido;
  if (loading) {
    // 1) LOADING
    contenido = <Loading />;
  } else if (error) {
    // 2) ERROR
    contenido = (
      <ErrorMessage
        mensaje="No fue posible cargar los productos."
        onReintentar={reintentar}
      />
    );
  } else if (productosFiltrados.length === 0) {
    // 3) EMPTY
    contenido = <EmptyMessage mensaje="No encontramos productos dentro de este precio." />;
  } else {
    // 4) SUCCESS: pasamos los productos y el callback al hijo por props
    contenido = <ProductList productos={productosFiltrados} onAgregar={onAgregar} />;
  }

  return (
    <section className="contenedor seccion">
      <h1 className="titulo-pagina">Productos</h1>
      <p className="texto-suave">Explora nuestra selección y filtra por tu presupuesto.</p>
      <PriceFilter onFiltrar={manejarFiltro} />
      {contenido}
    </section>
  );
}

export default Products;
