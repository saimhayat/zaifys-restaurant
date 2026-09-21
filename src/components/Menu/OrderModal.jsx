import { useEffect, useState } from "react";
import { Star, Clock, Flame, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext"; // Import the useCart hook
import { defaultSize, formatRs, priceForSize } from "../../utils/price";
import "./OrderModal.css";

const STAR_SLOTS = Array.from({ length: 5 }, (_, i) => i);

function OrderModal({ item, onClose }) {
  // Destructure addToCart from the global cart context
  const { addToCart } = useCart(); 
  
  const isAvailable = item.available !== false;
  const leadSize = defaultSize(item);

  const [quantity, setQuantity] = useState(1);
  // Heat level is per-dish data. A null means the dish has no heat setting
  // (drinks, desserts) and the whole control is hidden.
  const [spice, setSpice] = useState(item.spice ?? null);
  const [size, setSize] = useState(leadSize?.label ?? "");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Lock the body and every scroll ancestor so the page behind never scrolls.
    // Read the offset BEFORE pinning: a fixed body always reports a rect top of
    // 0, so measuring afterwards stores 0 and strands the customer at the very
    // top of the page the moment the modal closes.
    const restoreY = window.scrollY || document.documentElement.scrollTop || 0;

    const lockScroll = () => {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${restoreY}px`;

      const lockAncestor = (el) => {
        if (el && el !== document.body && el.style.overflow !== "scroll" && el.scrollHeight > el.clientHeight) {
          el.style.overflow = "hidden";
          el.style.position = "relative";
        }
        if (el.parentElement) lockAncestor(el.parentElement);
      };

      lockAncestor(document.body);
    };

    const unlockScroll = () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";

      const unlockAncestor = (el) => {
        if (el && el !== document.body) {
          el.style.overflow = "";
          el.style.position = "";
        }
        if (el.parentElement) unlockAncestor(el.parentElement);
      };

      unlockAncestor(document.body);

      // Put the page back exactly where it was. The jump is forced to be
      // instant because `scroll-behavior: smooth` would otherwise animate the
      // whole way up from the top.
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, restoreY);
      root.style.scrollBehavior = previousBehavior;
    };

    lockScroll();

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // The price is the selected size's price, read straight from the data —
  // nothing is derived from ratios, so a label can never drift from the total.
  const unitPrice = priceForSize(item, size);
  const total = unitPrice * quantity;
  const ratingPercent = Math.max(0, Math.min(100, ((item.rating ?? 0) / 5) * 100));

  const handleAddToCartClick = () => {
    if (!isAvailable) return;

    const cartItem = {
      id: item.id || item.name, // Fallback to name if id doesn't exist
      name: item.name,
      image: item.image,
      quantity,
      spice,
      size,
      notes,
      unitPrice,
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

          <div
            className="order-modal__rating"
            aria-label={`Rated ${item.rating} out of 5 from ${item.reviewCount} reviews`}
          >
            {/* Two stacked rows of stars: an outlined base layer, and a filled
                layer clipped to the exact rating, so 4.6 genuinely reads 4.6. */}
            <span className="order-modal__stars" aria-hidden="true">
              {STAR_SLOTS.map((slot) => (
                <Star
                  key={`base-${slot}`}
                  size={15}
                  strokeWidth={0}
                  className="order-modal__star"
                />
              ))}
              <span
                className="order-modal__stars-fill"
                style={{ width: `${ratingPercent}%` }}
              >
                {STAR_SLOTS.map((slot) => (
                  <Star
                    key={`fill-${slot}`}
                    size={15}
                    strokeWidth={0}
                    className="order-modal__star order-modal__star--on"
                  />
                ))}
              </span>
            </span>
            <span>
              {item.rating?.toFixed(1)} · {item.reviewCount} reviews
            </span>
          </div>

          <p className="order-modal__description">{item.description}</p>

          <ul className="order-modal__tags">
            {item.tags.map((tag) => (
              <li key={tag} className="order-modal__tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="order-modal__meta">
            <span>
              <Clock size={14} strokeWidth={2} /> {item.prepTime} min prep
            </span>
            {item.badge && (
              <span>
                <Flame size={14} strokeWidth={2} /> {item.badge}
              </span>
            )}
          </div>

          {/* Serving */}
          <div className="order-section">
            <h4>Serving Size</h4>
            <div className="option-group">
              {item.sizes.map((option) => (
                <button
                  key={option.label}
                  className={size === option.label ? "option active" : "option"}
                  onClick={() => setSize(option.label)}
                  aria-pressed={size === option.label}
                >
                  <span>{option.label}</span>
                  <small>{formatRs(option.price)}</small>
                </button>
              ))}
            </div>
          </div>

          {/* Spice — drinks and desserts carry no heat level, so they skip this */}
          {item.spice && (
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
          )}

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

          {!isAvailable && (
            <div className="order-modal__notice" role="status">
              This dish is sold out right now. Ask us and we&rsquo;ll suggest
              something close to it.
            </div>
          )}

          {/* Footer */}
          <div className="order-footer">
            <div className="order-total">
              <small>Total</small>
              <strong>{formatRs(total)}</strong>
            </div>
            <button
              className="add-cart-btn"
              onClick={handleAddToCartClick}
              disabled={!isAvailable}
            >
              <ShoppingCart size={17} strokeWidth={2} />
              {isAvailable ? "Add To Cart" : "Sold Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;