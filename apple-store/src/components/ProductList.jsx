import ProductCard from "./ProductCard.jsx";

// Recibe el arreglo de productos y el callback "onAgregar" por props (PADRE -> HIJO)
function ProductList({ productos, onAgregar }) {
  return (
    <div className="grid-productos">
      {/* Mostramos cada producto utilizando su id como key */}
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} onAgregar={onAgregar} />
      ))}
    </div>
  );
}

export default ProductList;
