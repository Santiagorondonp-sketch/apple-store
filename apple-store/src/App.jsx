import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./App.css";

// Leemos el carrito guardado en el navegador (si existe)
function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  } catch {
    return [];
  }
}

// App enruta y también guarda el carrito, porque lo usan varias páginas
function App() {
  // Estado del carrito: arreglo de productos, cada uno con su cantidad
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  // Guardamos el carrito cada vez que cambia, para no perderlo al recargar
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  // Agrega un producto: si ya está, suma 1; si no, lo agrega con cantidad 1
  function agregarAlCarrito(producto) {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  }

  // Suma o resta unidades (cambio = 1 o -1). Si llega a 0, se elimina
  function cambiarCantidad(id, cambio) {
    const nuevoCarrito = carrito
      .map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + cambio } : item
      )
      .filter((item) => item.cantidad > 0);
    setCarrito(nuevoCarrito);
  }

  // Quita un producto del carrito
  function quitarDelCarrito(id) {
    setCarrito(carrito.filter((item) => item.id !== id));
  }

  // Deja el carrito vacío
  function vaciarCarrito() {
    setCarrito([]);
  }

  // Cantidad total de unidades (para el numerito del menú)
  const cantidadCarrito = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar cantidadCarrito={cantidadCarrito} />
        <main>
          <Routes>
            <Route path="/" element={<Home onAgregar={agregarAlCarrito} />} />
            <Route path="/productos" element={<Products onAgregar={agregarAlCarrito} />} />
            <Route path="/productos/:id" element={<ProductDetail onAgregar={agregarAlCarrito} />} />
            {/* Rutas equivalentes que pide la rúbrica del taller (/portafolio/:id) */}
            <Route path="/portafolio" element={<Products onAgregar={agregarAlCarrito} />} />
            <Route path="/portafolio/:id" element={<ProductDetail onAgregar={agregarAlCarrito} />} />
            <Route
              path="/carrito"
              element={
                <Cart
                  carrito={carrito}
                  onCambiarCantidad={cambiarCantidad}
                  onQuitar={quitarDelCarrito}
                  onVaciar={vaciarCarrito}
                />
              }
            />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            {/* Cualquier otra URL muestra la página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
