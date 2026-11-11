import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loadedProductId, setLoadedProductId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://fakestoreapi.com/products/${id}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("This product could not be found.");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setError("");
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setProduct(null);
          setError("We couldn't load this product. Please try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadedProductId(id);
      });

    return () => controller.abort();
  }, [id]);

  if (loadedProductId !== id) {
    return <p className="page-status" role="status">Loading product details…</p>;
  }

  if (error || !product) {
    return (
      <main className="page-status">
        <h1>We hit a small snag.</h1>
        <p>{error || "This product could not be found."}</p>
        <button className="button button-dark" onClick={() => navigate("/")}>
          Back to the collection
        </button>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <button className="back-link" onClick={() => navigate(-1)}>← Back to the collection</button>
      <section className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          {product.rating && (
            <p className="detail-rating">★ {product.rating.rate} <span>({product.rating.count} reviews)</span></p>
          )}
          <p className="detail-price">₹{product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <button
            className="button button-dark detail-add-button"
            onClick={() => addToCart(product)}
          >
            Add to bag <span aria-hidden="true">→</span>
          </button>
          <div className="detail-service-notes">
            <p>✓ Thoughtfully selected</p>
            <p>✓ Easy and secure checkout</p>
          </div>
        </div>
      </section>
    </main>
  );
}