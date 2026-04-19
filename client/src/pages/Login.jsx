import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaArrowTrendUp,
  FaCarSide,
  FaClock,
  FaEnvelope,
  FaLock,
  FaShieldHalved,
} from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { loginUser, loginAdmin } from '../services/api';
import '../styles/theme.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Enter email and password');
      return;
    }

    try {
      let response;
      try {
        response = await loginAdmin({ email, password });
      } catch {
        response = await loginUser({ email, password });
      }

      const { token, user } = response.data;
      const actualRole = response.config.url === '/alogin' ? 'admin' : 'user';

      login(user, token, actualRole);
      navigate(actualRole === 'admin' ? '/admin' : '/uhome');
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-page__mesh" aria-hidden="true" />
      <div className="auth-page__glow auth-page__glow-left" aria-hidden="true" />
      <div className="auth-page__glow auth-page__glow-right" aria-hidden="true" />

      <div className="auth-page__shell">
        <section className="auth-showcase">
          <div className="auth-mark">Cab Booking App</div>
          <span className="eyebrow auth-showcase__eyebrow">Account Access</span>
          <h1>Sign in to book rides, manage trips, and access admin tools.</h1>
          <p>
            Use your existing account to continue with cab booking, booking history, and admin
            management from one place.
          </p>

          <div className="auth-showcase__rail">
            <article>
              <FaCarSide />
              <div>
                <strong>One login flow</strong>
                <span>Rider and admin accounts both sign in through the same entry point.</span>
              </div>
            </article>
            <article>
              <FaClock />
              <div>
                <strong>Quick access</strong>
                <span>Get back to available cabs, trip details, and dashboard actions without delay.</span>
              </div>
            </article>
            <article>
              <FaShieldHalved />
              <div>
                <strong>Secure session flow</strong>
                <span>The existing backend login, redirects, and session handling remain unchanged.</span>
              </div>
            </article>
          </div>

          <div className="auth-showcase__dashboard">
            <article className="auth-mini-card auth-mini-card-primary">
              <div className="auth-mini-card__top">
                <span>Platform status</span>
                <span className="auth-mini-card__badge">Live</span>
              </div>
              <strong>128 active bookings</strong>
              <p>Sign in to continue managing rides, users, and fleet activity.</p>
            </article>

            <div className="auth-mini-card-grid">
              <article className="auth-mini-card">
                <FaArrowTrendUp />
                <strong>93%</strong>
                <span>On-time pickups</span>
              </article>
              <article className="auth-mini-card">
                <FaShieldHalved />
                <strong>Secure</strong>
                <span>Login handling</span>
              </article>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card__header">
            <span className="eyebrow">Account Access</span>
            <h2>Login</h2>
            <p>Enter your rider or admin credentials to continue.</p>
          </div>

          <form id="login-form" onSubmit={handleSubmit} className="auth-form">
            <label className="auth-field">
              <span>Email</span>
              <div className="auth-field__control">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="auth-field">
              <span>Password</span>
              <div className="auth-field__control">
                <FaLock />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </label>

            <div className="auth-card__meta">
              <span>Both rider and admin accounts are supported.</span>
              <button type="button" className="auth-back-link" onClick={() => navigate('/')}>
                Go back
              </button>
            </div>

            <div className="auth-form__actions">
              <button className="btn" type="submit">
                <span>Login</span>
                <FaArrowRight />
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/register')}>
                Create account
              </button>
            </div>
          </form>

          <p className="auth-card__footer">
            Need a new account? <Link to="/register">Register here</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
