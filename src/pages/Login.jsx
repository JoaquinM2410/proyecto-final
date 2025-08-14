
import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Debes completar todos los campos")
      return
    }

    const isLogin = await login(username, password)

    if (!isLogin) {
      setError("Usuario o contraseña incorrectos. Si no tenés cuenta, registrate.")
      return
    }

    setUsername("")
    setPassword("")
    navigate("/")
  }

  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
        <h1 className="fw-bold text-center mb-4 text-dark">Inicia sesión</h1>

        <section className="p-4 bg-white shadow-sm rounded">
          <h2 className="fw-semibold text-center mb-3 text-dark">Hola, bienvenido de nuevo</h2>
          <p className="text-center text-muted mb-4">johnd, m38rmF$</p>

          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            <div className="form-group">
              <label className="fw-semibold">Nombre de usuario:</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className="form-group">
              <label className="fw-semibold">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              Ingresar
            </button>

            {error && (
              <div className="text-danger mt-2">
                {error}{" "}
                <Link to="/registrate" className="text-decoration-none text-primary">
                  Registrarse
                </Link>
              </div>
            )}
          </form>
        </section>
      </div>
    </Layout>
  )
}

export { Login }