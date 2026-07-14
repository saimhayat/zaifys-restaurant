import { useReveal } from "../../hooks/useReveal";
import "./About.css";

const POINTS = [
  "Fresh ingredients sourced every morning",
  "Professional chefs across five cuisines",
  "Warm, family-friendly ambiance",
  "Exceptional, attentive service",
];

function About() {
  const imageRef = useReveal();
  const textRef = useReveal();

  return (
    <section id="about" className="about section-padding">
      <div className="container about__grid">
        {/* Media Column with Decorative Frame */}
        <div ref={imageRef} className="about__media-wrapper reveal">
          <div className="about__media">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
              alt="Warmly lit interior seating area at Zaify's Restaurant"
              loading="lazy"
              width="900"
              height="1100"
            />
            {/* Glassmorphic floating badge */}
            <div className="about__media-tag">
              <span className="about__media-tag-num">15+</span>
              <span className="about__media-tag-text">Years of Culinary Craft</span>
            </div>
          </div>
        </div>

        {/* Text Details Column */}
        <div ref={textRef} className="about__text reveal">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-heading">
            A dining room built for moments worth remembering
          </h2>
          <div className="about__description">
            <p className="about__lead">
              Zaify&rsquo;s opened in Satellite Town with one intention: bring
              hotel-grade dining to a neighbourhood restaurant. Every dish
              crosses five cuisines — Pakistani, BBQ, Chinese, Continental and
              Fast Food — prepared by chefs who trained in each tradition, not
              generalists guessing their way through a menu.
            </p>
            <p className="about__lead">
              The room is built the same way the food is: with care. Comfortable
              seating, considered lighting, and a modern ambiance that still
              feels warm enough to bring the whole family — because that&rsquo;s
              who we built this for.
            </p>
          </div>

          <ul className="about__points" aria-label="Key restaurant features">
            {POINTS.map((point) => (
              <li key={point} className="about__point-item">
                <svg
                  className="about__point-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;