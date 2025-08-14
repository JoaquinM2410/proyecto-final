import { Link } from "react-router-dom"
import { Layout } from "../components/Layout"

const NotFound = () => {
  return (
    <Layout>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center" style={{ fontFamily: "Arial, sans-serif" }}>
        <h1 className="fw-bold mb-3 text-dark">Página no encontrada</h1>
        <p className="text-muted mb-2">Lo sentimos, la página que estás buscando no existe.</p>
        <p className="text-muted mb-4">Verificá la URL o volvé al inicio.</p>
        <Link to="/" className="btn btn-primary">
          Ir a inicio
        </Link>
      </div>
    </Layout>
  )
}

export { NotFound }