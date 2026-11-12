// Direcciones de la API pública (DummyJSON)
export const API_URL = "https://dummyjson.com/products?limit=200";
export const API_PRODUCTO_URL = "https://dummyjson.com/products/";

// La API trae precios en dólares. Los convertimos a pesos con una tasa fija sencilla
const TASA_COP = 4000;

// Categorías de la API que nos sirven para una tienda tecnológica
const categoriasTech = ["smartphones", "laptops", "tablets", "mobile-accessories"];

// Nombre en español que mostramos para cada categoría de la API
const nombresCategoria = {
  smartphones: "Celulares",
  laptops: "Portátiles",
  tablets: "Tablets",
  "mobile-accessories": "Accesorios",
  "mens-watches": "Relojes",
  "womens-watches": "Relojes",
};

// Devuelve true si el producto es tecnológico (o es un Apple Watch)
export function esProductoTech(p) {
  const esCategoriaTech = categoriasTech.includes(p.category);
  const esAppleWatch = p.title.toLowerCase().includes("apple watch");
  return esCategoriaTech || esAppleWatch;
}

// Convierte el producto de la API en el objeto que usa nuestra tienda
export function adaptarProducto(p) {
  return {
    id: p.id,
    nombre: p.title,
    precio: Math.round((p.price * TASA_COP) / 1000) * 1000,
    descripcion: p.description,
    categoria: nombresCategoria[p.category] || "Tecnología",
    imagen: p.thumbnail,
  };
}

// Muestra el precio con formato: $ 4.400.000 COP
export function formatearPrecio(valor) {
  return "$ " + valor.toLocaleString("es-CO") + " COP";
}
