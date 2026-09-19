import { createContext, useState, useContext, useEffect } from "react";
import { computeTotals, useRestaurantInfo } from "../store/restaurantStore";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Initialize state from localStorage (if it exists)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem("zaify_cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Save to localStorage every time cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem("zaify_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage");
    }
  }, [cartItems]);

  // Delivery fee and free-delivery threshold are managed in the admin panel.
  const settings = useRestaurantInfo();

  // Check if item exists (same id, size, and spice level)
  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (i) => i.id === item.id && i.size === item.size && i.spice === item.spice
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += item.quantity;
      updatedCart[existingItemIndex].totalPrice = updatedCart[existingItemIndex].quantity * updatedCart[existingItemIndex].unitPrice;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, item]);
    }
  };

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQty) => {
    if (newQty < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQty;
    updatedCart[index].totalPrice = newQty * updatedCart[index].unitPrice;
    setCartItems(updatedCart);
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
  // Changed this line to count unique items instead of total quantity
  const totalItems = cartItems.length; 
  
  // Delivery fee and the free-delivery threshold live in admin settings, so
  // the cart and the settings panel can never disagree.
  const {
    deliveryFee,
    total: grandTotal,
    qualifiesForFreeDelivery,
    freeDeliveryGap,
  } = computeTotals(cartTotal, settings);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        totalItems,
        deliveryFee,
        grandTotal,
        qualifiesForFreeDelivery,
        freeDeliveryGap,
        freeDeliveryOver: settings.freeDeliveryOver,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};