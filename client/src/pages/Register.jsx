import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaEnvelope,
  FaIdCard,
  FaLock,
  FaShieldHalved,
  FaUserPlus,
} from 'react-icons/fa6';
import { registerUser } from '../services/api';
import '../styles/theme.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password });
      alert('Registration Successful');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.error || 'Registration failed');
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
          <span className="eyebrow auth-showcase__eyebrow">Create Rider Account</span>
          <h1>Start with a cleaner sign-up flow built for real booking journeys.</h1>
          <p>
            Create your account once, then move through cab discovery, booking, and ride
            management with the same premium interface across the app.
          </p>

          <div className="auth-showcase__rail">
            <article>
              <FaUserPlus />
              <div>
                <strong>Quick onboarding</strong>
                <span>A tighter form layout keeps account creation straightforward and focused.</span>
              </div>
            </article>
            <article>
              <FaShieldHalved />
              <div>
                <strong>Secure access</strong>
                <span>Your registration flow stays connected to the existing backend and auth routes.</span>
              </div>
            </article>
            <article>
              <FaArrowRight />
              <div>
                <strong>Ready to book</strong>
                <span>Sign up once and move directly into fleet browsing and trip confirmation.</span>
              </div>
            </article>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-card__header">
            <span className="eyebrow">New Account</span>
            <h2>Register</h2>
            <p>Create your rider profile to book cabs and manage your bookings from one place.</p>
          </div>

          <form id="register-form" onSubmit={handleSubmit} className="auth-form">
            <label className="auth-field">
              <span>Name</span>
              <div className="auth-field__control">
                <FaIdCard />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
            </label>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </label>

            <div className="auth-card__meta">
              <span>Your registration flow uses the same backend contract as before.</span>
              <button type="button" className="auth-back-link" onClick={() => navigate(-1)}>
                Go back
              </button>
            </div>

            <div className="auth-form__actions">
              <button className="btn" type="submit">
                <span>Signup</span>
                <FaArrowRight />
              </button>
              <button className="btn btn-secondary" type="button" onClick={() => navigate('/login')}>
                Login instead
              </button>
            </div>
          </form>

          <p className="auth-card__footer">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;
