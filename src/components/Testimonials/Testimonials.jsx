import { useEffect, useRef, useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import { StarIcon, QuoteIcon, ChevronIcon } from "../Icons";
import { testimonials } from "../../data/siteData";
import "./Testimonials.css";

const SLIDE_INTERVAL = 5500;

function Testimonials() {
  const headRef = useReveal();
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timerRef.current);
  }, []);

  const pause = () => clearInterval(timerRef.current);

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
          onMouseEnter={pause}
          onFocus={pause}
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