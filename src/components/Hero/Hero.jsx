import { scrollToSection } from "../../utils/scrollTo";
import { StarIcon } from "../Icons";
import { restaurantInfo } from "../../data/siteData";
import "./Hero.css";

function Hero() {
  return (
    <section id="home" className="hero">
      {/* Background Media with Spotlight Overlays */}
      <div className="hero__media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fetchpriority="high"
        />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        {/* Floating Glassmorphic Stamp */}
        <div className="hero__badge">
          <StarIcon width="13" height="13" filled />
          <span>{restaurantInfo.rating} rated &middot; {restaurantInfo.reviews}+ reviews</span>
        </div>

        <p className="hero__kicker">Fine Dining &middot; Satellite Town, Rawalpindi</p>

        <h1 className="hero__title">
          Zaify&rsquo;s <span className="hero__title-accent">Restaurant</span>
        </h1>

        {/* Decorative Gold Thread Divider */}
        <div className="gold-thread hero__thread">
          <span />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5" />
          </svg>
          <span />
        </div>

        <p className="hero__tagline">&ldquo;Where Every Meal Becomes a Memory.&rdquo;</p>

        <p className="hero__description">
          Pakistani classics, coal-fired BBQ, wok-tossed Chinese and hand-cut steaks —
          plated with hotel-grade polish in the heart of Satellite Town.
        </p>

        <div className="hero__actions">
          <button className="btn btn-gold" onClick={() => scrollToSection("reservation")}>
            Reserve Table
          </button>
          <button className="btn btn-outline" onClick={() => scrollToSection("menu")}>
            Explore Menu
          </button>
        </div>
      </div>

      {/* Modern Mouse-Wheel Scroll Indicator */}
      <button
        className="hero__scroll-indicator"
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
      >
        <span className="hero__scroll-wheel" />
      </button>
    </section>
  );
}

export default Hero;