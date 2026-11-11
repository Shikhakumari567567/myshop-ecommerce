import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("currentUser") || "null")
  );

  const signup = (name, email, password) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { ok: false, message: "This email is already registered." };
    }
    const newUser = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    const current = { name, email };
    localStorage.setItem("currentUser", JSON.stringify(current));
    setUser(current);
    return { ok: true };
  };

  const login = (email, password) => {
    const found = getUsers().find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { ok: false, message: "Invalid email or password." };
    const current = { name: found.name, email: found.email };
    localStorage.setItem("currentUser", JSON.stringify(current));
    setUser(current);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);