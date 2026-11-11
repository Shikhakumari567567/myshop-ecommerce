import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { count } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="logo">MyShop</Link>
      <div className="navbar-actions">
        <nav className="nav-links" aria-label="Main navigation">
          <Link to="/#collections">Shop</Link>
          <a href="/#about">About</a>
          <Link className="cart-nav-link" to="/cart">
            Bag <span>{count}</span>
          </Link>
          {user ? (
            <>
              <span className="hello">Hi, {user.name.split(" ")[0]}</span>
              <button className="danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}