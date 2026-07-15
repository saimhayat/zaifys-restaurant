import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext"; // Import the useCart hook
import "./OrderModal.css";

function OrderModal({ item, onClose }) {
  // Destructure addToCart from the global cart context
  const { addToCart } = useCart(); 
  
  const [quantity, setQuantity] = useState(1);
  const [spice, setSpice] = useState("Medium");
  const [size, setSize] = useState("Full");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const getPrice = () => {
    const numericPrice = Number(String(item.price).replace(/[^\d]/g, ""));

    if (size === "Half") {
      return Math.round(numericPrice * 0.6);
    }

    return numericPrice;
  };

  const total = getPrice() * quantity;

  const handleAddToCartClick = () => {
    const cartItem = {
      id: item.id || item.name, // Fallback to name if id doesn't exist
      name: item.name,
      image: item.image,
      quantity,
      spice,
      size,
      notes,
      unitPrice: getPrice(),
      totalPrice: total,
    };

    // Add item to the global cart context
    addToCart(cartItem);

    onClose();
  };

  return (
    <div className="order-modal-overlay" onClick={onClose}>
      <div className="order-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <button className="order-modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {/* Left */}
        <div className="order-modal__left">
          <img src={item.image} alt={item.name} className="order-modal__image" />
          <div className="order-modal__badge">{item.category}</div>
        </div>

        {/* Right */}
        <div className="order-modal__right">
          <h2>{item.name}</h2>

          <div className="order-modal__rating">
            ⭐⭐⭐⭐⭐
            <span>4.8 (184 Reviews)</span>
          </div>

          <p className="order-modal__description">{item.description}</p>

          <div className="order-modal__meta">
            <span>⏱ 20-30 mins</span>
            <span>🔥 Bestseller</span>
          </div>

          {/* Serving */}
          <div className="order-section">
            <h4>Serving Size</h4>
            <div className="option-group">
              <button
                className={size === "Half" ? "option active" : "option"}
                onClick={() => setSize("Half")}
              >
                <span>Half</span>
                <small>Rs. {Math.round(getPrice() * 0.6)}</small>
              </button>

              <button
                className={size === "Full" ? "option active" : "option"}
                onClick={() => setSize("Full")}
              >
                <span>Full</span>
                <small>Rs. {getPrice()}</small>
              </button>
            </div>
          </div>

          {/* Spice */}
          <div className="order-section">
            <h4>Spice Level</h4>
            <div className="spice-group">
              {["Mild", "Medium", "Hot"].map((level) => (
                <button
                  key={level}
                  className={spice === level ? "spice active" : "spice"}
                  onClick={() => setSpice(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="order-section">
            <h4>Quantity</h4>
            <div className="quantity-box">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {/* Notes */}
          <div className="order-section">
            <h4>Special Instructions</h4>
            <textarea
              placeholder="Example: Less spicy, extra cheese..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Footer */}
          <div className="order-footer">
            <div className="order-total">
              <small>Total</small>
              <strong>Rs. {total.toLocaleString()}</strong>
            </div>
            <button className="add-cart-btn" onClick={handleAddToCartClick}>
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;