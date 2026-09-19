import { useState } from "react";
import { Check } from "lucide-react";
import { scrollToSection } from "../../utils/scrollTo";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "../Icons";
import { useRestaurantInfo } from "../../store/restaurantStore";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Reservation", id: "reservation" },
  { label: "FAQ", id: "faq" },
];

function Footer() {
  const restaurantInfo = useRestaurantInfo();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="container footer__grid">
        
        {/* Brand Information */}
        <div className="footer__brand">
          <a
            href="#home"
            className="footer__logo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            <span className="footer__logo-mark">Z</span>
            <span className="footer__logo-text">Zaify&rsquo;s Restaurant</span>
          </a>
          <p className="footer__tagline">&ldquo;{restaurantInfo.tagline}&rdquo;</p>
          <div className="footer__socials">
            <a href="#" aria-label="Facebook">
              <FacebookIcon width="16" height="16" />
            </a>
            <a href="#" aria-label="Instagram">
              <InstagramIcon width="16" height="16" />
            </a>
            <a href="#" aria-label="WhatsApp">
              <WhatsappIcon width="16" height="16" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer__col">
          <h3 className="footer__col-title">Quick Links</h3>
          <ul className="footer__links-list">
            {QUICK_LINKS.map((link) => (
              <li key={link.id}>
                <button 
                  className="footer__link-btn" 
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer__col">
          <h3 className="footer__col-title">Contact</h3>
          <ul className="footer__contact-list">
            <li className="footer__address">{restaurantInfo.address}</li>
            <li className="footer__phone">
              <a href={`tel:${restaurantInfo.phoneHref}`}>{restaurantInfo.phone}</a>
            </li>
            <li className="footer__services">{restaurantInfo.services.join(" · ")}</li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer__col footer__newsletter">
          <h3 className="footer__col-title">Newsletter</h3>
          <p className="footer__newsletter-desc">
            Offers, new menu items, and event nights — occasionally, never spam.
          </p>
          {subscribed ? (
            <div className="footer__subscribed-box">
              <Check size={16} strokeWidth={2.5} className="footer__subscribed-icon" />
              <p className="footer__subscribed">You&rsquo;re subscribed — thank you!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="footer__form">
              <label htmlFor="footer-email" className="visually-hidden">
                Email address
              </label>
              <div className="footer__form-wrapper">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="footer__submit-btn">
                  Join
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer Bottom Metadata */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">&copy; {year} Zaify&rsquo;s Restaurant. All rights reserved.</p>
          <p className="footer__credit">Designed for a memorable table, every time.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;