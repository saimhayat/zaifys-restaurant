import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Added Link for routing
import { scrollToSection } from "../../utils/scrollTo";
import { MenuIcon, CloseIcon, PhoneIcon } from "../Icons";
import { restaurantInfo } from "../../data/siteData";
import { useCart } from "../../context/CartContext"; // Added Cart Context
import "./Navbar.css";

// Standalone SVG Icon for the location marker
const MapPinIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Chevron Icon for dropdowns
const ChevronIcon = (props) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

// Close X icon for modal
const ModalCloseIcon = (props) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Cart Icon
const CartIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Reviews", id: "reviews" },
  { label: "Contact", id: "contact" },
];

// Sample city → areas mapping
const LOCATION_DATA = {
  Islamabad: ["I-8 Markaz", "F-7 Markaz", "G-9 Markaz", "DHA Phase 2", "Bahria Town"],
  Rawalpindi: ["Saddar", "Commercial Market", "Westridge", "Peshawar Road", "DHA Phase 1"],
  Lahore: ["Gulberg", "DHA Phase 5", "Johar Town", "Model Town", "Bahria Town"],
};

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Select Location");

  // Modal state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  // Cart state
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isLocationModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocationModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsLocationModalOpen(false);
    };
    if (isLocationModalOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isLocationModalOpen]);

  const handleNavClick = (id) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const handleLocationClick = () => {
    setIsLocationModalOpen(true);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedArea(""); // reset area when city changes
  };

  const handleConfirmLocation = () => {
    if (!selectedCity || !selectedArea) return;
    setCurrentLocation(`${selectedArea}, ${selectedCity}`);
    setIsLocationModalOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Left Segment: Brand Logo & Interactive Location Bar */}
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

          {/* Location Picker */}
          <button
            onClick={handleLocationClick}
            className="navbar__location-selector"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "0.5rem 0.9rem",
              borderRadius: "20px",
              color: "#ffffff",
              fontSize: "0.78rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#ffc700";
              e.currentTarget.style.background = "rgba(255, 199, 0, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
            }}
          >
            <MapPinIcon style={{ color: "#ffc700" }} />
            <span style={{ maxWidth: "120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {currentLocation}
            </span>
          </button>
        </div>

        {/* Center Segment: Primary Desktop Links Navigation */}
        <nav className="navbar__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <button key={link.id} className="navbar__link" onClick={() => handleNavClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Segment: Desktop Actions */}
        <div className="navbar__actions">
          <a href={`tel:${restaurantInfo.phoneHref}`} className="navbar__phone">
            <PhoneIcon width="13" height="13" />
            <span>{restaurantInfo.phone}</span>
          </a>
          
          {/* Cart Button */}
          <Link to="/cart" className="navbar__cart" aria-label="View Cart">
            <CartIcon />
            {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
          </Link>

          <button className="btn btn-gold navbar__cta" onClick={() => handleNavClick("menu")}>
            Order Now
          </button>
        </div>

        {/* Hamburger Mobile Toggle */}
        <button
          className="navbar__toggle"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <CloseIcon width="24" height="24" /> : <MenuIcon width="24" height="24" />}
        </button>
      </div>

      {/* Blurred Mobile Overlay Background Scrim */}
      {isOpen && <div className="navbar__overlay" onClick={() => setIsOpen(false)} aria-hidden="true" />}

      {/* Mobile Off-Canvas Navigation Drawer */}
      <div className={`navbar__mobile ${isOpen ? "navbar__mobile--open" : ""}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <button key={link.id} onClick={() => handleNavClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
        
        {/* Mobile Cart Button */}
        <Link to="/cart" className="navbar__mobile-cart" onClick={() => setIsOpen(false)}>
          <CartIcon width="18" height="18" />
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

      {/* ====== Location Selection Modal ====== */}
      {isLocationModalOpen && (
        <div className="location-modal__overlay" onClick={() => setIsLocationModalOpen(false)}>
          <div className="location-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
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
                <ModalCloseIcon />
              </button>
            </div>

            {/* Modal Body */}
            <div className="location-modal__body">
              <p className="location-modal__hint">Please select your location</p>

              {/* City Dropdown */}
              <div className="location-modal__field">
                <label className="location-modal__label">Please Select City</label>
                <div className="location-modal__select-wrapper">
                  <select
                    className="location-modal__select"
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">Please Select City</option>
                    {Object.keys(LOCATION_DATA).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon className="location-modal__chevron" />
                </div>
              </div>

              {/* Area Dropdown */}
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
                    {selectedCity &&
                      LOCATION_DATA[selectedCity].map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                  </select>
                  <ChevronIcon className="location-modal__chevron" />
                </div>
              </div>

              {/* Confirm Button */}
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