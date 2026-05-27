import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaEnvelope,
  FaLock,
  FaShieldHalved,
  FaCarSide,
  FaClock
} from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';
import { loginUser, loginAdmin } from '../services/api';
import AuroraBackground from '../components/ui/AuroraBackground';
import AnimatedGrid from '../components/ui/AnimatedGrid';
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
    <main className="app-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <AuroraBackground />
      <AnimatedGrid />

      <div className="container" style={{ maxWidth: '1000px' }}>
        <div className="glass-card animate-reveal" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          padding: 0
        }}>
          {/* Left Side: Info */}
          <div style={{ padding: '60px', background: 'rgba(255,255,255,0.02)', borderRight: '1px solid var(--border-subtle)' }}>
            <span className="badge badge-gold" style={{ marginBottom: '24px' }}>Welcome Back</span>
            <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Sign in to <span className="serif-display">continue</span></h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
              Access your rider account or admin dashboard to manage your trips and fleet activity.
            </p>

            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="badge badge-blue" style={{ width: '40px', height: '40px', padding: 0, flexShrink: 0 }}>
                  <FaCarSide size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>One Login Flow</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Universal access for both riders and admins.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="badge badge-gold" style={{ width: '40px', height: '40px', padding: 0, flexShrink: 0 }}>
                  <FaShieldHalved size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Secure Sessions</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Advanced protection for your account data.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div style={{ padding: '60px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Login</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <FaEnvelope style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    className="form-input"
                    style={{ paddingLeft: '48px' }}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <FaLock style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    className="form-input"
                    style={{ paddingLeft: '48px' }}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                <span>Sign In</span>
                <FaArrowRight />
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Don't have an account? <Link to="/register" style={{ color: 'var(--accent-gold)', fontWeight: 700, textDecoration: 'none' }}>Register</Link>
                </p>
                <Link to="/" style={{ display: 'block', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.9rem', textDecoration: 'none' }}>
                  Back to home
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
