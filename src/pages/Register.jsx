import { useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")
  const { register, setUser } = useAuth()  // Contexto global

  // Validación simple
  const validate = () => {
    const newErrors = {}
    if (!username.trim()) newErrors.username = "El nombre de usuario es obligatorio"
    if (!email.trim()) newErrors.email = "El correo es obligatorio"
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Correo inválido"
    if (!password) newErrors.password = "La contraseña es obligatoria"
    else if (password.length < 6) newErrors.password = "Debe tener al menos 6 caracteres"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccess("")

    if (!validate()) return

    const newUser = {
      email,
      username,
      password
    }

    try {
      // Llamada al endpoint de FakeStoreAPI
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      })

      if (!response.ok) {
        throw new Error("Error al registrar usuario")
      }

      const data = await response.json()
      console.log("Usuario registrado:", data)

      // Conectamos con la función register() del contexto global
      if (register) register(data)  // esto depende de cómo lo tengas definido en tu contexto
      if (setUser) setUser(true)    // simulamos el inicio de sesión

      setSuccess("Usuario registrado con éxito")
      setUsername("")
      setEmail("")
      setPassword("")
      setErrors({})

    } catch (error) {
      console.error(error)
      setErrors({ general: "No se pudo registrar el usuario" })
    }
  }

  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
        <h1 className="fw-bold text-center mb-4 text-dark">Registrate</h1>

        <form onSubmit={handleSubmit} className="p-4 bg-white shadow-sm rounded d-flex flex-column gap-3">
          <div className="form-group">
            <label className="fw-semibold">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div className="text-danger mt-1">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label className="fw-semibold">Correo electrónico:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="fw-semibold">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary mt-2">
            Registrarse
          </button>

          {errors.general && <div className="text-danger mt-2">{errors.general}</div>}
          {success && <div className="text-success mt-2">{success}</div>}
        </form>
      </div>
    </Layout>
  )
}

export { Register }