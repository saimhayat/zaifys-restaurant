import { useReveal } from "../../hooks/useReveal";
import { PinIcon, PhoneIcon, ClockIcon, FacebookIcon, InstagramIcon, WhatsappIcon } from "../Icons";
import { useRestaurantInfo } from "../../store/restaurantStore";
import "./Contact.css";

function Contact() {
  const infoRef = useReveal();
  const mapRef = useReveal();
  const restaurantInfo = useRestaurantInfo();

  // Derived from the live address, so a settings edit moves the map too.
  const MAP_QUERY = encodeURIComponent(restaurantInfo.address);

  return (
    <section id="contact" className="contact section-padding">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">Contact</span>
          <h2 className="section-heading">Find your way to Zaify&rsquo;s</h2>
        </div>

        <div className="contact__grid">
          {/* Contact Details Column */}
          <div ref={infoRef} className="contact__info reveal">
            
            {/* Address Card */}
            <div className="contact__card">
              <div className="contact__card-icon-container">
                <PinIcon width="20" height="20" />
              </div>
              <div className="contact__card-body">
                <h3>Address</h3>
                <p>{restaurantInfo.address}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link"
                >
                  <span>Get Directions</span>
                  <span className="contact__link-arrow">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Phone Card */}
            <div className="contact__card">
              <div className="contact__card-icon-container">
                <PhoneIcon width="20" height="20" />
              </div>
              <div className="contact__card-body">
                <h3>Phone</h3>
                <p>{restaurantInfo.phone}</p>
                <a href={`tel:${restaurantInfo.phoneHref}`} className="contact__link">
                  <span>Call Now</span>
                  <span className="contact__link-arrow">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="contact__card">
              <div className="contact__card-icon-container">
                <ClockIcon width="20" height="20" />
              </div>
              <div className="contact__card-body">
                <h3>Opening Hours</h3>
                <ul className="contact__hours">
                  {restaurantInfo.hours.map((slot) => (
                    <li key={slot.day}>
                      <span className="contact__hours-day">{slot.day}</span>
                      <span className="contact__hours-leader" />
                      <span className="contact__hours-time">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Socials Block */}
            <div className="contact__socials">
              <span className="contact__socials-title">Follow our journey</span>
              <div className="contact__social-icons">
                <a href="#" aria-label="Facebook">
                  <FacebookIcon width="18" height="18" />
                </a>
                <a href="#" aria-label="Instagram">
                  <InstagramIcon width="18" height="18" />
                </a>
                <a href="#" aria-label="WhatsApp">
                  <WhatsappIcon width="18" height="18" />
                </a>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div ref={mapRef} className="contact__map reveal">
            <iframe
              title="Zaify's Restaurant location on Google Maps"
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;