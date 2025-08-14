import { Link } from "react-router-dom"
import { useAuth } from "../context/UserContext"

const Header = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header>
      <header></header>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#440213ff" }}
      >
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/356/424/non_2x/vector-shop-icon.jpg"
              alt="Logo"
              style={{ height: "100px" }}
            />
          </Link>

          {/* Links siempre visibles */}
          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-semibold" to="/aboutUs">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-semibold" to="/">
                      Inicio
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-dark fw-semibold" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-dark ms-2"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-semibold" to="/aboutUs">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-semibold" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white fw-semibold" to="/registrate">
                      Registrate
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export { Header }


