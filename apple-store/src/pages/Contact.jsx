import { useState } from "react";

function Contact() {
  // Estado que guarda lo que el usuario escribe en cada campo
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });
  // Estado para mostrar el mensaje de éxito
  const [enviado, setEnviado] = useState(false);

  // Actualiza solo el campo que cambió (usa el atributo "name" del input)
  function manejarCambio(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  }

  // Se ejecuta al enviar el formulario
  function manejarEnvio(e) {
    e.preventDefault(); // Evita que la página se recargue
    setEnviado(true);
    // Limpiamos los campos
    setFormulario({ nombre: "", correo: "", asunto: "", mensaje: "" });
  }

  return (
    <section className="contenedor seccion contacto">
      <h1 className="titulo-pagina">Contacto</h1>
      <p className="texto-suave">Escríbenos y te responderemos pronto.</p>

      {enviado && (
        <p className="exito">Gracias por contactarnos. Hemos recibido tu mensaje.</p>
      )}

      <form className="formulario" onSubmit={manejarEnvio}>
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="correo">Correo</label>
        <input
          id="correo"
          name="correo"
          type="email"
          value={formulario.correo}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="asunto">Asunto</label>
        <input
          id="asunto"
          name="asunto"
          type="text"
          value={formulario.asunto}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={formulario.mensaje}
          onChange={manejarCambio}
          required
        ></textarea>

        <button type="submit" className="boton">Enviar mensaje</button>
      </form>
    </section>
  );
}

export default Contact;
