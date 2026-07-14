import { useReveal } from "../../hooks/useReveal";
import { signatureDishes } from "../../data/menuData";
import "./SignatureDishes.css";

function SignatureCard({ dish, isLarge }) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className={`signature-card reveal ${isLarge ? "signature-card--large" : ""}`}
    >
      <img src={dish.image} alt={dish.name} loading="lazy" />
      <div className="signature-card__scrim" aria-hidden="true" />
      
      {/* Content Area with absolute z-indexing */}
      <div className="signature-card__content">
        <span className="signature-card__category">{dish.category}</span>
        <h3>{dish.name}</h3>
        <p className="signature-card__desc">{dish.description}</p>
        <span className="signature-card__price">{dish.price}</span>
      </div>
    </article>
  );
}

function SignatureDishes() {
  const headRef = useReveal();

  return (
    <section id="signature" className="signature section-padding">
      <div className="container">
        <div ref={headRef} className="section-head reveal">
          <span className="eyebrow">Signature Dishes</span>
          <h2 className="section-heading">The four plates people come back for</h2>
        </div>

        <div className="signature__grid">
          {signatureDishes.map((dish, index) => (
            <SignatureCard key={dish.id} dish={dish} isLarge={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SignatureDishes;