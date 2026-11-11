import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [placed, setPlaced] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Demo order:", { customer: form, items: cart, total });
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <main className="container checkout-page">
        <section className="order-success">
          <span className="success-mark" aria-hidden="true">✓</span>
          <h1>Order placed!</h1>
          <p>Thanks, {form.name}. Your demo order has been received.</p>
          <p className="demo-notice">No payment was collected.</p>
          <Link className="primary-link" to="/">Continue shopping</Link>
        </section>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="container checkout-page">
        <section className="order-success">
          <h1>Your cart is empty</h1>
          <p>Add something to your cart before checking out.</p>
          <Link className="primary-link" to="/">Continue shopping</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container checkout-page">
      <div className="checkout-heading">
        <p className="eyebrow">MYSHOP CHECKOUT</p>
        <h1>Complete your order</h1>
        <p>Review your items and enter your delivery details.</p>
      </div>

      <div className="checkout-layout">
        <section className="checkout-panel order-panel">
          <div className="panel-heading">
            <h2>Shopping cart</h2>
            <span>{cart.length} {cart.length === 1 ? "item" : "items"}</span>
          </div>

          <div className="checkout-items">
            {cart.map((item) => (
              <article className="checkout-item" key={item.id}>
                <div className="checkout-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="checkout-item-info">
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.qty}</p>
                  <p className="checkout-unit-price">₹{item.price.toFixed(2)} each</p>
                </div>
                <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
              </article>
            ))}
          </div>

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
          <div className="checkout-total-row">
            <span>Delivery</span>
            <strong className="free-delivery">Free</strong>
          </div>
          <div className="checkout-total-row grand-total">
            <span>Total</span>
            <strong>₹{total.toFixed(2)}</strong>
          </div>

          <Link className="continue-shopping" to="/cart">← Back to cart</Link>
        </section>

        <section className="checkout-panel payment-panel">
          <div className="panel-heading">
            <h2>Delivery details</h2>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Delivery address
              <textarea
                name="address"
                autoComplete="street-address"
                placeholder="Street, city, and postal code"
                rows="3"
                value={form.address}
                onChange={handleChange}
                required
              />
            </label>

            <div className="demo-payment">
              <span className="demo-payment-icon" aria-hidden="true">✓</span>
              <div>
                <strong>Demo checkout</strong>
                <p>No card details required. This demo does not charge you.</p>
              </div>
            </div>

            <button className="checkout-submit" type="submit">
              Place demo order · ₹{total.toFixed(2)}
            </button>
            <p className="checkout-disclaimer">
              This is a sample storefront checkout. No real payment is processed.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}
