import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCircleCheck,
  FaLocationDot,
  FaShieldHalved,
  FaCarRear,
  FaClock,
  FaRoute
} from "react-icons/fa6";
import AuroraBackground from "../components/ui/AuroraBackground";
import AnimatedGrid from "../components/ui/AnimatedGrid";
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
    icon: <FaCarRear />,
    title: "Admin controls",
    description: "Manage users, cabs, and bookings from one place without changing the core workflow.",
  },
];

function Home() {
  return (
    <main className="home-page">
      <AuroraBackground />
      <AnimatedGrid />

      <div className="container home-content">
        <section className="home-hero animate-reveal">
          <div className="hero-copy">
            <div className="hero-brand-group">
              <span className="badge badge-gold">Cab Booking App</span>
              <span className="badge badge-blue">Available now</span>
            </div>

            <h1>
              <span>Book reliable</span>
              <span className="serif-display">city rides</span>
              <span>in minutes.</span>
            </h1>
            
            <p>
              Browse available cabs, check fare details, and confirm your ride through a clear
              booking flow built for everyday travel.
            </p>

            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary">
                <span>Book your ride</span>
                <FaArrowRight />
              </Link>
              <Link to="/register" className="btn btn-secondary">
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
          </div>

          <div className="hero-stage glass-card animate-reveal stagger-1">
            <div className="stage-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-gold">Trip details</span>
                <span className="badge badge-blue">Ready to book</span>
              </div>

              <div className="stage-route">
                <div className="stage-route__stop">
                  <strong>Connaught Place</strong>
                  <span>Pickup location</span>
                </div>
                <div className="stage-route__line" />
                <div className="stage-route__stop">
                  <strong>Cyber City</strong>
                  <span>Drop location</span>
                </div>
              </div>

              <div className="stage-insights">
                <article>
                  <strong>18 min</strong>
                  <span>Pickup time</span>
                </article>
                <article>
                  <strong>Executive</strong>
                  <span>Cab type</span>
                </article>
                <article>
                  <strong>Rs 420</strong>
                  <span>Trip fare</span>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="home-proof">
          {proofItems.map((item, index) => (
            <article className={`glass-card proof-card animate-reveal stagger-${index + 1}`} key={item.title}>
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
