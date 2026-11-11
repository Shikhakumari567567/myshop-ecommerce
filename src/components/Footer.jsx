import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (event) => {
    event.preventDefault();
    const subscribers = JSON.parse(localStorage.getItem("myshop-subscribers") || "[]");
    const normalizedEmail = email.trim().toLowerCase();

    if (subscribers.includes(normalizedEmail)) {
      setMessage("You're already on the list. Thanks for being here!");
      return;
    }

    localStorage.setItem(
      "myshop-subscribers",
      JSON.stringify([...subscribers, normalizedEmail])
    );
    setEmail("");
    setMessage("You're on the list. Look out for a little note from us.");
  };

  return (
    <footer className="site-footer" id="about">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="footer-logo" to="/">MyShop<span>.</span></Link>
          <p>
            Everyday pieces, thoughtfully selected. Discover something useful,
            beautiful, and made to be part of your life.
          </p>
        </div>

        <nav className="footer-links" aria-label="Quick links">
          <h2>Explore</h2>
          <Link to="/#collections">Shop all</Link>
          <Link to="/#collections">New favorites</Link>
          <Link to="/cart">Your shopping bag</Link>
          <Link to="/login">Your account</Link>
        </nav>

        <div className="footer-connect">
          <h2>A note from us</h2>
          <p>Occasional updates, new finds, and things worth sharing.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              placeholder="Your email address"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              required
            />
            <button type="submit" aria-label="Subscribe to updates">→</button>
          </form>
          {message && <p className="newsletter-message" role="status">{message}</p>}
          <p className="newsletter-disclaimer">
            Demo subscription: your email is saved only in this browser.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} MyShop. All rights reserved.</p>
        <nav className="footer-socials" aria-label="Social profiles">
          <a
            href="https://www.linkedin.com/in/shikha-kumari-688259377/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Shikhakumari567567"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
