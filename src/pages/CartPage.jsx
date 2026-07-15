import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

// Icons
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, deliveryFee, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/"); // Go back to the home page
    // Wait for the home page to load, then scroll to the menu section
    setTimeout(() => {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page__empty">
        <div className="cart-empty__icon">🛒</div>
        <h1 className="cart-empty__title">Your Cart is Empty</h1>
        <p className="cart-empty__text">Looks like you haven't added any delicious meals yet.</p>
        <button onClick={goToMenu} className="cart-empty__btn">Browse Menu</button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container cart-page__container">
        
        {/* Header */}
        <div className="cart-page__header">
          <h1 className="cart-page__title">Your Order</h1>
          <button className="cart-page__clear" onClick={clearCart}>
            Clear All
          </button>
        </div>

        <div className="cart-page__layout">
          
          {/* Left Side: Cart Items */}
          <div className="cart-items__list">
            <button onClick={goToMenu} className="cart-back-btn">
              <ArrowLeftIcon /> Add more items
            </button>

            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} className="cart-item__img" />
                
                <div className="cart-item__details">
                  <h3 className="cart-item__name">{item.name}</h3>
                  <div className="cart-item__tags">
                    <span>{item.size}</span>
                    <span>{item.spice} Spice</span>
                  </div>
                  {item.notes && <p className="cart-item__notes">📝 {item.notes}</p>}
                  
                  <div className="cart-item__actions">
  <div className="cart-item__qty">
    <button onClick={() => updateQuantity(index, item.quantity - 1)}>−</button>
    <span>{item.quantity}</span> {/* <-- FIXED THIS LINE */}
    <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
  </div>
  <button className="cart-item__remove" onClick={() => removeFromCart(index)}>
    <TrashIcon /> Remove
  </button>
</div>
                </div>

                <div className="cart-item__price">
                  <small>Subtotal</small>
                  <strong>Rs. {item.totalPrice.toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Order Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary__title">Order Summary</h2>
            
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="cart-summary__row">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toLocaleString()}</span>
            </div>
            <div className="cart-summary__row cart-summary__row--muted">
              <span>Free delivery on orders over Rs. 5000</span>
            </div>

            <div className="cart-summary__divider"></div>

            <div className="cart-summary__row cart-summary__total">
              <span>Total</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>

            <button className="cart-checkout__btn" onClick={goToCheckout}>
              Proceed to Checkout
            </button>

            <div className="cart-summary__trust">
              <span>🔒 Secure Checkout</span>
              <span>⚡ Fast Delivery</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CartPage;