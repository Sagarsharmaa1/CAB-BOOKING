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
  showTopbar = true,
}) {
  return (
    <main className="app-shell">
      <AuroraBackground />
      <AnimatedGrid />

      <div className="container app-shell__content">
        {showTopbar ? (
          <header className="glass" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '32px'
          }}>
            <Link to="/" className="app-brand" style={{
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)'
            }}>
              Cab Booking App
            </Link>
            <div className="app-topbar__meta">
              {badge ? <span className="badge badge-gold">{badge}</span> : null}
            </div>
          </header>
        ) : null}

        <section className="glass-card animate-reveal" style={{
          padding: '40px',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '24px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '24px',
          alignItems: 'center'
        }}>
          <div>
            {badge ? <span className="badge badge-gold" style={{ marginBottom: '16px' }}>{badge}</span> : null}
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '12px' }}>{title}</h1>
            {subtitle ? <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px' }}>{subtitle}</p> : null}
          </div>
          {actions ? <div className="hero-panel__actions">{actions}</div> : null}
        </section>

        {stats.length > 0 ? (
          <section className="stats-grid animate-reveal stagger-1" style={{ marginBottom: '24px' }}>
            {stats.map((stat) => (
              <article className="glass-card" key={stat.label} style={{ padding: '24px', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>{stat.label}</span>
                <strong style={{ display: 'block', fontSize: '2rem', marginTop: '8px', color: 'var(--accent-gold)' }}>{stat.value}</strong>
                {stat.hint ? <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{stat.hint}</p> : null}
              </article>
            ))}
          </section>
        ) : null}

        <section className="animate-reveal stagger-2">{children}</section>
      </div>
    </main>
  );
}

export function BackButton({ to, onClick, label = "Back", muted = true }) {
  const className = muted ? "btn btn-secondary" : "btn btn-primary";

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

