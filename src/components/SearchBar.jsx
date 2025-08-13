import { useEffect, useState } from "react";

const SearchBar = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const result = products.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, products]);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Buscar producto</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length > 0 ? (
        <ul className="list-group">
          {filtered.map(product => (
            <li key={product.id} className="list-group-item">
              {product.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron productos</p>
      )}
    </div>
  );
};

export { SearchBar }