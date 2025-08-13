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
      <div>
        <h1>Registrate</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            {errors.username && <div style={{ color: "red" }}>{errors.username}</div>}
          </div>

          <div>
            <label>Correo electrónico:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </div>

          <div>
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
          </div>

          <button type="submit">Registrarse</button>
          {errors.general && <div style={{ color: "red" }}>{errors.general}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}
        </form>
      </div>
    </Layout>
  )
}

export { Register }