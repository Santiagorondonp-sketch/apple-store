import { useState } from "react";

// Formulario controlado. Recibe del padre la función "onFiltrar" (callback)
function PriceFilter({ onFiltrar }) {
  // Estado local: lo que el usuario escribe en el input
  const [valor, setValor] = useState("");

  // Se ejecuta cada vez que el usuario escribe
  function manejarCambio(e) {
    setValor(e.target.value);
    onFiltrar(e.target.value); // HIJO -> CALLBACK -> PADRE (la lista se actualiza en tiempo real)
  }

  // Se ejecuta al presionar "Filtrar"
  function manejarEnvio(e) {
    e.preventDefault(); // Evita que la página se recargue
    onFiltrar(valor); // Avisamos al padre con el valor actual
  }

  return (
    <form className="filtro" onSubmit={manejarEnvio}>
      <label htmlFor="precioMaximo">Precio máximo</label>
      <input
        id="precioMaximo"
        type="number"
        min="0"
        placeholder="Ej: 4000000"
        value={valor}
        onChange={manejarCambio}
      />
      <button type="submit" className="boton">Filtrar</button>
    </form>
  );
}

export default PriceFilter;
