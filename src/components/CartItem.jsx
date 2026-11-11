import { useCart } from "../context/CartContext";

export default function CartItem({ item }) {
  const { addToCart, decreaseQty, removeFromCart } = useCart();

  return (
    <article className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-info">
        <p className="category">{item.category}</p>
        <h3>{item.title}</h3>
        <p className="cart-item-price">₹{item.price.toFixed(2)} each</p>
        <button
          className="remove-button"
          type="button"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
      <div className="cart-item-actions">
        <div className="qty">
          <button
            type="button"
            aria-label={`Decrease quantity of ${item.title}`}
            onClick={() => decreaseQty(item.id)}
          >
            −
          </button>
          <span aria-label={`Quantity ${item.qty}`}>{item.qty}</span>
          <button
            type="button"
            aria-label={`Increase quantity of ${item.title}`}
            onClick={() => addToCart(item)}
          >
            +
          </button>
        </div>
        <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
      </div>
    </article>
  );
}
