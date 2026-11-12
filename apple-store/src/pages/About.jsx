function About() {
  return (
    <section className="contenedor seccion texto-centrado">
      <h1 className="titulo-pagina">Sobre Apple Store</h1>
      <p className="parrafo-grande">
        Apple Store es una tienda conceptual creada como proyecto académico para demostrar el
        desarrollo de una aplicación web utilizando React.
      </p>

      <div className="grid-dos">
        <div className="bloque">
          <h2>Misión</h2>
          <p>
            Ofrecer una experiencia digital sencilla, moderna y clara para explorar productos
            tecnológicos.
          </p>
        </div>
        <div className="bloque">
          <h2>Visión</h2>
          <p>
            Crear experiencias web intuitivas que combinen tecnología, diseño y facilidad de uso.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
