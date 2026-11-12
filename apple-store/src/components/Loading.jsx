// Estado LOADING: mensaje y un spinner hecho con CSS
function Loading() {
  return (
    <div className="mensaje-estado">
      <div className="spinner"></div>
      <p>Cargando productos...</p>
    </div>
  );
}

export default Loading;
