import { useState, useEffect } from "react"
import { Layout } from "../components/Layout"

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState("")

  useEffect(() => {
    const newErrors = {}

    if (username && username.length < 3) {
      newErrors.username = "El nombre de usuario debe tener al menos 3 caracteres"
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "El correo no es válido"
    }

    if (password && password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    }

    setErrors(newErrors)
  }, [username, email, password])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!username.trim()) newErrors.username = "El nombre de usuario es obligatorio"
    if (!email.trim()) newErrors.email = "El correo es obligatorio"
    if (!password) newErrors.password = "La contraseña es obligatoria"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const newUser = { username, email, password }
    console.log(newUser)
    setSuccess("Usuario registrado con éxito")
    setUsername("")
    setEmail("")
    setPassword("")
    setErrors({})
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