import { useState } from "react"
import { Layout } from "../components/Layout"

const Dashboard = () => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)



  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!name || !price || !description) {
      setError("Debes completar todos los campos")
      return
    }

    if (name.length < 3) {
      setError("El nombre debe tener al menos 4 caracteres")
      return
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title: name,
      price: price,
      description: description,
      category: "",
      image: ""
    }

    // petición al backend mediante fetch -> método POST https://fakeproductapi.com/products
    const response = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })

    const data = await response.json()
    setProduct(data)
    setName("")
    setPrice("")
    setDescription("")
  }

  return (
    <Layout>
      <div className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
        <h1 className="fw-bold text-center mb-5 text-dark">Panel de Administración</h1>

        <section className="p-4 bg-white shadow-sm rounded">
          <h2 className="fw-semibold text-center mb-4 text-dark">Cargar nuevo producto</h2>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="form-group">
              <label className="fw-semibold">Nombre del producto:</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

            <div className="form-group">
              <label className="fw-semibold">Precio:</label>
              <input
                type="number"
                name="precio"
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div className="form-group">
              <label className="fw-semibold">Descripción:</label>
              <textarea
                name="descripcion"
                rows="4"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>

            {error && <p className="text-danger fw-semibold">{error}</p>}

            <button type="submit" className="btn btn-primary mt-2">
              Guardar producto
            </button>
          </form>

          {product && (
            <div className="mt-4 p-3 bg-light rounded shadow-sm">
              <h3 className="fw-bold text-dark">{product.title}</h3>
              <p className="text-dark fw-semibold">${product.price}</p>
              <p className="text-muted">{product.description}</p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  )
}

export { Dashboard }
