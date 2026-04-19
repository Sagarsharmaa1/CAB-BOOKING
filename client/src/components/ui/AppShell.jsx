import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import AuroraBackground from "./AuroraBackground";
import AnimatedGrid from "./AnimatedGrid";

function AppShell({
  title,
  subtitle,
  badge,
  stats = [],
  actions,
  children,
  compact = false,
  showTopbar = true,
}) {
  return (
    <main className={`app-shell ${compact ? "app-shell-compact" : ""}`}>
      <AuroraBackground />
      <AnimatedGrid />

      <div className="app-shell__content">
        {showTopbar ? (
          <header className="app-topbar">
            <Link to="/" className="app-brand">
              Cab Booking App
            </Link>
            <div className="app-topbar__meta">{badge ? <span className="app-badge">{badge}</span> : null}</div>
          </header>
        ) : null}

        <section className="hero-panel">
          <div className="hero-panel__copy">
            {badge ? <span className="eyebrow">{badge}</span> : null}
            <h1 className="hero-title">{title}</h1>
            {subtitle ? <p className="hero-subtitle">{subtitle}</p> : null}
          </div>
          {actions ? <div className="hero-panel__actions">{actions}</div> : null}
        </section>

        {stats.length > 0 ? (
          <section className="stats-grid">
            {stats.map((stat) => (
              <article className="stat-card" key={stat.label}>
                <span className="stat-card__label">{stat.label}</span>
                <strong className="stat-card__value">{stat.value}</strong>
                {stat.hint ? <p className="stat-card__hint">{stat.hint}</p> : null}
              </article>
            ))}
          </section>
        ) : null}

        <section className="content-panel">{children}</section>
      </div>
    </main>
  );
}

export function BackButton({ to, onClick, label = "Back", muted = true }) {
  const className = muted ? "btn btn-secondary" : "btn";

  if (to) {
    return (
      <Link to={to} className={className}>
        <FaArrowLeft />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      <FaArrowLeft />
      <span>{label}</span>
    </button>
  );
}

export default AppShell;
