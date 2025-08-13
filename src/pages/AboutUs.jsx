import { Layout } from "../components/Layout"

const AboutUs = () => {
  return (
    <Layout>
      <div>
        <h1>Sobre Nosotros</h1>

        {/* Sección 1: De qué trata el proyecto */}
        <section>
          <h2>De qué trata el proyecto</h2>
          <p>
            Este proyecto es una tienda online donde los usuarios pueden explorar una variedad de productos,
            conocer sus detalles y, en el futuro, gestionar sus compras. La idea principal es ofrecer una
            experiencia simple, intuitiva y confiable para todos los visitantes.
          </p>
        </section>

        {/* Sección 2: A quién está dirigido */}
        <section>
          <h2>A quién está dirigido</h2>
          <p>
            Nuestro proyecto está pensado para cualquier persona interesada en adquirir productos de calidad
            de manera online, con facilidad y seguridad. Tanto compradores frecuentes como nuevos usuarios
            pueden navegar, buscar productos y conocer sus características rápidamente.
          </p>
        </section>

        {/* Sección 3: Qué tecnologías o enfoques se usaron */}
        <section>
          <h2>¿Qué tecnologías o enfoques se usaron?</h2>
          <p>
            Para construir este proyecto utilizamos React para la interfaz, aprovechando componentes y hooks
            para la gestión de estados y efectos. También se aplicaron buenas prácticas de UX/UI, validación
            de formularios y consumo de APIs externas como por ejemplo <a href="https://fakestoreapi.com/"></a>.
            Para darle una mejor vision y una mejor experiencia al usuario, implementamos una libreria para aplicar estilos llamada Boostrap, y un poco de CSS puro!
          </p>
        </section>
      </div>
    </Layout>
  )
}

export { AboutUs }