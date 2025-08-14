
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
      <h1>Inicia sesión</h1>

      <section>
        <h2>Hola, bienvenido de nuevo</h2>
        <p>johnd, m38rmF$</p>
        <form onSubmit={handleLogin}>
          <div>
            <label>Nombre de usuario:</label>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button>Ingresar</button>

          {error && (
            <div>
              {error} <Link to="/registrate">Registrarse</Link>
            </div>
          )}
        </form>
      </section>
    </Layout>
  )
}

export { Login }