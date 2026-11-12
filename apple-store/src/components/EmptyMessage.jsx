// Estado EMPTY: el filtro no encontró productos
function EmptyMessage({ mensaje }) {
  return (
    <div className="mensaje-estado">
      <p>{mensaje}</p>
    </div>
  );
}

export default EmptyMessage;
