import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";


export default function Cart() {
  const { cart, total } = useCart();

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <span className="empty-bag-icon" aria-hidden="true">⌑</span>
          <p className="eyebrow">YOUR BAG</p>
          <h1>Your bag is taking a breather.</h1>
          <p>When something catches your eye, it will be waiting here.</p>
          <Link className="button button-dark" to="/#collections">Explore the collection</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Your shopping bag</h1>
        </div>
        <Link className="continue-shopping" to="/#collections">Continue shopping</Link>
      </div>

      <div className="cart-layout">
        <section className="cart-list" aria-label="Items in your shopping bag">
          {cart.map((item) => <CartItem key={item.id} item={item} />)}
        </section>
        <aside className="cart-summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal · {cart.reduce((count, item) => count + item.qty, 0)} items</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong className="free-delivery">Complimentary</strong>
          </div>
          <p className="summary-note">Shipping and taxes calculated at checkout.</p>
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
          <Link className="button button-dark checkout-link" to="/checkout">
            Continue to checkout <span aria-hidden="true">→</span>
          </Link>
          <p className="secure-note"><span aria-hidden="true">✓</span> Secure, protected checkout</p>
        </aside>
      </div>
    </main>
  );
}
