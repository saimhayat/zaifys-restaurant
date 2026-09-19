import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFound from "./pages/NotFound";

/**
 * The admin panel is code-split so customers never download it — it only
 * arrives when someone actually visits /admin.
 */
const AdminApp = lazy(() => import("./admin/AdminApp"));

function AdminFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        color: "var(--color-text-muted)",
        fontSize: "0.9rem",
      }}
    >
      Loading admin panel…
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* 👈 ADD THIS WRAPPER DIV 👇 */}
        <div className="app-root">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<AdminFallback />}>
                  <AdminApp />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
