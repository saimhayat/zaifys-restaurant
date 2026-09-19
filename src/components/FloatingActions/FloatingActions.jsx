import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { useRestaurantInfo } from "../../store/restaurantStore";
import "./FloatingActions.css";

function FloatingActions() {
  const restaurantInfo = useRestaurantInfo();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${restaurantInfo.whatsappHref}?text=${encodeURIComponent(
    "Hi Zaify's! I'd like to place an order."
  )}`;

  return (
    <>
      {/* Desktop / all: floating WhatsApp + call stack */}
      <div className="fab-stack">
        {showTop && (
          <button
            className="fab fab--small"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Scroll back to top"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        )}
        <a
          href={`tel:${restaurantInfo.phoneHref}`}
          className="fab fab--call"
          aria-label={`Call ${restaurantInfo.name}`}
        >
          <Phone size={20} strokeWidth={2} />
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="fab fab--wa"
          aria-label="Chat with us on WhatsApp"
        >
          <MessageCircle size={22} strokeWidth={2} />
          <span className="fab__pulse" aria-hidden="true" />
        </a>
      </div>

      {/* Mobile sticky bottom action bar */}
      <div className="action-bar">
        <a href={`tel:${restaurantInfo.phoneHref}`} className="action-bar__btn">
          <Phone size={18} strokeWidth={2} />
          <span>Call</span>
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="action-bar__btn action-bar__btn--wa"
        >
          <MessageCircle size={18} strokeWidth={2} />
          <span>WhatsApp</span>
        </a>
        <button
          className="action-bar__btn action-bar__btn--primary"
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) menu.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Order Now
        </button>
      </div>
    </>
  );
}

export default FloatingActions;
