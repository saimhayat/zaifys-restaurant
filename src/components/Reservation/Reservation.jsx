import { useState } from "react";
import { useReveal } from "../../hooks/useReveal";
import "./Reservation.css";

const INITIAL_STATE = {
  name: "",
  phone: "",
  guests: "2",
  date: "",
  time: "",
  message: "",
};

function validate(values) {
  const errors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!/^[0-9+\s-]{7,15}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.date) {
    errors.date = "Please pick a date.";
  }

  if (!values.time) {
    errors.time = "Please pick a time.";
  }

  return errors;
}

function Reservation() {
  const imageRef = useReveal();
  const formRef = useReveal();
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setValues(INITIAL_STATE);
    }
  };

  return (
    <section id="reservation" className="reservation section-padding">
      <div className="container reservation__grid">
        
        {/* Decorative Media Frame with Floating Booking Tip */}
        <div ref={imageRef} className="reservation__media-wrapper reveal">
          <div className="reservation__media">
            <img
              src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=900&q=80"
              alt="Beautifully set dining table ready for a reservation at Zaify's Restaurant"
              loading="lazy"
              width="900"
              height="1050"
            />
            <div className="reservation__media-note">
              <span className="eyebrow reservation__media-note-eyebrow">
                Booking Tip
              </span>
              <p className="reservation__media-note-text">
                Weekend evenings fill quickly — reserve at least a day ahead for
                parties of 4 or more.
              </p>
            </div>
          </div>
        </div>

        {/* Reservation Form Card Wrapper */}
        <div ref={formRef} className="reservation__form-wrap reveal">
          <span className="eyebrow">Reservation</span>
          <h2 className="section-heading">Book your table</h2>
          <p className="section-sub">
            Tell us when you&rsquo;re coming, and we&rsquo;ll have the table
            ready.
          </p>

          {/* Success Validation Message */}
          {submitted && (
            <div className="reservation__success" role="status">
              <strong>Reservation request received!</strong>
              <span>We&rsquo;ll call you shortly to confirm your table.</span>
            </div>
          )}

          <form className="reservation__form" onSubmit={handleSubmit} noValidate>
            <div className="reservation__field">
              <label htmlFor="res-name">Full Name</label>
              <input
                id="res-name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "res-name-error" : undefined}
                placeholder="Your name"
              />
              {errors.name && (
                <span className="reservation__error" id="res-name-error">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="reservation__field">
              <label htmlFor="res-phone">Phone Number</label>
              <input
                id="res-phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "res-phone-error" : undefined}
                placeholder="03XX XXXXXXX"
              />
              {errors.phone && (
                <span className="reservation__error" id="res-phone-error">
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Combined Segment Row */}
            <div className="reservation__row">
              <div className="reservation__field">
                <label htmlFor="res-guests">Guests</label>
                <div className="reservation__select-wrapper">
                  <select
                    id="res-guests"
                    name="guests"
                    value={values.guests}
                    onChange={handleChange}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="reservation__field">
                <label htmlFor="res-date">Date</label>
                <input
                  id="res-date"
                  name="date"
                  type="date"
                  min={today}
                  value={values.date}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.date)}
                />
                {errors.date && <span className="reservation__error">{errors.date}</span>}
              </div>

              <div className="reservation__field">
                <label htmlFor="res-time">Time</label>
                <input
                  id="res-time"
                  name="time"
                  type="time"
                  value={values.time}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.time)}
                />
                {errors.time && <span className="reservation__error">{errors.time}</span>}
              </div>
            </div>

            <div className="reservation__field">
              <label htmlFor="res-message">Special Requests (optional)</label>
              <textarea
                id="res-message"
                name="message"
                rows="3"
                value={values.message}
                onChange={handleChange}
                placeholder="Birthday cake, window seating, allergies..."
              />
            </div>

            <button type="submit" className="btn btn-gold reservation__submit">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Reservation;