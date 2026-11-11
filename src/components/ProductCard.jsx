import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/product/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.image} alt={product.title} loading="lazy" />
          <span className="product-category">{product.category}</span>
        </div>
      </Link>
      <div className="product-card-info">
        <div className="product-card-title-row">
          <Link className="product-title" to={`/product/${product.id}`}>
            {product.title}
          </Link>
          {product.rating?.rate && (
            <span className="product-rating" aria-label={`Rated ${product.rating.rate} out of 5`}>
              ★ {product.rating.rate}
            </span>
          )}
        </div>
        <div className="product-card-bottom">
          <strong>₹{product.price.toFixed(2)}</strong>
          <button
            className="add-button"
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? "Added ✓" : "Add to bag +"}
          </button>
        </div>
      </div>
    </article>
  );
}