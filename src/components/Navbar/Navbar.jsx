import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, X, ShoppingCart } from "lucide-react";
import { scrollToSection } from "../../utils/scrollTo";
import { PhoneIcon } from "../Icons";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { restaurantInfo } from "../../data/siteData";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

const LOCATION_DATA = {
  Islamabad: ["I-8 Markaz", "F-7 Markaz", "G-9 Markaz", "DHA Phase 2", "Bahria Town"],
  Rawalpindi: ["Saddar", "Commercial Market", "Westridge", "Peshawar Road", "DHA Phase 1"],
  Lahore: ["Gulberg", "DHA Phase 5", "Johar Town", "Model Town", "Bahria Town"],
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Select Location");

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isLocationModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLocationModalOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsLocationModalOpen(false);
    };
    if (isLocationModalOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isLocationModalOpen]);

  const handleNavClick = (id) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const handleLocationClick = () => setIsLocationModalOpen(true);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea("");
  };

  const handleConfirmLocation = () => {
    if (!selectedCity || !selectedArea) return;
    setCurrentLocation(`${selectedArea}, ${selectedCity}`);
    setIsLocationModalOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        
        <div className="navbar__brand-wrapper">
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
          >
            <span className="navbar__logo-mark">Z</span>
            <span className="navbar__logo-text">
              Zaify&rsquo;s
              <em>Authentic Flavors</em>
            </span>
          </a>

          {/* Select Location — commented out for now, re-enable later */}
          {/* <button
            onClick={handleLocationClick}
            className="navbar__location-selector"
          >
            <MapPin className="navbar__location-icon" size={14} strokeWidth={2.25} />
            <span className="navbar__location-text">
              {currentLocation}
            </span>
          </button> */}
        </div>

        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button key={link.id} className="navbar__link" onClick={() => handleNavClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        <div className="navbar__actions">
          <a href={`tel:${restaurantInfo.phoneHref}`} className="navbar__phone">
            <PhoneIcon width="13" height="13" />
            <span>{restaurantInfo.phone}</span>
          </a>

          <ThemeToggle />

          <Link to="/cart" className="navbar__cart" aria-label="View Cart">
            <ShoppingCart size={18} strokeWidth={1.9} />
            {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
          </Link>

          <button className="btn btn-gold navbar__cta" onClick={() => handleNavClick("menu")}>
            Order Now
          </button>
        </div>

        <div className="navbar__actions-mobile">
          <ThemeToggle className="theme-toggle--mobile" />
          <button
            className={`navbar__toggle ${isOpen ? "is-active" : ""}`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="navbar__toggle-box">
              <span className="navbar__toggle-inner"></span>
            </span>
          </button>
        </div>
      </div>

      {isOpen && <div className="navbar__overlay" onClick={() => setIsOpen(false)} aria-hidden="true" />}

      <div className={`navbar__mobile ${isOpen ? "navbar__mobile--open" : ""}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <button key={link.id} onClick={() => handleNavClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
        
        <Link to="/cart" className="navbar__mobile-cart" onClick={() => setIsOpen(false)}>
          <ShoppingCart size={18} strokeWidth={1.9} />
          <span>View Cart</span>
          {totalItems > 0 && <span className="navbar__mobile-cart-badge">{totalItems}</span>}
        </Link>

        <button className="btn btn-gold" onClick={() => handleNavClick("menu")}>
          Order Now
        </button>
        <a href={`tel:${restaurantInfo.phoneHref}`} className="navbar__mobile-phone">
          <PhoneIcon width="16" height="16" />
          <span>{restaurantInfo.phone}</span>
        </a>
      </div>

      {isLocationModalOpen && (
        <div className="location-modal__overlay" onClick={() => setIsLocationModalOpen(false)}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            <div className="location-modal__header">
              <div className="location-modal__brand">
                <span className="location-modal__logo-mark">Z</span>
                <span className="location-modal__title">Select Your Location</span>
              </div>
              <button
                className="location-modal__close"
                onClick={() => setIsLocationModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} strokeWidth={2.25} />
              </button>
            </div>

            <div className="location-modal__body">
              <p className="location-modal__hint">Please select your location</p>

              <div className="location-modal__field">
                <label className="location-modal__label">Please Select City</label>
                <div className="location-modal__select-wrapper">
                  <select className="location-modal__select" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Please Select City</option>
                    {Object.keys(LOCATION_DATA).map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>                    <ChevronDown className="location-modal__chevron" size={16} strokeWidth={2.25} />
                </div>
              </div>

              <div className="location-modal__field">
                <label className="location-modal__label">Please select your location</label>
                <div className="location-modal__select-wrapper">
                  <select
                    className="location-modal__select"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    disabled={!selectedCity}
                  >
                    <option value="">Please select your location</option>
                    {selectedCity && LOCATION_DATA[selectedCity].map((area) => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>                    <ChevronDown className="location-modal__chevron" size={16} strokeWidth={2.25} />
                </div>
              </div>

              <button
                className="location-modal__confirm"
                onClick={handleConfirmLocation}
                disabled={!selectedCity || !selectedArea}
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;