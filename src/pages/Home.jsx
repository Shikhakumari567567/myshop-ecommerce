import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const heroImage =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://fakestoreapi.com/products", { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Products could not be loaded.");
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setError("");
      })
      .catch((fetchError) => {
        if (fetchError.name !== "AbortError") {
          setError("We couldn't load products. Please check your connection and try again.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );
  const catalogMax = Math.ceil(
    Math.max(100, ...products.map((product) => product.price))
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return (
        matchesQuery &&
        (category === "all" || product.category === category) &&
        product.price <= maxPrice
      );
    });

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") {
      result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    }
    return result;
  }, [products, query, category, maxPrice, sort]);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">THE EVERYDAY EDIT · NEW SEASON</p>
          <h1>Good things.<br />Thoughtfully chosen.</h1>
          <p className="hero-description">
            Discover considered essentials for your wardrobe, home, and everyday life.
          </p>
          <a className="button button-dark hero-cta" href="#collections">
            Explore the collection <span aria-hidden="true">→</span>
          </a>
          <div className="hero-note">
            <span className="hero-note-mark" aria-hidden="true">✳</span>
            Curated finds, made for real life
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={heroImage}
            alt="A shopper exploring a thoughtfully curated clothing collection"
          />
          <span className="hero-image-label">A little more you, every day.</span>
        </div>
        <div className="hero-index" aria-hidden="true">CURATED EDITION · 01</div>
      </section>

      <section className="benefit-strip" aria-label="Shopping benefits">
        <p><span aria-hidden="true">✳</span> Curated quality</p>
        <p><span aria-hidden="true">↗</span> Easy, secure checkout</p>
        <p><span aria-hidden="true">♡</span> Made for everyday living</p>
      </section>

      <section className="collection-section" id="collections">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR NEXT FAVORITE</p>
            <h2>Shop the collection</h2>
            <p className="section-subtitle">
              Everyday essentials, selected with care.
            </p>
          </div>
          <label className="search-field">
            <span className="sr-only">Search products</span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
        </div>

        <div className="catalog-layout">
          <aside className="filter-panel" aria-label="Product filters">
            <div className="filter-heading">
              <h3>Filters</h3>
              <button
                className="text-button"
                type="button"
                onClick={() => {
                  setCategory("all");
                  setMaxPrice(catalogMax);
                  setQuery("");
                }}
              >
                Clear
              </button>
            </div>

            <fieldset className="filter-group">
              <legend>Category</legend>
              <label className="filter-option">
                <input
                  type="radio"
                  name="category"
                  checked={category === "all"}
                  onChange={() => setCategory("all")}
                />
                <span>All products</span>
              </label>
              {categories.map((item) => (
                <label className="filter-option" key={item}>
                  <input
                    type="radio"
                    name="category"
                    checked={category === item}
                    onChange={() => setCategory(item)}
                  />
                  <span>{item}</span>
                </label>
              ))}
            </fieldset>

            <div className="filter-group">
              <label className="range-label" htmlFor="max-price">Price range</label>
              <div className="range-values">
                <span>₹0</span>
                <span>₹{maxPrice}</span>
              </div>
              <input
                id="max-price"
                className="price-range"
                type="range"
                min="0"
                max={catalogMax}
                value={Math.min(maxPrice, catalogMax)}
                onChange={(event) => setMaxPrice(Number(event.target.value))}
              />
            </div>
          </aside>

          <div className="catalog-main">
            <div className="catalog-toolbar">
              <p>
                {loading ? "Finding your favorites…" : `${filteredProducts.length} products`}
              </p>
              <label>
                <span>Sort by</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="rating">Top rated</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </label>
            </div>

            {loading && (
              <div className="catalog-message" role="status">
                <span className="loading-spinner" aria-hidden="true" />
                Loading the collection…
              </div>
            )}
            {error && (
              <div className="catalog-message error-message" role="alert">
                <p>{error}</p>
                <button className="button button-dark" onClick={() => window.location.reload()}>
                  Try again
                </button>
              </div>
            )}
            {!loading && !error && filteredProducts.length > 0 && (
              <div className="grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            {!loading && !error && filteredProducts.length === 0 && (
              <div className="catalog-message">
                <h3>No products found</h3>
                <p>Try another search or clear your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
