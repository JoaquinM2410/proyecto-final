import { Layout } from "../components/Layout"

const AboutUs = () => {
  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
        <h1 className="fw-bold text-center mb-5 text-dark">Sobre Nosotros</h1>

        {/* Sección 1: De qué trata el proyecto */}
        <section className="mb-5 p-4 bg-white shadow-sm rounded">
          <h2 className="fw-semibold text-center mb-3 text-dark">De qué trata el proyecto</h2>
          <p className="text-muted fs-5">
            Este proyecto es una tienda online donde los usuarios pueden explorar una variedad de productos,
            conocer sus detalles y, en el futuro, gestionar sus compras. La idea principal es ofrecer una
            experiencia simple, intuitiva y confiable para todos los visitantes.
          </p>
        </section>

        {/* Sección 2: A quién está dirigido */}
        <section className="mb-5 p-4 bg-white shadow-sm rounded">
          <h2 className="fw-semibold text-center mb-3 text-dark">A quién está dirigido</h2>
          <p className="text-muted fs-5">
            Nuestro proyecto está pensado para cualquier persona interesada en adquirir productos de calidad
            de manera online, con facilidad y seguridad. Tanto compradores frecuentes como nuevos usuarios
            pueden navegar, buscar productos y conocer sus características rápidamente.
          </p>
        </section>

        {/* Sección 3: Qué tecnologías o enfoques se usaron */}
        <section className="mb-5 p-4 bg-white shadow-sm rounded">
          <h2 className="fw-semibold text-center mb-3 text-dark">¿Qué tecnologías o enfoques se usaron?</h2>
          <p className="text-muted fs-5">
            Para construir este proyecto utilizamos React para la interfaz, aprovechando componentes y hooks
            para la gestión de estados y efectos. También se aplicaron buenas prácticas de UX/UI, validación
            de formularios y consumo de APIs externas como por ejemplo <a href="https://fakestoreapi.com/" className="text-primary">Fakestore API</a>.
            Para darle una mejor visión y una mejor experiencia al usuario, implementamos una librería para aplicar estilos llamada Bootstrap, y un poco de CSS puro!
          </p>
        </section>
      </div>
    </Layout>
  )
}

export { AboutUs }