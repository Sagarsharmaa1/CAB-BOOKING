import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaArrowTrendUp,
  FaCalendarCheck,
  FaCarSide,
  FaCircleCheck,
  FaClock,
  FaLocationDot,
  FaShieldHalved,
} from "react-icons/fa6";
import "../styles/home.css";

const highlightItems = ["Quick cab booking", "Transparent fare details", "Manage trips anytime"];

const proofItems = [
  {
    icon: <FaShieldHalved />,
    title: "Secure sign in",
    description: "Access your rider account and manage bookings through a simple, secure flow.",
  },
  {
    icon: <FaLocationDot />,
    title: "Simple trip planning",
    description: "Add pickup and drop details, review the route, and confirm your ride in a few steps.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Booking history",
    description: "Check upcoming rides and past bookings from your dashboard whenever you need them.",
  },
  {
    icon: <FaArrowTrendUp />,
    title: "Admin controls",
    description: "Manage users, cabs, and bookings from one place without changing the core workflow.",
  },
];

function Home() {
  return (
    <main className="home-page">
      <div className="home-page__grid" aria-hidden="true" />
      <div className="home-page__glow home-page__glow-left" aria-hidden="true" />
      <div className="home-page__glow home-page__glow-right" aria-hidden="true" />

      <div className="home-content">
        <section className="home-hero">
          <div className="hero-copy">
            <div className="hero-brand-row">
              <div className="hero-brand-group">
                <span className="hero-brand">Cab Booking App</span>
                <span className="hero-brand-status">Available now</span>
              </div>

              <div className="hero-inline-actions">
                <Link to="/login" className="hero-inline-link">
                  Login
                </Link>
                <Link to="/register" className="hero-inline-link hero-inline-link-muted">
                  Register
                </Link>
              </div>
            </div>

            <span className="hero-kicker">Cab Booking Platform</span>
            <h1>Book reliable city rides in minutes.</h1>
            <p>
              Browse available cabs, check fare details, and confirm your ride through a clear
              booking flow built for everyday travel.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="hero-primary">
                <span>Book your ride</span>
                <FaArrowRight />
              </Link>
              <Link to="/register" className="hero-secondary">
                Create account
              </Link>
            </div>

            <div className="hero-highlights">
              {highlightItems.map((item) => (
                <span className="hero-highlight-chip" key={item}>
                  <FaCircleCheck />
                  <span>{item}</span>
                </span>
              ))}
            </div>

            <div className="hero-metrics">
              <article>
                <strong>24/7</strong>
                <span>Booking access</span>
              </article>
              <article>
                <strong>Live</strong>
                <span>Cab availability</span>
              </article>
              <article>
                <strong>Unified</strong>
                <span>User and admin access</span>
              </article>
            </div>
          </div>

          <div className="hero-stage" aria-label="Ride experience preview">
            <div className="hero-stage__orbit" aria-hidden="true" />
            <div className="hero-stage__glare" aria-hidden="true" />

            <article className="stage-panel stage-panel-main">
              <div className="stage-panel__top">
                <span className="stage-panel__label">Trip details</span>
                <span className="stage-panel__badge">Ready to book</span>
              </div>

              <div className="stage-route">
                <div className="stage-route__stop">
                  <span className="stage-route__dot stage-route__dot-start" />
                  <div>
                    <strong>Connaught Place</strong>
                    <span>Pickup location</span>
                  </div>
                </div>
                <div className="stage-route__line" />
                <div className="stage-route__stop">
                  <span className="stage-route__dot stage-route__dot-end" />
                  <div>
                    <strong>Cyber City</strong>
                    <span>Drop location</span>
                  </div>
                </div>
              </div>

              <div className="stage-insights">
                <article>
                  <FaClock />
                  <div>
                    <strong>18 min</strong>
                    <span>Estimated pickup time</span>
                  </div>
                </article>
                <article>
                  <FaCarSide />
                  <div>
                    <strong>Executive Sedan</strong>
                    <span>Selected cab type</span>
                  </div>
                </article>
                <article>
                  <FaArrowTrendUp />
                  <div>
                    <strong>Rs 420</strong>
                    <span>Estimated trip fare</span>
                  </div>
                </article>
              </div>

              <div className="stage-progress">
                <span className="stage-progress__step stage-progress__step-active">Select</span>
                <span className="stage-progress__step stage-progress__step-active">Book</span>
                <span className="stage-progress__step">Manage</span>
              </div>
            </article>

            <article className="stage-panel stage-panel-side">
              <span className="stage-panel__label">Driver details</span>
              <div className="stage-driver">
                <div className="stage-driver__avatar">MK</div>
                <div>
                  <strong>Manish Kumar</strong>
                  <span>4.9 rating • 312 trips</span>
                </div>
              </div>
              <p>See key ride details at a glance before you confirm your booking.</p>
            </article>

            <article className="stage-panel stage-panel-bottom">
              <div className="stage-panel__top">
                <span className="stage-panel__label">Service activity</span>
                <span className="stage-panel__signal">Live</span>
              </div>

              <div className="stage-bars" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="stage-mini-metrics">
                <article>
                  <strong>128</strong>
                  <span>Bookings today</span>
                </article>
                <article>
                  <strong>93%</strong>
                  <span>On-time pickups</span>
                </article>
              </div>
            </article>
          </div>
        </section>

        <section className="home-proof">
          {proofItems.map((item) => (
            <article className="proof-card" key={item.title}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default Home;
