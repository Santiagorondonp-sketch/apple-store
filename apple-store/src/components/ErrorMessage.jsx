// Estado ERROR: muestra el mensaje y, si el padre envía un callback, el botón para reintentar
function ErrorMessage({ mensaje, onReintentar }) {
  return (
    <div className="mensaje-estado">
      <p>{mensaje}</p>
      {onReintentar && (
        <button className="boton" onClick={onReintentar}>
          Intentar nuevamente
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
