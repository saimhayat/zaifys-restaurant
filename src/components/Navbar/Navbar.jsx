import { useEffect, useState } from "react";
import { scrollToSection } from "../../utils/scrollTo";
import { MenuIcon, CloseIcon, PhoneIcon } from "../Icons";
import { restaurantInfo } from "../../data/siteData";
import "./Navbar.css";

// Standalone SVG Icon for the location marker
const MapPinIcon = (props) => (
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Select Location");

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

  const handleNavClick = (id) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  const handleLocationClick = () => {
    const mockBranches = [
      "I-8 Markaz, Islamabad",
      "Saddar, Rawalpindi",
      "DHA Phase 2, Islamabad"
    ];
    const selection = prompt(
      "Select Delivery Branch:\n1. I-8 Markaz\n2. Saddar\n3. DHA Phase 2"
    );
    if (selection === "1") setCurrentLocation(mockBranches[0]);
    else if (selection === "2") setCurrentLocation(mockBranches[1]);
    else if (selection === "3") setCurrentLocation(mockBranches[2]);
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
            <button
              key={link.id}
              className="navbar__link"
              onClick={() => handleNavClick(link.id)}
            >
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
          <button
            className="btn btn-gold navbar__cta"
            onClick={() => handleNavClick("menu")}
          >
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
      {isOpen && (
        <div 
          className="navbar__overlay" 
          onClick={() => setIsOpen(false)} 
          aria-hidden="true" 
        />
      )}

      {/* Mobile Off-Canvas Navigation Drawer */}
      <div className={`navbar__mobile ${isOpen ? "navbar__mobile--open" : ""}`}>
        <nav aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <button key={link.id} onClick={() => handleNavClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
        <button className="btn btn-gold" onClick={() => handleNavClick("menu")}>
          Order Now
        </button>
        <a href={`tel:${restaurantInfo.phoneHref}`} className="navbar__mobile-phone">
          <PhoneIcon width="16" height="16" />
          <span>{restaurantInfo.phone}</span>
        </a>
      </div>
    </header>
  );
}

export default Navbar;