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
import AuroraBackground from '../components/ui/AuroraBackground';
import AnimatedGrid from '../components/ui/AnimatedGrid';
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
            <span className="badge badge-gold" style={{ marginBottom: '24px' }}>Join Us</span>
            <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Create your <span className="serif-display">account</span></h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>
              Join thousands of riders who book reliable city cabs every day with a single tap.
            </p>

            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="badge badge-blue" style={{ width: '40px', height: '40px', padding: 0, flexShrink: 0 }}>
                  <FaUserPlus size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Quick Onboarding</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Simple registration flow to get you moving fast.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div className="badge badge-gold" style={{ width: '40px', height: '40px', padding: 0, flexShrink: 0 }}>
                  <FaShieldHalved size={20} />
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Secure Platform</strong>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Your data is protected with industry-standard security.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div style={{ padding: '60px' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Register</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Create your rider profile to continue.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <FaIdCard style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="form-input"
                    style={{ paddingLeft: '48px' }}
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                <span>Create Account</span>
                <FaArrowRight />
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Already have an account? <Link to="/login" style={{ color: 'var(--accent-gold)', fontWeight: 700, textDecoration: 'none' }}>Login</Link>
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

export default Register;
