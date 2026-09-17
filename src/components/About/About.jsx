import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import "./About.css";

const POINTS = [
  "Fresh ingredients sourced every morning",
  "Professional chefs across five cuisines",
  "Warm, family-friendly ambiance",
  "Exceptional, attentive service",
];

function About() {
  const sceneRef = useRef(null);
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    // Reveal animations
    const revealIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    document
      .querySelectorAll(".about .reveal")
      .forEach((el) => revealIO.observe(el));

    // Heading animation
    const heading = headingRef.current;
    heading.innerHTML = "A dining room built for <em>moments</em> worth remembering"
      .split(/(<em>.*?<\/em>|\s+)/)
      .filter(Boolean)
      .map((w, i) =>
        w.trim()
          ? `<span class="word" style="transition-delay:${(0.1 + i * 0.06).toFixed(2)}s">${w}</span>`
          : " "
      )
      .join("");
    const headingIO = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (heading.classList.add("in"), headingIO.disconnect())),
      { threshold: 0.5 }
    );
    headingIO.observe(heading);

    // Counter animation
    const counter = counterRef.current;
    const countIO = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          countIO.disconnect();
          const start = performance.now();
          const dur = 1600;
          const tick = (t) => {
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            counter.textContent = Math.round(eased * 15) + "+";
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    countIO.observe(counter);

    // 3D tilt effect
    const scene = sceneRef.current;
    const card = cardRef.current;
    const onMove = (e) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    };
    const onLeave = () => {
      card.style.transform = "rotateY(0) rotateX(0)";
    };
    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);

    return () => {
      revealIO.disconnect();
      headingIO.disconnect();
      countIO.disconnect();
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="about" className="about">
      <div className="ambient" aria-hidden="true" />
      <div className="grain" aria-hidden="true"></div>

      <div className="about__grid">
        {/* Enhanced Media Column — 3D tilt scene */}
        <div ref={sceneRef} className="about__scene reveal">
          <div ref={cardRef} className="about__media">
            <div className="about__media-frame">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80"
                alt="Warmly lit interior seating area at Zaify's Restaurant"
                loading="lazy"
                width="900"
                height="1100"
              />
              <div className="about__sheen" aria-hidden="true"></div>

            {/* Orbiting ring with glow effect */}
            <div className="about__orbit" aria-hidden="true">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="46" stroke="rgba(245, 179, 1,.45)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="50" cy="4" r="3.5" fill="#f5b301">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    dur="20s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
              <div className="orbit-glow"></div>
            </div>
            </div>

            {/* Stat card below the image */}
            <div className="about__media-tag">
              <div className="tag-3d-effect">
                <span className="about__media-tag-num" ref={counterRef}>0+</span>
                <span className="about__media-tag-text">Years of Culinary Craft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Text Column */}
        <div className="about__text reveal d2">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-heading" ref={headingRef}>
            A dining room built for <em>moments</em> worth remembering
          </h2>
          <div className="about__description">
            <p className="about__lead">
              <strong>Zaify&rsquo;s</strong> opened in Satellite Town with one intention: bring
              hotel-grade dining to a neighbourhood restaurant. Every dish crosses{" "}
              <strong>five cuisines</strong> — Pakistani, BBQ, Chinese, Continental and Fast Food
              — prepared by chefs who trained in each tradition, not generalists guessing their
              way through a menu.
            </p>
            <p className="about__lead">
              The room is built the same way the food is: with care. Comfortable seating,
              considered lighting, and a modern ambiance that still feels warm enough to bring
              the whole family — because that&rsquo;s who we built this for.
            </p>
          </div>

          {/* Feature points */}
          <ul className="about__points" aria-label="Key restaurant features">
            {POINTS.map((point, i) => (
              <li
                key={point}
                className={`about__point-item reveal d${Math.min(i + 1, 3)}`}
              >
                <div className="point-icon-container">
                  <Check className="about__point-icon" strokeWidth={3} />
                  <div className="point-icon-glow"></div>
                </div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="decorative-elements" aria-hidden="true">
        <div className="decor-circle circle-1"></div>
        <div className="decor-circle circle-2"></div>
        <div className="decor-circle circle-3"></div>
      </div>
    </section>
  );
}

export default About;
