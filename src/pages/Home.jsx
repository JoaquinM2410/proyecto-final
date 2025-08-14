import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { useAuth } from "../context/UserContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [showPopup, setShowPopup] = useState(null)
  const [productToEdit, setProductToEdit] = useState(null)
  const [titleEdit, setTitleEdit] = useState("")
  const [priceEdit, setPriceEdit] = useState("")
  const [descriptionEdit, setDescriptionEdit] = useState("")
  const [categoryEdit, setCategoryEdit] = useState("")
  const [imageEdit, setImageEdit] = useState("")
  const [search, setSearch] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const { user } = useAuth()

  // Traer productos desde la API
  const fetchingProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products")
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  // Filtrar productos según búsqueda
  useEffect(() => {
    const result = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(result)
  }, [search, products])

  const handleDelete = async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, { method: "DELETE" })

    if (response.ok) {
      setProducts(prevProduct => prevProduct.filter(product => product.id !== id))
    }
  }

  const handleOpenEdit = (product) => {
    setShowPopup(true)
    setProductToEdit(product)
    setTitleEdit(product.title)
    setPriceEdit(product.price)
    setDescriptionEdit(product.description)
    setCategoryEdit(product.category)
    setImageEdit(product.image)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updatedProduct = {
      id: productToEdit.id,
      title: titleEdit,
      price: Number(priceEdit),
      description: descriptionEdit,
      category: categoryEdit,
      image: imageEdit
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct)
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(prevProduct =>
          prevProduct.map(product =>
            product.id === productToEdit.id ? data : product
          )
        )
      }
      setShowPopup(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>

      <section className="container py-5 text-center" style={{ fontFamily: "Arial, sans-serif" }}>
        <h1 className="fw-bold mb-3 text-dark">Bienvenido a Nuestra Tienda</h1>
        <p className="text-muted fs-5">
          Descubrí una selección exclusiva de productos para vos. Calidad, confianza y atención personalizada.
        </p>
      </section>

      <section className="container py-5" style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#440213ff", borderRadius: "10px" }}>
        <h2 className="fw-bold text-center mb-4 text-dark">¿Por qué elegirnos?</h2>
        <ul className="list-unstyled row g-4">
          <li className="col-12 col-md-4 text-center">
            <div className="p-3 bg-white shadow-sm rounded h-100">
              <h3 className="fw-semibold mb-2 text-dark">Envíos a todo el país</h3>
              <p className="text-muted mb-0">
                Recibí tu compra en la puerta de tu casa estés donde estés.
              </p>
            </div>
          </li>
          <li className="col-12 col-md-4 text-center">
            <div className="p-3 bg-white shadow-sm rounded h-100">
              <h3 className="fw-semibold mb-2 text-dark">Pagos seguros</h3>
              <p className="text-muted mb-0">
                Trabajamos con plataformas que garantizan tu seguridad.
              </p>
            </div>
          </li>
          <li className="col-12 col-md-4 text-center">
            <div className="p-3 bg-white shadow-sm rounded h-100">
              <h3 className="fw-semibold mb-2 text-dark">Atención personalizada</h3>
              <p className="text-muted mb-0">
                Estamos disponibles para ayudarte en todo momento.
              </p>
            </div>
          </li>
        </ul>
      </section>

      <section className="container py-5" style={{ fontFamily: "Arial, sans-serif" }}>
        <h2 className="fw-bold text-center mb-3 text-dark">Nuestros productos</h2>
        <p className="text-center text-muted mb-4">
          Elegí entre nuestras categorías más populares.
        </p>

        {/* Barra de búsqueda integrada */}
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        />

        {/* Popup de edición */}
        {showPopup && (
          <section className="container py-4 p-3 bg-white shadow-sm rounded mt-4" style={{ maxWidth: "500px", fontFamily: "Arial, sans-serif" }}>
            <h2 className="fw-bold text-center mb-3 text-dark">Editando producto.</h2>
            <div className="text-center mb-3">
              <button className="btn btn-secondary btn-sm" onClick={() => setShowPopup(null)}>
                Cerrar
              </button>
            </div>
            <form onSubmit={handleUpdate} className="d-flex flex-column gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese el titulo"
                value={titleEdit}
                onChange={(e) => setTitleEdit(e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Ingrese el precio"
                value={priceEdit}
                onChange={(e) => setPriceEdit(e.target.value)}
              />
              <textarea
                className="form-control"
                placeholder="Ingrese la descripción"
                value={descriptionEdit}
                onChange={(e) => setDescriptionEdit(e.target.value)}
              ></textarea>
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese la categoria"
                value={categoryEdit}
                onChange={(e) => setCategoryEdit(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Ingrese la URL de la imagen"
                value={imageEdit}
                onChange={(e) => setImageEdit(e.target.value)}
              />
              <button className="btn btn-primary mt-2">Actualizar</button>
            </form>
          </section>
        )}

        {/* Listado filtrado */}
        <div
          className="container py-4"
          style={{ backgroundColor: "#440213ff", borderRadius: "10px" }}
        >
          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-12 col-md-6 col-lg-4">
                  <div className="p-1 bg-white shadow-sm rounded h-100 text-center" style={{ fontFamily: "Arial, sans-serif" }}>
                    <h2 className="h5 fw-bold text-dark">{product.title}</h2>
                    <img
                      width="70px"
                      src={product.image}
                      alt={`Imagen de ${product.title}`}
                      className="d-block mx-auto my-3"
                    />
                    <p className="text-dark fw-semibold">${product.price}</p>
                    <p className="text-muted">{product.description}</p>
                    <p>
                      <strong className="text-secondary">{product.category}</strong>
                    </p>
                    {user && (
                      <div className="d-flex justify-content-center gap-2 mt-3">
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleOpenEdit(product)}
                        >
                          Actualizar
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Borrar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center fw-bold text-secondary">
                No se encontraron productos
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export { Home }
