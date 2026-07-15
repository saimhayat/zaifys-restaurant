import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CheckoutPage.css";

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

function CheckoutPage() {
  const { cartItems, cartTotal, deliveryFee, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formInfo, setFormInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery"
  });

  // If cart is empty and order isn't placed, redirect to cart
  if (cartItems.length === 0 && !orderPlaced) {
    return <Navigate to="/cart" replace />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend here
    console.log("Order Details:", { ...formInfo, items: cartItems, total: grandTotal });
    clearCart(); // Empty the cart
    setOrderPlaced(true); // Show success screen
  };

  const backToCart = () => navigate("/cart");
  const backToHome = () => navigate("/");

  // Success Screen
  if (orderPlaced) {
    return (
      <div className="checkout-page__success">
        <div className="success-card">
          <div className="success-card__icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your order. We are preparing your delicious food right now!</p>
          <p className="success-card__subtext">A confirmation call will be made to <strong>{formInfo.phone}</strong> shortly.</p>
          <button className="success-card__btn" onClick={backToHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-page__container">
        
        <div className="checkout-page__header">
          <h1 className="checkout-page__title">Checkout</h1>
          <button className="cart-back-btn" onClick={backToCart}>
            <ArrowLeftIcon /> Back to Cart
          </button>
        </div>

        <form className="checkout-page__layout" onSubmit={handlePlaceOrder}>
          
          {/* Left Side: Forms */}
          <div className="checkout-details">
            
            <div className="checkout-section">
              <h2 className="checkout-section__title">Contact Information</h2>
              <div className="checkout-form__grid">
                <div className="checkout-field">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formInfo.name} onChange={handleInputChange} required placeholder="John Doe" />
                </div>
                <div className="checkout-field">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formInfo.phone} onChange={handleInputChange} required placeholder="03XX-XXXXXXX" />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2 className="checkout-section__title">Delivery Address</h2>
              <div className="checkout-field" style={{ marginBottom: "1rem" }}>
                <label>Street Address</label>
                <input type="text" name="address" value={formInfo.address} onChange={handleInputChange} required placeholder="House #, Street, Area" />
              </div>
              <div className="checkout-field">
                <label>City</label>
                <input type="text" name="city" value={formInfo.city} onChange={handleInputChange} required placeholder="Islamabad" />
              </div>
            </div>

            <div className="checkout-section">
              <h2 className="checkout-section__title">Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-card ${formInfo.paymentMethod === "Cash on Delivery" ? "active" : ""}`}>
                  <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formInfo.paymentMethod === "Cash on Delivery"} onChange={handleInputChange} />
                  <span>💵 Cash on Delivery</span>
                </label>
                <label className={`payment-card ${formInfo.paymentMethod === "Card" ? "active" : ""}`}>
                  <input type="radio" name="paymentMethod" value="Card" checked={formInfo.paymentMethod === "Card"} onChange={handleInputChange} />
                  <span>💳 Credit / Debit Card</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Side: Summary */}
          <div className="checkout-summary">
            <h2 className="checkout-summary__title">Order Summary</h2>
            
            <div className="checkout-items__list">
              {cartItems.map((item, index) => (
                <div className="checkout-item" key={index}>
                  <div className="checkout-item__img" style={{ backgroundImage: `url(${item.image})` }}>
                    <span className="checkout-item__qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-item__info">
                    <h4>{item.name}</h4>
                    <small>{item.size} · {item.spice}</small>
                  </div>
                  <div className="checkout-item__price">
                    Rs. {item.totalPrice.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary__divider"></div>

            <div className="checkout-summary__row">
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="checkout-summary__row">
              <span>Delivery Fee</span>
              <span>Rs. {deliveryFee.toLocaleString()}</span>
            </div>

            <div className="checkout-summary__divider"></div>

            <div className="checkout-summary__row checkout-summary__total">
              <span>Total</span>
              <span>Rs. {grandTotal.toLocaleString()}</span>
            </div>

            <button type="submit" className="checkout-place__btn">
              Place Order
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;