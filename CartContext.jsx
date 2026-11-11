 import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

 function getSavedCart() {
   const savedCart = localStorage.getItem("myshop-cart");
   if (!savedCart) return [];

   try {
     const parsedCart = JSON.parse(savedCart);
     return Array.isArray(parsedCart) ? parsedCart : [];
   } catch {
     localStorage.removeItem("myshop-cart");
     return [];
   }
 }

 export function CartProvider({ children }) {
   const [cart, setCart] = useState(getSavedCart);

   useEffect(() => {
     localStorage.setItem("myshop-cart", JSON.stringify(cart));
   }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const decreaseQty = (id) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQty, removeFromCart, clearCart, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

