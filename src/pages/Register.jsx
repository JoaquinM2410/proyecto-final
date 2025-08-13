import { useState } from "react"
import { Layout } from "../components/Layout"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")

  const validate = () => {
    const newErrors = {}

    // Usuario
    if (!username.trim()) {
      newErrors.username = "El nombre de usuario es obligatorio"
    } else if (username.length < 3) {
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres"
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "El correo electrónico no es válido"
    }

    // Contraseña
    if (!password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess("")
    if (!validate()) return

    const newUser = { username, email, password }
    console.log(newUser)
    setSuccess("Usuario registrado con éxito")

    setUsername("")
    setEmail("")
    setPassword("")
  }

  return (
    <Layout>
      <h1>Registrate</h1>

      <section>
        <h2>Hola, bienvenido</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <div>{errors.username}</div>}
          </div>

          <div>
            <label>Correo electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div>{errors.email}</div>}
          </div>

          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div>{errors.password}</div>}
          </div>

          <button type="submit">Registrarse</button>
        </form>

        {success && <div>{success}</div>}
      </section>
    </Layout>
  )
}

export { Register }