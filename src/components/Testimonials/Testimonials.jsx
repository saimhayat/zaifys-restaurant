import { useEffect, useRef, useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import { StarIcon, QuoteIcon, ChevronIcon } from "../Icons";
import { testimonials } from "../../data/siteData";
import "./Testimonials.css";

const SLIDE_INTERVAL = 5500;

function Testimonials() {
  const headRef = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  // Pausing is state (not just clearInterval) so autoplay resumes when the
  // pointer or focus leaves — clearing the interval alone froze it forever.
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  const goTo = (index) => {
    setActiveIndex(((index % testimonials.length) + testimonials.length) % testimonials.length);
  };

  /* Swipe on touch devices. The arrows are hidden on mobile, so without this
     the only way to browse reviews there is tapping the dots. */
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setPaused(true); // don't advance mid-swipe
  };

  const handleTouchEnd = (e) => {
    const start = touchStart.current;
    touchStart.current = null;
    setPaused(false);
    if (!start) return;

    const touch = e.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;

    // Ignore taps and mostly-vertical drags so page scrolling keeps working.
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    goTo(activeIndex + (dx < 0 ? 1 : -1));
  };

  const cancelTouch = () => {
    touchStart.current = null;
    setPaused(false);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || paused) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <section id="reviews" className="testimonials section-padding">
      <div className="container">
        {/* Section Heading */}
        <div ref={headRef} className="section-head center reveal">
          <span className="eyebrow">Customer Reviews</span>
          <h2 className="section-heading">673+ reviews, one consistent story</h2>
        </div>

        {/* Carousel Block */}
        <div
          className="testimonials__carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={cancelTouch}
        >
          {/* Positioned backdrop quote mark */}
          <QuoteIcon width="56" height="42" className="testimonials__quote-mark" />

          {/* Floating Navigation Arrows */}
          <button 
            className="testimonials__nav testimonials__nav--prev" 
            onClick={() => goTo(activeIndex - 1)} 
            aria-label="Previous review"
          >
            <ChevronIcon width="16" height="16" style={{ transform: "rotate(180deg)" }} />
          </button>
          <button 
            className="testimonials__nav testimonials__nav--next" 
            onClick={() => goTo(activeIndex + 1)} 
            aria-label="Next review"
          >
            <ChevronIcon width="16" height="16" />
          </button>

          {/* New Container to strictly isolate overflow clipping */}
          <div className="testimonials__track-container">
            <div className="testimonials__track" style={{ "--active": activeIndex }}>
              {testimonials.map((t) => (
                <div 
                  className="testimonials__slide" 
                  key={t.id} 
                  aria-hidden={testimonials[activeIndex].id !== t.id}
                >
                  {/* Rating stars layout */}
                  <div className="testimonials__stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} width="14" height="14" filled={i < t.rating} />
                    ))}
                  </div>
                  
                  {/* Review Text block */}
                  <p className="testimonials__quote">&ldquo;{t.quote}&rdquo;</p>
                  
                  {/* Author Metadata segment */}
                  <div className="testimonials__author">
                    <span className="testimonials__avatar">{t.name.charAt(0)}</span>
                    <div className="testimonials__meta">
                      <p className="testimonials__name">{t.name}</p>
                      <p className="testimonials__role">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Control Dots */}
          <div className="testimonials__dots" role="tablist" aria-label="Choose review">
            {testimonials.map((t, index) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show review ${index + 1}`}
                className={`testimonials__dot ${index === activeIndex ? "testimonials__dot--active" : ""}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;